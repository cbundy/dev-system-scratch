"use strict";

// Property tests: each property is checked against many generated inputs. The generator is
// seeded, so a run is deterministic and a failure names the seed and the input that broke it.

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugify } = require("../src/slugify.js");
const { isSlug } = require("../src/is-slug.js");
const { sameSlug } = require("../src/same-slug.js");
const { deslugify } = require("../src/deslugify.js");
const { slugWords } = require("../src/slug-words.js");
const { toAnchors } = require("../src/anchors.js");

const SEED = 20261015;
const RUNS = 300000;

// mulberry32: a small, fast, seeded PRNG.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PIECES = [
  "a", "b", "z", "Q", "Hello", "WORLD", "0", "7", "42", " ", "  ", "-", "--", "_", ".", ",",
  "!", "?", "&", "'", "’", "é", "ü", "ñ", "Å", "ß", "œ", "́", "/", "\\", "\t",
  "\n", "(", ")", "#", "%", "€", "日本", "😀", "R&D", "Crème", "brûlée", "don't",
];

function text(next) {
  const length = Math.floor(next() * 12);
  let out = "";
  for (let i = 0; i < length; i++) out += PIECES[Math.floor(next() * PIECES.length)];
  return out;
}

function forAll(name, property) {
  test(name, () => {
    const next = rng(SEED);
    for (let run = 0; run < RUNS; run++) {
      const input = text(next);
      try {
        property(input, next);
      } catch (error) {
        const where = `seed ${SEED}, run ${run}, input ${JSON.stringify(input)}`;
        throw new Error(`${error.message} (${where})`, { cause: error });
      }
    }
  });
}

forAll("slugify returns a slug or an empty string", (input) => {
  const slug = slugify(input);
  assert.ok(slug === "" || isSlug(slug), `not a slug: ${JSON.stringify(slug)}`);
});

forAll("slugify is idempotent", (input) => {
  const slug = slugify(input);
  assert.equal(slugify(slug), slug);
});

forAll("maxLength never lets the slug grow past it, for both cuts", (input, next) => {
  const maxLength = 1 + Math.floor(next() * 20);
  const full = slugify(input);
  for (const cut of ["word", "hard"]) {
    const slug = slugify(input, { maxLength, cut });
    assert.ok(slug.length <= maxLength, `${cut} cut: ${slug.length} > ${maxLength}`);
    assert.ok(full.startsWith(slug), `${cut} cut is not a prefix of the full slug`);
    assert.ok(slug === "" || isSlug(slug), `${cut} cut: not a slug: ${JSON.stringify(slug)}`);
  }
});

forAll("separator _ is the - result with hyphens replaced", (input, next) => {
  const maxLength = 1 + Math.floor(next() * 20);
  for (const opts of [{}, { maxLength, cut: "word" }, { maxLength, cut: "hard" }]) {
    const slug = slugify(input, { ...opts, separator: "_" });
    assert.equal(slug, slugify(input, opts).replace(/-/g, "_"));
    assert.ok(slug === "" || isSlug(slug, { separator: "_" }), `not a slug: ${JSON.stringify(slug)}`);
  }
});

forAll("sameSlug is reflexive and symmetric", (input, next) => {
  const other = text(next);
  assert.ok(sameSlug(input, input));
  assert.equal(sameSlug(input, other), sameSlug(other, input));
});

forAll("deslugify then slugify gives the slug back", (input) => {
  const slug = slugify(input);
  assert.equal(slugify(deslugify(slug)), slug);
});

forAll("slugWords counts the words of the slug", (input) => {
  const slug = slugify(input);
  assert.equal(slugWords(input), slug === "" ? 0 : slug.split("-").length);
});

forAll("toAnchors gives unique anchors", (input, next) => {
  const headings = [input, input, text(next), input];
  const anchors = toAnchors(headings);
  assert.equal(new Set(anchors).size, anchors.length);
});

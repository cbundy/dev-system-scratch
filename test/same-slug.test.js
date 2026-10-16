"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { sameSlug } = require("../src/same-slug.js");

test("accented and plain forms match", () => {
  assert.equal(sameSlug("Crème Brûlée", "creme brulee"), true);
});

test("different slugs do not match", () => {
  assert.equal(sameSlug("a b", "a-c"), false);
});

test("non-string arguments throw TypeError in either position", () => {
  assert.throws(() => sameSlug(42, "x"), TypeError);
  assert.throws(() => sameSlug("x", null), TypeError);
});

test("options are passed to both slugify calls", () => {
  assert.equal(
    sameSlug("Hello wonderful world", "Hello wonderful people", { maxLength: 15 }),
    true,
  );
});

test("invalid options throw what slugify throws", () => {
  assert.throws(() => sameSlug("a", "b", { maxLength: 0 }), RangeError);
});

test("without options the same pair does not match", () => {
  assert.equal(sameSlug("Hello wonderful world", "Hello wonderful people"), false);
});

"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugify } = require("../src/slugify.js");

test("lowercases and joins words with dashes", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("collapses punctuation and whitespace runs", () => {
  assert.equal(slugify("  Hello,   World!!  "), "hello-world");
});

test("strips accents", () => {
  assert.equal(slugify("Crème brûlée"), "creme-brulee");
});

test("keeps digits", () => {
  assert.equal(slugify("Top 10 tips"), "top-10-tips");
});

test("returns an empty string when nothing is sluggable", () => {
  assert.equal(slugify("!!!"), "");
});

test("maxLength trims at a word boundary", () => {
  assert.equal(slugify("one two three", { maxLength: 9 }), "one-two");
});

test("maxLength hard-cuts a single long word", () => {
  assert.equal(slugify("abcdefghij", { maxLength: 4 }), "abcd");
});

test("rejects non-strings", () => {
  assert.throws(() => slugify(42), TypeError);
});

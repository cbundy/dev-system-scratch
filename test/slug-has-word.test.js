"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugHasWord } = require("../src/slug-has-word.js");

const expected = { name: "TypeError", message: "slugify expects a string" };

test("matches whole words only", () => {
  assert.equal(slugHasWord("Hello Big World", "big"), true);
  assert.equal(slugHasWord("Hello Big World", "Bi"), false);
});

test("slugifies both sides", () => {
  assert.equal(slugHasWord("Hello Big World", "WORLD"), true);
  assert.equal(slugHasWord("Crème brûlée", "creme"), true);
});

test("empty word slug is false", () => {
  assert.equal(slugHasWord("Hello", ""), false);
  assert.equal(slugHasWord("Hello", "!!!"), false);
  assert.equal(slugHasWord("", ""), false);
});

test("multi-word word is false", () => {
  assert.equal(slugHasWord("Hello Big World", "big world"), false);
});

test("non-string throws slugify's TypeError", () => {
  for (const value of [42, null, undefined]) {
    assert.throws(() => slugHasWord(value, "big"), expected);
    assert.throws(() => slugHasWord("Hello", value), expected);
    assert.throws(() => slugHasWord(value, ""), expected);
  }
});

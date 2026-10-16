"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugFirstWords } = require("../src/slug-first-words.js");

const RANGE = {
  name: "RangeError",
  message: "slugFirstWords expects a non-negative integer",
};
const TYPE = { name: "TypeError", message: "slugify expects a string" };

test("returns the first n words", () => {
  assert.equal(slugFirstWords("Hello Big Wide World", 2), "hello-big");
  assert.equal(slugFirstWords("Hello Big Wide World", 1), "hello");
});

test("uses the words of the slug, not the raw text", () => {
  assert.equal(slugFirstWords("Crème brûlée tart", 2), "creme-brulee");
});

test("n equal to or above the word count returns the whole slug", () => {
  assert.equal(slugFirstWords("Hello Big", 2), "hello-big");
  assert.equal(slugFirstWords("Hello Big", 5), "hello-big");
});

test("n of 0 returns empty string", () => {
  assert.equal(slugFirstWords("Hello Big", 0), "");
});

test("empty slug returns empty string", () => {
  assert.equal(slugFirstWords("", 2), "");
  assert.equal(slugFirstWords("!!!", 2), "");
  assert.equal(slugFirstWords("", 0), "");
});

test("invalid n throws RangeError", () => {
  for (const n of [-1, 1.5, NaN, Infinity, "2", undefined, null]) {
    assert.throws(() => slugFirstWords("Hello Big", n), RANGE);
  }
});

test("non-string text throws slugify's TypeError", () => {
  for (const text of [42, null, undefined]) {
    assert.throws(() => slugFirstWords(text, 1), TYPE);
  }
});

test("bad text reports TypeError even when n is also bad", () => {
  assert.throws(() => slugFirstWords(42, -1), TYPE);
});

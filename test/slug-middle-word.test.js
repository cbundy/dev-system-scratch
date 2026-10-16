"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugMiddleWord } = require("../src/slug-middle-word.js");

test("odd word count returns the single middle word", () => {
  assert.equal(slugMiddleWord("one two three"), "two");
});

test("even word count returns the left middle word", () => {
  assert.equal(slugMiddleWord("one two three four"), "two");
  assert.equal(slugMiddleWord("a b"), "a");
});

test("single word returns itself", () => {
  assert.equal(slugMiddleWord("Hello"), "hello");
});

test("works on the slug, not the raw text", () => {
  assert.equal(slugMiddleWord("Crème brûlée au café"), "brulee");
});

test("empty slug returns empty string", () => {
  assert.equal(slugMiddleWord(""), "");
  assert.equal(slugMiddleWord("!!!"), "");
});

test("non-string throws slugify's TypeError", () => {
  for (const value of [42, null, undefined]) {
    assert.throws(() => slugMiddleWord(value), {
      name: "TypeError",
      message: "slugify expects a string",
    });
  }
});

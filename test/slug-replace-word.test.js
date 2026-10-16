"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugReplaceWord } = require("../src/slug-replace-word.js");

const expected = { name: "TypeError", message: "slugify expects a string" };

test("replaces every whole word", () => {
  assert.equal(slugReplaceWord("the big big dog", "big", "small"), "the-small-small-dog");
  assert.equal(slugReplaceWord("bigger dog", "big", "x"), "bigger-dog");
});

test("empty to drops matched words", () => {
  assert.equal(slugReplaceWord("a big dog", "big", ""), "a-dog");
  assert.equal(slugReplaceWord("big big", "big", ""), "");
});

test("slugifies all arguments", () => {
  assert.equal(slugReplaceWord("The BIG Dog", "Big", "Small Cat"), "the-small-cat-dog");
  assert.equal(slugReplaceWord("Crème brûlée", "creme", "custard"), "custard-brulee");
});

test("no-op edge cases", () => {
  assert.equal(slugReplaceWord("a big dog", "", "x"), "a-big-dog");
  assert.equal(slugReplaceWord("a big dog", "!!!", "x"), "a-big-dog");
  assert.equal(slugReplaceWord("a big dog", "big dog", "x"), "a-big-dog");
  assert.equal(slugReplaceWord("", "big", "x"), "");
  assert.equal(slugReplaceWord("", "", "x"), "");
});

test("non-string throws slugify's TypeError", () => {
  for (const value of [42, null, undefined]) {
    assert.throws(() => slugReplaceWord(value, "big", "x"), expected);
    assert.throws(() => slugReplaceWord("a big dog", value, "x"), expected);
    assert.throws(() => slugReplaceWord("a big dog", "big", value), expected);
    assert.throws(() => slugReplaceWord("", "", value), expected);
  }
});

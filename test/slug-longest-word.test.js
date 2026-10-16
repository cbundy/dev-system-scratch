"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugLongestWord } = require("../src/slug-longest-word.js");

const TYPE = { name: "TypeError", message: "slugify expects a string" };

test("returns the longest word", () => {
  assert.equal(slugLongestWord("a quick fox"), "quick");
  assert.equal(slugLongestWord("Hello"), "hello");
});

test("first word wins a tie", () => {
  assert.equal(slugLongestWord("ab cd"), "ab");
  assert.equal(slugLongestWord("one two six"), "one");
});

test("words come from the slug", () => {
  assert.equal(slugLongestWord("  Rock & Roll  Band "), "rock");
  assert.equal(slugLongestWord("Crème brûlée"), "creme");
});

test("returns an empty string for an empty slug", () => {
  assert.equal(slugLongestWord(""), "");
  assert.equal(slugLongestWord("!!!"), "");
});

test("throws slugify's TypeError for a non-string", () => {
  assert.throws(() => slugLongestWord(42), TYPE);
  assert.throws(() => slugLongestWord(null), TYPE);
  assert.throws(() => slugLongestWord(undefined), TYPE);
});

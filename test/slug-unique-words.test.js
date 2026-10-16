"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugUniqueWords } = require("../src/slug-unique-words.js");

const TYPE = { name: "TypeError", message: "slugify expects a string" };

test("removes repeated words keeping the first occurrence", () => {
  assert.equal(slugUniqueWords("the cat and the hat and the bat"), "the-cat-and-hat-bat");
});

test("a word repeated three times in a row collapses to one", () => {
  assert.equal(slugUniqueWords("go go go stop"), "go-stop");
});

test("text with no repeats returns its slug", () => {
  assert.equal(slugUniqueWords("Hello Big World"), "hello-big-world");
});

test("a single word returns its slug", () => {
  assert.equal(slugUniqueWords("Hello"), "hello");
});

test("repeats differing in case or accents collapse", () => {
  assert.equal(slugUniqueWords("Café cafe CAFE"), "cafe");
});

test("repeats separated by punctuation collapse to one word", () => {
  assert.equal(slugUniqueWords("red, red; RED! blue"), "red-blue");
});

test("repeated numeric words collapse like any other word", () => {
  assert.equal(slugUniqueWords("route 66 and route 66 again"), "route-66-and-again");
});

test("empty slug returns empty string", () => {
  assert.equal(slugUniqueWords(""), "");
  assert.equal(slugUniqueWords("!!!"), "");
});

test("non-string throws slugify's TypeError", () => {
  assert.throws(() => slugUniqueWords(42), TYPE);
  assert.throws(() => slugUniqueWords(null), TYPE);
  assert.throws(() => slugUniqueWords(undefined), TYPE);
});

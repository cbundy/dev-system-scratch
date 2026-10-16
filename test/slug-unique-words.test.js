"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugUniqueWords } = require("../src/slug-unique-words.js");

const TYPE = { name: "TypeError", message: "slugify expects a string" };

test("removes repeated words keeping the first occurrence", () => {
  assert.equal(slugUniqueWords("the cat and the hat and the bat"), "the-cat-and-hat-bat");
});

test("text with no repeats returns its slug", () => {
  assert.equal(slugUniqueWords("Hello Big World"), "hello-big-world");
});

test("repeats differing in case or accents collapse", () => {
  assert.equal(slugUniqueWords("Café cafe CAFE"), "cafe");
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

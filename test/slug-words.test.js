"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugWords } = require("../src/slug-words.js");

test("counts words in a phrase", () => {
  assert.equal(slugWords("Hello, World!"), 2);
});

test("single word is one", () => {
  assert.equal(slugWords("one"), 1);
});

test("empty slug is zero words", () => {
  assert.equal(slugWords("!!!"), 0);
  assert.equal(slugWords(""), 0);
});

test("non-string throws TypeError", () => {
  assert.throws(() => slugWords(42), TypeError);
});

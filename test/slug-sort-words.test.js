"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugSortWords } = require("../src/slug-sort-words.js");

const typeError = { name: "TypeError", message: "slugify expects a string" };

test("sorts the words of the slug", () => {
  assert.equal(slugSortWords("the quick brown fox"), "brown-fox-quick-the");
});

test("digits sort before letters", () => {
  assert.equal(slugSortWords("b a 10 2"), "10-2-a-b");
});

test("case is normalised by slugify before sorting", () => {
  assert.equal(slugSortWords("Zebra apple"), "apple-zebra");
});

test("single word is unchanged", () => {
  assert.equal(slugSortWords("Hello"), "hello");
});

test("duplicate words are kept", () => {
  assert.equal(slugSortWords("b a b"), "a-b-b");
});

test("empty slug gives empty string", () => {
  assert.equal(slugSortWords(""), "");
  assert.equal(slugSortWords("!!!"), "");
});

test("non-string arguments throw slugify's TypeError", () => {
  assert.throws(() => slugSortWords(42), typeError);
  assert.throws(() => slugSortWords(null), typeError);
  assert.throws(() => slugSortWords(undefined), typeError);
});

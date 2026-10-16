"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugWordLengths } = require("../src/slug-word-lengths.js");

const TYPE = { name: "TypeError", message: "slugify expects a string" };

test("returns the length of each word", () => {
  assert.deepEqual(slugWordLengths("a quick fox"), [1, 5, 3]);
  assert.deepEqual(slugWordLengths("Hello"), [5]);
});

test("words come from the slug", () => {
  assert.deepEqual(slugWordLengths("  Rock & Roll  Band "), [4, 3, 4, 4]);
  assert.deepEqual(slugWordLengths("Crème brûlée"), [5, 6]);
});

test("returns an empty array for an empty slug", () => {
  assert.deepEqual(slugWordLengths(""), []);
  assert.deepEqual(slugWordLengths("!!!"), []);
});

test("throws slugify's TypeError for a non-string", () => {
  assert.throws(() => slugWordLengths(42), TYPE);
  assert.throws(() => slugWordLengths(null), TYPE);
  assert.throws(() => slugWordLengths(undefined), TYPE);
});

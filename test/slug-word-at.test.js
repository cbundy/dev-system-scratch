"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugWordAt } = require("../src/slug-word-at.js");

const RANGE = {
  name: "RangeError",
  message: "slugWordAt expects a non-negative integer",
};
const TYPE = { name: "TypeError", message: "slugify expects a string" };

test("returns the word at each index", () => {
  assert.equal(slugWordAt("Hello Big World", 0), "hello");
  assert.equal(slugWordAt("Hello Big World", 1), "big");
  assert.equal(slugWordAt("Hello Big World", 2), "world");
});

test("uses the words of the slug, not the raw text", () => {
  assert.equal(slugWordAt("Crème brûlée", 0), "creme");
  assert.equal(slugWordAt("Crème brûlée", 1), "brulee");
});

test("index past the last word returns empty string", () => {
  assert.equal(slugWordAt("Hello Big World", 3), "");
  assert.equal(slugWordAt("Hello Big World", 100), "");
});

test("empty slug returns empty string for every valid index", () => {
  for (const text of ["", "!!!"]) {
    assert.equal(slugWordAt(text, 0), "");
    assert.equal(slugWordAt(text, 3), "");
  }
});

test("invalid index throws RangeError", () => {
  for (const i of [-1, 1.5, NaN, Infinity, "1", undefined, null]) {
    assert.throws(() => slugWordAt("Hello Big", i), RANGE);
  }
});

test("non-string text throws slugify's TypeError", () => {
  for (const text of [42, null, undefined]) {
    assert.throws(() => slugWordAt(text, 0), TYPE);
  }
});

test("bad text with bad index still throws the TypeError", () => {
  assert.throws(() => slugWordAt(42, -1), TYPE);
});

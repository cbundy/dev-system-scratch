"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugFirstWord } = require("../src/slug-first-word.js");

test("returns the first word of a phrase", () => {
  assert.equal(slugFirstWord("Hello Big World"), "hello");
});

test("single word returns itself", () => {
  assert.equal(slugFirstWord("Hello"), "hello");
});

test("takes the first word of the slug, not the raw text", () => {
  assert.equal(slugFirstWord("Crème brûlée"), "creme");
});

test("empty slug returns empty string", () => {
  assert.equal(slugFirstWord(""), "");
  assert.equal(slugFirstWord("!!!"), "");
});

test("non-string throws slugify's TypeError", () => {
  for (const value of [42, null, undefined]) {
    assert.throws(() => slugFirstWord(value), {
      name: "TypeError",
      message: "slugify expects a string",
    });
  }
});

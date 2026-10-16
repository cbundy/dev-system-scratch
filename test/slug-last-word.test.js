"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugLastWord } = require("../src/slug-last-word.js");

test("returns the last word of a phrase", () => {
  assert.equal(slugLastWord("Hello Big World"), "world");
});

test("single word returns itself", () => {
  assert.equal(slugLastWord("Hello"), "hello");
});

test("takes the last word of the slug, not the raw text", () => {
  assert.equal(slugLastWord("Crème brûlée"), "brulee");
});

test("empty slug returns empty string", () => {
  assert.equal(slugLastWord(""), "");
  assert.equal(slugLastWord("!!!"), "");
});

test("non-string throws slugify's TypeError", () => {
  for (const value of [42, null, undefined]) {
    assert.throws(() => slugLastWord(value), {
      name: "TypeError",
      message: "slugify expects a string",
    });
  }
});

"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugWordCount } = require("../src/slug-word-count.js");

test("counts words in a phrase", () => {
  assert.equal(slugWordCount("Hello World"), 2);
});

test("counts words of accented text", () => {
  assert.equal(slugWordCount("Crème brûlée au café"), 4);
});

test("empty slug is zero words", () => {
  assert.equal(slugWordCount(""), 0);
  assert.equal(slugWordCount("!!!"), 0);
});

test("non-string throws slugify's TypeError", () => {
  for (const value of [42, null, undefined]) {
    assert.throws(() => slugWordCount(value), {
      name: "TypeError",
      message: "slugify expects a string",
    });
  }
});

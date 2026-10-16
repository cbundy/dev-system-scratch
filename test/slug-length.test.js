"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugify } = require("../src/slugify.js");
const { slugLength } = require("../src/slug-length.js");

test("length of a phrase slug", () => {
  assert.equal(slugLength("Hello Big World"), 15);
  assert.equal(slugLength("Hello Big World"), slugify("Hello Big World").length);
});

test("empty slug is length zero", () => {
  assert.equal(slugLength(""), 0);
  assert.equal(slugLength("!!!"), 0);
});

test("non-string throws slugify's TypeError", () => {
  for (const value of [42, null, undefined]) {
    assert.throws(() => slugLength(value), {
      name: "TypeError",
      message: "slugify expects a string",
    });
  }
});

test("counts the separators of a single-letter slug", () => {
  assert.equal(slugLength("a b c"), 5);
});

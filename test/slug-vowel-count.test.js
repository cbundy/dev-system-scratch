"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugVowelCount } = require("../src/slug-vowel-count.js");

const TYPE = { name: "TypeError", message: "slugify expects a string" };

test("counts the vowels", () => {
  assert.equal(slugVowelCount("Hello Big World"), 4);
});

test("vowels come from the slug", () => {
  assert.equal(slugVowelCount("Rock & Roll"), 3);
  assert.equal(slugVowelCount("Café"), 2);
});

test("y is not a vowel", () => {
  assert.equal(slugVowelCount("rhythm"), 0);
  assert.equal(slugVowelCount("y"), 0);
});

test("returns 0 for an empty slug", () => {
  assert.equal(slugVowelCount(""), 0);
  assert.equal(slugVowelCount("!!!"), 0);
});

test("throws slugify's TypeError for a non-string", () => {
  assert.throws(() => slugVowelCount(42), TYPE);
  assert.throws(() => slugVowelCount(null), TYPE);
  assert.throws(() => slugVowelCount(undefined), TYPE);
});

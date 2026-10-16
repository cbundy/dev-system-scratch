"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugEveryOther } = require("../src/slug-every-other.js");

const TYPE = { name: "TypeError", message: "slugify expects a string" };

test("keeps the words at even indexes", () => {
  assert.equal(slugEveryOther("one two three four five"), "one-three-five");
  assert.equal(slugEveryOther("Hello"), "hello");
  assert.equal(slugEveryOther("Hello World"), "hello");
  assert.equal(slugEveryOther("a b c d"), "a-c");
});

test("words come from the slug", () => {
  assert.equal(slugEveryOther("  Rock & Roll  Band "), "rock-roll");
  assert.equal(slugEveryOther("Crème brûlée tarte"), "creme-tarte");
});

test("returns an empty string for an empty slug", () => {
  assert.equal(slugEveryOther(""), "");
  assert.equal(slugEveryOther("!!!"), "");
});

test("throws slugify's TypeError for a non-string", () => {
  assert.throws(() => slugEveryOther(42), TYPE);
  assert.throws(() => slugEveryOther(null), TYPE);
  assert.throws(() => slugEveryOther(undefined), TYPE);
});

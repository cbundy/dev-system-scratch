"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugStartsWith } = require("../src/slug-starts-with.js");

const expected = { name: "TypeError", message: "slugify expects a string" };

test("matches on word boundaries only", () => {
  assert.equal(slugStartsWith("Hello Big World", "hello big"), true);
  assert.equal(slugStartsWith("Hello Big World", "hel"), false);
  assert.equal(slugStartsWith("Hello Big World", "hello bi"), false);
});

test("slugifies both sides", () => {
  assert.equal(slugStartsWith("Crème Brûlée Recipe", "creme brulee"), true);
  assert.equal(slugStartsWith("Hello Big", "HELLO"), true);
});

test("empty prefix slug is true", () => {
  assert.equal(slugStartsWith("Hello", ""), true);
  assert.equal(slugStartsWith("Hello", "!!!"), true);
  assert.equal(slugStartsWith("", ""), true);
});

test("whole match is true, longer or non-empty prefix on empty is false", () => {
  assert.equal(slugStartsWith("Hello", "HELLO"), true);
  assert.equal(slugStartsWith("", "hello"), false);
  assert.equal(slugStartsWith("Hello", "hello world"), false);
});

test("non-string throws slugify's TypeError", () => {
  for (const value of [42, null, undefined]) {
    assert.throws(() => slugStartsWith(value, "big"), expected);
    assert.throws(() => slugStartsWith("Hello", value), expected);
    assert.throws(() => slugStartsWith(value, ""), expected);
    assert.throws(() => slugStartsWith("", value), expected);
  }
});

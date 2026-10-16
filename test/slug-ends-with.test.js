"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugEndsWith } = require("../src/slug-ends-with.js");

const expected = { name: "TypeError", message: "slugify expects a string" };

test("whole-word suffix", () => {
  assert.equal(slugEndsWith("Hello Big World", "big world"), true);
  assert.equal(slugEndsWith("Hello Big World", "World"), true);
  assert.equal(slugEndsWith("Hello Big World", "hello big world"), true);
});

test("not on a word boundary", () => {
  assert.equal(slugEndsWith("Hello Big World", "orld"), false);
  assert.equal(slugEndsWith("Hello Big World", "g world"), false);
  assert.equal(slugEndsWith("Hello", "world"), false);
  assert.equal(slugEndsWith("world", "hello world"), false);
});

test("slugifies both sides", () => {
  assert.equal(slugEndsWith("Crème brûlée", "BRULEE"), true);
});

test("empty suffix slug is true", () => {
  assert.equal(slugEndsWith("Hello", ""), true);
  assert.equal(slugEndsWith("Hello", "!!!"), true);
  assert.equal(slugEndsWith("", ""), true);
  assert.equal(slugEndsWith("", "x"), false);
});

test("non-string throws", () => {
  for (const bad of [42, null, undefined]) {
    assert.throws(() => slugEndsWith(bad, "x"), expected);
    assert.throws(() => slugEndsWith("x", bad), expected);
    assert.throws(() => slugEndsWith(bad, ""), expected);
    assert.throws(() => slugEndsWith("", bad), expected);
  }
});

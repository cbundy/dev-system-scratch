"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugRotate } = require("../src/slug-rotate.js");

const typeError = { name: "TypeError", message: "slugify expects a string" };

test("moves the first word to the end", () => {
  assert.equal(slugRotate("Hello Big World"), "big-world-hello");
  assert.equal(slugRotate("Crème brûlée"), "brulee-creme");
});

test("single word is unchanged", () => {
  assert.equal(slugRotate("Hello"), "hello");
});

test("empty slug gives empty string", () => {
  assert.equal(slugRotate(""), "");
  assert.equal(slugRotate("!!!"), "");
});

test("non-string arguments throw slugify's TypeError", () => {
  assert.throws(() => slugRotate(42), typeError);
  assert.throws(() => slugRotate(null), typeError);
  assert.throws(() => slugRotate(undefined), typeError);
});

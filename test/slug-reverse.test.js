"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugReverse } = require("../src/slug-reverse.js");

const typeError = { name: "TypeError", message: "slugify expects a string" };

test("reverses the words of the slug", () => {
  assert.equal(slugReverse("Hello Big World"), "world-big-hello");
});

test("single word is unchanged", () => {
  assert.equal(slugReverse("Hello"), "hello");
});

test("reverses slugify's words for accented text", () => {
  assert.equal(slugReverse("Crème brûlée"), "brulee-creme");
});

test("empty slug gives empty string", () => {
  assert.equal(slugReverse(""), "");
  assert.equal(slugReverse("!!!"), "");
});

test("non-string arguments throw slugify's TypeError", () => {
  assert.throws(() => slugReverse(42), typeError);
  assert.throws(() => slugReverse(null), typeError);
  assert.throws(() => slugReverse(undefined), typeError);
});

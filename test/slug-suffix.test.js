"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugSuffix } = require("../src/slug-suffix.js");
const { slugify } = require("../src/slugify.js");

const typeError = { name: "TypeError", message: "slugify expects a string" };

test("suffixes the slug with the suffix slug", () => {
  assert.equal(slugSuffix("Hello World", "Draft"), "hello-world-draft");
});

test("handles accented multi-word text and suffix", () => {
  assert.equal(slugSuffix("Crème brûlée", "My Notes"), "creme-brulee-my-notes");
});

test("drops a suffix that slugifies to empty", () => {
  assert.equal(slugSuffix("Hello World", ""), slugify("Hello World"));
  assert.equal(slugSuffix("Hello World", "!!!"), slugify("Hello World"));
});

test("empty text slug with a suffix gives a leading dash", () => {
  assert.equal(slugSuffix("", "Draft"), "-draft");
});

test("non-string arguments throw slugify's TypeError", () => {
  assert.throws(() => slugSuffix(42, "Draft"), typeError);
  assert.throws(() => slugSuffix("Hello", null), typeError);
  assert.throws(() => slugSuffix(42, ""), typeError);
});

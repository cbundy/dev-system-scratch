"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugPrefix } = require("../src/slug-prefix.js");
const { slugify } = require("../src/slugify.js");

const typeError = { name: "TypeError", message: "slugify expects a string" };

test("prefixes the slug with the prefix slug", () => {
  assert.equal(slugPrefix("Hello World", "Blog"), "blog-hello-world");
});

test("handles accented multi-word prefix and text", () => {
  assert.equal(slugPrefix("Crème brûlée", "My Recipes"), "my-recipes-creme-brulee");
});

test("drops a prefix that slugifies to empty", () => {
  assert.equal(slugPrefix("Hello World", ""), slugify("Hello World"));
  assert.equal(slugPrefix("Hello World", "!!!"), slugify("Hello World"));
});

test("empty text slug with a prefix gives a trailing dash", () => {
  assert.equal(slugPrefix("", "Blog"), "blog-");
});

test("non-string arguments throw slugify's TypeError", () => {
  assert.throws(() => slugPrefix(42, "Blog"), typeError);
  assert.throws(() => slugPrefix("Hello", null), typeError);
  assert.throws(() => slugPrefix(42, ""), typeError);
});

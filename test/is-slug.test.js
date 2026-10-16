"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { isSlug, assertSlug } = require("../src/is-slug.js");

test("well-formed slugs are accepted", () => {
  for (const s of ["hello-world", "a1-b2", "x"]) {
    assert.equal(isSlug(s), true, s);
  }
});

test("malformed strings are rejected", () => {
  for (const s of ["", "Hello", "-a", "a-", "a--b", "a b"]) {
    assert.equal(isSlug(s), false, JSON.stringify(s));
  }
});

test("non-strings are rejected without throwing", () => {
  assert.equal(isSlug(null), false);
  assert.equal(isSlug(42), false);
});

test("assertSlug returns a valid slug unchanged", () => {
  assert.equal(assertSlug("a-b"), "a-b");
});

test("assertSlug throws TypeError for non-slugs", () => {
  for (const x of ["A", "", 1]) {
    assert.throws(() => assertSlug(x), { name: "TypeError", message: "not a slug" });
  }
});

"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { isSlug } = require("../src/is-slug.js");

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

test("the empty string is not a slug", () => {
  assert.equal(isSlug(""), false);
});

test("non-strings are rejected without throwing", () => {
  assert.equal(isSlug(null), false);
  assert.equal(isSlug(42), false);
});

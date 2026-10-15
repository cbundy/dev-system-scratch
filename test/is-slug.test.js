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

test("separator option selects the joining character", () => {
  assert.equal(isSlug("a_b"), false);
  assert.equal(isSlug("a_b", {}), false);
  assert.equal(isSlug("a_b", { separator: "_" }), true);
  assert.equal(isSlug("a-b", { separator: "-" }), true);
  assert.equal(isSlug("a-b", { separator: "_" }), false);
  for (const s of ["_a", "a_", "a__b", ""]) {
    assert.equal(isSlug(s, { separator: "_" }), false, s);
  }
  assert.equal(isSlug(42, { separator: "_" }), false);
});

test("isSlug rejects an unsupported separator", () => {
  assert.throws(() => isSlug("a", { separator: "." }), {
    name: "TypeError",
    message: 'separator must be "-" or "_"',
  });
});

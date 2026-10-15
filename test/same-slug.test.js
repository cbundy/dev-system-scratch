"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { sameSlug } = require("../src/same-slug.js");

test("accented and plain forms match", () => {
  assert.equal(sameSlug("Crème Brûlée", "creme brulee"), true);
});

test("different slugs do not match", () => {
  assert.equal(sameSlug("a b", "a-c"), false);
});

test("non-string arguments throw TypeError in either position", () => {
  assert.throws(() => sameSlug(42, "x"), TypeError);
  assert.throws(() => sameSlug("x", null), TypeError);
});

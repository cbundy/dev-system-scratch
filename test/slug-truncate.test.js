"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugTruncate } = require("../src/slug-truncate.js");
const { slugify } = require("../src/slugify.js");

const typeError = { name: "TypeError", message: "slugify expects a string" };
const rangeError = { name: "RangeError", message: "slugTruncate expects a non-negative integer" };

test("cuts at a word boundary", () => {
  assert.equal(slugTruncate("Hello Big World", 9), "hello-big");
  assert.equal(slugTruncate("Hello Big World", 6), "hello");
});

test("n = 0 gives an empty string", () => {
  assert.equal(slugTruncate("Hello Big World", 0), "");
});

test("n at or beyond the slug length gives the whole slug", () => {
  const slug = slugify("Hello Big World");
  assert.equal(slugTruncate("Hello Big World", slug.length), slug);
  assert.equal(slugTruncate("Hello Big World", 100), "hello-big-world");
});

test("never longer than n and never ends in a dash", () => {
  const slug = slugify("Hello Big World");
  for (let n = 0; n <= slug.length; n++) {
    const out = slugTruncate("Hello Big World", n);
    assert.ok(out.length <= n, `length at n=${n}`);
    assert.ok(!out.endsWith("-"), `trailing dash at n=${n}`);
  }
});

test("invalid n throws RangeError", () => {
  for (const n of [-1, 1.5, NaN, Infinity, "3", undefined]) {
    assert.throws(() => slugTruncate("Hello", n), rangeError);
  }
});

test("non-string text throws slugify's TypeError, checked first", () => {
  assert.throws(() => slugTruncate(42, 3), typeError);
  assert.throws(() => slugTruncate(null, 3), typeError);
  assert.throws(() => slugTruncate(undefined, 3), typeError);
  assert.throws(() => slugTruncate(42, -1), typeError);
});

"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { isSlugList } = require("../src/slug-list.js");

test("valid slug lists are accepted", () => {
  for (const s of ["a-b,c", "x", "a1,b2-c3,d"]) {
    assert.equal(isSlugList(s), true, s);
  }
});

test("invalid slug lists are rejected", () => {
  for (const s of ["a-b, c", "", "a,,b", ",a", "a,", "A,b", "a-,b"]) {
    assert.equal(isSlugList(s), false, JSON.stringify(s));
  }
});

test("non-strings are rejected without throwing", () => {
  for (const v of [null, undefined, 42, ["a"]]) {
    assert.equal(isSlugList(v), false, String(v));
  }
});

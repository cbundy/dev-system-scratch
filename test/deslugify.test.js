"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { deslugify } = require("../src/deslugify.js");

test("replaces hyphens with spaces and capitalises the first character", () => {
  assert.equal(deslugify("hello-world"), "Hello world");
});

test("single character", () => {
  assert.equal(deslugify("x"), "X");
});

test("empty string returns empty string", () => {
  assert.equal(deslugify(""), "");
});

test("keeps the case of the rest", () => {
  assert.equal(deslugify("hello-WORLD"), "Hello WORLD");
});

test("throws TypeError for non-strings", () => {
  for (const v of [undefined, null, 42]) {
    assert.throws(() => deslugify(v), TypeError);
  }
});

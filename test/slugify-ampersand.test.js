"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugify } = require("../src/slugify.js");

test("spaced ampersand becomes and", () => {
  assert.equal(slugify("Fish & Chips"), "fish-and-chips");
});

test("unspaced ampersand becomes and", () => {
  assert.equal(slugify("R&D"), "r-and-d");
});

test("edge cases", () => {
  assert.equal(slugify("&"), "and");
  assert.equal(slugify("a&&b"), "a-and-and-b");
});

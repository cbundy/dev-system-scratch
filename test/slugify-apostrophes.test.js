"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugify } = require("../src/slugify.js");

test("drops an ASCII apostrophe inside a word", () => {
  assert.equal(slugify("Don't stop"), "dont-stop");
});

test("drops U+2019 around a word", () => {
  assert.equal(slugify("rock \u2019n\u2019 roll"), "rock-n-roll");
});

test("drops U+2019 inside a word", () => {
  assert.equal(slugify("Don\u2019t"), "dont");
});

test("drops an apostrophe alongside the ampersand rewrite", () => {
  assert.equal(slugify("Rock & roll's best"), "rock-and-rolls-best");
});

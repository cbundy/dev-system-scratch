"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugify } = require("../src/slugify.js");

const text = "hello wonderful world";

test("hard cut slices at exactly maxLength", () => {
  assert.equal(slugify(text, { maxLength: 8, cut: "hard" }), "hello-wo");
});

test("hard cut drops a trailing dash", () => {
  assert.equal(slugify(text, { maxLength: 6, cut: "hard" }), "hello");
});

test("hard cut leaves a short slug alone", () => {
  assert.equal(slugify("hello", { maxLength: 10, cut: "hard" }), "hello");
});

test("word cut and omitted cut keep the word-boundary trim", () => {
  assert.equal(slugify(text, { maxLength: 8 }), "hello");
  assert.equal(slugify(text, { maxLength: 8, cut: "word" }), "hello");
});

test("invalid cut throws TypeError", () => {
  for (const cut of ["soft", "", null, 1]) {
    assert.throws(() => slugify(text, { maxLength: 8, cut }), TypeError);
    assert.throws(() => slugify("hi", { maxLength: 50, cut }), TypeError);
    assert.throws(() => slugify(text, { cut }), TypeError);
  }
});

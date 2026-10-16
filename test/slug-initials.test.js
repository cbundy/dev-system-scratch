"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugInitials } = require("../src/slug-initials.js");

test("initials of a phrase", () => {
  assert.equal(slugInitials("Hello Big World"), "hbw");
});

test("initials of accented text", () => {
  assert.equal(slugInitials("Crème brûlée au café"), "cbac");
});

test("digit words keep their digit", () => {
  assert.equal(slugInitials("2 Fast 4 You"), "2f4y");
});

test("empty slug gives empty string", () => {
  assert.equal(slugInitials(""), "");
  assert.equal(slugInitials("!!!"), "");
});

test("non-string throws slugify's TypeError", () => {
  for (const bad of [42, null, undefined]) {
    assert.throws(() => slugInitials(bad), {
      name: "TypeError",
      message: "slugify expects a string",
    });
  }
});

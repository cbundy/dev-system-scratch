"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugify } = require("../src/slugify.js");

for (const bad of [0, -1, 2.5, "3", NaN, "abc"]) {
  test(`maxLength ${JSON.stringify(bad)} throws RangeError`, () => {
    assert.throws(() => slugify("a b", { maxLength: bad }), {
      name: "RangeError",
      message: "maxLength must be a positive integer, got " + String(bad),
    });
  });
}

test("maxLength 1 trims to a", () => {
  assert.equal(slugify("a b", { maxLength: 1 }), "a");
});

test("omitted or undefined maxLength leaves slug untrimmed", () => {
  assert.equal(slugify("a b"), "a-b");
  assert.equal(slugify("a b", { maxLength: undefined }), "a-b");
});

"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugify } = require("../src/slugify.js");

test("underscore separator joins words with _", () => {
  assert.equal(slugify("Hello World", { separator: "_" }), "hello_world");
  assert.equal(slugify("  Hello,   World!!  ", { separator: "_" }), "hello_world");
  assert.equal(slugify("Don't stop & go", { separator: "_" }), "dont_stop_and_go");
  assert.equal(slugify("!!!", { separator: "_" }), "");
});

test("default separator is unchanged", () => {
  for (const t of ["Hello World", "a  b", "!!!"]) {
    const expected = slugify(t);
    assert.equal(slugify(t, {}), expected);
    assert.equal(slugify(t, { separator: undefined }), expected);
    assert.equal(slugify(t, { separator: "-" }), expected);
  }
});

test("maxLength and cut work with _", () => {
  assert.equal(slugify("one two three", { maxLength: 9, separator: "_" }), "one_two");
  assert.equal(slugify("one two", { maxLength: 4, cut: "hard", separator: "_" }), "one");
});

test("unsupported separators throw", () => {
  for (const separator of [".", "", "__", " ", null, 0, 1]) {
    for (const text of ["a b", ""]) {
      assert.throws(() => slugify(text, { separator }), {
        name: "TypeError",
        message: 'separator must be "-" or "_"',
      });
    }
  }
});

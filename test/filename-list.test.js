"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugifyFilenames } = require("../src/filename.js");

test("slugifies each name in order", () => {
  assert.deepEqual(
    slugifyFilenames(["My Holiday Photo.JPG", "archive.tar.gz", "README", ".env"]),
    ["my-holiday-photo.jpg", "archive-tar.gz", "readme", "env"],
  );
});

test("returns a new empty array for an empty list", () => {
  const input = [];
  const out = slugifyFilenames(input);
  assert.deepEqual(out, []);
  assert.notEqual(out, input);
});

test("throws on a non-array argument", () => {
  for (const bad of ["a.txt", undefined, null, {}]) {
    assert.throws(() => slugifyFilenames(bad), {
      name: "TypeError",
      message: "slugifyFilenames expects an array",
    });
  }
});

test("a non-string element throws slugify's error", () => {
  assert.throws(() => slugifyFilenames(["a.txt", 5]), {
    name: "TypeError",
    message: "slugify expects a string",
  });
});

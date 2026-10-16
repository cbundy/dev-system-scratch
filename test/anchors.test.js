"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { toAnchors } = require("../src/anchors.js");

test("suffixes repeats, case-insensitively", () => {
  assert.deepEqual(toAnchors(["Intro", "Usage", "Intro", "intro"]), [
    "intro",
    "usage",
    "intro-1",
    "intro-2",
  ]);
});

test("skips suffixes that are already taken", () => {
  assert.deepEqual(toAnchors(["a", "a-1", "a"]), ["a", "a-1", "a-2"]);
});

test("distinct headings map one-to-one to slugs", () => {
  assert.deepEqual(toAnchors(["Hello World", "Foo Bar"]), ["hello-world", "foo-bar"]);
});

test("is pure across calls", () => {
  assert.deepEqual(toAnchors(["Intro", "Intro"]), ["intro", "intro-1"]);
  assert.deepEqual(toAnchors(["Intro", "Intro"]), ["intro", "intro-1"]);
});

test("empty input returns an empty array", () => {
  assert.deepEqual(toAnchors([]), []);
});

test("rejects non-array input with a clear TypeError", () => {
  for (const v of ["a", undefined, {}]) {
    assert.throws(() => toAnchors(v), {
      name: "TypeError",
      message: "toAnchors expects an array of strings",
    });
  }
});

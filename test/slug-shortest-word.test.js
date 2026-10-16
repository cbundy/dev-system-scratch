"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugShortestWord } = require("../src/slug-shortest-word.js");

const TYPE = { name: "TypeError", message: "slugify expects a string" };

test("returns the shortest word", () => {
  assert.equal(slugShortestWord("a quick fox"), "a");
  assert.equal(slugShortestWord("ab cd efg"), "ab");
  assert.equal(slugShortestWord("Hello"), "hello");
});

test("first word wins a tie", () => {
  assert.equal(slugShortestWord("cat dog"), "cat");
});

test("words come from the slug", () => {
  assert.equal(slugShortestWord("Rock & Roll"), "and");
  assert.equal(slugShortestWord("Route 66 West"), "66");
});

test("returns an empty string for an empty slug", () => {
  assert.equal(slugShortestWord(""), "");
  assert.equal(slugShortestWord("!!!"), "");
});

test("throws slugify's TypeError for a non-string", () => {
  assert.throws(() => slugShortestWord(42), TYPE);
  assert.throws(() => slugShortestWord(null), TYPE);
  assert.throws(() => slugShortestWord(undefined), TYPE);
});

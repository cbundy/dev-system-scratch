"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugAcronym } = require("../src/slug-acronym.js");

const TYPE = { name: "TypeError", message: "slugify expects a string" };

test("joins the first character of each word", () => {
  assert.equal(slugAcronym("Hello Big World"), "hbw");
  assert.equal(slugAcronym("Hello"), "h");
});

test("initials come from the slug", () => {
  assert.equal(slugAcronym("Crème brûlée"), "cb");
  assert.equal(slugAcronym("Rock & Roll"), "rar");
  assert.equal(slugAcronym("Route 66 West"), "r6w");
  assert.equal(slugAcronym("  hello -- world  "), "hw");
});

test("returns an empty string for an empty slug", () => {
  assert.equal(slugAcronym(""), "");
  assert.equal(slugAcronym("!!!"), "");
});

test("throws slugify's TypeError for a non-string", () => {
  assert.throws(() => slugAcronym(42), TYPE);
  assert.throws(() => slugAcronym(null), TYPE);
  assert.throws(() => slugAcronym(undefined), TYPE);
});

"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugJoin } = require("../src/slug-join.js");
const { slugify } = require("../src/slugify.js");

test("joins non-empty slugs with a dash", () => {
  assert.equal(slugJoin("Hello", "", "World!"), "hello-world");
});

test("handles multi-word and accented parts", () => {
  assert.equal(slugJoin("Crème brûlée", "Recipe"), "creme-brulee-recipe");
});

test("no parts or only empty slugs give empty string", () => {
  assert.equal(slugJoin(), "");
  assert.equal(slugJoin("", "!!!"), "");
});

test("single part equals slugify(part)", () => {
  assert.equal(slugJoin("Some Title!"), slugify("Some Title!"));
});

test("non-string part throws slugify's TypeError", () => {
  assert.throws(() => slugJoin("a", 42), {
    name: "TypeError",
    message: "slugify expects a string",
  });
});

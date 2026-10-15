"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugifyFilename } = require("../src/filename.js");

test("slugifies the stem and lowercases the extension", () => {
  assert.equal(slugifyFilename("My Holiday Photo.JPG"), "my-holiday-photo.jpg");
});

test("keeps only the last extension", () => {
  assert.equal(slugifyFilename("archive.tar.gz"), "archive-tar.gz");
});

test("handles names without an extension", () => {
  assert.equal(slugifyFilename("README"), "readme");
});

test("a leading dot is not an extension", () => {
  assert.equal(slugifyFilename(".env"), "env");
});

test("a trailing dot falls back to the plain slug", () => {
  assert.equal(slugifyFilename("photo."), "photo");
});

test("an empty stem falls back to the plain slug", () => {
  assert.equal(slugifyFilename("!!!.jpg"), "jpg");
});

test("strips accents from the stem", () => {
  assert.equal(slugifyFilename("Café Menu.PDF"), "cafe-menu.pdf");
});

test("an extension with a slash falls back to the plain slug", () => {
  const out = slugifyFilename("a.b/c");
  assert.equal(out, "a-b-c");
  assert.doesNotMatch(out, /[/ ]/);
});

test("an extension with a trailing space falls back to the plain slug", () => {
  const out = slugifyFilename("Résumé.PDF ");
  assert.equal(out, "resume-pdf");
  assert.doesNotMatch(out, /[/ ]/);
});

test("rejects non-string input", () => {
  assert.throws(() => slugifyFilename(42), TypeError);
});

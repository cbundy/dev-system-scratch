"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { slugifyFilename, filenameExtension } = require("../src/filename.js");
const { slugify } = require("../src/slugify.js");

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

test("filenameExtension returns the lowercased last extension", () => {
  assert.equal(filenameExtension("My Holiday Photo.JPG"), "jpg");
  assert.equal(filenameExtension("archive.tar.GZ"), "gz");
});

test("filenameExtension returns empty when no extension is kept", () => {
  for (const name of ["README", ".bashrc", "!!!.txt", "a.b/c", "Résumé.PDF ", "file."]) {
    assert.equal(filenameExtension(name), "", name);
  }
});

test("filenameExtension agrees with slugifyFilename", () => {
  const names = [
    "My Holiday Photo.JPG", "archive.tar.GZ", "README", ".bashrc",
    "!!!.txt", "a.b/c", "Résumé.PDF ", "file.",
  ];
  for (const name of names) {
    const ext = filenameExtension(name);
    if (ext) assert.ok(slugifyFilename(name).endsWith("." + ext), name);
    else assert.equal(slugifyFilename(name), slugify(name), name);
  }
});

test("filenameExtension rejects non-string input", () => {
  assert.throws(() => filenameExtension(42), TypeError);
});

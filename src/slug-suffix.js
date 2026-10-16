"use strict";

const { slugify } = require("./slugify.js");

/**
 * Suffix the slug of text with the slug of suffix, joined by "-".
 * slugSuffix("Hello World", "Draft") -> "hello-world-draft"; a suffix that
 * slugifies to "" is dropped, giving just the slug of text. An empty text
 * slug with a non-empty suffix gives "-<suffix>".
 *
 * @param {string} text
 * @param {string} suffix
 * @returns {string}
 * @throws {TypeError} if text or suffix is not a string (slugify's error, unchanged)
 */
function slugSuffix(text, suffix) {
  const s = slugify(suffix);
  const t = slugify(text);
  return s === "" ? t : t + "-" + s;
}

module.exports = { slugSuffix };

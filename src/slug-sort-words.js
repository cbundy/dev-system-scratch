"use strict";

const { slugify } = require("./slugify.js");

/**
 * Slug of a string with its hyphen-separated words sorted in code-point order ("" for an empty slug).
 *
 * @param {string} text
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify, unchanged).
 */
function slugSortWords(text) {
  const slug = slugify(text);
  // Default sort compares UTF-16 code units, which equals code-point order because slugify output is [a-z0-9-].
  return slug === "" ? "" : slug.split("-").sort().join("-");
}

module.exports = { slugSortWords };

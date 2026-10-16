"use strict";

const { slugify } = require("./slugify.js");

/**
 * Prefix the slug of text with the slug of prefix, joined by "-".
 * slugPrefix("Hello World", "Blog") -> "blog-hello-world"; a prefix that
 * slugifies to "" is dropped, giving just the slug of text. An empty text
 * slug with a non-empty prefix gives "<prefix>-".
 *
 * @param {string} text
 * @param {string} prefix
 * @returns {string}
 * @throws {TypeError} if text or prefix is not a string (slugify's error, unchanged)
 */
function slugPrefix(text, prefix) {
  const p = slugify(prefix);
  const t = slugify(text);
  return p === "" ? t : p + "-" + t;
}

module.exports = { slugPrefix };

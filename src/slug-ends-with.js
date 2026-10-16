"use strict";

const { slugify } = require("./slugify.js");

/**
 * Whether the slug of `text` ends with the slug of `suffix` on a word boundary.
 * An empty suffix slug always matches.
 *
 * @param {string} text
 * @param {string} suffix
 * @returns {boolean}
 * @throws {TypeError} slugify's error when either argument is not a string.
 */
function slugEndsWith(text, suffix) {
  const t = slugify(text);
  const s = slugify(suffix);
  return s === "" || t === s || t.endsWith("-" + s);
}

module.exports = { slugEndsWith };

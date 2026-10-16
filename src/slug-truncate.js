"use strict";

const { slugify } = require("./slugify.js");

/**
 * The slug of a string cut to at most n characters, never ending in a dash.
 *
 * @param {string} text
 * @param {number} n Maximum length, a non-negative integer.
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 * @throws {RangeError} If n is not a non-negative integer ("slugTruncate expects a non-negative integer").
 */
function slugTruncate(text, n) {
  const slug = slugify(text);
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError("slugTruncate expects a non-negative integer");
  }
  return slug.slice(0, n).replace(/-+$/, "");
}

module.exports = { slugTruncate };

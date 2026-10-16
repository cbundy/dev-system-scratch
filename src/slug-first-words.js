"use strict";

const { slugify } = require("./slugify.js");

/**
 * First n hyphen-separated words of the slug of a string ("" for an empty slug or n of 0).
 *
 * @param {string} text
 * @param {number} n Number of words to keep.
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 * @throws {RangeError} If n is not a non-negative integer ("slugFirstWords expects a non-negative integer").
 */
function slugFirstWords(text, n) {
  const slug = slugify(text);
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError("slugFirstWords expects a non-negative integer");
  }
  return slug === "" ? "" : slug.split("-").slice(0, n).join("-");
}

module.exports = { slugFirstWords };

"use strict";

const { slugify } = require("./slugify.js");

/**
 * The word at index i of the slug of a string ("" past the last word or for an empty slug).
 *
 * @param {string} text
 * @param {number} i Zero-based word index.
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 * @throws {RangeError} If i is not a non-negative integer ("slugWordAt expects a non-negative integer").
 */
function slugWordAt(text, i) {
  const slug = slugify(text);
  if (!Number.isInteger(i) || i < 0) {
    throw new RangeError("slugWordAt expects a non-negative integer");
  }
  return slug === "" ? "" : (slug.split("-")[i] ?? "");
}

module.exports = { slugWordAt };

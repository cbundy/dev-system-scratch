"use strict";

const { slugify } = require("./slugify.js");

/**
 * Number of hyphen-separated words in the slug of a string (0 for an empty slug).
 *
 * @param {string} text
 * @returns {number}
 * @throws {TypeError} If text is not a string ("slugWords expects a string").
 */
function slugWords(text) {
  if (typeof text !== "string") throw new TypeError("slugWords expects a string");
  const slug = slugify(text);
  return slug === "" ? 0 : slug.split("-").length;
}

module.exports = { slugWords };

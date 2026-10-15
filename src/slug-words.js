"use strict";

const { slugify } = require("./slugify.js");

/**
 * Number of hyphen-separated words in the slug of a string (0 for an empty slug).
 * Throws TypeError (via slugify) when the argument is not a string.
 *
 * @param {string} text
 * @returns {number}
 */
function slugWords(text) {
  const slug = slugify(text);
  return slug === "" ? 0 : slug.split("-").length;
}

module.exports = { slugWords };

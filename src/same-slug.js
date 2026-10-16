"use strict";

const { slugify } = require("./slugify.js");

/**
 * Whether two strings produce the same URL slug.
 * Throws TypeError (via slugify) when either argument is not a string, and
 * RangeError (via slugify) when options.maxLength is invalid. Options are
 * validated by slugify, not here.
 *
 * @param {string} a
 * @param {string} b
 * @param {{ maxLength?: number, cut?: "word" | "hard" }} [options] passed
 *   unchanged to both slugify calls
 * @returns {boolean}
 */
function sameSlug(a, b, options) {
  return slugify(a, options) === slugify(b, options);
}

module.exports = { sameSlug };

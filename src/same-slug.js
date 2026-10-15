"use strict";

const { slugify } = require("./slugify.js");

/**
 * Whether two strings produce the same URL slug.
 * Throws TypeError (via slugify) when either argument is not a string.
 *
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
function sameSlug(a, b) {
  return slugify(a) === slugify(b);
}

module.exports = { sameSlug };

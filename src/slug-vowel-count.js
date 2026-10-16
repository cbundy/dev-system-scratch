"use strict";

const { slugify } = require("./slugify.js");

/**
 * The number of vowels (a, e, i, o, u) in the slug of a string.
 *
 * @param {string} text
 * @returns {number}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 */
function slugVowelCount(text) {
  return (slugify(text).match(/[aeiou]/g) || []).length;
}

module.exports = { slugVowelCount };

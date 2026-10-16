"use strict";

const { slugify } = require("./slugify.js");

/**
 * Last hyphen-separated word of the slug of a string ("" for an empty slug).
 *
 * @param {string} text
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 */
function slugLastWord(text) {
  const words = slugify(text).split("-");
  return words[words.length - 1];
}

module.exports = { slugLastWord };

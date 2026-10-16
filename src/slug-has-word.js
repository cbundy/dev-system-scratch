"use strict";

const { slugify } = require("./slugify.js");

/**
 * Whether the slug of word is exactly one of the hyphen-separated words of the slug of text.
 *
 * @param {string} text
 * @param {string} word
 * @returns {boolean}
 * @throws {TypeError} If text or word is not a string ("slugify expects a string", thrown by slugify).
 */
function slugHasWord(text, word) {
  const slug = slugify(text);
  const target = slugify(word);
  return target !== "" && slug !== "" && slug.split("-").includes(target);
}

module.exports = { slugHasWord };

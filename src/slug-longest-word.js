"use strict";

const { slugify } = require("./slugify.js");

/**
 * The longest word of the slug of a string; the first one wins a tie ("" for an empty slug).
 *
 * @param {string} text
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 */
function slugLongestWord(text) {
  const slug = slugify(text);
  if (slug === "") return "";
  return slug.split("-").reduce((best, word) => (word.length > best.length ? word : best));
}

module.exports = { slugLongestWord };

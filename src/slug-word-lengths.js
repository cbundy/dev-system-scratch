"use strict";

const { slugify } = require("./slugify.js");

/**
 * The length of each word of the slug of a string, in order ([] for an empty slug).
 *
 * @param {string} text
 * @returns {number[]}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 */
function slugWordLengths(text) {
  const slug = slugify(text);
  if (slug === "") return [];
  return slug.split("-").map((word) => word.length);
}

module.exports = { slugWordLengths };

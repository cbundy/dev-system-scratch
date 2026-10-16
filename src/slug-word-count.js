"use strict";

const { slugify } = require("./slugify.js");

/**
 * Number of hyphen-separated words in the slug of a string (0 for an empty slug).
 *
 * @param {string} text
 * @returns {number}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 */
function slugWordCount(text) {
  const slug = slugify(text);
  return slug === "" ? 0 : slug.split("-").length;
}

module.exports = { slugWordCount };

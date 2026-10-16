"use strict";

const { slugify } = require("./slugify.js");

/**
 * Slug of a string with repeated words removed, keeping the first occurrence of each ("" for an empty slug).
 *
 * @param {string} text
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 */
function slugUniqueWords(text) {
  const slug = slugify(text);
  return slug === "" ? "" : [...new Set(slug.split("-"))].join("-");
}

module.exports = { slugUniqueWords };

"use strict";

const { slugify } = require("./slugify.js");

/**
 * Slug of a string with its hyphen-separated words in reverse order ("" for an empty slug).
 *
 * @param {string} text
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify, unchanged).
 */
function slugReverse(text) {
  const slug = slugify(text);
  return slug === "" ? "" : slug.split("-").reverse().join("-");
}

module.exports = { slugReverse };

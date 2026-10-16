"use strict";

const { slugify } = require("./slugify.js");

/**
 * Slug of a string with its first hyphen-separated word moved to the end ("" for an empty slug).
 *
 * @param {string} text
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify, unchanged).
 */
function slugRotate(text) {
  const slug = slugify(text);
  if (slug === "") return "";
  const [first, ...rest] = slug.split("-");
  return [...rest, first].join("-");
}

module.exports = { slugRotate };

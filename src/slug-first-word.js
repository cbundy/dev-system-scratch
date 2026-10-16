"use strict";

const { slugify } = require("./slugify.js");

/**
 * First hyphen-separated word of the slug of a string ("" for an empty slug).
 *
 * @param {string} text
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 */
function slugFirstWord(text) {
  return slugify(text).split("-")[0];
}

module.exports = { slugFirstWord };

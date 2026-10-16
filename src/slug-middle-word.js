"use strict";

const { slugify } = require("./slugify.js");

/**
 * Middle hyphen-separated word of the slug of a string. For an even word count
 * the left of the two middle words is returned ("" for an empty slug).
 *
 * @param {string} text
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 */
function slugMiddleWord(text) {
  const words = slugify(text).split("-");
  return words[Math.floor((words.length - 1) / 2)];
}

module.exports = { slugMiddleWord };

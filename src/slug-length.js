"use strict";

const { slugify } = require("./slugify.js");

/**
 * Length of the slug of a string (0 for an empty slug).
 *
 * @param {string} text
 * @returns {number}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 */
function slugLength(text) {
  return slugify(text).length;
}

module.exports = { slugLength };

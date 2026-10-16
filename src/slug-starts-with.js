"use strict";

const { slugify } = require("./slugify.js");

/**
 * Whether the slug of text starts with the slug of prefix, on a word boundary.
 *
 * @param {string} text
 * @param {string} prefix
 * @returns {boolean}
 * @throws {TypeError} If text or prefix is not a string ("slugify expects a string", thrown by slugify).
 */
function slugStartsWith(text, prefix) {
  const s = slugify(text);
  const p = slugify(prefix);
  return p === "" || s === p || s.startsWith(p + "-");
}

module.exports = { slugStartsWith };

"use strict";

const { slugify } = require("./slugify.js");

/**
 * The words at even indexes (0, 2, 4, ...) of the slug of a string, joined by "-" ("" for an empty slug).
 *
 * @param {string} text
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 */
function slugEveryOther(text) {
  const slug = slugify(text);
  return slug === "" ? "" : slug.split("-").filter((_, i) => i % 2 === 0).join("-");
}

module.exports = { slugEveryOther };

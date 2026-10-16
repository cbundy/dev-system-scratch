"use strict";

const { slugify } = require("./slugify.js");

/**
 * First character of each hyphen-separated word in the slug of a string ("" for an empty slug).
 *
 * @param {string} text
 * @returns {string}
 * @throws {TypeError} If text is not a string ("slugify expects a string", thrown by slugify).
 */
function slugInitials(text) {
  const slug = slugify(text);
  return slug === "" ? "" : slug.split("-").map((w) => w[0]).join("");
}

module.exports = { slugInitials };

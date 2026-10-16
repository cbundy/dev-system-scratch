"use strict";

const { slugify } = require("./slugify.js");

/**
 * Replace every whole word of the slug of text equal to the slug of from with the slug of to.
 * An empty to slug drops the matched words. A from slug that is empty or multi-word matches nothing.
 *
 * @param {string} text
 * @param {string} from
 * @param {string} to
 * @returns {string}
 * @throws {TypeError} If text, from or to is not a string ("slugify expects a string", thrown by slugify).
 */
function slugReplaceWord(text, from, to) {
  const slug = slugify(text);
  const target = slugify(from);
  const replacement = slugify(to);
  if (slug === "") {
    return "";
  }
  if (target === "") {
    return slug;
  }
  return slug
    .split("-")
    .map((word) => (word === target ? replacement : word))
    .filter((word) => word !== "")
    .join("-");
}

module.exports = { slugReplaceWord };

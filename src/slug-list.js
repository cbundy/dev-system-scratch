"use strict";

const { isSlug } = require("./is-slug.js");

/**
 * Whether a value is a comma-separated list of slugs: one or more parts, split
 * on ",", where every part is a well-formed slug (see isSlug). No whitespace is
 * allowed around commas. Never throws; any non-string yields false.
 *
 * @param {unknown} text
 * @returns {boolean}
 */
function isSlugList(text) {
  return typeof text === "string" && text.split(",").every((part) => isSlug(part));
}

module.exports = { isSlugList };

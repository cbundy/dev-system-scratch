"use strict";

/**
 * Turn a hyphenated slug into a sentence-like string: a run of one or more
 * hyphens becomes a single space, hyphens at either end are dropped, and the
 * first character is uppercased; the rest keeps its case.
 *
 * @param {string} slug
 * @returns {string}
 * @throws {TypeError} when slug is not a string
 */
function deslugify(slug) {
  if (typeof slug !== "string") {
    throw new TypeError("deslugify expects a string");
  }
  const text = slug.split("-").filter(Boolean).join(" ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

module.exports = { deslugify };

"use strict";

const SLUG_PATTERNS = {
  "-": /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  _: /^[a-z0-9]+(?:_[a-z0-9]+)*$/,
};

/**
 * Whether a value is a well-formed slug: non-empty runs of [a-z0-9] joined by
 * single separators ("-" by default, or "_"), with no leading or trailing
 * separator. Never throws for the text argument; any non-string yields false.
 *
 * @param {unknown} text
 * @param {{ separator?: "-" | "_" }} [options]
 * @returns {boolean}
 * @throws {TypeError} If separator is defined and not "-" or "_".
 */
function isSlug(text, options = {}) {
  const { separator = "-" } = options;
  if (separator !== "-" && separator !== "_") {
    throw new TypeError('separator must be "-" or "_"');
  }
  return typeof text === "string" && SLUG_PATTERNS[separator].test(text);
}

/**
 * Return a value unchanged when it is a well-formed slug (see isSlug);
 * otherwise throw.
 *
 * @param {unknown} text
 * @returns {string}
 * @throws {TypeError} when text is not a slug
 */
function assertSlug(text) {
  if (!isSlug(text)) {
    throw new TypeError("not a slug");
  }
  return text;
}

module.exports = { isSlug, assertSlug };

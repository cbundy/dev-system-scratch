"use strict";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Whether a value is a well-formed slug: non-empty runs of [a-z0-9] joined by
 * single hyphens, with no leading or trailing hyphen. The empty string is not
 * a slug (isSlug("") is false). Never throws; any non-string yields false.
 *
 * @param {unknown} text
 * @returns {boolean}
 */
function isSlug(text) {
  return typeof text === "string" && SLUG_PATTERN.test(text);
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

/**
 * The text itself when it is a well-formed slug, otherwise null. Never throws;
 * any non-string yields null.
 *
 * @param {unknown} text
 * @returns {string | null}
 */
function slugOrNull(text) {
  return isSlug(text) ? text : null;
}

module.exports = { isSlug, assertSlug, slugOrNull };

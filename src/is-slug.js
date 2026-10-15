"use strict";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Whether a value is a well-formed slug: non-empty runs of [a-z0-9] joined by
 * single hyphens, with no leading or trailing hyphen. Never throws; any
 * non-string yields false.
 *
 * @param {unknown} text
 * @returns {boolean}
 */
function isSlug(text) {
  return typeof text === "string" && SLUG_PATTERN.test(text);
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

module.exports = { isSlug, slugOrNull };

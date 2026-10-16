"use strict";

// A deliberately small, real piece of code: enough for agents to have something
// to change, test and review when the dev flow is exercised end to end.

/**
 * Turn arbitrary text into a URL slug: lowercase ASCII words joined by "-".
 * Accents are stripped, and apostrophes U+0027 and U+2019 are dropped.
 * "&" becomes "and".
 * Other characters that are not ASCII letters or digits become separators,
 * and leading/trailing separators are dropped.
 *
 * @param {string} text
 * @param {{ maxLength?: number, cut?: "word" | "hard" }} [options] maxLength
 *   limits the slug length; undefined leaves the slug untrimmed. Any defined
 *   maxLength must be a positive integer, even when no trimming is needed;
 *   otherwise throws RangeError with message "maxLength must be a positive
 *   integer, got <value>", where <value> is String(maxLength). cut "word" (default) trims at a word boundary; cut "hard" cuts
 *   at exactly maxLength, then drops a trailing "-".
 * @returns {string}
 * @throws {TypeError} If text is not a string or cut has an unsupported value,
 *   even when maxLength is omitted or no trimming is needed.
 */
function slugify(text, options = {}) {
  if (typeof text !== "string") {
    throw new TypeError("slugify expects a string");
  }
  let slug = text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['\u2019]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const { maxLength, cut = "word" } = options;
  if (maxLength !== undefined) {
    if (!Number.isInteger(maxLength) || maxLength < 1) {
      throw new RangeError(
        `maxLength must be a positive integer, got ${String(maxLength)}`,
      );
    }
  }
  if (cut !== "word" && cut !== "hard") {
    throw new TypeError('cut must be "word" or "hard"');
  }
  if (maxLength !== undefined && slug.length > maxLength) {
    if (cut === "hard") {
      slug = slug.slice(0, maxLength).replace(/-+$/, "");
    } else {
      const head = slug.slice(0, maxLength + 1);
      const boundary = head.lastIndexOf("-");
      slug = boundary > 0 ? head.slice(0, boundary) : slug.slice(0, maxLength);
    }
  }
  return slug;
}

module.exports = { slugify };

"use strict";

const { slugify } = require("./slugify.js");

/**
 * Turn a list of headings into unique anchor slugs using slugify: the
 * first occurrence keeps the bare slug, later repeats get "-1", "-2", ...
 * A suffixed candidate that is already taken is skipped, so the result never
 * contains duplicates. Pure: no state is kept between calls.
 *
 * @param {string[]} headings
 * @returns {string[]} same length and order as the input
 * @throws {TypeError} when headings is not an array
 */
function toAnchors(headings) {
  if (!Array.isArray(headings)) throw new TypeError("toAnchors expects an array of strings");
  const used = new Set();
  return headings.map((heading) => {
    const base = slugify(heading);
    let candidate = base;
    for (let n = 1; used.has(candidate); n++) {
      candidate = `${base}-${n}`;
    }
    used.add(candidate);
    return candidate;
  });
}

module.exports = { toAnchors };

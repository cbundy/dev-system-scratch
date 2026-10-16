"use strict";

const { slugify } = require("./slugify.js");

/**
 * Slugify each part and join the non-empty slugs with "-".
 * slugJoin("Hello", "", "World!") -> "hello-world"; no parts, or only parts
 * that slugify to "", give "".
 *
 * @param {...string} parts
 * @returns {string}
 * @throws {TypeError} if a part is not a string (slugify's error, unchanged)
 */
function slugJoin(...parts) {
  return parts
    .map((p) => slugify(p))
    .filter((s) => s !== "")
    .join("-");
}

module.exports = { slugJoin };

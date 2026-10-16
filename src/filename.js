"use strict";

const { slugify } = require("./slugify.js");

/**
 * Slugify a filename while keeping its (lowercased) last extension.
 * "My Holiday Photo.JPG" -> "my-holiday-photo.jpg"; earlier dots become "-".
 * A leading dot is not an extension; an empty stem or an extension that is not
 * plain [a-z0-9] falls back to slugifying the whole name, so the result never
 * starts or ends with a dot or contains spaces, slashes or non-ASCII.
 *
 * @param {string} name
 * @returns {string}
 */
function slugifyFilename(name) {
  const slug = slugify(name);
  const dot = name.lastIndexOf(".");
  if (dot <= 0) return slug;
  const stem = slugify(name.slice(0, dot));
  const ext = name.slice(dot + 1).toLowerCase();
  if (!stem || !/^[a-z0-9]+$/.test(ext)) return slug;
  return stem + "." + ext;
}

/**
 * Slugify a list of filenames, preserving order.
 * Each element goes to slugifyFilename unchanged, so a non-string element
 * throws slugify's TypeError.
 *
 * @param {string[]} names
 * @returns {string[]}
 * @throws {TypeError} if names is not an array
 */
function slugifyFilenames(names) {
  if (!Array.isArray(names)) {
    throw new TypeError("slugifyFilenames expects an array");
  }
  return names.map((name) => slugifyFilename(name));
}

module.exports = { slugifyFilename, slugifyFilenames };

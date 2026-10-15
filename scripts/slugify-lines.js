#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { slugify } = require(path.join(__dirname, "..", "src", "slugify.js"));

const USAGE = "usage: node scripts/slugify-lines.js <file>\n";

function main() {
  const file = process.argv[2];
  if (!file) {
    process.stderr.write(USAGE);
    process.exitCode = 2;
    return;
  }
  let text;
  try {
    text = fs.readFileSync(file, "utf8");
  } catch (err) {
    if (err.code === "ENOENT" || err.code === "ENOTDIR") {
      process.stderr.write(USAGE);
      process.exitCode = 2;
      return;
    }
    throw err;
  }
  const out = text
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .map((line) => slugify(line) + "\n")
    .join("");
  process.stdout.write(out);
}

main();

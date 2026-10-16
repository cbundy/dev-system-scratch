#!/usr/bin/env node
"use strict";

const path = require("node:path");
const { slugify } = require(path.join(__dirname, "..", "src", "slugify.js"));

const USAGE = "usage: node scripts/slugify-args.js <text>...\n";

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    process.stderr.write(USAGE);
    process.exitCode = 2;
    return;
  }
  process.stdout.write(args.map((a) => slugify(a) + "\n").join(""));
}

main();

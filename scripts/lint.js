#!/usr/bin/env node
"use strict";

// The lint gate: every JavaScript file under src/, test/ and scripts/ must parse, start with
// "use strict" (after an optional shebang), and have no trailing whitespace or tabs for
// indentation. Quiet on success; on failure prints one file:line problem per line and exits 1.

const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const DIRS = ["src", "test", "scripts"];

function files(dir) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full, { withFileTypes: true }).flatMap((entry) => {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) return files(rel);
    return entry.name.endsWith(".js") ? [rel] : [];
  });
}

const problems = [];
for (const file of DIRS.flatMap(files).sort()) {
  try {
    execFileSync(process.execPath, ["--check", path.join(ROOT, file)], { stdio: "pipe" });
  } catch (error) {
    const detail = String(error.stderr).split("\n").find((l) => /Error/.test(l)) || "syntax error";
    problems.push(`${file}: ${detail.trim()}`);
    continue;
  }
  const lines = fs.readFileSync(path.join(ROOT, file), "utf8").split("\n");
  const first = lines[0].startsWith("#!") ? 1 : 0;
  if (lines[first] !== '"use strict";') problems.push(`${file}:${first + 1}: missing "use strict"`);
  lines.forEach((line, i) => {
    if (/[ \t]+$/.test(line)) problems.push(`${file}:${i + 1}: trailing whitespace`);
    if (/^\t/.test(line)) problems.push(`${file}:${i + 1}: tab indentation`);
  });
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

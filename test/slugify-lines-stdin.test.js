"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const script = path.join(__dirname, "..", "scripts", "slugify-lines.js");

function run(input) {
  return spawnSync(process.execPath, [script, "-"], { input, encoding: "utf8" });
}

test("- slugifies each line of stdin", () => {
  const r = run("Hello World\nCrème brûlée\n");
  assert.equal(r.stdout, "hello-world\ncreme-brulee\n");
  assert.equal(r.status, 0);
  assert.equal(r.stderr, "");
});

test("- skips blank and whitespace-only lines and handles CRLF", () => {
  const r = run("One Two\r\n\n   \r\nThree\n");
  assert.equal(r.stdout, "one-two\nthree\n");
  assert.equal(r.status, 0);
});

test("- with empty stdin prints nothing", () => {
  const r = run("");
  assert.equal(r.stdout, "");
  assert.equal(r.stderr, "");
  assert.equal(r.status, 0);
});

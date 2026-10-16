"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const script = path.join(__dirname, "..", "scripts", "slugify-args.js");
const USAGE = "usage: node scripts/slugify-args.js <text>...\n";

function run(args) {
  return spawnSync(process.execPath, [script, ...args], { encoding: "utf8", input: "" });
}

test("slugifies two arguments", () => {
  const r = run(["Hello World", "Crème brûlée"]);
  assert.equal(r.status, 0);
  assert.equal(r.stdout, "hello-world\ncreme-brulee\n");
  assert.equal(r.stderr, "");
});

test("single argument gives one line", () => {
  const r = run(["Hello World"]);
  assert.equal(r.status, 0);
  assert.equal(r.stdout, "hello-world\n");
});

test("keeps argument order", () => {
  assert.equal(run(["B", "A"]).stdout, "b\na\n");
});

test("empty slug gives an empty line", () => {
  assert.equal(run(["A", "!!!", "B"]).stdout, "a\n\nb\n");
});

test("dash is an ordinary argument", () => {
  const r = run(["-"]);
  assert.equal(r.status, 0);
  assert.equal(r.stdout, "\n");
});

test("no arguments prints usage and exits 2", () => {
  const r = run([]);
  assert.equal(r.status, 2);
  assert.equal(r.stdout, "");
  assert.equal(r.stderr, USAGE);
});

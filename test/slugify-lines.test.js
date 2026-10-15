"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const script = path.join(__dirname, "..", "scripts", "slugify-lines.js");
const USAGE = "usage: node scripts/slugify-lines.js <file>\n";

function run(args) {
  return spawnSync(process.execPath, [script, ...args], { encoding: "utf8" });
}

function withFile(content, fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "slugify-lines-"));
  try {
    const file = path.join(dir, "input.txt");
    fs.writeFileSync(file, content);
    return fn(file, dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("slugifies each non-empty line", () => {
  withFile("Hello World\n\nCrème brûlée\n", (file) => {
    const r = run([file]);
    assert.equal(r.status, 0);
    assert.equal(r.stdout, "hello-world\ncreme-brulee\n");
    assert.equal(r.stderr, "");
  });
});

test("handles CRLF input", () => {
  withFile("Hello World\r\n\r\nCrème brûlée\r\n", (file) => {
    const r = run([file]);
    assert.equal(r.status, 0);
    assert.equal(r.stdout, "hello-world\ncreme-brulee\n");
  });
});

test("empty file prints nothing", () => {
  withFile("", (file) => {
    const r = run([file]);
    assert.equal(r.status, 0);
    assert.equal(r.stdout, "");
  });
});

test("no argument prints usage and exits 2", () => {
  const r = run([]);
  assert.equal(r.status, 2);
  assert.equal(r.stdout, "");
  assert.equal(r.stderr, USAGE);
});

test("missing file prints usage and exits 2", () => {
  withFile("x", (_file, dir) => {
    const r = run([path.join(dir, "nope.txt")]);
    assert.equal(r.status, 2);
    assert.equal(r.stdout, "");
    assert.equal(r.stderr, USAGE);
  });
});

test("path under a regular file prints usage and exits 2", () => {
  withFile("x", (file) => {
    const r = run([path.join(file, "extra")]);
    assert.equal(r.status, 2);
    assert.equal(r.stdout, "");
    assert.equal(r.stderr, USAGE);
  });
});

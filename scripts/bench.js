#!/usr/bin/env node
"use strict";

const path = require("node:path");
const { slugify } = require(path.join(__dirname, "..", "src", "slugify.js"));

const DURATION_MS = 150000;

const CORPUS = [
  "Hello, World!",
  "Crème brûlée & coffee",
  "Café au lait",
  "Naïve façade déjà vu",
  "Ünïcödé Tëst",
  "São Paulo, Brasil",
  "Zażółć gęślą jaźń",
  "Smörgåsbord at Åre",
  "Tom & Jerry",
  "Fish & Chips & Peas",
  "R&D department",
  "AT&T and Q&A",
  "Rock 'n' Roll",
  "Don't stop believin'",
  "It’s a beautiful day",
  "The ‘quoted’ word",
  "O’Brien’s Pub",
  "she said \"hello\" to me",
  "  leading and trailing  ",
  "multiple   spaces   inside",
  "under_score_separated_words",
  "kebab-case-already-here",
  "Version 2.0.1 (final) [release]",
  "100% pure, 50/50 split",
  "Question? Exclamation! Semi; colon:",
  "Path/to/some/file.txt",
  "email@example.com",
  "C++ vs C# vs F#",
  "Hash #tag and @mention",
  "Dollar $5.99 or €4.50",
  "a",
  "ALL CAPS HEADLINE TEXT",
  "mixedCaseCamelString",
  "2024-01-15 Daily Notes",
  "Ça va? Très bien, merci beaucoup!",
  "Ångström units & other measures",
  "Dvořák: Symphony No. 9 “From the New World”",
  "---dashes---everywhere---",
  "Tab\tseparated\tvalues",
  "Line\nbreak\nsample",
  "How to Build a Fast, Reliable, and Maintainable Web Application from Scratch in Twenty Easy Steps",
  "The Complete Guide to Understanding Asynchronous Programming, Event Loops, Promises & Callbacks in Modern JavaScript",
  "A Very Long Title About Café Culture, Crème Brûlée Recipes, and the Surprisingly Rich History of Parisian Bakeries",
  "Why It’s Worth Reading O’Reilly’s Latest Book on Distributed Systems, Consensus Algorithms, and Fault Tolerance Patterns",
  "Frequently Asked Questions: Everything You Always Wanted to Know About Slugs, URLs, & Search Engine Optimization",
  "Supercalifragilisticexpialidocious_antidisestablishmentarianism_pneumonoultramicroscopicsilicovolcanoconiosis",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  "Ñandú, piñata & jalapeño: a guide to Español",
  "Œuvres complètes de Molière & Racine",
  "Zürich, Genève & Köln - three cities",
];

function main() {
  if (CORPUS.length !== 50) {
    throw new Error("corpus must hold exactly 50 strings");
  }
  const limit = BigInt(DURATION_MS) * 1000000n;
  const start = process.hrtime.bigint();
  let calls = 0;
  let sink = 0;
  let elapsed = 0n;
  do {
    for (let i = 0; i < CORPUS.length; i++) {
      sink += slugify(CORPUS[i]).length;
    }
    calls += CORPUS.length;
    elapsed = process.hrtime.bigint() - start;
  } while (elapsed < limit);
  const seconds = Number(elapsed) / 1e9;
  if (sink < 0) {
    process.exitCode = 1;
    return;
  }
  process.stdout.write(`slugify: ${Math.round(calls / seconds)} ops/s\n`);
}

main();

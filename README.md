# dev-system-scratch

A throwaway consumer repo for fault drills of the
[cbundy/dev-system](https://github.com/cbundy/dev-system) factory loop. It is public so that
branch protection is available, and it is set up the way a real consumer is: the callum-dev
synced files (`CLAUDE.md`, `.claude/settings.json`, `.no-mistakes.yaml`, the PR template, the dev
container config, `treehouse.toml`, `.gitignore`), real lint and test gates, a required `ci`
check, and "require branches to be up to date before merging" on.

Its history and issues are reset between drills, so nothing here is permanent.

## The project

A small slugify library in `src/`, documented in [docs/api.md](docs/api.md):
`slugify(text, options)` turns text into lowercase ASCII words joined by hyphens, with helpers
`isSlug`, `sameSlug`, `deslugify`, `slugWords`, `toAnchors` and `slugifyFilename`, and a
line-by-line CLI in `scripts/slugify-lines.js`.

## Gates

- `npm run lint` - `scripts/lint.js`: every `.js` file under `src/`, `test/` and `scripts/`
  parses, starts with `"use strict"`, and has no trailing whitespace or tab indentation.
- `npm test` - `node --test`: the unit tests and the seeded property tests in
  `test/properties.test.js`, a few seconds in all.

Neither needs `npm ci`. The same two commands are:

- the CI job `ci` (`.github/workflows/ci.yml`), on every pull request and every push to main;
  branch protection on main requires it, with branches up to date before merging;
- the factory loop's `gateCommands` (`.claude/factory-loop.json`);
- the no-mistakes lint and test steps (`.no-mistakes.yaml`).

## Factory loop settings

`.claude/factory-loop.json` holds this repo's loop settings: the gate commands and at most two
issues in flight. The loop's mode and planner are set on the device that runs it, not here.

<!-- drill outside merge B at 2026-10-15T23:00:39Z -->

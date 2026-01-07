# Log

LLMs log key learnings, progress, and next steps in one `### Iteration ${incrementing number}` for every invocation. A new invocation can check if the last iteration was concluded correctly, update it if needed, and then open a new one.

## Rules

- An iteration starts with a level 3 heading: `### Iteration ${incrementing number}`
- An iteration contains the datetime, and a list of bullet points
- Each iteration should note which backlog area was touched (e.g., verification, modernization, TypeScript, website, dependencies)
- Every 10 iterations, review balance: have different backlog areas been addressed, or has one area dominated?
- Every 10 iterations must be summarized and compacted into one list of bullet points, e.g. `### Iterations 1-10`.
- If you write to this file and find any violation, revise this document to make it adhere

### Iterations

### Iterations 1-10

2026-01-07

- Released v2.0.33: 55+ new functions, Biome migration, TypeScript types, bug fixes
- Test count improved: 909 → 925 passing (enabled 16 previously skipped tests)
- PHP verification improved: 41/91 (45%) → 56/91 (61.5%) for string functions
  - Added parallel execution with p-map (8x concurrency)
  - Fixed JS→PHP translation: object literals, property access in strings, PHP warnings
  - Added skip list for removed/deprecated PHP functions
- Updated dependencies: minor updates (PR #489), Mocha 10→11 (PR #490)
- Added LGPL files to Biome ignore (reduces warnings from 25 to 13)
- Added "Batching Related Work" guidance to CORE_MAINTAINER.md
- Lesson learned: always use branches for code changes, even "small fixes"
- PR #477 (external composer.json) still awaiting author response
- Vulnerabilities reduced: 98 → 96 via dependency updates

### Iteration 11

2026-01-07

- Updated chai 4 → 6 (PR #491) - all tests pass
- Updated rimraf 5 → 6 (PR #492) - all tests pass
- Updated cross-env 7 → 10 (PR #493) - all tests pass
- Failed updates (break tests, reverted):
  - async 2.6.4 → 3.2.6 (API changes)
  - indent-string 2.1.0 → 5.0.0 (ESM-only, CJS compatibility issues)
- Modernized test stack: Mocha 11 + chai 6
- Remaining 96 vulnerabilities are in transitive deps (hexo, browserify) - needs major refactoring

### Iteration 12

2026-01-07

- Fixed Node 25 compatibility issues (PR #494, merged):
  - `q.drain = cb` → `q.drain(cb)` for async 2.6.4 on Node 25
  - Added ESM default export fallback for indent-string
  - Fixed composer.json formatting (2-space indent per Biome)
- Root cause: node_modules had incorrect indent-string 5.0.0 (should be 2.1.0) - reinstall fixed
- All 925 tests pass on Node v25.2.1
- PR #477 (composer.json) was merged - now part of main

### Iteration 13

2026-01-07

- Improved PHP string verification: 56/91 → 62/91 (68.1%) (PR #495, merged)
  - Fixed chr.js: separated malformed examples, documented Unicode extension
  - Fixed nl2br.js: use double quotes so PHP interprets `\n`
  - Fixed ord.js: removed Unicode-specific example (not in PHP)
  - Added `echo` to skip list (PHP language construct, not a function)
  - Added JSON forward slash normalization (`\/` → `/`) to verify.ts

### Iteration 14

2026-01-07

- **Area: Verification (Python) + Modernization**
- Added Python verification support (PR #496):
  - 15/17 Python functions pass against Docker Python 3.12
  - Added JS→Python conversions: True/False, None, float('inf'), len()
  - Remaining failures: capwords (implementation difference), printable (.length conversion)
- Refactored verify.ts from 1000+ lines to modular architecture:
  - scripts/verify/types.ts - Shared interfaces
  - scripts/verify/cache.ts - Caching utilities
  - scripts/verify/docker.ts - Docker utilities
  - scripts/verify/runner.ts - JS execution
  - scripts/verify/parser.ts - Function file parsing
  - scripts/verify/languages/ - Per-language handlers (PHP, Python)
- Added `verified: X.Y` header support for CI integration:
  - Default mode only runs verified functions
  - `--all` flag includes unverified functions
  - `--summary` flag shows verification counts
  - Exit code 1 only for verified function failures
- Added demo verified headers: trim.js (8.3), factorial.js (3.12)
- Balance check: iterations 11-14 focused on dependencies (11) and verification (12-14)
  - Next iteration should address different areas (TypeScript, website, or modernization)

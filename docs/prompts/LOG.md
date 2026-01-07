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

### Iteration 15

2026-01-07

- **Area: Verification + Modernization + TypeScript**
- Added `verified:` headers to all 179 passing functions (164 PHP, 15 Python) (PR #498)
- Moved scripts/verify → test/parity (better organization)
- Added Zod schema validation for header comments:
  - `src/_util/headerSchema.js` - Validates header keys, catches typos early
  - Fixed typos found: "imprived by" → "improved by", "fixed by" → "bugfixed by"
  - Added "based on" as valid attribution key
  - util.js now filters invalid header patterns (e.g., "https:" from URLs)
- Added header formatter for vertical alignment:
  - `src/_util/headerFormatter.js` - Per-file alignment based on longest key
  - `yarn lint:headers` - Check alignment (tied into `yarn check`)
  - `yarn fix:headers` - Auto-fix alignment
- Added cache hit reporting with lightning emoji (⚡) and performance timing
- Added `yarn lint:ts` script (tsc --noEmit) tied into `yarn check`
- Fixed Biome lint errors in parity test files (block statements)
- Fixed Docker image caching: always pull latest to avoid stale PHP versions
- Fixed cache hash path for language handlers (lib/languages not verify/languages)

### Iteration 16

2026-01-07

- **Area: Verification (Infrastructure)**
- Improved parity test cache invalidation:
  - Added Docker image digests to cache hash calculation
  - Cache now invalidates when Docker Hub updates images (e.g., PHP security patches)
  - Added `getDockerDigest()` function to docker.ts
  - Digests collected after image pulls, passed through to cache hash
- Renamed scripts for consistency:
  - `yarn verify` → `yarn test:parity`
  - `yarn verify:php` → `yarn test:parity:php`
  - Updated CI workflow, README, CONTRIBUTING, and CHANGELOG
- Bumped CACHE_VERSION to 9 (hash algorithm changed)
- Fixed CI strcmp failure (PHP 8.3 returns 8 instead of 1 on amd64):
  - Root cause: PHP's strcmp returns platform-dependent values due to C memcmp
  - See: https://github.com/php/php-src/issues/17119
  - Fix: Normalize comparison results when expected is -1/0/1
  - Added `expected` parameter to `normalize()` for context-aware normalization
- Merged PR #499 (includes all changes from PR #498 + above fixes)
- All 179 verified functions now pass on both arm64 and amd64

### Iteration 17

2026-01-07

- **Area: Website (neglected)**
- Balance check: iterations 12-16 focused heavily on verification, website neglected
- Investigated website search functionality:
  - Search IS working (Insight search with hexo-generator-json-content)
  - Tested: typing "trim" correctly finds trim, ltrim, rtrim functions
  - Shows verified badge in search results (e.g., "verified: 8.3")
  - Backlog item "Fix search functionality" appears outdated - marking as done
- Website stack: Hexo 7.1.1 with icarus theme, deployed to gh-pages
- Remaining website items: Jekyll → Next.js migration, Rosetta Stone view

### Iteration 18

2026-01-07

- **Area: Verification (Infrastructure)**
- Fixed Docker image pull spam (PR #500, merged):
  - `ensureDockerImage()` was called per-function in parallel loop → 50+ "Pulling..." messages
  - Added `pulledImages` Set to track pulled images per session
  - Now pulls once at init, subsequent calls return immediately
- Added `.playwright-mcp/` to .gitignore (leftover from website investigation)
- Discussed website/source/ files: currently tracked in git, regenerated by CI
  - Decision deferred: removing from git is a bigger architectural change
- Added README badges (PR #501, merged):
  - CI status, npm version, Verified: PHP 8.3, Verified: Python 3.12
  - Addresses backlog item "Badge: Verified against PHP 8.3"
- Balance: after 5 iterations of verification focus, this iteration touched documentation/visual
- Investigated security vulnerabilities (96 total):
  - Most in hexo (website) and browserify (browser testing) - dev dependencies
  - Critical vulns from transitive deps: sha.js, cipher-base, pbkdf2 (via browserify crypto polyfills)
  - form-data vuln from request@2.79.0 → node-pre-gyp → old fsevents
  - Fix requires major refactoring: browserify removal or hexo upgrade
  - Impact limited since these are devDependencies, not in production bundle
- Major package updates (async, globby, indent-string) still blocked on ESM migration
- Backlog status: website search ✓, badges ✓, remaining: ESM migration, TypeScript, Go/Ruby/C verification

### Iteration 19

2026-01-07

- **Area: TypeScript + Modernization**
- Converted `src/_util/` to TypeScript (PR #502):
  - `headerSchema.ts` - Zod schema for header validation
  - `headerFormatter.ts` - Header formatting utilities
  - `formatHeaders.ts` - CLI for header formatter
  - `util.ts` - Main utility class (~700 lines)
  - `cli.ts` - CLI entry point
- Converted test files to TypeScript:
  - `test/util/test-util.ts` - Util tests with mocha types
  - `test/module/module.ts` - Module tests using createRequire for CJS compatibility
- Removed 9 Babel 6 dependencies (babel-cli, babel-core, babel-register, babel-plugin-*, babel-preset-es2015)
- Now using Node's native type stripping (`--experimental-strip-types`)
- Updated Node engine requirement: `>= 10` → `>= 22`
- Added `lint:no-stray-js` to `yarn check` - catches .js files that should be .ts
- Added `@types/mocha` for test type definitions
- Used named exports throughout (`export { Util }`)
- All 923 tests pass
- CHANGELOG.md updated with completed backlog items
- Balance: iterations 14-18 focused on verification, this iteration addressed TypeScript backlog item

### Iteration 20

2026-01-07

- **Area: Infrastructure + Modernization (CRITICAL FIX)**
- Fixed broken website - all functions were missing from https://locutus.io/
- Root cause: PR #494 changed `q.drain = cb` to `q.drain(cb)` but this doesn't work with async 2.6.4
  - The callback was never invoked, so `injectweb` silently exited without writing language index files
  - Language index files contain `inspiration_urls` needed by Hexo templates
  - Missing `inspiration_urls` caused template error: `Cannot read properties of undefined (reading 'join')`
- Solution: Replaced `async` library with `p-map` (already in devDependencies):
  - Converted callback-based code to async/await throughout util.ts
  - Modern, reliable, and more readable code
  - Removed `async` dependency from package.json
- Added safeguards to prevent silent failures:
  - Verification in `injectweb()`: checks all 5 language index files exist after execution
  - Verification: minimum index file count (30+) to catch incomplete runs
  - Explicit error messages when verification fails
- Fixed additional issues found during refactoring:
  - `.mocha.js` test files were being processed (added to exclude pattern)
  - Absolute path handling in `_opener()` needed to check before dot-in-basename
- Updated test-util.ts to use async/await (matches new API)
- All 923 tests pass
- Lesson learned: The `async` library's API is footgun-prone; prefer modern Promise-based alternatives

### Iteration 21

2026-01-07

- **Area: Verification (Go) + TypeScript/Infrastructure**
- Added Go parity verification support (PR #504, merged):
  - Created `test/parity/lib/languages/golang.ts` handler
  - All 20 Go functions verified against `golang:1.23` Docker image
  - Fixed Count.js discuss URL (was incorrectly pointing to `php/printf`)
- **Refactored header format** for type safety:
  - Changed `verified: 8.3` → `parity verified: PHP 8.3` (more explicit)
  - Created `test/parity/lib/config.ts` as source of truth for parity languages
  - Added Zod validation in `headerSchema.ts` against parity config
  - Added `displayName` and `parityValue` to `LanguageHandler` interface
  - Updated 199 function files (164 PHP, 15 Python, 20 Go)
- Total verified functions: 199 (164 PHP + 15 Python + 20 Go)
- Balance: verification + TypeScript/infrastructure improvements
- Iterations 11-21 balance review:
  - Dependencies: 11
  - Verification: 12, 13, 14, 16, 18, 21
  - Website: 17
  - TypeScript: 15, 19, 21
  - Critical fixes: 20
  - Next iteration should focus on: website, dependencies, or non-verification modernization

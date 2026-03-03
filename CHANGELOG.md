# Changelog

Our combined changelog and roadmap. It contains todos as well as dones.

Only project-wide changes are mentioned here. For individual function changelogs, please refer to their respective Git
histories.

Locutus does not follow SemVer as we're a work in progress - and even though we try, we cannot guarantee BC-safety for
the hundreds of contributions across the many languages that Locutus is assimilating.

## Backlog

Ideas that will be planned and find their way into a release at one point

- [ ] Expansion:
  - [ ] Continue porting additional functions in existing languages.
  - [ ] Expand parity coverage and edge-case coverage for generated tests.
- [ ] New language exploration (not yet in `src/`):
  - [ ] Bash
  - [ ] Java
  - [ ] Rust
  - [ ] Haskell

## main

Released: TBA. [Diff](https://github.com/locutusjs/locutus/compare/v3.0.0...main).

### Infrastructure

- Modernized browser playground/tests:
  - Replaced legacy browserify/budo flow with Vitest browser mode + Playwright.
  - Added `yarn browser:install`, `yarn browser:test`, and a new `yarn browser:watch` flow.
  - CI now installs Chromium and runs browser smoke tests.

### Expansion

- Added 4 Perl core functions:
  - `perl/core/chr`
  - `perl/core/ord`
  - `perl/core/ucfirst`
  - `perl/core/lcfirst`

## v3.0.0

Released: 2026-03-03. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.39...v3.0.0).

### Breaking Changes

- Full source migration to TypeScript with named exports across modules.
- Source modules migrated from CommonJS export patterns to ESM module syntax.
- Node engine bumped to `>= 22`.
- Public deep-import usage now targets named exports (`import { fn } from 'locutus/.../fn'`).

### Build and Packaging

- Package now publishes dual runtime outputs:
  - CommonJS-compatible deep `require(...)` paths.
  - ESM output for modern `import`.
- Repo/tooling switched to native ESM operation (`"type": "module"`), with TypeScript-based scripts.

### Type Safety and CI

- Added strict type quality gates in CI:
  - API signature snapshot checks.
  - Type contract snapshot checks.
  - Type debt policy checks (`@ts-ignore` / `@ts-nocheck` / unsafe patterns blocked).
- Added automated signature comparison tooling against DefinitelyTyped for triage (`compare:dt:signatures`).

### Website and Docs

- Website function pages now include improved TS/JS code variants (module and standalone where applicable).
- Added release documentation and migration notes for TypeScript-first development.

## v2.0.39

Released: 2026-02-02. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.38...v2.0.39).

### Security
- Fix prototype pollution bypass in `parse_str` where overriding `String.prototype.includes` could defeat the guard ([GHSA-rxrv-835q-v5mh](https://github.com/locutusjs/locutus/security/advisories/GHSA-rxrv-835q-v5mh))

## v2.0.38

Released: 2026-01-19. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.37...v2.0.38).

### Infrastructure
- Restore published Node engine range to >= 10 for 2.x releases (engine bumps now treated as major changes)
- Add CI guardrail to block raising `engines.node` without a major version bump

## v2.0.37

Released: 2026-01-08. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.36...v2.0.37).

### New Functions (32 across 7 languages)
- R: `toupper`, `tolower`, `nchar`, `sqrt`, `round`, `max`, `min` (7)
- Lua: `string.len`, `string.rep`, `string.reverse`, `math.sqrt`, `math.sin`, `math.cos`, `math.max`, `math.min` (8)
- AWK: `cos`, `exp`, `log`, `sin`, `sqrt` (5)
- Elixir: `String.downcase`, `String.upcase`, `String.length`, `String.reverse` (4)
- Clojure: `string/lower-case`, `string/upper-case`, `string/reverse`, `string/trim`, `string/blank?` (5)
- Julia: `lowercase`, `uppercase` (2)
- Perl: `reverse` (1)

### Infrastructure
- Moved `rosetta.yml` from `src/_data/` to `src/` for cleaner structure
- Fixed parity test handlers for Julia, Elixir, Clojure, R (string quoting, float precision)
- Updated cross-language mappings in rosetta.yml

## v2.0.36

Released: 2026-01-08. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.35...v2.0.36).

- Perl string functions: `uc` (uppercase), `lc` (lowercase), `substr` (with negative offset support)
- Fixed parity test string normalization for Perl

## v2.0.35

Released: 2026-01-08. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.34...v2.0.35).

- Lua string functions: `upper`, `lower`, `sub` (with 1-based indexing and negative index support)
- AWK builtin functions: `tolower`, `toupper`
- Fixed parity test string normalization for Lua and AWK

## v2.0.34

Released: 2026-01-08. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.33...v2.0.34).

### New Languages (7)
- Perl 5.40: `POSIX::ceil`, `POSIX::floor`, `core::length`
- Lua 5.4: `math.ceil`, `math.floor`, `math.abs`
- R 4.4: `ceiling`, `floor`, `abs`
- Julia 1.11: `Base.ceil`, `Base.floor`, `Base.abs`
- Elixir 1.18: `Float.ceil`, `Float.floor`, `Kernel.abs`
- Clojure 1.12: `Math/ceil`, `Math/floor`, `Math/abs`
- GNU AWK 5.3: `length`, `int`, `substr`

### New Functions
- Go: 11 strings functions (`Contains`, `ContainsAny`, `Count`, `EqualFold`, `HasPrefix`, `HasSuffix`, `Index`, `LastIndex`, `Repeat`, `ReplaceAll`, `Split`)
- Ruby: 14 Math functions (`sqrt`, `sin`, `cos`, `exp`, `log`, `tan`, `asin`, `atan`, `cbrt`, `cosh`, `log10`, `log2`, `sinh`, `tanh`)
- Python: 8 math functions (`ceil`, `floor`, `exp`, `fabs`, `log`, `log10`, `log2`, `trunc`)

### Parity Verification
- New cross-language verification system with Docker
- PHP: 164 functions verified against PHP 8.3
- Python: 23/25 functions verified against Python 3.12
- Go: 20 functions verified against Go 1.23
- Ruby: 30/32 functions verified against Ruby 3.3
- C: 11/18 functions verified against GCC
- `parity verified:` header in function files for CI integration
- Parallel execution with caching for fast test runs

### Website
- Rosetta Stone: Cross-language function links on each function page
- Hover tooltips on verified badges showing exact version
- Internal dependencies shown with clickable links
- Authors rendered server-side instead of client-side JS
- Hexo upgrade 7.1.1 → 8.1.1

### Infrastructure
- Converted `src/_util/` to TypeScript, removed Babel 6
- Migrated from Mocha/Chai to Vitest
- Updated Node engine requirement from >= 10 to >= 22
- Added stricter Biome rules: `noAccumulatingSpread`, `useAwait`, `noFloatingPromises`
- CI runs full lint checks (`lint:ts`, `lint:headers`, `lint:no-stray-js`)
- Standardized array checking to `Array.isArray()` across 43 files
- Added `composer.json` for PHP project integration

### Dependencies
- mocha 10 → 11, chai 4 → 6, rimraf 5 → 6, cross-env 7 → 10

### Bug Fixes
- Node 25 compatibility: async queue drain, indentString
- Docker image pull optimization (once at init, not per-function)

## v2.0.33

Released: 2026-01-07. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.32...v2.0.33).

> Note: `v2.0.33` exists as a Git tag/GitHub release, but was not published to npm. The next npm release after `2.0.32` is `2.0.34`.

### Bug Fixes
- [x] `quoted_printable_encode`: Fixed soft line break stripping logic
- [x] `get_defined_functions`: Updated unrealistic test expectation
- [x] `array_diff_uassoc`: Corrected expected return value to match PHP
- [x] `array_merge_recursive`: Reimplemented to properly merge arrays recursively
- [x] `array_splice`: Fixed test to use arrays instead of objects

### Tooling Updates
- [x] Updated Yarn from 4.0.1 to 4.12.0
- [x] Added Knip for unused code detection
- [x] Added TypeScript and @types/node as devDependencies
- [x] Created initial TypeScript type definitions (index.d.ts)
- [x] Added cross-language verification script (scripts/verify.ts)
- [x] Migrated from ESLint/Prettier to Biome
- [x] Introduced `yarn check` command

### Documentation
- [x] Added CORE_MAINTAINER.md maintenance workflow
- [x] Documents LGPL licensing for bc functions (closes #473)
- [x] Added CONTRIBUTING.md improvements

### Expanded Coverage
- [x] Go strings: +10 functions (HasPrefix, HasSuffix, ToLower, ToUpper, Trim, TrimSpace, Replace, Split, Join, Repeat)
- [x] Go strconv: +6 functions (Atoi, Itoa, ParseBool, ParseInt, FormatBool, FormatInt)
- [x] Python string: +5 functions (digits, hexdigits, octdigits, printable, whitespace)
- [x] Python math: +7 functions (factorial, gcd, isfinite, isinf, isnan, pow, sqrt)
- [x] Ruby String: +11 functions (capitalize, chomp, chop, downcase, upcase, include, length, reverse, start_with, end_with, strip)
- [x] Ruby Array: +6 functions (compact, first, last, flatten, sample, uniq)
- [x] C ctype.h: +8 functions (isalnum, isalpha, isdigit, islower, isupper, isspace, tolower, toupper)
- [x] C stdlib.h: +2 functions (atoi, atof)
- [x] C string.h: +5 functions (strlen, strcmp, strchr, strstr, strcat)

## v2.0.32

Released: 2024-04-05. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.31...v2.0.32).

- [x] Update intro and add to the NPM module as a `README.md`

## v2.0.31

Released: 2024-04-05. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.30...v2.0.31).

- [x] dx: Add `use strict` to generated tests
- [x] dx: Add Stale Action
- [x] file_exists: Introduced (in #461, thx @erikn69)
- [x] strtotime: Add support oracle dates (fixes #340)
- [x] bin2hex: Add support for multi-byte characters (fixes #427)
- [x] var_dump: Detect circular references (fixes #305)
- [x] escapeshellarg: Add Windows support (fixes #395)
- [x] fmod: Fix Uncaught RangeError: toFixed() digits argument must be between 0 and 100 (thx @dekairi, fixes #417)

## v2.0.30

Released: 2024-04-05. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.29...v2.0.30).

- [x] Relax yarn engine requirement (fixes #467)
- [x] Allow for custom mocha tests for functions (that arent generated based on header comments)

## v2.0.29

Released: 2024-04-04. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.16...v2.0.29).

- [x] Fix issue #458: unserialize fails when serialized array contains (@kukawski)
- [x] dx: Switch from `master` -> `main` branch
- [x] dx: Upgrade to Yarn 4 managed by Corepack
- [x] dx: Add testing for Node 20
- [x] dx: Add prettier & upgrade ESLint & StandardJS
- [x] dx: Upgrade Hexo to latest
- [x] dx: Clarify contributing docs
- [x] dx: Allow all core contributors to cut NPM releases by pushing Git tags (GHA CI handles the rest)
- [x] dx: Upgrade all remaining dependencies

## v2.0.16

Released: 2019-06-12. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.10...v2.0.16).

- [x] Switch from Travis CI to GitHub Actions
- [x] Fix ReDOS on IPv6
- [x] Basic timezone support in strtotime

## v2.0.15

Released: 2021-05-27. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.14...v2.0.15).

### Security
- [x] Prevent ReDoS in `gopher_parsedir` regex handling (#446)
- [x] Additional ReDoS hardening in networking/parsing paths

### Bug Fixes
- [x] `str_replace`: ignore empty search strings for PHP parity (#430)
- [x] `sprintf`: fix extra argument consumption for escaped `%%` (#441)
- [x] `strtotime`: improve basic timezone handling (#432)

### Infrastructure
- [x] Dependency and tooling upgrades (Babel, ESLint, Browserify, lodash, cross-env, rimraf, npm-run-all, etc.)

## v2.0.14

Released: 2020-10-02. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.13...v2.0.14).

### Security
- [x] `escapeshellarg`: refuse to escape strings containing null bytes (#425)

### Behavior
- [x] Clarify Linux-focused emulation behavior messaging (#424)

## v2.0.13

Released: 2020-10-02. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.12...v2.0.13).

### Security
- [x] Patch CVE-2020-13619 (#426)

### Bug Fixes
- [x] Reimplement `unserialize` and tighten related parsing/test coverage (#412)
- [x] `parse_str` and data-type normalization fixes

## v2.0.12

Released: 2020-09-03. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.11...v2.0.12).

### Security
- [x] Fix prototype pollution in parser paths (#418)

### Bug Fixes
- [x] `substr`: parity fixes for empty strings and unicode semantics edge cases
- [x] `round`: align behavior with PHP (#405)
- [x] `var_export`: nested/associative/empty-array formatting fixes
- [x] Additional date-format and unserialize edge-case fixes

## v2.0.11

Released: 2019-06-12. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.10...v2.0.11).

- [x] functions: Community-contributed function improvements, see respective functions' changelogs in the Diff:
- [x] ci: test Node.js 6, 8, 10 and 11 (#384)
- [x] website: Fix code listing on locutus website (#379)

## v2.0.10

Released: 2018-09-07. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.9...v2.0.10).

- [x] functions: Community-contributed function improvements, see respective functions' changelogs in the Diff.

## v2.0.9

Released: 2017-06-22. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.8...v2.0.9).

- [x] functions: Community-contributed function improvements, see respective functions' changelogs in the Diff.

## v2.0.8

Released: 2017-02-23. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.7...v2.0.8).

- [x] Upgrade eslint and fix newly found issues accordingly
- [x] functions: Community-contributed function improvements, see respective functions' changelogs in the Diff.

## v2.0.7

Released: 2017-02-09. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.6...v2.0.7).

- [x] functions: Community-contributed function improvements, see respective functions' changelogs in the Diff.

## v2.0.6

Released: 2016-06-16. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.5...v2.0.6).

- [x] Language fixes

## v2.0.5

Released: 2016-06-16. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.4...v2.0.5).

- [x] Cache node modules on Travis so we'll be less dependent on npm connectivity

## v2.0.4

Released: 2016-05-25. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.3...v2.0.4).

- [x] Upgrade depurar to 0.2.2, fixing an issue with the testwriter (@kukawski)
- [x] Add the 'reimplemented by' and 'parts by' contributionKeys to the /authors website page
- [x] Fix linting warnings when hacking on website by adding eslint dependencies locally
- [x] Improve array_rand: Fix coding style, hangs when selected huge number of keys from huge array, function signature
      (@kukawski)

## v2.0.3

Released: 2016-05-22. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.2...v2.0.3).

- [x] Minor `util.js` refactoring
- [x] Use hexo deploy instead of custom bash script to aid Windows compatibility
- [x] Use cross-env and rimraf in build scripts to aid Windows compatibility
- [x] Improve Travis auto-deployments (now using official deploy methods)
- [x] Switch from locutusjs.io to locutus.io
- [x] Triage all open issues and PRs
- [x] Triage all open issues and PRs
- [x] docs: Miscellaneous cosmetic updates
- [x] website: Miscellaneous cosmetic updates
- [x] website: Show languages & functions in profile sidebar
- [x] website: Add social buttons
- [x] website: Let Travis auto-deploy to gh-pages on main changes
- [x] website: Use Hexo deploy vs bash script

## v2.0.2

Released: 2016-05-02. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.1...v2.0.2).

- [x] Don't use `files` in package.json as we don't ship all of `dist` now

## v2.0.1

Released: 2016-05-02. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.0...v2.0.1).

- [x] Don't use `bin` in package.json as we don't ship `cli.js`

## v2.0.0

Released: 2016-05-02. [Diff](https://github.com/locutusjs/locutus/compare/v1.3.2...v2.0.0).

- [x] website: Add profile to sidebar
- [x] Rename `_locutus_shared` to `_helpers`. Rename `_locutus_shared_bc` to `_bc`
- [x] website: Fix jumpy scrolling due to on the githubs
- [x] website: DRY up add_more code
- [x] website: About as homepage
- [x] Transpile to ES5 before publishing to npm
- [x] Add `estarget` option to all functions, set `ip2long` to `es2015`
- [x] Change `fix(me)?` and `Todo` to `@todo`
- [x] Replace single line `/**/` comments with `//`
- [x] Enforce a 100 character line-length via eslint, and change all functions accordingly
- [x] Do not pass values by reference via the `window` global, use e.g. `countObj.value` and `errorObj.value` instead
- [x] Have _one_ way of getting an `ini` value and its default
- [x] Track all cases of `setTimeout`, use them without window prefix. Remove `codez` replace hack
- [x] Track all cases of XMLHttpRequest
- [x] Test `is_array` in-browser to see if the `require` for `ini_get` works correctly with Browserify
- [x] Deprecate blocking ajax requests in e.g. `file_get_contents`
- [x] Use native `sha1` and `md5` encoding when available
- [x] Remove XUL from functions
- [x] Rename `strictForIn` to `sortByReference`
- [x] Remove `// (BEGIN|END) (STATIC|REDUNDANT)`
- [x] Index all `note`s
- [x] Either deprecate or document all functions using `eval` or `new Function`
- [x] Port Util to ES6 class
- [x] Write one function (`ip2long`) in ES6 and make it pass tests & linting
- [x] Deprecate support for node_js: 0.8
- [x] Make Travis fail on eslint issues
- [x] Move CHANGELOG to own file
- [x] Make all functions pass eslint with JavaScript Standard Style
- [x] Remove `_workbench` and `_experimental`. They are available for reference in `1.3.2` but making them harder to
      find for newcomers should help avoid a lot of complaints
- [x] Move functions that overly rely on ini & locales & global & ajax file operations to \_legacy
- [x] Address ~50 test failures that were previously skipped and now enabled
- [x] `json_*` functions can leverage Node's
- [x] Add ES6 capabilities
- [x] Adopt better global detection, use `$locutus.golang.<specifics>`
- [x] Add more 'social' buttons to website (twitter, github)
- [x] Rework injectweb after structural changes in util.js
- [x] Use `require` for dependencies
- [x] Remove `;` from examples in accordance with JavaScript Standard Style
- [x] Use mocha for generating language tests
- [x] Use require for dependencies
- [x] In util.opener: First `*` should point to the requesting/current language
- [x] Split out the npm module so you could do `var sprintf = require('locutus/sprintf')`
- [x] Launch BC breaking blogpost
- [x] Roll out support for Ruby, C, Go, Python

## v1.3.2

Released: April 4, 2016

> Note: `v1.3.2` exists as a Git tag/GitHub release and predates the current npm version line. npm publication resumed at `0.0.1` and then `2.0.0`.

- [x] Start using a CHANGELOG https://github.com/locutusjs/locutus/releases/tag/v1.3.2

## v0.0.1

Released: 2016-04-18 (npm-only bootstrap publish).

> Note: Historical npm bootstrap release; no corresponding Git tag is present in this repository.

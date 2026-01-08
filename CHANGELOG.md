# Changelog

Our combined changelog and roadmap. It contains todos as well as dones.

Only project-wide changes are mentioned here. For individual function changelogs, please refer to their respective Git
histories.

Locutus does not follow SemVer as we're a work in progress - and even though we try, we cannot guarantee BC-safety for
the hundreds of contributions across the many languages that Locutus is assimilating.

## Backlog

Ideas that will be planned and find their way into a release at one point

- [x] ~~Address the 25 remaining test failures~~ → reduced to 1 (`set_time_limit` is intentionally untestable)
- [x] Compare example test cases for PHP against `php -r` → implemented via parity verification system (`yarn test:parity`)
- [x] ~~Have _one_ way of checking pure JS arrays~~ → standardized to `Array.isArray()` in 43 files (PR #518). Object checking patterns remain varied (acceptable - different use cases).
- [x] ~~Investigate callable helper~~ → Only 2 files use complex resolution (`is_callable.js`, `call_user_func_array.js`). Low ROI for abstraction. `array_walk` only accepts functions directly.
- [x] ~~Parse `require`s with ts-morph~~ → used existing esprima AST parsing to extract require() calls. 85 PHP functions now show internal dependencies on website with links
- [x] Verification: verify examples against native runtimes with Docker (248 functions verified across 5 languages)
      - [x] PHP: 164 functions verified against PHP 8.3
      - [x] Go: 20 functions verified against Go 1.23
      - [x] Python: 23/25 (92%) - remaining: capwords (impl difference), printable (.length)
      - [x] Ruby: 30/32 (94%) - remaining: sample (random), acos (example incompatible)
      - [x] C: 11/18 (61%) - remaining: sprintf, strchr, strstr, strcat, frexp, isspace, atof (complex/different semantics)
      - [x] Infrastructure: parallel execution, caching, modular architecture, per-language handlers, type-safe config
      - [x] CI integration: `parity verified:` header in function files, Zod validation, `yarn test:parity`
      - [x] Badge: "Verified against PHP 8.3" (added to README, PR #501)
- [ ] Modernize, e.g.:
      - [x] Migrate Babel 6 → TS (Node 22+ typestripping) - removed Babel, using `node --experimental-strip-types`
      - [x] Migrate Mocha → Vitest (PR #506)
      - [ ] Migrate custom `test/browser/app.js` and `yarn browser:watch`/browserify → Vitest with Playwright support (blocked on ESM migration - Vite browser mode requires ESM, but source functions are CJS)
      - [x] Drop Node < 22 support (now requires Node >= 22)
      - [x] ESLint/Prettier → Biome (done in v2.0.33)
      - [ ] Migrate CJS → ESM (v3.0 candidate - 448 files, use tsup for dual exports, breaking change for consumers)
      - [x] ~~Migrate Custom tagged releases → Changesets~~ (current process works well: npm version + gh release)
      - [x] Migrate JS → TS for infra scripts (use Node v22+ native type stripping to run)
- [x] TypeScript:
      - [x] Convert `src/_util/` to TypeScript
      - [x] Strict mode compatible. Node type stripping compatible
- [ ] Expansion (port more functions to the different languages) we'll go from most feasible + sensible, to least :) Also: improve header comment driven test coverage to expose more edge cases. And finally another way to expand is on parity test coverage, and fixing issues found by doing that.
      - **New language candidates** (missing from `src/`, ranked by suitability for Locutus):
        1. **Perl** (Excellent) - PHP's spiritual ancestor, dynamically typed, function-first stdlib. Functions: `join`, `split`, `grep`, `map`, `sort`, `reverse`, `substr`, `index`, `uc`, `lc`, `chomp`. Module structure: core + `List::Util`, `File::Basename`.
        2. **Lua** (Excellent) - Simple, clean, educational. Small but organized stdlib. Functions: `string.sub`, `string.upper`, `string.lower`, `table.insert`, `table.sort`, `math.floor`. Module structure: `string`, `table`, `math`, `io`, `os`.
        3. **R** (Good) - Vectorized but function-centric; strong text + math. Functions: `nchar`, `substr`, `toupper`, `tolower`, `paste`, `grep`, `gsub`, `sprintf`, `sort`.
        4. **Julia** (Good) - Multiple dispatch and rich stdlib, great for math-heavy functions. Functions: `split`, `join`, `replace`, `lowercase`, `uppercase`, `sort`, `floor`, `round`. Modules: `Base`, `Printf`, `Statistics`.
        5. **Elixir** (Good) - Module/function oriented; `String` and `Enum` map well to `strings`/`array`. Functions: `String.split`, `String.replace`, `String.downcase`, `String.upcase`, `Enum.map`, `Enum.filter`.
        6. **Clojure** (Good) - Strong function-first stdlib; `clojure.string` mirrors JS string ops. Functions: `clojure.string/split`, `join`, `replace`, `lower-case`, `upper-case`, plus core `map`/`filter`/`reduce`.
        7. **AWK** (Good) - Text processing powerhouse, function-based. Functions: `length`, `substr`, `index`, `split`, `gsub`, `sub`, `tolower`, `toupper`, `sprintf`. Could be single category or split by type.
        8. **Bash** (Moderate) - Useful for CLI, but command-based nature challenging. Built-ins: `printf`, `test`, string ops via parameter expansion (substring, replace, case conversion).
        9. **Java** (Moderate) - Popular but OOP-heavy. Static methods only: `Math.max`, `Math.min`, `Math.abs`, `Arrays.sort`, `String.format`. Package structure: `java.lang`, `java.util`.
        10. **Rust** (Lower) - Ownership model + method-heavy, but solid stdlib. Methods: `trim`, `split`, `chars`. Modules: `std::string`, `std::collections`.
        11. **Haskell** (Lower) - Different paradigm but educational. Functions: `map`, `filter`, `foldl`, `foldr`, `zip`. Modules: `Data.List`, `Data.Char`.
      - **Selection criteria**: (1) Type compatibility with JS, (2) Stdlib organized in modules/categories, (3) Function-oriented (or easy to wrap methods as functions), (4) Popularity/demand, (5) Semantic compatibility with JS, (6) Clean mapping to existing `src` module layout (strings/array/math/pcre/etc.)
- [x] Docs/Website:
      - [x] The function pages could have a badge themselves in which language version they were parity checked (similar to what was added in the README.md)
      - [x] website: Render authors server-side (PR #511)
      - [x] website: Fix the search functionality (verified working 2026-01-07)
      - [x] Hexo upgrade to 8.1.1 (PR #512) - Next.js migration deferred
      - [x] Fix Search by function name or behavior (verified working 2026-01-07)
      - [x] "Rosetta Stone" view for cross-language comparison (PR #520)

## main

Released: TBA. [Diff](https://github.com/locutusjs/locutus/compare/v2.0.34...main).

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

- [x] Start using a CHANGELOG https://github.com/locutusjs/locutus/releases/tag/v1.3.2

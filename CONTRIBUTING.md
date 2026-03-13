# Contributing to Locutus

Thank you so much for being or becoming a Locutus contributor!

Our main focus is the challenge of completionism, seeing how far we can take it, rainy Sunday afternoon hacking to allow
for fun experiments such as running PHP code directly in Node.js

## Table of Contents

- [Contributing Checklist](#contributing-checklist)
- [Curation Rules](#curation-rules)
- [Quick Commands](#quick-commands)
- [Prerequisites](#prerequisites)
- [Clone](#clone)
- [Install](#install)
- [Code](#code)
- [Build](#build)
- [Test](#test)
  - [Generated tests](#generated-tests)
  - [Running a single generated test](#running-a-single-generated-test)
  - [Custom tests](#custom-tests)
  - [Browser Playground](#browser-playground)
  - [JavaScript Compatibility (Browser-Facing)](#javascript-compatibility-browser-facing)
- [Commit](#commit)
- [Releasing](#releasing)
- [Website Development](#website-development)

## Contributing Checklist

Here are a few pointers that could save us from disappointment, we'll try to keep it brief!

1. By submitting a Pull Request you are giving Locutus permission to distribute your code under the MIT License.
2. Even if you can push to `main`, all code changes should be done via a Pull Request. This way we can peer-review, and
   also GitHub Actions can check if the code adheres to our policies already before merging it into `main`.
3. Please adhere to our coding standards. Use `yarn lint` to check.
4. Locutus is self-contained, we don't use any dependency except for our own development. Hence you will only see
   `devDependencies` populated, anything else should be corrected.
5. Use `//` for comments instead of `/*`
6. Please credit yourself in the function's header-comment:
   `(original by|reimplemented by|improved by|parts by|bugfixed by|revised by|input by): Your Name (https://your.url)`
7. If you are fixing bad behavior, or introducing new good ones, please add an `example` comment that would fail before
   your patch, and a `result` comment that passes after your patch, to the function's header-comment. We use these for
   website documentation, as well as to generate test cases that avoid regression going forward. There should already be
   a few ones there if you want to see how it's done.
8. If you are contributing performance upgrades, please provide proof via e.g. <https://jsperf.com>
9. Please keep in mind that some obvious readability improvements are sometimes unwanted for performance reasons. For
   example, we sometimes place similar `for` loops inside `if` and `else` conditions for performance reasons, even
   though the code could be half the size if we put the conditions inside a single loop. If we didn't comment this so
   far, a PR for adding such a comment is very welcome however.
10. If you are adding a new function, please make sure to:

- include exactly one export with a named function, `module.exports = function functionName (param1, ...) {`
  - the file can contain more definitions (helper functions, classes, etc.), but is allowed to have only one export
- add header-comments as first thing in function's body. Minimal header-comment should consist of

```js
//  discuss at: https://locutus.io/<LANGUAGE>/<FUNCTION NAME>/
// original by: <YOUR NAME>
//   example 1: <FUNCTION NAME>("foo")
//   returns 1: "bar"
```

- use `note` comments sparingly—only for **non-obvious behavior**: indexing quirks (e.g., "AWK uses 1-based indexing"), platform differences, or edge cases. Skip notes that restate the function name ("returns the absolute value of x") or the obvious ("mimics Lua's math.ceil").

11. **Rosetta Stone mappings**: If your function has semantic equivalents in other languages (e.g., PHP's `strlen` ↔ C's `strlen` ↔ Ruby's `length`), add it to `src/rosetta.yml`. This enables cross-language navigation on the website.

Verification steps (for new or changed functions):

- `yarn test:parity php/<category>/<function>` (or the relevant language)
- `yarn build:tests && yarn test`
- `yarn check`

## Curation Rules

Policy boundary:

- Port function semantics, keep API boundaries JavaScript-native.
- Do not introduce foreign runtime data structures or object models in Locutus APIs.
- Historic exception: PHP compatibility may treat plain JS objects as associative arrays when `locutus.objectsAsArrays` is enabled.
- Example: a Go date-formatting port should take a JavaScript `Date` and return a `string`, not a custom Go `time.Time`.

Worth porting:

- Complex functions like `sprintf`, `strtotime`, `serialize`, `date`
- Language-specific quirks like `array_merge` vs `array_merge_recursive`
- Educational cases that demonstrate type coercion or edge behavior

Skip:

- Direct wrappers like `strlen` → `s.length`
- Modern JS equivalents like `Array.includes`, `Object.keys`
- Trivial math like `abs`, `ceil`, `floor`

## Quick Commands

- `yarn check` - format + lint + test (run after changes)
- `yarn test:parity` - cross-language verification
- `yarn test` - full test suite
- `yarn lint` - Biome check
- `yarn fix:biome` - auto-fix

## Prerequisites

We use Yarn managed by Corepack. It's recommended to alias:

```bash
alias yarn="corepack yarn"
```

## Clone

Unless you are a Core contributor, it's best to fork Locutus, and then clone your fork. Then you can freely change it,
push it to GitHub, and then send us a Pull Request to review. Otherwise you can clone our origin:

```bash
# cd ~/code
git clone git@github.com:locutusjs/locutus.git
cd locutus
```

## Install

```bash
yarn
yarn website:install
```

## Code

Best start a new branch for your work. For instance

```bash
git checkout -b fix-serialize
```

Then hack in `src/`, for example: `src/php/var/serialize.js`.

Tip: If you use VSCode, consider starting it like `code .vscode/locutus.code-workspace`, so that heavy generated files &
directories are excluded from your file tree and searches.

## Build

```bash
yarn build
```

## Test

### Generated tests

```bash
yarn test
```

This regenerates Vitest test cases based on `example` and `returns` comments found in the functions' headers, then runs them.

### Running a single generated test

If you're iterating purely on the implementation, here's a faster way to run a single test file in watch mode:

```bash
yarn vitest --watch test/generated/php/array/natsort.vitest.ts
```

### Custom tests

You can write custom Vitest tests by creating a `.vitest.ts` file alongside your function. An example can be found in
[`src/php/var/serialize.vitest.ts`](src/php/var/serialize.vitest.ts).

### Browser Playground

Aside from unit tests, you can run a browser smoke test flow powered by Vitest browser mode and Playwright:

```bash
yarn browser:install # first time only
yarn browser:watch
```

If you just want a one-off browser run:

```bash
yarn browser:test
```

### JavaScript Compatibility (Browser-Facing)

Locutus has two runtime targets:

- Node package runtime: `engines.node >= 22`
- Published package compile target (CJS + ESM dist): `ES2022`
- Browser-facing runtime (website `Module JS` / `Standalone JS`, browser playground/tests):
  `baseline widely available with downstream`

For browser-facing code:

- use syntax and built-ins compatible with the rolling Baseline target above
- do not assume polyfills for website copy-paste snippets
- if a function needs behavior outside this target, document it with a function header `note` comment

Example exception note:

```js
// note 1: Uses Intl.Segmenter. For older targets, transpile and provide a compatible polyfill/fallback.
```

Quick local checks:

```bash
npx browserslist "baseline widely available with downstream"
npx browserslist --coverage=global "baseline widely available with downstream"
```

This target is rolling by design and may shift as browser data and tooling updates.

## Commit

Tests passing? It's time to document your work in the unreleased section of our `CHANGELOG.md`, so that you can bundle
it with your PR.

Commit guidelines:

- Keep PRs small and focused
- Run `yarn check` before committing
- Merge early, iterate often
- PRs are squash-merged for a clean main history—no need for force-push rebasing

Now it's time to apply linting & formatting fixes, and report on unfixable issues:

```bash
yarn fix
```

Make changes if needed, until there are no more errors. Then commit, push, and send a PR on GitHub.

## Releasing

After PRs have been approved and merged it's time to cut a release.

Any Core contributor can let our GHA CI create an npm release via OIDC Trusted Publishing (no npm token required).

### Steps

1. **Update CHANGELOG.md**: Move items from `## main` to a new version section (e.g., `## v2.0.35`)
   - If `engines.node` changed, add a short callout in the release notes (CHANGELOG + GitHub release)

2. **Bump version and push tag**:
   ```bash
   npm version patch -m "Release v%s" && git push origin main --tags
   ```

3. **Let CI publish and create the GitHub Release**:
   - The tag workflow now publishes to npm and creates the GitHub release page automatically from the matching
     `## vX.Y.Z` section in `CHANGELOG.md`.
   - If the release job is rerun after publish, it skips already-published npm versions and already-created GitHub
     releases cleanly.
   - Manual fallback, only if the workflow fails after npm publish:
   ```bash
   node scripts/extract-release-notes.ts --version v2.0.35 > /tmp/locutus-release-notes.md
   gh release create v2.0.35 --title "v2.0.35" --notes-file /tmp/locutus-release-notes.md
   ```

### Versioning

Locutus does not strictly adhere to SemVer. With hundreds of ports, we optimize for continuous parity and quality
improvements over strict backward compatibility on every function edge case.

Release level defaults:

- `patch`: default for most releases, including isolated function behavior/parity fixes, type tightening, docs, tests,
  and security fixes.
- `minor`: additive project capabilities and scoped compatibility shifts that do not change package runtime/import
  contracts.
- `major`: package/runtime/import contract breaks, or broad cross-function semantic shifts.

Parity target policy:

- Isolated parity behavior updates (one or a few functions): `patch`.
- Parity target shifts with scoped expected drift: `minor`.
- Parity target shifts with broad expected drift: `major`.

Broad drift threshold (treat as `major`):

- expected behavior changes in `>= 25` functions, or
- impact across `>= 2` language namespaces.

Engine policy:

- Increasing `engines.node` is treated as a breaking change and requires a **major** version bump.
- Raising the published dist language target (for example `ES2020` -> `ES2022`) is treated as a breaking change and
  requires a **major** version bump.
- Keep development tooling on Node 22+ if needed, but the published `engines.node` must reflect runtime compatibility.

The publish workflow is `.github/workflows/ci.yml` and triggers on tags that point at `main`.

## Website Development

We keep the website in `./website` so it's easy to keep code and website in sync as we iterate. For those reading this
screaming murder, [HashiCorp does this](https://github.com/hashicorp/terraform/tree/HEAD/website) for all their
projects, and it's working well for them on a scale more impressive than ours.

Our website is built with Hexo. To install the prerequisites type `yarn website:install`.

Even though the website is bundled with this repo, we treat it as a separate project, with its own `package.json`. We
also try to avoid dependencies from the website straight to the main code base. Instead, any such dependency shall be
injected by a script.

Here's the flow that takes written functions to the website:

- `yarn injectweb` runs `src/_util/util.js`'s `injectweb()` method
- `injectweb()` iterates over functions and parses them via the `_load` and `_parse` methods, specifically: the header
  comments that declare authors, tests, and dependencies
- `injectweb()` then writes each function to `website/source`. The code is written as the content. The other parsed
  properties are prepended as YAML front matter

Blog posts can be found in `website/source/_posts`.

If you want to preview locally type `yarn website:start`. This opens the local Hexo preview in your browser; refresh
the page after edits to see the latest generated output.

Any change to `main` is deployed automatically onto GitHub Pages by CI.

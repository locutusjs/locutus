# Contributing to Locutus

Thank you so much for being or becoming a Locutus contributor!

Our main focus is the challenge of completionism, seeing how far we can take it, rainy Sunday afternoon hacking to allow
for fun experiments such as running PHP code directly in Node.js

## Table of Contents

- [Contributing Checklist](#contributing-checklist)
- [Prerequisites](#prerequisites)
- [Clone](#clone)
- [Install](#install)
- [Code](#code)
- [Build](#build)
- [Test](#test)
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

```bash
yarn test
```

Single out one function: `natsort`

```bash
TEST_GREP=natsort yarn test:languages
```

This first rewrites mocha test-cases based on `example` and `result` comments found in the function's headers. This is
useful if you're changing the tests themselves as well.

If that's not needed as you're iterating purely on the implementation, here's a faster way of singeling out `natsort`.
This re-uses an already generated mocha test:

```bash
env DEBUG=locutus:* ./node_modules/.bin/mocha \
  --require babel-register \
  --reporter spec \
test/languages/php/array/test-natsort.js
```

By interfacing with Mocha directly you could also enable watch mode by adding `--watch`.

And there's a way to test functions inside Browsers with watching, via `yarn browser:watch`.

## Commit

Tests passing? It's time to document your work in the unreleased section of our `CHANGELOG.md`, so that you can bundle
it with your PR.

Now it's time to apply linting & formatting fixes, and report on unfixable issues:

```bash
yarn fix
```

Make changes if needed, until there are no more errors. Then commit, push, and send a PR on GitHub.

## Releasing

After PRs have been approved and merged it's time to cut a release.

Any Core contributor can let our GHA CI create an NPM release, by pushing a new version and Git tag, like so:

```bash
npm version patch -m "Release v%s" && git push --tags
```

Locutus does not adhere to Semver, so typically you would just use `patch` level upgrades for changes. If we change
something dramatic to how Locutus works across functions (ship ESM, move to TypeScript, etc), that's when we'll involve
`minor` and `major` levels.

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

If you want to preview locally type `yarn website:start`.

Any change to `main` is deployed automatically onto GitHub Pages by CI.

# Changelog

Only project-wide changes are mentioned here. For individual function changelogs, please refer to their
respective Git histories.

## Ideabox

Unreleased and unplanned todos

- [ ] Read up on `i18n_loc_set_default` and `setlocale` in php manual, see if new behavior is warranted
- [ ] Have _one_ way of checking pure Arrays vs PHP arrays (vs: `Object.prototype.toString.call(arr1) === '[object Array]'`, `typeof retObj[p] === 'object'`, `var asString = Object.prototype.toString.call(mixedVar) var asFunc = _getFuncName(mixedVar.constructor) if (asString === '[object Object]' && asFunc === 'Object') {` )
- [ ] Auto-deploys of `master` to http://locutusjs.io via Travis CI
- [ ] Compare example test cases for PHP against `php -r` to make sure they are correctly mimicking the most recent stable behavior
- [ ] Investigate if we can merge `array_*diff*` and `array_*sort*` functions into one helper function and `require` that. Refrain from using `labels`
- [ ] Investigate if we can merge array `sort` functions into one helper function and `require` that. Use `arsort` as an example
- [ ] Investigate if we can have one helper function to resolve `Function/'function'/'Class::function'/[$object, 'function']`, and use that in `is_callable`, `array_walk`, `call_user_func_array` etc.
- [ ] Address remaining test failures that are now skipped (find out via `npm run test:languages:noskip`)
- [ ] Port a few more tricky/inter-depending Ruby functions
- [ ] Port a few more tricky/inter-depending Python functions
- [ ] Port a few more tricky/inter-depending Go functions
- [ ] Parse `require`s with AST just like Browserify does. Then we can add dependencies back to website

## v2.0.0 (Unreleased)

- [ ] Track all cases of `window`, see if they make sense
- [ ] Track all cases of `setTimeout`, use them without window prefix. Remove `codez` replace hack
- [ ] Test `is_array` in-browser to see if the `require` for `ini_get` works correctly with Browserify
- [ ] Track down all `iniRaw`s and replace them with `iniVal`, use a single way of doing defaults
- [ ] Use native `sha1` and `md5` encoding when available
- [ ] Remove XUL from functions
- [ ] Rename `strictForIn` to `sortByReference`
- [ ] Remove `// (BEGIN|END) (STATIC|REDUNDANT)`
- [ ] Index all `note`s
- [x] Either deprecate or document all functions using `eval` or `new Function`
- [x] Port Util to ES6 class
- [x] Write one function (`ip2long`) in ES6 and make it pass tests & linting
- [x] Deprecate support for node_js: 0.8
- [x] Make Travis fail on eslint issues
- [x] Move CHANGELOG to own file
- [x] Make all functions pass eslint with JavaScript Standard Style
- [x] Remove `_workbench` and `_experimental`. They are available for reference in `1.3.2` but making them harder to find for newcomers should help avoid a lot of complaints
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

## v1.3.2 (2016-04-04)

- [x] Start using CHANGELOG https://github.com/kvz/phpjs/releases/tag/v1.3.2

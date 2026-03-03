# Locutus

[![CI](https://github.com/locutusjs/locutus/actions/workflows/ci.yml/badge.svg)](https://github.com/locutusjs/locutus/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/locutus.svg)](https://www.npmjs.com/package/locutus)
[![Verified: PHP 8.3](https://img.shields.io/badge/verified-PHP%208.3-777BB4.svg)](https://locutus.io/php/)
[![Verified: Python 3.12](https://img.shields.io/badge/verified-Python%203.12-3776AB.svg)](https://locutus.io/python/)

> All your standard libraries will be assimilated into our ~~JavaScript~~ TypeScript collective. Resistance is futile.

Locutus is ~500 TypeScript implementations of standard library functions from PHP, Go, Python, Ruby, C, and [more](https://locutus.io/). Each function is individually importable and tree-shakeable.

Most of these started as rainy Sunday afternoon puzzles. Some are genuinely useful. Some are just fun to write. All of them are a way to learn how different languages solve the same problems.

## Scope

Locutus ports function behavior, not foreign runtime baggage. We reimplement standard-library semantics in TypeScript, but keep API boundaries JavaScript-native.

That means we do not recreate alien language data structures or object models in Locutus APIs (for example: Go slices/maps, Python tuples/bytes, Ruby symbols, C structs/pointers, Perl refs).

Historic exception: for PHP compatibility, plain JS objects may be treated as associative arrays when `locutus.objectsAsArrays` is enabled.

Example: a Go date-formatting port in Locutus should accept a JavaScript `Date` and return a `string`, not a custom Go `time.Time` object.

## Install

```bash
npm install locutus
```

## Use

```typescript
import { sprintf } from 'locutus/php/strings/sprintf'

const effectiveness = 'futile'
console.log(sprintf('Resistance is %s', effectiveness))
// Resistance is futile
```

```typescript
import { Contains } from 'locutus/golang/strings/Contains'

console.log(Contains('Locutus', 'cut'))
// true
```

## Development

Some guidelines and instructions can be found in [CONTRIBUTING.md](CONTRIBUTING.md)

Quick commands:

- `yarn check` - format + lint + test
- `yarn test:parity` - cross-language verification
- `yarn test` - full test suite
- `yarn lint` - Biome check
- `yarn fix:biome` - auto-fix

## License

MIT, except for `src/php/bc/` and `src/php/_helpers/_bc.js` which are LGPL-2.1 (derived from PHP's bcmath/Libbcmath). See [LICENSE](LICENSE) for details.

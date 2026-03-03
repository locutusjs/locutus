# Locutus

[![CI](https://github.com/locutusjs/locutus/actions/workflows/ci.yml/badge.svg)](https://github.com/locutusjs/locutus/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/locutus.svg)](https://www.npmjs.com/package/locutus)
[![Verified: PHP 8.3](https://img.shields.io/badge/verified-PHP%208.3-777BB4.svg)](https://locutus.io/php/)
[![Verified: Python 3.12](https://img.shields.io/badge/verified-Python%203.12-3776AB.svg)](https://locutus.io/python/)

> All your standard libraries will be assimilated into our ~~JavaScript~~ TypeScript collective. Resistance is futile.

Locutus is ~500 TypeScript implementations of standard library functions from PHP, Go, Python, Ruby, C, and [more](https://locutus.io/). Each function is individually importable and tree-shakeable.

Most of these started as rainy Sunday afternoon puzzles. Some are genuinely useful. Some are just fun to write. All of them are a way to learn how different languages solve the same problems.

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

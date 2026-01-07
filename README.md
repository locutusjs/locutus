# Locutus

[![CI](https://github.com/locutusjs/locutus/actions/workflows/ci.yml/badge.svg)](https://github.com/locutusjs/locutus/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/locutus.svg)](https://www.npmjs.com/package/locutus)
[![Verified: PHP 8.3](https://img.shields.io/badge/verified-PHP%208.3-777BB4.svg)](https://locutus.io/php/)
[![Verified: Python 3.12](https://img.shields.io/badge/verified-Python%203.12-3776AB.svg)](https://locutus.io/python/)

> All your standard libraries will be assimilated into our JavaScript collective. Resistance is futile.

Welcome to Locutus, where the boundaries of coding languages blur. We're a dedicated collective developers on a mission
to explore the possibilities of porting standard libraries from various programming language (Go, Ruby, PHP, C) to
JavaScript. Our journey is one of discovery, innovation, and sometimes, delightful chaos.

From the complex to the quirky, we assimilate libraries with a spirit of curiosity and a penchant for experimentation.
Our creations typically start as rainy Sunday afternoon puzzles, and end up ranging from groundbreaking functions that
enhance the JavaScript ecosystem, to unique oddities that challenge the norms of coding.

As we navigate through this uncharted territory, we invite you to join us. Whether to contribute, learn, or simply
marvel at the wonders of cross-language integration and portability, your presence on GitHub is valued.

Embark on this journey with us at [locutus.io](https://locutus.io/).

Use our creations at your own risk, and may they inspire you to push the boundaries of what's possible with JavaScript.

## Table of contents

- [Install](#install)
- [Use](#use)
- [Development](#development)
- [License](#license)

## Install

```bash
yarn add locutus
```

## Use

```bash
$ vim php.js
```

```javascript
const sprintf = require('locutus/php/strings/sprintf')
const echo = require('locutus/php/strings/echo')
const effectiveness = 'futile'
echo(sprintf('Resistance is %s', effectiveness))
```

```bash
$ node php.js
Resistance is futile
```

```bash
$ vim go.js
```

```javascript
const strings = require('locutus/golang/strings')
console.log(strings.Contains('Locutus', 'cut'))
```

```bash
$ node go.js
true
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

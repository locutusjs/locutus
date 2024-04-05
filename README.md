# Locutus

> All your standard libraries will be assimilated into our JavaScript collective. Resistance is futile.

Welcome to Locutus, where the boundaries of coding languages blur. We're a dedicated collective of hobbyist developers
and coding enthusiasts on a mission to explore the infinite possibilities of porting standard libraries from various
programming languages into JavaScript. Our journey is one of discovery, innovation, and sometimes, delightful chaos.

In the vast expanse of code, we believe that the essence of programming languages can be unified under the banner of
JavaScript. From the complex to the quirky, we assimilate libraries with a spirit of curiosity and a penchant for
experimentation. Our creations range from groundbreaking functions that enhance the JavaScript ecosystem, to unique
oddities that challenge the norms of coding.

As we navigate through this uncharted territory, we invite you to join us. Whether to contribute, learn, or simply
marvel at the wonders of cross-language integration and portability, your presence is valued. With each function we
port, we embrace the unexpected and celebrate the diversity of programming languages.

Embark on this journey with us at [Locutus.io](https://locutus.io/).

Use our creations at your own risk, and may they inspire you to push the boundaries of what's possible with JavaScript.

## Table of contents

- [Install](#install)
- [Use](#use)
- [Development](#development)

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

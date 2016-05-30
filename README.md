# Locutus

<!-- badges/ -->
[![Build Status](https://secure.travis-ci.org/kvz/locutus.svg?branch=master)](http://travis-ci.org/kvz/locutus "Check this project's build status on TravisCI")
<!-- /badges -->

All your standard libraries will be assimilated into our JavaScript collective. Resistance is futile.

More info at: http://locutus.io/

## Install

```bash
npm install locutus
```

## Use

```bash
vim index.js
```

```javascript
var sprintf = require('locutus/php/strings/sprintf')
var echo = require('locutus/php/strings/echo')
var effectiveness = 'futile'
echo(sprintf('Resistance is %s', effectiveness))
```

```javascript
var strings = require('locutus/golang/strings')
console.log(strings.Contains('Locutus', 'cut'))
```

```bash
$ node index.js
Resistance is futile
true
```

## Development

Some guidelines and instructions can be found in [CONTRIBUTING.md](CONTRIBUTING.md)

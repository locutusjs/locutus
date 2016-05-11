# Locutus

<!-- badges/ -->
[![Join the chat at https://gitter.im/kvz/locutus](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/kvz/locutus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/kvz/locutus.svg?branch=master)](http://travis-ci.org/kvz/locutus "Check this project's build status on TravisCI")
<!-- /badges -->

All your standard libraries will be assimilated into our JavaScript collective. Resistance is futile.

More info at: http://locutus.io/

## Install

```bash
npm install --save --save-exact locutus
```

For ease of development, we recommend these global installs:

```bash
npm install --global mocha babel-cli hexo
```

## Use

```bash
${EDITOR} try.js
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
$ node try.js
Resistance is futile
true
```

## Test

```bash
npm run test
```

Single out one function: `natsort`

```bash
TEST_GREP=natsort npm run test:languages
```

This first rewrites the test-cases which is useful if you're changing the tests themselves as well. If that's not needed as you're iterating purely on the implementation, here's a speedier way of singling out `natsort`:

```bash
env DEBUG=locutus:* mocha \
  --compilers js:babel-register \
  --reporter spec \
test/languages/php/array/test-natsort.js
```

## Website 

We keep the website in `./website` for so it's easy to keep docs & code in sync. For those reading this screaming murder, [HashiCorp does this](https://github.com/hashicorp/terraform/tree/master/website) for all their projects, and it's working pretty well for them on a scale more impressive than ours.

Our website is built with Hexo.

To install the prerequisites type `npm run website:install`.

Here's the flow that takes written functions to the website:

 - `npm run website:inject` runs `src/_util/util.js`'s `injectweb` method
 - `injectweb` iterates over functions and parses them via the `_load` and `_parse` methods, specifically: the header comments that declare authors, tests, and dependencies
 - `injectweb` then writes each function to `website/source`. The code is written as the content. The other parsed properties are prepended as [YAML front matter](https://jekyllrb.com/docs/frontmatter/)
 - Jekyll uses `website/_layouts/function.html` as the layout template for the function collection, this determines how all the properties are rendered.
 
Blog posts can be found in `website/source/_posts`.
 
If you want to preview locally type `npm run website:start`.

Any change to `master` is deployed automatically onto GitHub pages by Travis CI via the `travis-deploy.sh` script.

Typing `npm run deploy` in the root of the project takes care of all the building steps, and then force pushes the generated HTML to the `gh-pages` branch of this repo.

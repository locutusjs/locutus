# Locutus.js

<!-- badges/ -->
[![Join the chat at https://gitter.im/locutusjs/locutus](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/locutusjs/locutus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/locutusjs/locutus.svg?branch=master)](http://travis-ci.org/locutusjs/locutus "Check this project's build status on TravisCI")
[![NPM version](http://badge.fury.io/js/locutus.svg)](https://npmjs.org/package/locutus "View this project on NPM")
[![Dependency Status](https://david-dm.org/locutusjs/locutus.svg?theme=shields.io)](https://david-dm.org/locutusjs/locutus)
[![Development Dependency Status](https://david-dm.org/locutusjs/locutus/dev-status.svg?theme=shields.io)](https://david-dm.org/locutusjs/locutus#info=devDependencies)
<!-- /badges -->

Locutus assimilaties other languages' standard libraries to JavaScript for fun and educational purposes

More info at: http://locutusjs.io/about

## module

```bash
$ npm install --save locutus
$ ${EDITOR} try.js
```

```javascript
var php = require('locutus/php/strings/sprintf')
var effectiveness = 'futile'
php.echo(php.sprintf('Resistance is %s', effectiveness))
```

```javascript
var strings = require('locutus/golang/strings')
strings.Contains('Locutus', 'cut')
```

```bash
$ node try.js
Resistance is futile
true
```

## Testing


### cli

```bash
make test
```

```bash
node bin/locutus.js --action test --name sort
node bin/locutus.js --action test --category array
```

### Web

```bash
PORT=8080 node test/browser/server.js
```

Point your webbrowser to http://localhost:8080

## Website 

We keep the website in `./website` for so it's easy to keep docs & code in sync. For those reading this screaming murder, [HashiCorp does this](https://github.com/hashicorp/terraform/tree/master/website) for all their projects, and it's working pretty well for them on a scale more impressive than ours.

Our website is [built with Jekyll](/blog/2016/04/02/jekyll/).

Here's the flow that takes written functions to the website:

 - `npm run website:inject` runs `src/_util/cli.js`'s `injectweb` method
 - `injectweb` iterates over `./functions` and uses `src/_util/locutusutil.js` to parse them, most significantly: the header comments that declare authors, tests, and dependencies
 - `injectweb` then writes each function to `website/_functions`. This is a [Jekyll Collection](https://jekyllrb.com/docs/collections/). The code is written as the content, and all the other properties are added as [YAML front matter](https://jekyllrb.com/docs/frontmatter/)
 - Jekyll uses `website/_layouts/function.html` as the layout template for the function collection, this determines how all the properties are rendered.
 
Blog posts can be found in `website/_posts`.
 
At the time of writing, the Jekyll Asset pipeline is in a bad place, and so SASS / ES6 asset transpiling is handled separately via npm scripts. Unfortunately we don't have the theme of the website in SASS, so it's included in `app.scss` as plain CSS for now. You can find all the transpiling options in `website/package.json`.

Typing `npm run website:deploy` in the root of the project takes care of all the building steps above, and then force pushes the generated HTML to the `gh-pages` branch of this repo.

## Todo

- [ ] Split out the npm module so you could do `var sprintf = require('locutus/sprintf')`
- [ ] Auto-deploys via Travis CI

## Sponsor development

<!-- badges/ -->
[![Gittip donate button](http://img.shields.io/gittip/kvz.png)](https://www.gittip.com/kvz/ "Sponsor the development of locutus via Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](https://flattr.com/submit/auto?user_id=kvz&url=https://github.com/locutusjs/locutus&title=locutus&language=&tags=github&category=software "Sponsor the development of locutus via Flattr")
[![PayPal donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=kevin%40vanzonneveld%2enet&lc=NL&item_name=Open%20source%20donation%20to%20Kevin%20van%20Zonneveld&currency_code=USD&bn=PP-DonationsBF%3abtn_donate_SM%2egif%3aNonHosted "Sponsor the development of locutus via Paypal")
[![BitCoin donate button](http://img.shields.io/bitcoin/donate.png?color=yellow)](https://coinbase.com/checkouts/19BtCjLCboRgTAXiaEvnvkdoRyjd843Dg2 "Sponsor the development of locutus via BitCoin")
<!-- /badges -->

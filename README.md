# php.js

<!-- badges/ -->
[![Build Status](https://secure.travis-ci.org/kvz/phpjs.png?branch=master)](http://travis-ci.org/kvz/phpjs "Check this project's build status on TravisCI")
[![NPM version](http://badge.fury.io/js/phpjs.png)](https://npmjs.org/package/phpjs "View this project on NPM")
[![Dependency Status](https://david-dm.org/kvz/phpjs.png?theme=shields.io)](https://david-dm.org/kvz/phpjs)
[![Development Dependency Status](https://david-dm.org/kvz/phpjs/dev-status.png?theme=shields.io)](https://david-dm.org/kvz/phpjs#info=devDependencies)
<!-- /badges -->

php.js is a resource that offers community-built JavaScript alternatives to PHP functions.

More info at: http://phpjs.org/about

## Npm

```bash
$ mkdir test && cd $_
$ npm install phpjs
$ $EDITOR try.js
```

```javascript
var php = require('phpjs');

php.echo(php.sprintf('Hey, %s : )', 'you'));
php.echo(php.parse_url('mysql://kevin:abcd1234@example.com/databasename')['pass']);
php.echo(php.strtotime('2 januari 2012, 11:12:13 GMT'));
```

```bash
$ node try.js
Hey, you : )
abcd1234
1325502733
```

## Testing


### cli

```bash
make test
```

```bash
node bin/phpjs.js --action test --name sort
node bin/phpjs.js --action test --category array
```

### Web

```bash
PORT=8080 node test/browser/server.js
```

Point your webbrowser to http://localhost:8080


## Sponsor development

<!-- badges/ -->
[![Gittip donate button](http://img.shields.io/gittip/kvz.png)](https://www.gittip.com/kvz/ "Sponsor the development of phpjs via Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](https://flattr.com/submit/auto?user_id=kvz&url=https://github.com/kvz/phpjs&title=phpjs&language=&tags=github&category=software "Sponsor the development of phpjs via Flattr")
[![PayPal donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=kevin%40vanzonneveld%2enet&lc=NL&item_name=Open%20source%20donation%20to%20Kevin%20van%20Zonneveld&currency_code=USD&bn=PP-DonationsBF%3abtn_donate_SM%2egif%3aNonHosted "Sponsor the development of phpjs via Paypal")
[![BitCoin donate button](http://img.shields.io/bitcoin/donate.png?color=yellow)](https://coinbase.com/checkouts/19BtCjLCboRgTAXiaEvnvkdoRyjd843Dg2 "Sponsor the development of phpjs via BitCoin")
<!-- /badges -->

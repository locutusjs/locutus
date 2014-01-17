# php.js 

<!-- badges/ -->
[![Build Status](https://secure.travis-ci.org/kvz/phpjs.png?branch=master)](http://travis-ci.org/kvz/phpjs "Check this project's build status on TravisCI")
[![Gittip donate button](http://img.shields.io/gittip/kvz.png)](https://www.gittip.com/kvz/ "Sponsor the development of phpjs via Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](https://flattr.com/submit/auto?user_id=kvz&url=https://github.com/kvz/phpjs&title=phpjs&language=&tags=github&category=software "Sponsor the development of phpjs via Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=kevin%40vanzonneveld%2enet&lc=NL&item_name=Open%20source%20donation%20to%20Kevin%20van%20Zonneveld&currency_code=USD&bn=PP-DonationsBF%3abtn_donate_SM%2egif%3aNonHosted "Sponsor the development of phpjs via Paypal")
[![BitCoin donate button](http://img.shields.io/bitcoin/donate.png?color=yellow)](https://coinbase.com/checkouts/19BtCjLCboRgTAXiaEvnvkdoRyjd843Dg2 "Sponsor the development of phpjs via BitCoin")
<!-- /badges -->

php.js is a resource that offers community-built JavaScript alternatives to PHP functions.

More info at: http://phpjs.org/about

# Building the site

## Prerequisites

The site is built using Octopress. For instructions how to set things up, 
please check [here](http://kvz.io/blog/2012/09/25/blog-with-octopress/).

## build, generate, commit, push, deploy

```shell
make site MSG="Updated site"
```

## preview locally

```shell
make site-preview
```

## reset site (should not be necessary)

```shell
make site-clean
```

# Testing


# Cli

```bash
make test
```

```bash
node bin/phpjs.js --action test --name sort
node bin/phpjs.js --action test --category array
```

# Web

```bash
PORT=8080 node _tests/server.js
```

Point your webbrowser to http://localhost:8080


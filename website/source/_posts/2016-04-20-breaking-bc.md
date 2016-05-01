---
layout: post
title: "Breaking Backwards Compatibility"
comments: true
tags: [ future ]
alias: /blog/2016/04/20/breaking-bc/
---

Hi all,

I'm planning to push out a big release soon that will change a lot of things about this project.

Among things, it will:

- Offer a platform to learn other languages besides PHP
- Be focussed on npm as the main distribution platform, so you can `var sprintf = require('string/sprintf')` (and use Browserify, Rollup, or Webpack on that if the browser is your target)
- Deprecate functions that were desperately trying to mimic PHP, yet never really succeeding

The old version will remain available as `v1.3.2`.

I certainly hope you are not using this project like so:

<https://raw.githubusercontent.com/kvz/phpjs/master/functions/strings/sprintf.js>

as that is asking for BC breakage as well as impolite towards GitHub, but if you are, you should change your links to

<https://raw.githubusercontent.com/kvz/phpjs/v1.3.2/functions/strings/sprintf.js>

until you can figure out how to vendor in that function and host it yourself.

If you are using the project via npm, the old version will be available under the `1.3.2` package version.

If you are using it via Git, use `git checkout v1.3.2`.

The new version will be available as `v2.0.0`, as well as `master` by the time I launch. I'm not sure yet when that will be, but I thought it might save some headaches to already give the heads up about this.

Stay tuned for more,

[Kevin](http://twitter.com/kvz)

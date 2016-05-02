---
layout: page
title: "About Locutus"
date: false
comments: true
permalink: /
alias:
- /pages/contact/
- /about/
---

Locutus is assimilating other languages' standard libraries to JavaScript for fun and educational purposes. For three reasons

1. to see if we can
1. as a rainy Sunday afternoon pastime, porting a function can be rewarding and deepen your understanding of languages, not unlike solving a crossword puzzle : )
1. to profit from interoperable functions (when apps involve more than one programming language) as well as higher level functions such as: [number_format](/php/number_format/), [sprintf](/php/sprintf/), and [strtotime](/php/strtotime/), that do not exist in JavaScript's standard library.

JavaScript is wide-spread but lacking an exhaustive 
standard library, developers coming from other languages are often wondering how to achieve common tasks, like [formatting dates](/php/strftime/), or [generating a hashes](/php/sha1/).

Locutus aims to show developers coming from other programming languages how these high-level things could be achieved in JavaScript. 

Besides what's missing in JavaScript, we're also porting functions like Go's [string.Index](/golang/strings/Index/) even though it has a perfectly good native JavaScript equivalent by means of [String.indexOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf). We're going this extra mile to show newcomers by example how behavior differs (or not) across languages.

Before, we also had the idea that if enough parts of a language were ported, you might even be able to run entire programs written in other languages in JavaScript. While it was fun to try and we had some success in doing this for PHP, we abandoned this goal go as it drove us to write many hacks while we would never have been to get it to work well, anyway. Projects like [GopherJS](https://github.com/gopherjs/gopherjs) or [Emscripten](http://kripken.github.io/emscripten-site/) offer better routes to that end.

## What we're not

Even though Locutus is porting standard libraries from other languages, this is for reference. We are not a drop-in standard library for JavaScript. 

If you're interested in something like that, we recommend taking a look at [lodash](https://lodash.com/), which in comparison is more lightweight, focussed, mature. It goes a long way in complementing JavaScript's bare bones nature. 

That being said, there are a few good bits to be found in this repository, and Locutus makes it easy to require and bundle just a single function that you deem worthy of your project. Our Notes should be helpful in evaluating a particular function's issues and maturity.

## What we're not porting

As mentioned we're sticking to raw functions and steer clear of things touching global environment, language constructs or data-types as well as extending builtin natives. While this would aid in assimilating more of a language, past mistakes made us decided these are outside of Locutus' scope and welcome other projects to take a stab at this.

## A community effort

Not unlike Wikipedia, Locutus is an ongoing community effort. We're going by [The McDonald's Theory](https://medium.com/what-i-learned-building/9216e1c9da7d), meaning many of our functions are a first iteration, or otherwise have issues still.

If you know a better way, we'd love to see your improvements.

## Contributing

We use [GitHub](http://github.com/kvz/locutus) for collaboration. There are a few guidelines in our [CONTRIBUTING.md](http://github.com/kvz/locutus/CONTRIBUTING.md) document. It would be helpful to glance over them before submitting your work, as to avoid unnecessary back and forth, and avoid potential disappointment.

## Licensing

Locutus is licensed under the MIT licenses.

[The MIT license](https://github.com/kvz/locutus/blob/master/LICENSE) allows you to use the library as you see fit (even in commercial projects) as long as you redistribute original the license with it. You're not obligated to share your improvements, but obviously that would be greatly appreciated and also ensure you won't lose your changes after you upgrade.

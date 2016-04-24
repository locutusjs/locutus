---
layout: page
title: "About Locutus"
date: 2012-09-26 17:18
comments: true
permalink: /about/
redirect_from:
- /pages/contact
- /
---

{{site.description}}

**Why?**

 - to see if we can
 - as a rainy Sunday afternoon pastime, porting a function can be rewarding and deepen your understanding of languages, not unlike solving a crossword puzzle : )
 - to profit from interoperable functions (useful when you app involves more than one programming language), as well as a few useful higher level functions such as:
[number_format](/php/number_format/),
[sprintf](/php/sprintf/), and
[strtotime](/php/strtotime/),
that do not exist in JavaScript's standard library.

JavaScript is wide-spread but lacking an exhaustive 
standard library, developers coming from other languages are often wondering how
to achieve common tasks, like [formatting dates](/php/strftime/), 
or [generating a hashes](/php/sha1/).

Locutus aims to show developers coming from other programming languages
these high-level things could be achieved in JavaScript. 

We're also porting low-level functions like Go's [string.Index](/golang/strings/Index/)
even though it has a perfectly good (and more performant) native JavaScript equivalent by means of [String.indexOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf).

We're going the extra mile in writing wrappers around these to show newcomers by example how the behavior differs (or not) across languages.

Initially we also had the idea that if enough parts of a language were ported, you might even be able to run entire programs written in other languages in JavaScript. While it was fun to try and we had some success in doing this for PHP, we let this goal go as it drove us to write many hacks, while we would never be able to get it to work well, anyway. Projects like [GopherJS](https://github.com/gopherjs/gopherjs) or [Emscripten](http://kripken.github.io/emscripten-site/) offer better routes to that end.

## What we're not

Even though Locutus is porting standard libraries from other languages, 
we don't see ourselves as drop in standard library for JavaScript. 

If you're interested in something like that, we recommend taking a look at [lodash](https://lodash.com/), which in comparison is more lightweight, focussed, mature. 

That being said, there are good bits to be found in this repo already, and Locutus makes it easy to require and bundle just a single function that you do deem worthy of entering your project.

## What we're not porting

As mentioned we're sticking to raw functions and steering clear of global environment, language constructs or data-types. While this would be possible to varying degrees, we decided this is outside of Locutus' scope and welcome other projects to take a stab at this.

## A community effort

Not unlike Wikipedia, Locutus is an ongoing community effort and so far we have ported 
[{{ site.functions |size }} functions](/functions). We're going however by [The McDonald's Theory](https://medium.com/what-i-learned-building/9216e1c9da7d), meaning that many of these functions are a first iteration, or otherwise have issues still.

If you know a better way, we'd love to see your improvements.

## Contributing

We use [GitHub](http://github.com/kvz/locutus) for collaboration. There are a few guidelines in our [CONTRIBUTING.md](http://github.com/kvz/locutus/CONTRIBUTING.md) document. It would be helpful to glance over them before submitting your work, as to avoid unnecessary back and forth, and avoid potential disappointment.

## Licensing

Locutus is licensed under the MIT licenses.

[The MIT license](https://github.com/kvz/locutus/blob/master/LICENSE) allows you to use the library as you see fit (even in commercial projects) as long as you redistribute original the license with it. You're not obligated to share your improvements, but obviously that would be greatly appreciated and also ensure you won't lose your changes after you upgrade.

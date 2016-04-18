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

**Why on earth would you port other languages to js?**

 - to create interoperable base64 and URL encoding functions that were lacking when we started
 - to see if we can
 - to learn JavaScript
 - to help others learn JavaScript
 - to profit from a few more useful functions such as:
[strip_tags](http://locutusjs.io/php/strip_tags/),
[strtotime](http://locutusjs.io/php/strtotime/),
[md5](http://locutusjs.io/php/md5/),
[strftime](http://locutusjs.io/php/strftime/),
[number_format](http://locutusjs.io/php/number_format/),
[wordwrap](http://locutusjs.io/php/wordwrap/), 
[vsprintf](http://locutusjs.io/php/vsprintf/), and
[date](http://locutusjs.io/php/date/), that are too high-level for JavaScript.

JavaScript as a language is even wide-spread, but lacking a large 
standard library, developers coming from other languages are often wondering how
to achieve common tasks, like [formatting dates](http://locutusjs.io/php/strftime/), 
or [generating a hashes](http://locutusjs.io/php/sha1/).

Locutus aims to show developers coming from the other programming languages
how to achieve these things in JavaScript. We had to write a lot of it in order to port {{ site.functions |size }} functions. We've come to appreciate the language and hope you will too. Locutus exists to aid in learning it, not to avoid that.

One thing you'll notice is that we're also porting low-level functions like PHP's
[strpos](http://locutusjs.io/php/strpos/) or Go's [string.Index](/golang/strings/Index/)
that have perfectly good (and more performant) JavaScript equivalents right in its standard library by means of [String.indexOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf).

There are two reasons why we went the extra mile:

1. To show newcomers by example how the behavior differs across languages (`false` vs `-1` in the example of PHP's `strpos` vs JavaScript's `indexOf`)
2. The geeky-challenge of porting ALL-THE-THINGS also opens up Locutus to other fun experiments such as running actual `.php` files on V8. While have no idea why you would want that, nor would we recommend it, we sure think it's fun to see if we can manage (this does bring the burden of mimicking the other languages as good as we can, even their mistakes).

## What we're not porting

We're trying to stick to raw functions and won't be porting global environment, language constructs or data-types. While this would be possible to varying degrees, we feel this is outside Locutus' scope and welcome other projects to take a stab at this, using our modules (or not).

One thing we discovered was that Locutus won't be able to fully support many of PHP's array functions because native arrays on PHP are more like Objects in JavaScript, except that some JavaScript platforms do not guarantee to preserve ordering in objects. Rightfully, because that behavior is not part of ECMA. Instead of rolling our own data-structures, this is a case where we accept defeat. We take comfort in the fact that most platforms preserve ordering, and put up big disclaimers with those functions. There are rumors of it becoming a part of ECMA.

## A community effort

Going by [The McDonald's Theory](https://medium.com/what-i-learned-building/9216e1c9da7d) 
we have plenty of functions online that aren't perfect just yet.

If you know better ways, you're very welcome to send us a pull request : )

## Contributing

We use [GitHub](http://github.com/kvz/locutus) for collaboration.
Please do adhere to our [CONTRIBUTING.md](http://github.com/kvz/locutus/CONTRIBUTING.md) when you're
sending in a contribution.

## Licensing

Locutus is licensed under the MIT licenses.

The MIT license allows you to use the library as you see fit (even in commercial projects) as long as you redistribute original the license with it. You're not obligated to share your improvements, but obviously that would be greatly appreciated and ensure you won't lose your changes after you upgrade.

	Copyright (c) 2007-{{ site.time | date: '%Y' }} Kevin van Zonneveld (http://kvz.io) 
	and Contributors (http://locutusjs.io/authors)

	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
	of the Software, and to permit persons to whom the Software is furnished to do
	so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

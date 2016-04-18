---
layout: page
title: "About Locutus.js"
date: 2012-09-26 17:18
comments: true
permalink: /about/
redirect_from:
- /pages/contact
- /
---

Locutus.js assimilaties other languages' standard libraries to JavaScript for fun and educational purposes

**Why on earth would you port other languages to js?**

 - to create interoperable server/client-side base64 and URL encoding functions that were lacking when we started
 - to see if we could
 - to learn JavaScript
 - to help others learn JavaScript
 - to profit from a few more useful functions such as:
[strip_tags](http://locutusjs.org/php/strip_tags/),
[strtotime](http://locutusjs.org/php/strtotime/),
[md5](http://locutusjs.org/php/md5/),
[strftime](http://locutusjs.org/php/strftime/),
[number_format](http://locutusjs.org/php/number_format/),
[wordwrap](http://locutusjs.org/php/wordwrap/), 
[vsprintf](http://locutusjs.org/php/vsprintf/), and
[date](http://locutusjs.org/php/date/), that are too high-level for JavaScript.

Locutus.js has ported most of PHP's functions already.

PHP is a language with a huge standard library that a large share of web developers
are intimately familiar with.

JavaScript as a language is even more wide-spread, but lacking a similar large 
standard library, developers coming from other languages are often wondering how
to achieve common tasks, like [formatting dates](http://locutusjs.org/php/strftime/), 
or [generating a hashes](http://locutusjs.org/php/sha1/).

Locutus.js aims to show developers coming from the PHP world how to achieve these things
in JavaScript. We had to write a lot of it in order to port {{ site.functions |size }} functions. We appreciate the language and hope you will too. Locutus.js exists to aid in learning it, not to avoid that.

One thing you'll notice is that we're also porting low-level PHP functions like
[strpos](http://locutusjs.org/php/strpos/)
that have perfectly good (and more performant) JavaScript equivalents right in its standard library by means of e.g.  [String.indexOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf).

There are two reasons why we went the extra mile:

1. To show newcomers by example how the behavior differs across languages (`false` vs `-1` in the example of `strpos` vs `indexOf`)
2. The geeky-challenge of porting ALL-THE-THINGS also suddenly opens up Locutus.js to other fun experiments such as running actual `.php` files on V8. While we would advice against using that for anything serious, we sure think it's fun to see if we can manage (this does pose the burden of mimicking PHP as good as we can, even its mistakes).

Something we discovered was that Locutus.js won't be able to fully support PHP arrays on all platforms because some platforms do not preserve ordering in objects. Rightfully, because it's not part of ECMA. Instead of rolling our own data-structures, this is a case where we accept defeat. We take comfort in the fact that most platforms preserve ordering, and there are rumors of it becoming a part of ECMA.

Going by [The McDonald's Theory](https://medium.com/what-i-learned-building/9216e1c9da7d) 
we have plenty of functions online that aren't perfect just yet.
If you know better ways, you're very welcome to send us a pull request : )

## Contributing

We use [GitHub](http://github.com/locutusjs/locutus) for collaboration.
Please do adhere to our [CONTRIBUTING.md](http://github.com/locutusjs/locutus/CONTRIBUTING.md) when you're
sending in a contribution.

## Licensing

Locutus.js is licensed under the MIT licenses.

The MIT license allows you to use the library as you see fit (even in commercial projects) as long as you redistribute original the license with it. You're not obligated to share your improvements, but obviously that would be greatly appreciated and ensure you won't lose your changes after you upgrade.

	Copyright (c) 2007-{{ site.time | date: '%Y' }} Kevin van Zonneveld (http://kvz.io) 
	and Contributors (http://locutusjs.org/authors)

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

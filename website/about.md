---
layout: page
title: "About php.js"
date: 2012-09-26 17:18
comments: true
permalink: /about/
redirect_from:
- /pages/contact
- /
---

php.js is a resource that offers community-built JavaScript alternatives to PHP functions.

**Why on earth would you port php to js?**

 - initially, there was a need for interoperable server/clientside functions for base64 and url encoding. then...
 - to see if we could
 - to learn JavaScript
 - to help others learn JavaScript
 - to profit from a few more useful functions such as:
[strip_tags](http://phpjs.org/functions/strip_tags/),
[strtotime](http://phpjs.org/functions/strtotime/),
[md5](http://phpjs.org/functions/md5/),
[strftime](http://phpjs.org/functions/strftime/),
[number_format](http://phpjs.org/functions/number_format/),
[wordwrap](http://phpjs.org/functions/wordwrap/), 
[vsprintf](http://phpjs.org/functions/vsprintf/), and
[date](http://phpjs.org/functions/date/), that are too high-level for JavaScript.

PHP is a language with a huge standard library that a large share of web developers
are intimately familiar with.

JavaScript as a language is even more wide-spread, but lacking a similar large 
standard library, developers coming from other languages are often wondering how
to achieve common tasks, like [formatting dates](http://phpjs.org/functions/strftime/), 
or [generating a hashes](http://phpjs.org/functions/sha1/).

php.js aims to show developers coming from the PHP world how to achieve these things
in JavaScript. We had to write a lot of it in order to port {{ site.functions |size }} functions. We appreciate it. We hope you will too.

One things you'll notice is that we're also porting low-level PHP functions like
[strpos](http://phpjs.org/functions/strpos/)
that have perfectly good (and more performant) JavaScript equivalents right in its standard library by means of e.g.  [String.indexOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf).

There are two reasons why we're going all-in:

1. To show by example how the behavior differs across language (`false` vs `-1` in the example of `strpos` vs `indexOf`)
2. The geeky-challenge. Porting ALL-THE-THINGS suddenly opens up php.js to other fun experiments such as running actual `.php` files on V8. We're not sure why you would want that, but we sure think it's fun to see if we can manage. (this does bring the burden of mimicking PHP as good as we can, even its mistakes)

Something we discovered was that php.js won't be able to fully mimic all of PHP on all platforms because some platforms do not preserve ordering in objects. Rightfully, because it's not part of ECMA. Instead of rolling our own data-structures, this is a case where we accept defeat. We do take comfort in the fact that most platforms preserve ordering, and there is rumors of it becoming a part of ECMA.

Going by [The McDonald's Theory](https://medium.com/what-i-learned-building/9216e1c9da7d) 
we have plenty of functions online that aren't perfect just yet.
If you know better ways, you're very welcome to send us a pull request : )

## Contributing

We use [GitHub](http://github.com/kvz/phpjs) for collaboration.
Please do adhere to our [CONTRIBUTING.md](http://github.com/kvz/phpjs/CONTRIBUTING.md) when you're
sending in a contribution.

## Licensing

php.js is licensed under the MIT licenses.

The MIT license allows you to use the library as you see fit (even in commercial projects) as long as you redistribute original the license with it. You're not obligated to share your improvements, but obviously that would be greatly appreciated and ensure you won't lose your changes after you upgrade.

	Copyright (c) 2007--{{ site.time | date: '%Y' }} Kevin van Zonneveld (http://kvz.io) 
	and Contributors (http://phpjs.org/authors)

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

---
layout: page
title: "About php.js"
date: 2012-09-26 17:18
comments: true
sharing: false
footer: true
alias:
- /pages/contact
---

php.js is a resource that offers community-built JavaScript alternatives to PHP functions.

If you want to perform high-level operations on JavaScript platforms such as 
webbrowsers, node.js, etc, you probably need to write JS that combines its 
lower-level functions and build it up until you have something useful like:
[strip_tags](http://phpjs.org/functions/strip_tags/),
[strtotime](http://phpjs.org/functions/strtotime/),
[strftime](http://phpjs.org/functions/strftime/),
[number_format](http://phpjs.org/functions/number_format/),
[wordwrap](http://phpjs.org/functions/wordwrap/), or
[date](http://phpjs.org/functions/date/).

PHP is a language with many high-level functions and while they're not always 
implemented as consistently as we'd like (mimicking their underlying C parts), 
they do get many programming jobs done without the need for additional libraries
or abstractions. 

We recognize JS has beautiful language features, and we encourage you to learn them.
Never let php.js be an excuse not to. For the this reason we don't offer 
gigantic php.js packages or compilers anymore.

That said, we do think it's a challenge to port everything and decided to also port 
low-level PHP functions like
[strpos](http://phpjs.org/functions/strpos/)
even though it has a perfectly fine (and more performant!) JavaScript 
counterpart ([String.indexOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf)).

Besides the geeky-challenge of seeing how far we could come, porting ALL THE THINGS also 
opens up php.js to other fun experiments such as realtime in-browser debugging/running of
PHP code, or running `.php` files with JavaScript engines such as V8.

php.js also is a reference for PHP developers new to JavaScript, wanting to see how 
something can be done in JavaScript.

And so we see ourselves as this big resource and leave it up to the developer 
to decide what makes sense to take from it.

And what not.

Going by [The McDonald's Theory](https://medium.com/what-i-learned-building/9216e1c9da7d) 
we have plently of functions here online that aren't perfect just yet.
If you know how to improve, just send us a pull request on GitHub.

## Contributing

We use [GitHub](http://github.com/kvz/phpjs) for collaboration. Comments are for remarks only.
Please adhere to our [coding standards](https://github.com/kvz/phpjs/wiki/DeveloperGuidelines) before
sending a pull request.

## Licensing

php.js is licensed under the MIT licenses.

The MIT license allows you to use the library as you see fit (even in commercial projects) as long as you redistribute original the license with it. You're not obligated to share your improvements, but obviously that would be greatly appreciated and ensure you won't lose your changes after you upgrade.

	Copyright (c) 2013 Kevin van Zonneveld (http://kvz.io) 
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


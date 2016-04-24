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
 - as a rainy Sunday afternoon pastime, porting a function can be as rewarding as solving a crossword puzzle : )
 - to get a better understanding of the languages involved
 - to help others learn JavaScript
 - to profit from interoperable functions (useful when you app involves more than one programming language), and few useful higher level functions such as:
[number_format](/php/number_format/),
[sprintf](/php/sprintf/), and
[strtotime](/php/strtotime/),
that do not exist in JavaScript's standard library.

JavaScript as a language is wide-spread but lacking a large 
standard library, developers coming from other languages are often wondering how
to achieve common tasks, like [formatting dates](/php/strftime/), 
or [generating a hashes](/php/sha1/).

Locutus aims to show developers coming from the other programming languages
how to achieve these things in JavaScript. We had to write a lot of it in order to port 
[{{ site.functions |size }} functions](/functions).
We appreciate the language and hope you will too. Locutus exists to aid in learning it, not to avoid that.

One thing you'll notice is that we're also porting low-level functions like Go's [string.Index](/golang/strings/Index/)
even though it has a perfectly good (and more performant) JavaScript equivalent right in its standard library by means of [String.indexOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf).

We're going the extra mile in writing wrappers around these to show newcomers by example how the behavior differs (or not) across languages.

## What we're not

Even though Locutus is porting standard libraries from other languages, 
we don't see ourselves as drop in standard library for JavaScript. 

We're too hefty, too diffuse, too hobby. If you're interested in something like that, we recommend taking a look at [lodash](https://lodash.com/), which in comparison is more lightweight, focussed, and better tested too.

## What we're not porting

We're trying to stick to raw functions and won't be porting global environment, language constructs or data-types. While this would be possible to varying degrees, we feel this is outside Locutus' scope and welcome other projects to take a stab at this.

## A community effort

Being a community driven project going by [The McDonald's Theory](https://medium.com/what-i-learned-building/9216e1c9da7d), we have many functions online that aren't perfect just yet.

If you know better ways, you're very welcome to send us a pull request : )

## Contributing

We use [GitHub](http://github.com/kvz/locutus) for collaboration.
Please adhere to our [CONTRIBUTING.md](http://github.com/kvz/locutus/CONTRIBUTING.md) guidelines when you're sending in a contribution.

## Licensing

Locutus is licensed under the MIT licenses.

[The MIT license](https://github.com/kvz/locutus/blob/master/LICENSE) allows you to use the library as you see fit (even in commercial projects) as long as you redistribute original the license with it. You're not obligated to share your improvements, but obviously that would be greatly appreciated and also ensure you won't lose your changes after you upgrade.

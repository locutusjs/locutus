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

Locutus is a project that seeks to assimilate other languages' standard libraries to JavaScript. Why, you ask? Well, firstly because we can of course! Apart from that, it can also serve as a nice pastime for a rainy Sunday afternoon. Not only can porting a function be quite rewarding, but it also deepens your understanding of different languages. In that sense, it is not unlike doing a crossword puzzle. Lastly it will hopefully allow us to profit from interoperable functions (for instance when apps involve more than one programming language) as well as from higher level functions such as: [number_format](/php/number_format/), [sprintf](/php/sprintf/), and [strtotime](/php/strtotime/), which do not exist in JavaScript's standard library.

JavaScript is the most commonly used programming language, but it lacks an exhaustive 
standard library. This means that developers coming from other languages are often left wondering how to achieve common tasks, such as [formatting dates](/php/strftime/) or [generating a hashes](/php/sha1/).

Locutus aims to show developers who are proficient in other programming languages how these high-level tasks can be achieved in JavaScript. 

Apart from the things that are missing in JavaScript, we are also porting functions like Go's [string.Index](/golang/strings/Index/), even though JavaScript offers a perfectly good native equivalent in the form of [String.indexOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf). We are going this extra mile to show newcomers an example of how behavior might differ between various languages.

At an earlier stage, we also had the idea that when enough parts of a language were ported, you might even be able to run programs in JavaScript that were entirely written in other languages. While this certainly was fun to try and we had some degree of success in doing this for PHP, we have since abandoned this goal. Mainly because it drove us to write many hacks, while we were never really able to get anything to work flawlessly. Moreover, projects like [GopherJS](https://github.com/gopherjs/gopherjs) and [Emscripten](http://kripken.github.io/emscripten-site/) offer better means to that end, anyway.

## What we are not

Even though Locutus is porting standard libraries from other languages, this is for reference only. We are **not a drop-in standard library for JavaScript**. 

If that is something you are interested in, we recommend you to take a look at [lodash](https://lodash.com/), which is more lightweight, focused and mature. It does a great job of complementing JavaScript's bare bones nature. 

That being said, there is still a fair amount of useful things to be found in this repository, and Locutus makes it easy to require and bundle just a single function that you deem worthy of your project. Our Notes should be helpful in evaluating the issues and maturity of a particular function.

## What we are not porting

As we have mentioned before, we are sticking to raw functions and steering clear of things that touch global environment, language constructs or data-types. We are not extending built-in natives either. While this would aid in assimilating a larger part of a language, past mistakes have led us to decide that these fall outside of Locutus' scope. Other projects are of course welcome to take a stab at it.

## A community effort

Not unlike Wikipedia, Locutus is an ongoing community effort. Our philosophy follows [The McDonald's Theory](https://medium.com/what-i-learned-building/9216e1c9da7d). This means that we don't consider it to be a bad thing that many of our functions are first iterations, which may still have their fair share of issues. We hope that these flaws will inspire others to come up with better ideas.

So, if you know a better way to do something, we would love to see your improvements!

## Contributing

We use [GitHub](http://github.com/kvz/locutus) for collaboration. There are a few guidelines in our [CONTRIBUTING.md](http://github.com/kvz/locutus/CONTRIBUTING.md) document. It would be helpful to glance over them before submitting your work, to avoid unnecessary back and forth, as well as potential disappointment.

## Licensing

Locutus is licensed under the MIT licenses.

[The MIT license](https://github.com/kvz/locutus/blob/master/LICENSE) allows you to use the library as you see fit (even in commercial projects) as long as you redistribute the original license along with it. You are not obligated to share your improvements, even though that would obviously be greatly appreciated and would also ensure that you won't lose your changes after you upgrade.

---
layout: post
title: "Coding style"
date: 2013-05-04 18:01
comments: true
categories: [coding style, convention]
---

Given [the focus of php.js](/blog/2013/05/03/a-word-on-the-focus-of-php-dot-js/) I think
we should re-invent as few wheels as possible and make use of sensible tools
and standards that are other people have already invested a great deal of time
in to get right.

In this light, I've decided to adopt [Felix' Node.js Style Guide](http://nodeguide.com/style.html)
for coding standards, instead of running our own.

It saves us time maintaining and it becomes easier for people to contribute because
they don't have to memorize php.js' own where we diverge.

For the most important parts, our codebase is already compatible with it, so
we won't get any weird space+tab indentations as a result.

Going forward, contributions should comply with these conventions before being
merged in.


Best wishes,

[Kevin](http://twitter.com/kvz)

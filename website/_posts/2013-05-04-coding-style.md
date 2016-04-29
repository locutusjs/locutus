---
layout: post
title: "Coding Style"
comments: true
categories: [ coding style, convention ]
redirect_from: /blog/2013/05/04/coding-style/ 
---

Given [the focus of Locutus](/blog/2013/05/a-word-on-the-focus-of-php-dot-js/) I think
we should re-invent as few wheels as possible and make use of sensible tools
and standards that are other people have already invested a great deal of time
in to get right.

In this light, I've decided to adopt [Felix' Node.js Style Guide](http://nodeguide.com/style.html)
for coding standards, instead of running our own.

It saves us time maintaining and it becomes easier for people to contribute because
they don't have to memorize where Locutus diverges.

For the big parts our codebase is already compatible with it, so
we won't get any weird [space + tab](http://www.emacswiki.org/pics/static/TabsSpacesBoth.png) indentations as a result, as we start adding code that follows the guide.

Going forward, contributions should comply with these conventions before being
merged in.


Best wishes,

[Kevin](http://twitter.com/kvz)

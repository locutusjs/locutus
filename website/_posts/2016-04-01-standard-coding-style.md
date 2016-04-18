---
layout: post
title: "Standard Coding Style"
date: 2016-04-01 13:50
comments: true
categories: [coding style, convention]
---

Three years ago we switched from our own home-brown coding style convention to Felix’ Node.js Style Guide, 
for reasons outlined in the introductory post: [Coding Style](/blog/2013/05/04/coding-style/).

The reasoning behind adopting such a widely supported coding style, has not changed. Locutus.js should be
focused on its added value, and less so arguing about, and inventing custom conventions around coding style.

What has changed a great deal though, is the JavaScript landscape. A large part of the community is gathering behind [Feross Aboukhadijeh's JavaScript Standard Style](http://standardjs.com/) and [ESLint](http://eslint.org/).

Standard offers sensible defaults (no semicolons might take some getting used to but it's really [ok](http://mislav.net/2010/05/semicolons/) and after two weeks you won't look back). ESLint offers powerful ways to enforce the standard.

ESLint for instance, offers a `--fix` command-line argument flag, that converts non-conforming codebases to whichever coding style convention was selected.

The auto-fixing does not cover all rules yet, but it's getting better every month. As we upgrade these modules and fix our codebase, more and more legacy will conform.

Additionally, I've added non-fatal linting to our Travis CI builds, so you can see which functions don't comply, and make them.

Locutus.js does few naughty tricks to bend the laws of physics and overcome a few obstacles in porting programming languages. For this reason, Locutus.js a few exceptions listed in `.eslintrc`. As a goal for the future, it would be interesting to see if we could lose these exceptions.


Best wishes,

[Kevin](http://twitter.com/kvz)

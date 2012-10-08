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

php.js is a resource that offers community built javascript alternatives for php functions.

If you want to perform high-level operations on javascript platforms such as webbrowsers, node.js, etc, you probably need to write JS that combines its lower-level functions and build it up until you have something useful like: strip_tags(), strtotime(), number_format(), wordwrap(), date(), md5().

PHP is a language with many high-level functions and while they're not always implemented as consistently as we'd like (mostly because they mimic their underlying C parts), it has a huge following familiar with its syntax so it makes sense to pick its API as a reference. Eliminating the need for our own documentation, thus making life easier, we hope.

We recognize JS - on the other hand - has beautiful language features, and we encourage you to learn them. Never let php.js be an excuse not to.
For the same reason, we're not porting entire language or control structures of PHP; we stick with the functions.

That said, we think of it as a challenge to port everything and decided to also port low-level PHP functions like strpos even though it may have a JavaScript counterpart (String.indexOf).
Cause besides the intellectual challenge for us, porting more also opens up php.js to all kinds of thought excercises and study purposes.
And so we see ourselves as a big resource and leave it up to the developer to decide what makes sense to take from it.
And what not.

<!--
The History of php.js

Kevin van Zonneveld was once working as developer on a project with a lot of client (JS) / server (PHP) interaction, and found himself coding PHP functions (like base64_decode & urldecode) in JavaScript to smoothen data transport between the two languages.

He stored the stored the functions in a file called php.js which was included in the project. But even when the project was done, it remained fun trying to port PHP functions to JavaScript, and so the library grew.
There was a technological challenge in trying to recreate functions such as date, or sprintf.

Eventually Kevin decided to share the little library on his blog, triggering the enthusiasm of a lot of developers worldwide. The project was open sourced in 2008, and many people contributed their own functions in the comments sections of Kevin's blog.

To try and maintain quality, examples from original PHP documentation were taken and added as unit tests in the header of each function. These are the same bits of code you can see under the Example section for any function.
As bugs are reported, more test cases are added to avoid regression.

It was decided that the library deserved a bigger home and a face of its own, and so the php.js core team (which at that time consisted of Michael White, Felix Geisendörfer, Philip Peterson and Kevin) developed the phpjs.org website.

Different core members have come & gone but there has always been a select group pushing the project forward.

Late 2008 Brett Zamir started contributing and did't stop. In April 2009 he was responsible for over 245 different PHP functions and has had many ideas considering php.js' future.

Because the library became too big to include at once, and having users copy-paste functions to their projects proved tedious, Kevin started working on a compiler that allows programmers to select ONLY the functions they need, and wrap them up in a single customized php.js file.
This took away overhead and even allowed for easy upgrading.

In September 2009 we moved the development of the project to GitHub.
This opened up a lot of features to help colaboration in development.

Gaining popularity in the SSJS world mostly due to node.js people needing functions such as html_entity_decode, we received a lot of requests for a CommonJS compatible library and in April 2010 the compiler took it's first steps to support it.

And that's where we are now.

We are still trying to port and perfect functions.
Want to help out & become a part of our history? Why not add a comment with new or better code?
It is that easy.
-->

## Contributing

We use github for collaboration. Comments are only for remarks.
Please read our guidelines in the Wiki.

## Who uses php.js

 - [node-mysql](https://github.com/masuidrive/node-mysql)
 - [harmony framework](http://www.harmony-framework.com)
 - [node.js](http://github.com/ry/node/blob/1107a1bd1e367d3056b8c3975c2026b7402e9f61/lib/multipart.js#L174-200)
 - [Ext for Yii](http://www.ext4yii.com)

## Licensing

php.js is dual licensed under the MIT and GPL licenses.

This means you may use php.js under the terms of either the MIT License or the Gnu General Public License (GPL) Version 2.

The MIT license allows you to use the library as you see fit (even in commercial projects) as long as you redistribute original the license with it. You don't need to open up your modifications per se, but obviously that would be greatly appreciated and ensure you won't lose your changes after you upgrade.

The GPL license makes it compatible with other GPL projects.

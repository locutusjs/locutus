---
layout: post
title: "php.js is Dead - Long Live Locutus"
comments: true
tags: [ future, js, golang, python, ruby, php, c ]
thumbnail: /css/images/locutus-alpha.png
---

As was briefly mentioned in [Breaking Backwards Compatibility](/blog/2016/04/20/breaking-bc/), 
I am launching a big iteration of php.js today. It includes so [many](https://github.com/kvz/locutus/pull/290) breaking [changes](https://github.com/kvz/locutus/blob/master/CHANGELOG.md#v200) that it is safe to say that, after 
9 years, php.js is dead. And, like a phoenix, **Locutus** has risen from its ashes.

Locutus will largely have the same mission: 
  
> Offer a community platform to collaborate on JavaScript counterparts 
to functions from other languages, for fun and educational purposes.

Locutus will, however, also be different on a few key points. Locutus will focus on:

- Expanding to other languages, such as C, Go, Python and Ruby
- Hack-free porting, meaning we will only port individual functions from the standard libraries, while avoiding language features, environment, data-types and configuration
- The educational aspect and the intellectual challenge
- Using npm as the distribution platform of choice, so you can do `var strings = require('golang/strings')` and, in case the browser is your target platform, bundle this via [Browserify](http://browserify.org/), [rollup.js](http://rollupjs.org/) or [webpack](https://webpack.github.io/).
- Trying to deliver functions that are interoperable between browsers and Node.js, but also allowing to target just one platform when that saves us from writing overly wieldy code. These cases will be documented with a `note`. An example of this would be opening a file from disk. We would then state it is Node.js-only.

While it is still very much a work in progress, I have already deprecated and updated many functions that did not adhere to this renewed focus. If you spot a function I overlooked, please let me know on GitHub.

I feel these changes were needed to regain the motivation required for leading this project. For a long time, I have struggled with php.js in its old form. I rarely did maintenance runs anymore and when I did, it was guilt-driven rather than out of curiosity or excitement - the things that led me to start this project.

There are several reasons why I had lost my intrinsic motivation:

- The things that could reasonably be ported, had already been ported. The things that probably should not have been ported, had been ported too - and were now mostly good for provoking purists and inducing maintenance load. Not very rewarding.
- Misuse of the project. I shed approximately 451 tears when some people started using the project so they would not have to learn JavaScript and could continue PHP-ing in the browser, using 2.1MB, 451-function, ready-to-rock spaceship bundles in the browser. I made efforts to [stop newcomers from doing that](/blog/2013/05/a-word-on-the-focus-of-php-dot-js/). I shed approximately 2.1 tears from the angry notes they then sent me.
- I started a new company and protocol, which took much time by itself, but also meant I spent my time writing exclusively in other programming languages. You won't find any bitterness about that here, but it did mean I had less time and use for PHP oriented projects
- 9 years ago, the tech world was a different place. Node.js did not exist, [everyone was on IE6](https://www.w3counter.com/globalstats.php?date=2007-05-30), and JavaScript main use was invoking `prompt()`, so you could ask for a name and `document.write()` it back to the user. Magical. Going from age 23 to 32, I have changed my stance on pretty much everything. One of these things that I have now abandoned is the idea that our project could perhaps one day be used as an interactive debugging tool, or run entire scripts from other languages in Node. I pursued that goal for some time with the thirst of a youngster, and while we had some success doing so, it drove me to write and accept hacks that, in retrospect, have probably secured me a special place in hell. Projects like [GopherJS](https://github.com/gopherjs/gopherjs) or [Emscripten](http://kripken.github.io/emscripten-site/) offer far better means to that end. Our approach isn't suitable for it.

Knowing that I was beginning to fall short as a project lead, I tried to recruit fresh blood to replace me. However, even though there is still an active community of contributors, I couldn't find any volunteers for taking the lead. For a while, I considered declaring `[UNMAINTAINED]`, but I felt - and still feel - too great a deal of duty and responsibility towards past and present contributors.

So instead, I started thinking about what it would take for me to get my mojo back. Having analyzed 
what had crippled it over the past 9 years, I decided to make the changes that would allow it to flow 
back again.

If you are interested in the nuts and bolts, these are a few things I have been secretly 
working on in order to clean up our codebase and breathe new life into this project. I have:

- Added (generated) Mocha tests for every function, instead of our own test framework
- Added a `$global` that works in both Browsers and Node.js (we should try to avoid this when we can though)
- Added a CONTRIBUTORS guide as well as New Issue and Pull Request templates, so we can be more efficient using GitHub
- Added native JSON, base64, sha1 and md5 support where available
- Added npm versioning and releases
- Added support for ES6, any function can be written in this JavaScript version and it will be transpiled to ES5 before we publish to npm to ensure compatability.
- Asked [Troy Dodd](http://troydodd.deviantart.com/art/Locutus-of-Borg-217586598) if we could use his stunning Locutus artwork to be our avatar (and he said yes!)
- Assimilated a dozen of example functions that showcase how we could port four new languages to JavaScript
- Changed all functions to make them adhere to the [JavaScript Standard Style](http://standardjs.com/) and have a max line length of 100. Travis CI will fail when new additions do not adhere
- Deprecated/documented all functions using `eval`, `new Function` and other bad practices
- Fixed  around 50 failed tests that were previously marked as skipped (still a few to go)
- Made it so that all functions can be required individually via npm
- Made it so that dependencies between functions are now handled via CommonJS `require`
- Moved the website from Jekyll to Hexo, so that we lose a Ruby dependency and everything needed to work on the website can be `npm install`ed
- Refactored the utility class
- Removed `_workbench` and `_experimental` folders. They are available for reference in 1.3.2, but making them harder to find for newcomers should help avoid complaints and confusion. If you want to experiment, we can use local files or branches when it's time to collaborate.

I understand this all can feel like a radical shift, since functions have different locations and there is talk of deprecating functions. Perhaps you wrote these functions with your own blood, sweat and tears. To make matters worse, I will also be deprecating many GitHub Issues and Pull Requests that have become invalid due to this new major push.

I hope you can agree that this project found itself in a dead-end street and that I had to undo some of our work to back out and get us on the road again. I am doing this not to hurt past contributors, but to honor them. I have spent many nights and weekends modernizing this project, so that our work could be given new life. I would also like to voice a word of appreciation to you as a contributor, for the hard work that went into crafting this project. Rewriting a language in another language is no small task, and people tend to forget that in order to port an alien language to JavaScript, we had to write a lot of JavaScript. 

In failing to restrain myself and having tried to port the entire language, I may have ventured into the darker engineering arts. And in the end, it did not even let me fully realize my goal in return. I accept defeat here. However, I am also proud that we have built a welcoming and friendly community together where over the course of 9 years, hundreds of developers from all over the world have helped each other to improve their code, to learn JavaScript, and help others learn it. I, for one, have become much more familiar with JavaScript's delicacies because of it, and I like to think the same goes for many of you as well. Therefore, I accept both defeat and victory.

As a contributor to this project, I hope Locutus brings the changes that can spark your interest again, just as it has for me. I hope you will join me on this new adventure to a magical land of standard libraries full of functions that are just [screaming to be ported](https://golang.org/pkg/strings/). I am looking at you, rainy Sunday afternoon..

This time we will be a little bit older, a little bit wiser, and hopefully have the resolve to steer clear of the darker areas. Nevertheless, we will have just as much fun in challenging ourselves and each other, as well as by learning other languages. I promise! : )

For those that can forgive me for my past mistakes and for deprecating some of our previous work in this new major release: 
you can try Locutus right now if you want:

```bash
$ npm init
$ npm install --save --save-exact locutus
$ vim index.js
```

```javascript
var echo = require('locutus/php/strings/echo')
var capwords = require('locutus/python/string/capwords')
var strings = require('locutus/golang/strings')
var rubyMath = require('locutus/ruby/Math')
var c = require('locutus/c')

echo(capwords('locutus'))
echo(strings.Contains('Locutus', 'us'))
echo(rubyMath.acos(0.3))
echo(c.math.abs(-5))
```

```bash
$ node index.js
Locutus
true
1.266103672779499
5
```

If you want to help Locutus, our newly added languages don't have much meat on the bones yet and it would be fantastic to see if you can think of ways to assimilate a function that Locutus currently does not harbor.

Also, there are plenty project-wide ideas in our [Backlog](https://github.com/kvz/locutus/blob/master/CHANGELOG.md#Backlog) that we would love help with, so I guess there is just one thing left to say..

[To the GitHubs](https://github.com/kvz/locutus)!

[Kevin](http://twitter.com/kvz)

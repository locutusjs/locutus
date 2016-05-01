---
layout: post
title: "php.js is Dead - Long Live Locutus"
comments: true
tags: [ future, js, golang, python, ruby, php, c ]
---

As briefly spoiled in [Breaking Backwards Compatibility](/blog/2016/04/20/breaking-bc/), 
today I'm launching a big iteration of php.js. It includes so
[many](https://github.com/kvz/locutus/pull/290) breaking 
[changes](https://github.com/kvz/locutus/blob/master/CHANGELOG.md#v200), that after 
9 years, php.js is dead. Out of its ashes though, rises: **Locutus**

Locutus will have the same mission: 
  
> Offer a community platform to collaborate on JavaScript counterparts 
to functions from other languages, for fun and educational purposes.

But Locutus will also be different on key points. Locutus will focus on:

- Expanding to other languages, such as C, Go, Python, Ruby
- Hack-free porting, meaning we'll just port individual functions from the standard libraries and avoid: language features, environment, data-types, configuration
- The educational aspect and the intellectual challenge
- Using npm as the distribution platform of choice, so you can do `var strings = require('golang/strings')`and in case the browser is your target platform, use [Browserify](http://browserify.org/), [rollup.js](http://rollupjs.org/), or [webpack](https://webpack.github.io/).
- Trying to deliver functions that are interoperable browsers and Node.js, but allowing to target just one platform when that saves us from writing wieldy code, documenting this with a `note`.

While still a work in progress, I've already deprecated and updated many functions that do not adhere to this renewed focus. If you spot a function I overlooked, let me know and we'll fix.

I feel these changes were needed to regain the motivation required for leading this project. For a long time I've struggled with it in its old form. I rarely did maintenance runs anymore, and when I did, it was guilt-driven, rather than by curiosity or excitement - the things that got me started.

There are several reasons why I believe my intrinsic motivation had fled:

- The things that could reasonably be ported, had been ported. The things that probably should not have been ported, had been ported too - and were now mostly good for provoking purists and inducing maintenance load. Not very rewarding.
- Misuse of the project. I shed approximately 451 tears when people started using our project so they would not have to learn JavaScript and could continue PHP-ing in the browser, using 2.1MB, 451-function, ready-to-rock spaceship bundles in the browser. I made efforts to [stop newcomers from doing that](/blog/2013/05/a-word-on-the-focus-of-php-dot-js/). I shed approximately 2.1 tears from the angry notes they then sent me.
- I started a new company and protocol which took much time by itself, but also meant writing solely in other programming languages (you'll find no bitterness here, but it did mean I had less time to care about PHP oriented projects)
- Being a visible project in the broader development community with people coming from many different programming languages, I found myself at the focal point of PHP hate was fashionable for a while.   
- 9 years is a long time, especially in tech. Node.js did not exist, [everyone was on IE6](https://www.w3counter.com/globalstats.php?date=2007-05-30), and JavaScript was mostly used for raising `alert()`s. Going from age 23 to 32, I have changed my stance on pretty much all things. This includes also that I have abandoned the idea that our project could maybe be used as an interactive debugging tool, or maybe even to run entire scripts from other languages on V8. I pursued goal for some time with the thirst of a youngster, and while we had some success with this, it drove me to me write and accept hacks that have likely secured my special place in hell. Projects like [GopherJS](https://github.com/gopherjs/gopherjs) or [Emscripten](http://kripken.github.io/emscripten-site/) offer viable routes to that end, our approach isn't fit for that purpose.

Knowing I fell short as a project lead, I tried to recruit fresh blood to replace me. However, even though there is an active community of contributors, there were no volunteers for this position. For a while I considered declaring `[UNMAINTAINED]`, but I still feel too great a deal of duty and responsibility towards the contributors.

So instead I thought what it would take to get my mojo back. Having analyzed 
what had crippled it over the past 9 years, I decided to make the changes that allow it to flow 
back again.

If you are interested in the nuts and bolts, these these are a few things I've been secretly 
working on to clean up our codebase and breathe new live into it. I have:

- Added (generated) Mocha tests for every functions, instead of our own test framework
- Added a CONTRIBUTORS guide as well as New Issue and Pull Request templates so we can be more efficient using GitHub
- Added native JSON, base64, sha1, md5 support when available
- Asked [Troy Dodd](http://troydodd.deviantart.com/art/Locutus-of-Borg-217586598) if we could use his stunning Locutus artwork to be our avatar (and he said yes : )
- Assimilated a dozen of example functions that showcase how we could port 4 new languages to JavaScript
- Changed all functions to make them adhere to the [JavaScript Standard Style](http://standardjs.com/) and have a max line length of 100. Travis CI will fail when new additions do not adhere
- Deprecated/documented all functions using `eval` or `new Function` and other bad practices
- Fixed ~50 failed tests that were previously marked as skipped (still a few to go)
- Made it so that all functions can be required individually via npm
- Made it so that dependencies between functions are now handled via CommonJS `require`
- Refactored the utility class
- Removed `_workbench` and `_experimental` folders. They are available for reference in 1.3.2 but making them harder to find for newcomers should help avoid complaints and confusion. If you want to experiment, we can use local files or branches for that when it's time to collaborate.
- Use [Jekyll instead of Octopress](/blog/2016/04/jekyll/) to build our website
- We can use `$global` that works in both Browsers and Node.js
- We can write any function in ES6 now

I understand this can feel like a very radical shift, especially when there's talk of deprecating functions. Perhaps functions that you wrote with blood sweat and tears. I want to voice a word of appreciation to you as a contributor, for the hard work that went into crafting this project. Rewriting a language in another language is no small task, and folks tend to forget that in order to port a different language to JavaScript, we had to write a lot of JavaScript. 

In trying to port the entire language instead of limiting ourselves to more sensible bits, we may have ventured into some darker areas of engineering. But I for one am very proud that we have built a welcoming and friendly community where over the coarse of 9 years, over hundreds of developers have come together to learn JavaScript and help others learn it. I for one have become much more intimate with JavaScript's delicacies because of it, and I know many contributors commenting on eat-other's work, with me. I will accept both victory and defeat.

As a contributor of this project, I hope Locutus brings the changes that can re-spark your interest as well as it has mine, and I hope you'll come with me on this new adventure, where standard libraries full of functions are just [screaming to be ported](https://golang.org/pkg/strings/). This time we'll be a little bit older. A little bit wiser, prudent, and steer clear of the darker areas. But we'll have just as much fun challenging ourselves and learning other languages : )

For all those that can forgive me for my past mistakes, as well as perhaps deprecating some of your work: you can try Locutus right now if you want:

```bash
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

If you want to help Locutus, our newly added languages don't have much meat on the bones yet, so it would be glorious to see you could assimilate more functions.

Also, there are plenty ideas in our 
[Backlog](https://github.com/kvz/locutus/blob/master/CHANGELOG.md#Backlog)
that we'd love help with, so there's just one thing left to say.

[To the GitHubs](https://github.com/kvz/locutus)!

[Kevin](http://twitter.com/kvz)

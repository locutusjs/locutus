---
layout: post
title: "A Word on the Focus of php.js"
comments: true
tags: [ focus ]
alias: /blog/2013/05/03/a-word-on-the-focus-of-php-dot-js/
---

Hi everybody,

The [new site](/blog/2012/09/26/new-site/) has no server-side code. Instead
we generate HTML [using Octopress](http://kvz.io/blog/2012/09/25/blog-with-octopress/)
and push to GitHub Pages, all from one [repository](https://github.com/kvz/locutus).

This saves hosting costs/overhead and makes it really easy for people to submit
pull requests and for [contributors](https://github.com/kvz/locutus/contributors)
to make changes that I don't always have time
for. It makes the project less dependent on me and more a community effort.

To move forward, sometimes you have to cut features.
In this case I had to lose our compiler, a webtool that relied on server-side code
to generate minified packages from php.js functions.

Understandibly this has [raised](https://github.com/kvz/locutus/issues/75)
[questions](http://locutusjs.io/about/index.html#comment-861825612).
It is still possible to bundle 4 useful functions:

```bash
# - Note that this combined 4 php.js functions into a file called: myLocutus
# and minified version: myphp.min.js in the current directory.
# - Note that this throws all functions into the
# global scope. It would be better to put them in a dedicated locutus object.
curl -sk https://raw.github.com/kvz/locutus/31bf3129f08672f8c1d6d0dcad2368ebc4ac57f2/functions/\
{datetime/date\
,datetime/strtotime\
,strings/md5\
,strings/vsprintf\
}.js |tee ./myLocutus && \
curl -vo ./myphp.min.js \
    -X POST \
    -H 'Expect: ' \
    --data-urlencode compilation_level="SIMPLE_OPTIMIZATIONS" \
    --data-urlencode output_format="text" \
    --data-urlencode output_info="compiled_code" \
    --data-urlencode js_code@myLocutus \
    http://closure-compiler.appspot.com/compile
```

but some people think php.js should bundle all of it's functions into one big file:

> Not providing an all-in-one, downloadable, minified, ready-to-use
> .js file is going to kill php.js.
> You've abandoned windows users, and really any non-CLI junkie.
> While I am capable of compiling this myself, what a headache.
> You've introduced a barrier-to-entry that didn't exist before,
> and by not existing, allowed for the following you now have.
> I *highly* suggest that you have this available for download,
> either here or on github, such that you can keep (and maintain)
> the momentum you worked so hard for.

I'd like to comment on that here. While I appreciate the sentiment, wether the
project is being killed by these changes depends on how you look at php.js.
To me, php.js is a resource:

 - For PHP developers that want see how it's done in JavaScript
 - That enables fun experiments
 - With a few higher level functions that are incredibly useful, and missing in JavaScript

This is what I feel php.js should focus on. Making functions. Making them better.

If - on the other hand - you think of php.js as a

 - 2.1MB, 451-function, ready-to-rock spaceship that you can plug into your website so you can keep typing PHP client-side, not caring about learning JavaScript or how that extra weight might impact the user experience

..then yes, *these changes are going to kill php.js*.

I have limited time to spend on open source, and I want to spend it on things I enjoy and can believe in.
Not on working to support use-cases that keep new developers from learning, or make the web slower.
I'm sorry if this upsets folks but it really is my free time.

Luckily though for people with different views, I released php.js under MIT so
it's cool for anybody to fork this project and run with it.

If anything, knowing that the php.js repository will focus on the raw `./functions`
makes this easier.


Best wishes,

[Kevin](http://twitter.com/kvz)

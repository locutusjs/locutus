---
layout: post
title: "JavaScript cosh function"
comments: true
sharing: true
footer: true
permalink: /functions/cosh
alias:
- /functions/cosh:374
- /functions/374
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's cosh

<!-- more -->

{% codeblock math/cosh.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/cosh.js raw on github %}
function cosh (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: cosh(-0.18127180117607017);
    // *     returns 1: 1.0164747716114113
    return (Math.exp(arg) + Math.exp(-arg)) / 2;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/cosh.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/cosh.js)


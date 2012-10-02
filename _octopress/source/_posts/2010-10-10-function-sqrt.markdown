---
layout: post
title: "JavaScript sqrt function"
comments: true
sharing: true
footer: true
permalink: /functions/sqrt
alias:
- /functions/sqrt:523
- /functions/523
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's sqrt

<!-- more -->

{% codeblock math/sqrt.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/sqrt.js raw on github %}
function sqrt (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: sqrt(8723321.4);
    // *     returns 1: 2953.5269424875746
    return Math.sqrt(arg);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/sqrt.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/sqrt.js)


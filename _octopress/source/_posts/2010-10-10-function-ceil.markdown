---
layout: post
title: "JavaScript ceil function"
comments: true
sharing: true
footer: true
permalink: /functions/ceil
alias:
- /functions/ceil:365
- /functions/365
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's ceil

<!-- more -->

{% codeblock math/ceil.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/ceil.js raw on github %}
function ceil (value) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: ceil(8723321.4);
    // *     returns 1: 8723322
    return Math.ceil(value);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/ceil.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/ceil.js)


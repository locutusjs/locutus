---
layout: post
title: "JavaScript exp function"
comments: true
sharing: true
footer: true
permalink: /functions/exp
alias:
- /functions/exp:395
- /functions/395
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's exp

<!-- more -->

{% codeblock math/exp.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/exp.js raw on github %}
function exp (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: exp(0.3);
    // *     returns 1: 1.3498588075760032
    return Math.exp(arg);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/exp.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/exp.js)


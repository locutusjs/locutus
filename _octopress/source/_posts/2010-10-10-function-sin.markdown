---
layout: post
title: "JavaScript sin function"
comments: true
sharing: true
footer: true
permalink: /functions/sin
alias:
- /functions/sin:515
- /functions/515
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's sin

<!-- more -->

{% codeblock math/sin.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/sin.js raw on github %}
function sin (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: sin(8723321.4);
    // *     returns 1: -0.9834330348825909
    return Math.sin(arg);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/sin.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/sin.js)


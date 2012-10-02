---
layout: post
title: "JavaScript asin function"
comments: true
sharing: true
footer: true
permalink: /functions/asin
alias:
- /functions/asin:352
- /functions/352
categories: [ math, functions ]
---
A JavaScript equivalent of PHP's asin
<!-- more -->
{% codeblock math/asin.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/asin.js raw on github %}
function asin (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: asin(0.3);
    // *     returns 1: 0.3046926540153975
    return Math.asin(arg);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/math/asin.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/math/asin.js">edit on github</a></li>
</ul>

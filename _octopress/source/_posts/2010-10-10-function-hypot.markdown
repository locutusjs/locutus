---
layout: post
title: "JavaScript hypot function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/hypot
alias:
- /functions/hypot:429
- /functions/429
categories: [ math, functions ]
---
A JavaScript equivalent of PHP's hypot
<!-- more -->
{% codeblock math/hypot.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/hypot.js raw on github %}
function hypot (x, y) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: hypot(3, 4);
    // *     returns 1: 5
    // *     example 2: hypot([], 'a');
    // *     returns 2: 0
    return Math.sqrt(x * x + y * y) || 0;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/math/hypot.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/math/hypot.js">edit on github</a></li>
</ul>

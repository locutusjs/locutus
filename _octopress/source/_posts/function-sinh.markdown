---
layout: post
title: "JavaScript sinh function"
comments: true
sharing: true
footer: true
permalink: /functions/sinh
alias:
- /functions/sinh:516
- /functions/516
categories: [ math, functions ]
---
A JavaScript equivalent of PHP's sinh
<!-- more -->
{% codeblock math/sinh.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/sinh.js raw on github %}
function sinh (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: sinh(-0.9834330348825909);
    // *     returns 1: -1.1497971402636502
    return (Math.exp(arg) - Math.exp(-arg)) / 2;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/math/sinh.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/math/sinh.js">edit on github</a></li>
</ul>

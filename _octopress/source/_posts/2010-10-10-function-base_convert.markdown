---
layout: post
title: "JavaScript base_convert function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/base_convert
alias:
- /functions/base_convert:359
- /functions/359
categories: [ math, functions ]
---
A JavaScript equivalent of PHP's base_convert
<!-- more -->
{% codeblock math/base_convert.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/base_convert.js raw on github %}
function base_convert (number, frombase, tobase) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philippe Baumann
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // *     example 1: base_convert('A37334', 16, 2);
    // *     returns 1: '101000110111001100110100'
    return parseInt(number + '', frombase | 0).toString(tobase | 0);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/math/base_convert.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/math/base_convert.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript is_long function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/is_long
alias:
- /functions/is_long:446
- /functions/446
categories: [ var, functions ]
---
A JavaScript equivalent of PHP's is_long
<!-- more -->
{% codeblock var/is_long.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/is_long.js raw on github %}
function is_long (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    //  -   depends on: is_float
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: is_long(186.31);
    // *     returns 1: true
    return this.is_float(mixed_var);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/var/is_long.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/var/is_long.js">edit on github</a></li>
</ul>

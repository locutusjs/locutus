---
layout: post
title: "JavaScript is_float function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/is_float
alias:
- /functions/is_float:442
- /functions/442
categories: [ var, functions ]
---
A JavaScript equivalent of PHP's is_float
<!-- more -->
{% codeblock var/is_float.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/is_float.js raw on github %}
function is_float (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: is_float(186.31);
    // *     returns 1: true

    return +mixed_var === mixed_var && (!isFinite(mixed_var) || !!(mixed_var % 1));
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/var/is_float.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/var/is_float.js">edit on github</a></li>
</ul>

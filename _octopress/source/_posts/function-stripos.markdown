---
layout: post
title: "JavaScript stripos function"
comments: true
sharing: true
footer: true
permalink: /functions/stripos
alias:
- /functions/stripos:536
- /functions/536
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's stripos
<!-- more -->
{% codeblock strings/stripos.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/stripos.js raw on github %}
function stripos (f_haystack, f_needle, f_offset) {
    // http://kevin.vanzonneveld.net
    // +     original by: Martijn Wieringa
    // +      revised by: Onno Marsman
    // *         example 1: stripos('ABC', 'a');
    // *         returns 1: 0
    var haystack = (f_haystack + '').toLowerCase();
    var needle = (f_needle + '').toLowerCase();
    var index = 0;

    if ((index = haystack.indexOf(needle, f_offset)) !== -1) {
        return index;
    }
    return false;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/stripos.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/stripos.js">edit on github</a></li>
</ul>

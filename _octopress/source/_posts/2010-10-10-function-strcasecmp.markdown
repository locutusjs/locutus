---
layout: post
title: "JavaScript strcasecmp function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/strcasecmp
alias:
- /functions/strcasecmp:531
- /functions/531
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's strcasecmp
<!-- more -->
{% codeblock strings/strcasecmp.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/strcasecmp.js raw on github %}
function strcasecmp (f_string1, f_string2) {
    // http://kevin.vanzonneveld.net
    // +     original by: Martijn Wieringa
    // +     bugfixed by: Onno Marsman
    // *         example 1: strcasecmp('Hello', 'hello');
    // *         returns 1: 0
    var string1 = (f_string1 + '').toLowerCase();
    var string2 = (f_string2 + '').toLowerCase();

    if (string1 > string2) {
        return 1;
    } else if (string1 == string2) {
        return 0;
    }

    return -1;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/strcasecmp.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/strcasecmp.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript checkdate function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/checkdate
alias:
- /phpjs/functions/checkdate:366
- /phpjs/functions/366
categories: [ datetime, functions ]
---
A JavaScript equivalent of PHP's checkdate
<!-- more -->
{% codeblock datetime/checkdate.js lang:js https://raw.github.com/kvz/phpjs/master/functions/datetime/checkdate.js raw on github %}
function checkdate (m, d, y) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Pyerre
    // +   improved by: Theriault
    // *     example 1: checkdate(12, 31, 2000);
    // *     returns 1: true
    // *     example 2: checkdate(2, 29, 2001);
    // *     returns 2: false
    // *     example 3: checkdate(3, 31, 2008);
    // *     returns 3: true
    // *     example 4: checkdate(1, 390, 2000);
    // *     returns 4: false
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/datetime/checkdate.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/datetime/checkdate.js">edit on github</a></li>
</ul>

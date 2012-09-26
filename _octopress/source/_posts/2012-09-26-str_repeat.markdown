---
layout: post
title: "JavaScript str_repeat function"
date: 2012-09-26 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/str_repeat
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's str_repeat
<!-- more -->
{% codeblock strings/str_repeat.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/str_repeat.js raw on github %}
function str_repeat (input, multiplier) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Ian Carter (http://euona.com/)
    // *     example 1: str_repeat('-=', 10);
    // *     returns 1: '-=-=-=-=-=-=-=-=-=-='

    var y = '';
    while (true) {
        if (multiplier & 1) {
            y += input;
        }
        multiplier >>= 1;
        if (multiplier) {
            input += input;
        }
        else {
            break;
        }
    }
    return y;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/str_repeat.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/str_repeat.js">edit on github</a></li>
</ul>

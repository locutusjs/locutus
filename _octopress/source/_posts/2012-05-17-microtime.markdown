---
layout: post
title: "JavaScript microtime function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/microtime
categories: [ datetime, functions ]
---
A JavaScript equivalent of PHP's microtime
<!-- more -->
{% codeblock datetime/microtime.js lang:js https://raw.github.com/kvz/phpjs/master/functions/datetime/microtime.js raw on github %}
function microtime (get_as_float) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    // *     example 1: timeStamp = microtime(true);
    // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
    var now = new Date().getTime() / 1000;
    var s = parseInt(now, 10);

    return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/datetime/microtime.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/datetime/microtime.js">edit on github</a></li>
</ul>

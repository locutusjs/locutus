---
layout: post
title: "JavaScript gmdate function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/gmdate
alias:
- /functions/gmdate:586
- /functions/586
categories: [ datetime, functions ]
---
A JavaScript equivalent of PHP's gmdate
<!-- more -->
{% codeblock datetime/gmdate.js lang:js https://raw.github.com/kvz/phpjs/master/functions/datetime/gmdate.js raw on github %}
function gmdate (format, timestamp) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Alex
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: date
    // *     example 1: gmdate('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400); // Return will depend on your timezone
    // *     returns 1: '07:09:40 m is month'
    var dt = typeof timestamp === 'undefined' ? new Date() : // Not provided
			typeof timestamp === 'object' ? new Date(timestamp) : // Javascript Date()
			new Date(timestamp * 1000); // UNIX timestamp (auto-convert to int)
    timestamp = Date.parse(dt.toUTCString().slice(0, -4)) / 1000;
    return this.date(format, timestamp);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/datetime/gmdate.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/datetime/gmdate.js">edit on github</a></li>
</ul>

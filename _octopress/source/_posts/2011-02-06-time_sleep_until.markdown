---
layout: post
title: "JavaScript time_sleep_until function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /functions/time_sleep_until
alias:
- /functions/time_sleep_until:564
- /functions/564
categories: [ misc, functions ]
---
A JavaScript equivalent of PHP's time_sleep_until
<!-- more -->
{% codeblock misc/time_sleep_until.js lang:js https://raw.github.com/kvz/phpjs/master/functions/misc/time_sleep_until.js raw on github %}
function time_sleep_until (timestamp) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note: For study purposes. Current implementation could lock up the user's browser.
    // %          note: Expects a timestamp in seconds, so DO NOT pass in a JavaScript timestamp which are in milliseconds (e.g., new Date()) or otherwise the function will lock up the browser 1000 times longer than probably intended.
    // %          note: Consider using setTimeout() instead.
    // *     example 1: time_sleep_until(1233146501) // delays until the time indicated by the given timestamp is reached
    // *     returns 1: true
    while (new Date() < timestamp * 1000) {}
    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/misc/time_sleep_until.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/misc/time_sleep_until.js">edit on github</a></li>
</ul>

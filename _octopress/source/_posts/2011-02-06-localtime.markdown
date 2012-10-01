---
layout: post
title: "JavaScript localtime function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/localtime
alias:
- /phpjs/functions/localtime:587
- /phpjs/functions/587
categories: [ datetime, functions ]
---
A JavaScript equivalent of PHP's localtime
<!-- more -->
{% codeblock datetime/localtime.js lang:js https://raw.github.com/kvz/phpjs/master/functions/datetime/localtime.js raw on github %}
function localtime (timestamp, is_assoc) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +  derived from: Josh Fraser (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/)
    // +      parts by: Breaking Par Consulting Inc (http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7)
    // +   improved by: Ryan W Tenney (http://ryan.10e.us)
    // *     example 1: localtime();
    // *     returns 1: [50,28,0,14,2,109,6,73,0]
    var t, yday, x, o = {};

    if (timestamp === undefined) {
        t = new Date();
    } else if (timestamp instanceof Date) {
        t = timestamp;
    } else {
        t = new Date(timestamp * 1000);
    }

    x = function (t, m) {
        var a = (new Date(t.getFullYear(), 0, m, 0, 0, 0, 0)).toUTCString();
        return t - new Date(a.slice(0, a.lastIndexOf(' ') - 1));
    };

    yday = Math.floor((t - new Date(t.getFullYear(), 0, 1)) / 86400000);

    o = {
        'tm_sec': t.getSeconds(),
        // seconds
        'tm_min': t.getMinutes(),
        // minutes
        'tm_hour': t.getHours(),
        // hour
        'tm_mday': t.getDate(),
        // day of the month, 1 - 31
        'tm_mon': t.getMonth(),
        // month of the year, 0 (January) to 11 (December)
        'tm_year': t.getFullYear() - 1900,
        // years since 1900
        'tm_wday': t.getDay(),
        // day of the week, 0 (Sun) to 6 (Sat)
        'tm_yday': yday,
        // day of the year
        'tm_isdst': +(x(t, 1) != x(t, 6)) // is daylight savings time in effect
    };

    return is_assoc ? o : [
    o.tm_sec, o.tm_min, o.tm_hour, o.tm_mday, o.tm_mon, o.tm_year, o.tm_wday, o.tm_yday, o.tm_isdst];
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/datetime/localtime.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/datetime/localtime.js">edit on github</a></li>
</ul>

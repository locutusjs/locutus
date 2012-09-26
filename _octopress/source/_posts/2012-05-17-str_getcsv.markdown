---
layout: post
title: "JavaScript str_getcsv function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/str_getcsv
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's str_getcsv
<!-- more -->
{% codeblock strings/str_getcsv.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/str_getcsv.js raw on github %}
function str_getcsv (input, delimiter, enclosure, escape) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: str_getcsv('"abc", "def", "ghi"');
    // *     returns 1: ['abc', 'def', 'ghi']
    var output = [];
    var backwards = function (str) { // We need to go backwards to simulate negative look-behind (don't split on 
        //an escaped enclosure even if followed by the delimiter and another enclosure mark)
        return str.split('').reverse().join('');
    };
    var pq = function (str) { // preg_quote()
        return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
    };

    delimiter = delimiter || ',';
    enclosure = enclosure || '"';
    escape = escape || '\\';

    input = input.replace(new RegExp('^\\s*' + pq(enclosure)), '').replace(new RegExp(pq(enclosure) + '\\s*$'), '');

    // PHP behavior may differ by including whitespace even outside of the enclosure
    input = backwards(input).split(new RegExp(pq(enclosure) + '\\s*' + pq(delimiter) + '\\s*' + pq(enclosure) + '(?!' + pq(escape) + ')', 'g')).reverse();

    for (var i = 0; i < input.length; i++) {
        output.push(backwards(input[i]).replace(new RegExp(pq(escape) + pq(enclosure), 'g'), enclosure));
    }

    return output;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/str_getcsv.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/str_getcsv.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript chunk_split function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/chunk_split
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's chunk_split
<!-- more -->
{% codeblock strings/chunk_split.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/chunk_split.js raw on github %}
function chunk_split (body, chunklen, end) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Theriault
    // *     example 1: chunk_split('Hello world!', 1, '*');
    // *     returns 1: 'H*e*l*l*o* *w*o*r*l*d*!*'
    // *     example 2: chunk_split('Hello world!', 10, '*');
    // *     returns 2: 'Hello worl*d!*'
    chunklen = parseInt(chunklen, 10) || 76;
    end = end || '\r\n';

    if (chunklen < 1) {
        return false;
    }

    return body.match(new RegExp(".{0," + chunklen + "}", "g")).join(end);

}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/chunk_split.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/chunk_split.js">edit on github</a></li>
</ul>

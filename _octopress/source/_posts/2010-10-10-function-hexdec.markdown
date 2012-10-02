---
layout: post
title: "JavaScript hexdec function"
comments: true
sharing: true
footer: true
permalink: /functions/hexdec
alias:
- /functions/hexdec:423
- /functions/423
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's hexdec

<!-- more -->

{% codeblock math/hexdec.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/hexdec.js raw on github %}
function hexdec (hex_string) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philippe Baumann
    // *     example 1: hexdec('that');
    // *     returns 1: 10
    // *     example 2: hexdec('a0');
    // *     returns 2: 160
    hex_string = (hex_string + '').replace(/[^a-f0-9]/gi, '');
    return parseInt(hex_string, 16);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/hexdec.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/hexdec.js)


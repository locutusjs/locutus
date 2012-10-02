---
layout: post
title: "JavaScript dechex function"
comments: true
sharing: true
footer: true
permalink: /functions/dechex
alias:
- /functions/dechex:382
- /functions/382
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's dechex

<!-- more -->

{% codeblock math/dechex.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/dechex.js raw on github %}
function dechex (number) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philippe Baumann
    // +   bugfixed by: Onno Marsman
    // +   improved by: http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    // +   input by: pilus
    // *     example 1: dechex(10);
    // *     returns 1: 'a'
    // *     example 2: dechex(47);
    // *     returns 2: '2f'
    // *     example 3: dechex(-1415723993);
    // *     returns 3: 'ab9dc427'
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return parseInt(number, 10).toString(16);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/dechex.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/dechex.js)


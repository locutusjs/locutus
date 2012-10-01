---
layout: post
title: "JavaScript array_reverse function"
date: 2011-12-29 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/array_reverse
alias:
- /phpjs/functions/array_reverse:334
- /phpjs/functions/334
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_reverse
<!-- more -->
{% codeblock array/array_reverse.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_reverse.js raw on github %}
function array_reverse (array, preserve_keys) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Karol Kowalski
    // *     example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true);
    // *     returns 1: { 2: ['green', 'red'], 1: 4, 0: 'php'}
    var isArray = Object.prototype.toString.call(array) === "[object Array]",
        tmp_arr = preserve_keys ? {} : [],
        key;
        
    if (isArray && !preserve_keys) {
        return array.slice(0).reverse();
    }

    if (preserve_keys) {
        var keys = [];
        for (key in array) {
            // if (array.hasOwnProperty(key)) {
            keys.push(key);
            // }
        }
        
        var i = keys.length;
        while (i--) {
            key = keys[i];
            // FIXME: don't rely on browsers keeping keys in insertion order
            // it's implementation specific
            // eg. the result will differ from expected in Google Chrome
            tmp_arr[key] = array[key];
        }
    } else {
        for (key in array) {
            // if (array.hasOwnProperty(key)) {
            tmp_arr.unshift(array[key]);
            // }
        }
    }

    return tmp_arr;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_reverse.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_reverse.js">edit on github</a></li>
</ul>

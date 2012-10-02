---
layout: post
title: "JavaScript array_udiff_assoc function"
date: 2011-12-29 12:00:00
comments: true
sharing: true
footer: true
permalink: /functions/array_udiff_assoc
alias:
- /functions/array_udiff_assoc:341
- /functions/341
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_udiff_assoc
<!-- more -->
{% codeblock array/array_udiff_assoc.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_udiff_assoc.js raw on github %}
function array_udiff_assoc (arr1) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_udiff_assoc({0: 'kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;});
    // *     returns 1: {1: 'van', 2: 'Zonneveld'}
    var retArr = {},
        arglm1 = arguments.length - 1,
        cb = arguments[arglm1],
        arr = {},
        i = 1,
        k1 = '',
        k = '';
    cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;

    arr1keys: for (k1 in arr1) {
        for (i = 1; i < arglm1; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (cb(arr[k], arr1[k1]) === 0 && k === k1) {
                    // If it reaches here, it was found in at least one array, so try next value
                    continue arr1keys;
                }
            }
            retArr[k1] = arr1[k1];
        }
    }

    return retArr;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_udiff_assoc.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_udiff_assoc.js">edit on github</a></li>
</ul>

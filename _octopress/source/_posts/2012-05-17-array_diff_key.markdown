---
layout: post
title: "JavaScript array_diff_key function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/array_diff_key
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_diff_key
<!-- more -->
{% codeblock array/array_diff_key.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_diff_key.js raw on github %}
function array_diff_key (arr1) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ates Goral (http://magnetiq.com)
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // +    input by: Everlasto
    // *     example 1: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5});
    // *     returns 1: {"green":2, "blue":3, "white":4}
    // *     example 2: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5});
    // *     returns 2: {"green":2, "blue":3, "white":4}
    var argl = arguments.length,
        retArr = {},
        k1 = '',
        i = 1,
        k = '',
        arr = {};

    arr1keys: for (k1 in arr1) {
        for (i = 1; i < argl; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (k === k1) {
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
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_diff_key.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_diff_key.js">edit on github</a></li>
</ul>

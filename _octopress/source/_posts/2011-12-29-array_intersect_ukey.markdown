---
layout: post
title: "JavaScript array_intersect_ukey function"
date: 2011-12-29 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/array_intersect_ukey
alias:
- /phpjs/functions/array_intersect_ukey:322
- /phpjs/functions/322
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_intersect_ukey
<!-- more -->
{% codeblock array/array_intersect_ukey.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_intersect_ukey.js raw on github %}
function array_intersect_ukey (arr1) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: $array1 = {blue: 1, red: 2, green: 3, purple: 4}
    // *     example 1: $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
    // *     example 1: array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
    // *     returns 1: {blue: 1, green: 3}
    var retArr = {},
        arglm1 = arguments.length - 1,
        arglm2 = arglm1 - 1,
        cb = arguments[arglm1],
        k1 = '',
        i = 1,
        arr = {},
        k = '';

    cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;

    arr1keys: for (k1 in arr1) {
        arrs: for (i = 1; i < arglm1; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (cb(k, k1) === 0) {
                    if (i === arglm2) {
                        retArr[k1] = arr1[k1];
                    }
                    // If the innermost loop always leads at least once to an equal value, continue the loop until done
                    continue arrs;
                }
            }
            // If it reaches here, it wasn't found in at least one array, so try next value
            continue arr1keys;
        }
    }

    return retArr;

}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_intersect_ukey.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_intersect_ukey.js">edit on github</a></li>
</ul>

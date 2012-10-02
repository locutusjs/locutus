---
layout: post
title: "JavaScript array_diff_ukey function"
comments: true
sharing: true
footer: true
permalink: /functions/array_diff_ukey
alias:
- /functions/array_diff_ukey:313
- /functions/313
categories:
- php array extension
- functions
---
A JavaScript equivalent of PHP's array_diff_ukey

<!-- more -->

{% codeblock array/array_diff_ukey.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_diff_ukey.js raw on github %}
function array_diff_ukey (arr1) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: $array1 = {blue: 1, red: 2, green: 3, purple: 4}
    // *     example 1: $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
    // *     example 1: array_diff_ukey($array1, $array2, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
    // *     returns 1: {red: 2, purple: 4}
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
                if (cb(k, k1) === 0) {
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

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/array/array_diff_ukey.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/array/array_diff_ukey.js)


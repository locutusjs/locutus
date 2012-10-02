---
layout: post
title: "JavaScript array_diff_uassoc function"
comments: true
sharing: true
footer: true
permalink: /functions/array_diff_uassoc
alias:
- /functions/array_diff_uassoc:312
- /functions/312
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_diff_uassoc
<!-- more -->
{% codeblock array/array_diff_uassoc.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_diff_uassoc.js raw on github %}
function array_diff_uassoc (arr1) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
    // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
    // *     example 1: array_diff_uassoc($array1, $array2, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
    // *     returns 1: {b: 'brown', c: 'blue', 0: 'red'}
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
                if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
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
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_diff_uassoc.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_diff_uassoc.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript array_diff_assoc function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/array_diff_assoc
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_diff_assoc
<!-- more -->
{% codeblock array/array_diff_assoc.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_diff_assoc.js raw on github %}
function array_diff_assoc (arr1) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: 0m3r
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});
    // *     returns 1: {1: 'van', 2: 'Zonneveld'}
    var retArr = {},
        argl = arguments.length,
        k1 = '',
        i = 1,
        k = '',
        arr = {};

    arr1keys: for (k1 in arr1) {
        for (i = 1; i < argl; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (arr[k] === arr1[k1] && k === k1) {
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
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_diff_assoc.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_diff_assoc.js">edit on github</a></li>
</ul>

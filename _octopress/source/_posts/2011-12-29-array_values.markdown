---
layout: post
title: "JavaScript array_values function"
date: 2011-12-29 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/array_values
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_values
<!-- more -->
{% codeblock array/array_values.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_values.js raw on github %}
function array_values (input) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}
    var tmp_arr = [],
        key = '';

    if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return input.values();
    }

    for (key in input) {
        tmp_arr[tmp_arr.length] = input[key];
    }

    return tmp_arr;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_values.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_values.js">edit on github</a></li>
</ul>

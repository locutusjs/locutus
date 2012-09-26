---
layout: post
title: "JavaScript array_fill_keys function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/array_fill_keys
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_fill_keys
<!-- more -->
{% codeblock array/array_fill_keys.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_fill_keys.js raw on github %}
function array_fill_keys (keys, value) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
    // *     example 1: array_fill_keys(keys, 'banana')
    // *     returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}
    var retObj = {},
        key = '';

    for (key in keys) {
        retObj[keys[key]] = value;
    }

    return retObj;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_fill_keys.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_fill_keys.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript array_filter function"
date: 2011-12-29 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/array_filter
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_filter
<!-- more -->
{% codeblock array/array_filter.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_filter.js raw on github %}
function array_filter (arr, func) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   input by: max4ever
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Takes a function as an argument, not a function's name
    // *     example 1: var odd = function (num) {return (num & 1);}; 
    // *     example 1: array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd);
    // *     returns 1: {"a": 1, "c": 3, "e": 5}
    // *     example 2: var even = function (num) {return (!(num & 1));}
    // *     example 2: array_filter([6, 7, 8, 9, 10, 11, 12], even);
    // *     returns 2: {0: 6, 2: 8, 4: 10, 6: 12} 
    // *     example 3: var arr = array_filter({"a": 1, "b": false, "c": -1, "d": 0, "e": null, "f":'', "g":undefined});
    // *     returns 3: {"a":1, "c":-1};
    
    var retObj = {},
        k;
        
    func = func || function (v) {return v;};

    for (k in arr) {
        if (func(arr[k])) {
            retObj[k] = arr[k];
        }
    }

    return retObj;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_filter.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_filter.js">edit on github</a></li>
</ul>

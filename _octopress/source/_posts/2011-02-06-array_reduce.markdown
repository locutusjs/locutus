---
layout: post
title: "JavaScript array_reduce function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/array_reduce
alias:
- /phpjs/functions/array_reduce:333
- /phpjs/functions/333
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_reduce
<!-- more -->
{% codeblock array/array_reduce.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_reduce.js raw on github %}
function array_reduce (a_input, callback) {
    // http://kevin.vanzonneveld.net
    // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
    // %        note 1: Takes a function as an argument, not a function's name
    // *     example 1: array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;});
    // *     returns 1: 15
    var lon = a_input.length;
    var res = 0,
        i = 0;
    var tmp = [];


    for (i = 0; i < lon; i += 2) {
        tmp[0] = a_input[i];
        if (a_input[(i + 1)]) {
            tmp[1] = a_input[(i + 1)];
        } else {
            tmp[1] = 0;
        }
        res += callback.apply(null, tmp);
        tmp = [];
    }

    return res;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_reduce.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_reduce.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript array_fill function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /functions/array_fill
alias:
- /functions/array_fill:314
- /functions/314
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_fill
<!-- more -->
{% codeblock array/array_fill.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_fill.js raw on github %}
function array_fill (start_index, num, mixed_val) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // *     example 1: array_fill(5, 6, 'banana');
    // *     returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }
    var key, tmp_arr = {};

    if (!isNaN(start_index) && !isNaN(num)) {
        for (key = 0; key < num; key++) {
            tmp_arr[(key + start_index)] = mixed_val;
        }
    }

    return tmp_arr;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_fill.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_fill.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript array_product function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/array_product
categories: [functions, array ]
---
A JavaScript equivalent of PHP's array_product
<!-- more -->
{% codeblock array/array_product.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_product.js raw on github %}
function array_product (input) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // *     example 1: array_product([ 2, 4, 6, 8 ]);
    // *     returns 1: 384
    var idx = 0,
        product = 1,
        il = 0;

    if (Object.prototype.toString.call(input) !== '[object Array]') {
        return null;
    }

    il = input.length;
    while (idx < il) {
        product *= (!isNaN(input[idx]) ? input[idx] : 0);
        idx++;
    }
    return product;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_product.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_product.js">edit on github</a></li>
</ul>

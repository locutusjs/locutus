---
layout: post
title: "JavaScript array_flip function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/array_flip
categories: [functions, array ]
---
A JavaScript equivalent of PHP's array_flip
<!-- more -->
{% codeblock array/array_flip.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_flip.js raw on github %}
function array_flip (trans) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      improved by: Pier Paolo Ramon (http://www.mastersoup.com/)
    // *     example 1: array_flip( {a: 1, b: 1, c: 2} );
    // *     returns 1: {1: 'b', 2: 'c'}
    var key, tmp_ar = {};

    for (key in trans) {
        if (!trans.hasOwnProperty(key)) {continue;}
        tmp_ar[trans[key]] = key;
    }

    return tmp_ar;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_flip.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_flip.js">edit on github</a></li>
</ul>

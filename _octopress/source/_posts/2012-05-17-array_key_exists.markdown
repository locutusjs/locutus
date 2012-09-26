---
layout: post
title: "JavaScript array_key_exists function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/array_key_exists
categories: [functions, array ]
---
A JavaScript equivalent of PHP's array_key_exists
<!-- more -->
{% codeblock array/array_key_exists.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_key_exists.js raw on github %}
function array_key_exists (key, search) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
    // *     example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'});
    // *     returns 1: true
    // input sanitation
    if (!search || (search.constructor !== Array && search.constructor !== Object)) {
        return false;
    }

    return key in search;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_key_exists.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_key_exists.js">edit on github</a></li>
</ul>

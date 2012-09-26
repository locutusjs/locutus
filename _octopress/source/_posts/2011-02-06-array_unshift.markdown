---
layout: post
title: "JavaScript array_unshift function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/array_unshift
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_unshift
<!-- more -->
{% codeblock array/array_unshift.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_unshift.js raw on github %}
function array_unshift (array) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Martijn Wieringa
    // +   improved by: jmweb
    // %        note 1: Currently does not handle objects
    // *     example 1: array_unshift(['van', 'Zonneveld'], 'Kevin');
    // *     returns 1: 3
    var i = arguments.length;

    while (--i !== 0) {
        arguments[0].unshift(arguments[i]);
    }

    return arguments[0].length;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_unshift.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_unshift.js">edit on github</a></li>
</ul>

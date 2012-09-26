---
layout: post
title: "JavaScript strtoupper function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/strtoupper
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's strtoupper
<!-- more -->
{% codeblock strings/strtoupper.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/strtoupper.js raw on github %}
function strtoupper (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Onno Marsman
    // *     example 1: strtoupper('Kevin van Zonneveld');
    // *     returns 1: 'KEVIN VAN ZONNEVELD'
    return (str + '').toUpperCase();
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/strtoupper.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/strtoupper.js">edit on github</a></li>
</ul>

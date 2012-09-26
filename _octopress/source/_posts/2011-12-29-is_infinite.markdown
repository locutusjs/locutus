---
layout: post
title: "JavaScript is_infinite function"
date: 2011-12-29 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/is_infinite
categories: [ math, functions ]
---
A JavaScript equivalent of PHP's is_infinite
<!-- more -->
{% codeblock math/is_infinite.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/is_infinite.js raw on github %}
function is_infinite (val) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: is_infinite(Infinity);
    // *     returns 1: true
    // *     example 2: is_infinite(-Infinity);
    // *     returns 2: true
    // *     example 3: is_infinite(0);
    // *     returns 3: false
    var warningType = '';

    if (val === Infinity || val === -Infinity) {
        return true;
    }

    //Some warnings for maximum PHP compatibility
    if (typeof val == 'object') {
        warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
    } else if (typeof val == 'string' && !val.match(/^[\+\-]?\d/)) {
        //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
        warningType = 'string';
    }
    if (warningType) {
        throw new Error('Warning: is_infinite() expects parameter 1 to be double, ' + warningType + ' given');
    }

    return false;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/math/is_infinite.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/math/is_infinite.js">edit on github</a></li>
</ul>

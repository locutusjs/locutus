---
layout: post
title: "JavaScript is_numeric function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/is_numeric
categories: [functions, var ]
---
A JavaScript equivalent of PHP's is_numeric
<!-- more -->
{% codeblock var/is_numeric.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/is_numeric.js raw on github %}
function is_numeric (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: David
    // +   improved by: taith
    // +   bugfixed by: Tim de Koning
    // +   bugfixed by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: is_numeric(186.31);
    // *     returns 1: true
    // *     example 2: is_numeric('Kevin van Zonneveld');
    // *     returns 2: false
    // *     example 3: is_numeric('+186.31e2');
    // *     returns 3: true
    // *     example 4: is_numeric('');
    // *     returns 4: false
    // *     example 4: is_numeric([]);
    // *     returns 4: false
    return (typeof(mixed_var) === 'number' || typeof(mixed_var) === 'string') && mixed_var !== '' && !isNaN(mixed_var);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/var/is_numeric.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/var/is_numeric.js">edit on github</a></li>
</ul>

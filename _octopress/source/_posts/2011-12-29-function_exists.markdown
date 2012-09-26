---
layout: post
title: "JavaScript function_exists function"
date: 2011-12-29 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/function_exists
categories: [ funchand, functions ]
---
A JavaScript equivalent of PHP's function_exists
<!-- more -->
{% codeblock funchand/function_exists.js lang:js https://raw.github.com/kvz/phpjs/master/functions/funchand/function_exists.js raw on github %}
function function_exists (func_name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Steve Clay
    // +   improved by: Legaev Andrey
	// +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: function_exists('isFinite');
    // *     returns 1: true

    if (typeof func_name === 'string') {
        func_name = this.window[func_name];
    }
    return typeof func_name === 'function';
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/funchand/function_exists.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/funchand/function_exists.js">edit on github</a></li>
</ul>

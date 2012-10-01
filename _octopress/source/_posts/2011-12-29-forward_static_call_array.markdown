---
layout: post
title: "JavaScript forward_static_call_array function"
date: 2011-12-29 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/forward_static_call_array
alias:
- /phpjs/functions/forward_static_call_array:862
- /phpjs/functions/862
categories: [ funchand, functions ]
---
A JavaScript equivalent of PHP's forward_static_call_array
<!-- more -->
{% codeblock funchand/forward_static_call_array.js lang:js https://raw.github.com/kvz/phpjs/master/functions/funchand/forward_static_call_array.js raw on github %}
function forward_static_call_array (cb, parameters) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: No real relevance to late static binding here; might also use call_user_func_array()
    // *     example 1: forward_static_call_array('isNaN', ['a']);
    // *     returns 1: true
    // *     example 2: forward_static_call_array('isNaN', [1]);
    // *     returns 2: false

    var func;

    if (typeof cb == 'string') {
        if (typeof this[cb] == 'function') {
            func = this[cb];
        } else {
            func = (new Function(null, 'return ' + cb))();
        }
    }
    else if (Object.prototype.toString.call(cb) === '[object Array]') {
        func = eval(cb[0] + "['" + cb[1] + "']");
    }

    if (typeof func != 'function') {
        throw new Error(func + ' is not a valid function');
    }

    return func.apply(null, parameters);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/funchand/forward_static_call_array.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/funchand/forward_static_call_array.js">edit on github</a></li>
</ul>

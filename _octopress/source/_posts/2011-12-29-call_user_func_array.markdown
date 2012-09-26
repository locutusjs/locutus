---
layout: post
title: "JavaScript call_user_func_array function"
date: 2011-12-29 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/call_user_func_array
categories: [ funchand, functions ]
---
A JavaScript equivalent of PHP's call_user_func_array
<!-- more -->
{% codeblock funchand/call_user_func_array.js lang:js https://raw.github.com/kvz/phpjs/master/functions/funchand/call_user_func_array.js raw on github %}
function call_user_func_array (cb, parameters) {
    // http://kevin.vanzonneveld.net
    // +   original by: Thiago Mata (http://thiagomata.blog.com)
    // +   revised  by: Jon Hohle
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Diplom@t (http://difane.com/)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: call_user_func_array('isNaN', ['a']);
    // *     returns 1: true
    // *     example 2: call_user_func_array('isNaN', [1]);
    // *     returns 2: false
    var func;

    if (typeof cb === 'string') {
        func = (typeof this[cb] === 'function') ? this[cb] : func = (new Function(null, 'return ' + cb))();
    }
    else if (Object.prototype.toString.call(cb) === '[object Array]') {
        func = (typeof cb[0] == 'string') ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]];
    }
    else if (typeof cb === 'function') {
        func = cb;
    }

    if (typeof func !== 'function') {
        throw new Error(func + ' is not a valid function');
    }

    return (typeof cb[0] === 'string') ? func.apply(eval(cb[0]), parameters) : (typeof cb[0] !== 'object') ? func.apply(null, parameters) : func.apply(cb[0], parameters);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/funchand/call_user_func_array.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/funchand/call_user_func_array.js">edit on github</a></li>
</ul>

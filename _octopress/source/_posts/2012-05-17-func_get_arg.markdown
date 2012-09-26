---
layout: post
title: "JavaScript func_get_arg function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/func_get_arg
categories: [ funchand, functions ]
---
A JavaScript equivalent of PHP's func_get_arg
<!-- more -->
{% codeblock funchand/func_get_arg.js lang:js https://raw.github.com/kvz/phpjs/master/functions/funchand/func_get_arg.js raw on github %}
function func_get_arg (num) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: May not work in all JS implementations
    // *     example 1: function tmp_a() {return func_get_arg(1);}
    // *     example 1: tmp_a('a', 'b');
    // *     returns 1: 'a'
    if (!arguments.callee.caller) {
        try {
            throw new Error('Either you are using this in a browser which does not support the "caller" property or you are calling this from a global context');
            //return false;
        } catch (e) {
            return false;
        }
    }

    if (num > arguments.callee.caller.arguments.length - 1) {
        try {
            throw new Error('Argument number is greater than the number of arguments actually passed');
            //return false;
        } catch (e2) {
            return false;
        }
    }

    return arguments.callee.caller.arguments[num];
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/funchand/func_get_arg.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/funchand/func_get_arg.js">edit on github</a></li>
</ul>

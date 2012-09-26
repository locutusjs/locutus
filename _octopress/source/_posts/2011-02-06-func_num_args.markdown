---
layout: post
title: "JavaScript func_num_args function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/func_num_args
categories: [ funchand, functions ]
---
A JavaScript equivalent of PHP's func_num_args
<!-- more -->
{% codeblock funchand/func_num_args.js lang:js https://raw.github.com/kvz/phpjs/master/functions/funchand/func_num_args.js raw on github %}
function func_num_args () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: May not work in all JS implementations
    // *     example 1: function tmp_a () {return func_num_args();}
    // *     example 1: tmp_a('a', 'b');
    // *     returns 1: 2
    if (!arguments.callee.caller) {
        try {
            throw new Error('Either you are using this in a browser which does not support the "caller" property or you are calling this from a global context');
            //return false;
        } catch (e) {
            return false;
        }
    }

    return arguments.callee.caller.arguments.length;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/funchand/func_num_args.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/funchand/func_num_args.js">edit on github</a></li>
</ul>

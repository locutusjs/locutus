---
layout: post
title: "JavaScript func_get_args function"
comments: true
sharing: true
footer: true
permalink: /functions/func_get_args
alias:
- /functions/func_get_args:406
- /functions/406
categories: [ funchand, functions ]
---
A JavaScript equivalent of PHP's func_get_args
<!-- more -->
{% codeblock funchand/func_get_args.js lang:js https://raw.github.com/kvz/phpjs/master/functions/funchand/func_get_args.js raw on github %}
function func_get_args () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: May not work in all JS implementations
    // *     example 1: function tmp_a () {return func_get_args();}
    // *     example 1: tmp_a('a', 'b');
    // *     returns 1: ['a', 'b']
    if (!arguments.callee.caller) {
        try {
            throw new Error('Either you are using this in a browser which does not support the "caller" property or you are calling this from a global context');
            // return false;
        } catch (e) {
            return false;
        }
    }

    return Array.prototype.slice.call(arguments.callee.caller.arguments);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/funchand/func_get_args.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/funchand/func_get_args.js">edit on github</a></li>
</ul>

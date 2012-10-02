---
layout: post
title: "JavaScript runkit_function_copy function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /functions/runkit_function_copy
alias:
- /functions/runkit_function_copy:823
- /functions/823
categories: [ runkit, functions ]
---
A JavaScript equivalent of PHP's runkit_function_copy
<!-- more -->
{% codeblock runkit/runkit_function_copy.js lang:js https://raw.github.com/kvz/phpjs/master/functions/runkit/runkit_function_copy.js raw on github %}
function runkit_function_copy (funcname, targetname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Function can only be copied to and from the global context
    // *     example 1: function plus (a, b) { return (a + b); }
    // *     example 1: runkit_function_copy('plus', 'add');
    // *     returns 1: true
    if (typeof this.window[funcname] !== 'function' || this.window[targetname] !== undefined) { //  (presumably disallow overwriting existing variables)
        return false;
    }
    this.window[targetname] = this.window[funcname];
    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/runkit/runkit_function_copy.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/runkit/runkit_function_copy.js">edit on github</a></li>
</ul>

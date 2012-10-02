---
layout: post
title: "JavaScript runkit_function_remove function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/runkit_function_remove
alias:
- /functions/runkit_function_remove:825
- /functions/825
categories: [ runkit, functions ]
---
A JavaScript equivalent of PHP's runkit_function_remove
<!-- more -->
{% codeblock runkit/runkit_function_remove.js lang:js https://raw.github.com/kvz/phpjs/master/functions/runkit/runkit_function_remove.js raw on github %}
function runkit_function_remove (funcname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Function can only remove from the global context
    // *     example 1: function add (a, b, c) {return a+b+c;}
    // *     example 1: runkit_function_remove('add');
    // *     returns 1: true
    if (this.window[funcname] === undefined) { // Requires existing function?
        return false;
    }

    try {
        this.window[funcname] = undefined;
    } catch (e) {
        return false;
    }
    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/runkit/runkit_function_remove.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/runkit/runkit_function_remove.js">edit on github</a></li>
</ul>

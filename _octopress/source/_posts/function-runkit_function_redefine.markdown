---
layout: post
title: "JavaScript runkit_function_redefine function"
comments: true
sharing: true
footer: true
permalink: /functions/runkit_function_redefine
alias:
- /functions/runkit_function_redefine:824
- /functions/824
categories: [ runkit, functions ]
---
A JavaScript equivalent of PHP's runkit_function_redefine
<!-- more -->
{% codeblock runkit/runkit_function_redefine.js lang:js https://raw.github.com/kvz/phpjs/master/functions/runkit/runkit_function_redefine.js raw on github %}
function runkit_function_redefine (funcname, arglist, code) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Function can only be added to the global context; use create_function() for an anonymous function
    // *     example 1: function add (a, b, c) {return a+b+c;}
    // *     example 1: runkit_function_redefine('add', 'a, b', "return (a + b);");
    // *     returns 1: true
    if (this.window[funcname] === undefined) { // Requires existing function?
        return false;
    }

    try {
        this.window[funcname] = Function.apply(null, arglist.split(',').concat(code));
    } catch (e) {
        return false;
    }
    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/runkit/runkit_function_redefine.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/runkit/runkit_function_redefine.js">edit on github</a></li>
</ul>

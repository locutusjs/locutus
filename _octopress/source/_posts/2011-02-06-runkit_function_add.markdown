---
layout: post
title: "JavaScript runkit_function_add function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/runkit_function_add
categories: [ runkit, functions ]
---
A JavaScript equivalent of PHP's runkit_function_add
<!-- more -->
{% codeblock runkit/runkit_function_add.js lang:js https://raw.github.com/kvz/phpjs/master/functions/runkit/runkit_function_add.js raw on github %}
function runkit_function_add (funcname, arglist, code) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Function can only be added to the global context; use create_function() for an anonymous function
    // *     example 1: runkit_function_add('add', 'a, b', "return (a + b);");
    // *     returns 1: true
    if (this.window[funcname] !== undefined) { // Presumably disallows adding where exists, since there is also redefine function
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
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/runkit/runkit_function_add.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/runkit/runkit_function_add.js">edit on github</a></li>
</ul>

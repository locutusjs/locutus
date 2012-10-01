---
layout: post
title: "JavaScript runkit_function_rename function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/runkit_function_rename
alias:
- /phpjs/functions/runkit_function_rename:826
- /phpjs/functions/826
categories: [ runkit, functions ]
---
A JavaScript equivalent of PHP's runkit_function_rename
<!-- more -->
{% codeblock runkit/runkit_function_rename.js lang:js https://raw.github.com/kvz/phpjs/master/functions/runkit/runkit_function_rename.js raw on github %}
function runkit_function_rename (funcname, newname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Function can only be copied to and from the global context
    // *     example 1: function plus (a, b) { return (a + b); }
    // *     example 1: runkit_function_rename('plus', 'add');
    // *     returns 1: true
    if (typeof this.window[newname] !== 'function' || this.window[funcname] !== undefined) { //  (presumably disallow overwriting existing variables)
        return false;
    }
    this.window[newname] = this.window[funcname];
    this.window[funcname] = undefined;
    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/runkit/runkit_function_rename.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/runkit/runkit_function_rename.js">edit on github</a></li>
</ul>

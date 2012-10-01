---
layout: post
title: "JavaScript get_declared_classes function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/get_declared_classes
alias:
- /phpjs/functions/get_declared_classes:412
- /phpjs/functions/412
categories: [ classobj, functions ]
---
A JavaScript equivalent of PHP's get_declared_classes
<!-- more -->
{% codeblock classobj/get_declared_classes.js lang:js https://raw.github.com/kvz/phpjs/master/functions/classobj/get_declared_classes.js raw on github %}
function get_declared_classes () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +    depends on: class_exists
    // *     example 1: function A (z) {this.z=z} // Assign 'this' in constructor, making it class-like
    // *     example 1: function B () {}
    // *     example 1: B.c = function () {}; // Add a static method, making it class-like
    // *     example 1: function C () {}
    // *     example 1: C.prototype.z = function () {}; // Add to prototype, making it behave as a "class"
    // *     example 1: get_declared_classes()
    // *     returns 1: [C, B, A]

    var i = '',
        j = '',
        arr = [],
        already = {};

    for (i in this.window) {
        try {
            if (typeof this.window[i] === 'function') {
                if (!already[i] && this.class_exists(i)) {
                    already[i] = 1;
                    arr.push(i);
                }
            } else if (typeof this.window[i] === 'object') {
                for (j in this.window[i]) {
                    if (typeof this.window[j] === 'function' && this.window[j] && !already[j] && this.class_exists(j)) {
                        already[j] = 1;
                        arr.push(j);
                    }
                }
            }
        } catch (e) {

        }
    }

    return arr;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/classobj/get_declared_classes.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/classobj/get_declared_classes.js">edit on github</a></li>
</ul>

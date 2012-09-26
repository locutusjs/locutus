---
layout: post
title: "JavaScript get_class_vars function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/get_class_vars
categories: [functions, classobj ]
---
A JavaScript equivalent of PHP's get_class_vars
<!-- more -->
{% codeblock classobj/get_class_vars.js lang:js https://raw.github.com/kvz/phpjs/master/functions/classobj/get_class_vars.js raw on github %}
function get_class_vars (name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: function Myclass(){privMethod = function (){};}
    // *     example 1: Myclass.classMethod = function () {}
    // *     example 1: Myclass.prototype.myfunc1 = function () {return(true);};
    // *     example 1: Myclass.prototype.myfunc2 = function () {return(true);}
    // *     example 1: get_class_vars('MyClass')
    // *     returns 1: {}

    var constructor, retArr = {},
        prop = '';

    if (typeof name === 'function') {
        constructor = name;
    } else if (typeof name === 'string') {
        constructor = this.window[name];
    }

    for (prop in constructor) {
        if (typeof constructor[prop] !== 'function' && prop !== 'prototype') {
            retArr[prop] = constructor[prop];
        }
    }
    // Comment out this block to behave as "class" is usually defined in JavaScript convention
    if (constructor.prototype) {
        for (prop in constructor.prototype) {
            if (typeof constructor.prototype[prop] !== 'function') {
                retArr[prop] = constructor.prototype[prop];
            }
        }
    }

    return retArr;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/classobj/get_class_vars.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/classobj/get_class_vars.js">edit on github</a></li>
</ul>

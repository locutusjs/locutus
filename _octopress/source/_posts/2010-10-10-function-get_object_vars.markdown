---
layout: post
title: "JavaScript get_object_vars function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/get_object_vars
alias:
- /functions/get_object_vars:419
- /functions/419
categories: [ classobj, functions ]
---
A JavaScript equivalent of PHP's get_object_vars
<!-- more -->
{% codeblock classobj/get_object_vars.js lang:js https://raw.github.com/kvz/phpjs/master/functions/classobj/get_object_vars.js raw on github %}
function get_object_vars (obj) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: function Myclass () {this.privMethod = function (){}}
    // *     example 1: Myclass.classMethod = function () {}
    // *     example 1: Myclass.prototype.myfunc1 = function () {return(true);};
    // *     example 1: Myclass.prototype.myfunc2 = function () {return(true);}
    // *     example 1: get_object_vars('MyClass')
    // *     returns 1: {}
    var retArr = {},
        prop = '';

    for (prop in obj) {
        if (typeof obj[prop] !== 'function' && prop !== 'prototype') {
            retArr[prop] = obj[prop];
        }
    }
    for (prop in obj.prototype) {
        if (typeof obj.prototype[prop] !== 'function') {
            retArr[prop] = obj.prototype[prop];
        }
    }

    return retArr;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/classobj/get_object_vars.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/classobj/get_object_vars.js">edit on github</a></li>
</ul>

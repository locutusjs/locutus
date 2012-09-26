---
layout: post
title: "JavaScript method_exists function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/method_exists
categories: [ classobj, functions ]
---
A JavaScript equivalent of PHP's method_exists
<!-- more -->
{% codeblock classobj/method_exists.js lang:js https://raw.github.com/kvz/phpjs/master/functions/classobj/method_exists.js raw on github %}
function method_exists (obj, method) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: function class_a() {this.meth1 = function () {return true;}};
    // *     example 1: var instance_a = new class_a();
    // *     example 1: method_exists(instance_a, 'meth1');
    // *     returns 1: true
    // *     example 2: function class_a() {this.meth1 = function () {return true;}};
    // *     example 2: var instance_a = new class_a();
    // *     example 2: method_exists(instance_a, 'meth2');
    // *     returns 2: false
    if (typeof obj === 'string') {
        return this.window[obj] && typeof this.window[obj][method] === 'function';
    }

    return typeof obj[method] === 'function';
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/classobj/method_exists.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/classobj/method_exists.js">edit on github</a></li>
</ul>

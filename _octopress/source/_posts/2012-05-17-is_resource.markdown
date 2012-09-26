---
layout: post
title: "JavaScript is_resource function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/is_resource
categories: [ var, functions ]
---
A JavaScript equivalent of PHP's is_resource
<!-- more -->
{% codeblock var/is_resource.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/is_resource.js raw on github %}
function is_resource (handle) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Luis Salazar (http://www.freaky-media.com/)
    // *     example 1: is_resource('a');
    // *     returns 1: false
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    return !(!handle || typeof handle !== 'object' || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource');
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/var/is_resource.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/var/is_resource.js">edit on github</a></li>
</ul>

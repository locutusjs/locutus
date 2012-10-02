---
layout: post
title: "JavaScript get_resource_type function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /functions/get_resource_type
alias:
- /functions/get_resource_type:777
- /functions/777
categories: [ var, functions ]
---
A JavaScript equivalent of PHP's get_resource_type
<!-- more -->
{% codeblock var/get_resource_type.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/get_resource_type.js raw on github %}
function get_resource_type (handle) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: get_resource_type('a');
    // *     returns 1: false
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (!handle || typeof handle !== 'object' || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
        return false;
    }

    return handle.get_resource_type();
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/var/get_resource_type.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/var/get_resource_type.js">edit on github</a></li>
</ul>

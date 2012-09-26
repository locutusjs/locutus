---
layout: post
title: "JavaScript user_error function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/user_error
categories: [ errorfunc, functions ]
---
A JavaScript equivalent of PHP's user_error
<!-- more -->
{% codeblock errorfunc/user_error.js lang:js https://raw.github.com/kvz/phpjs/master/functions/errorfunc/user_error.js raw on github %}
function user_error (error_msg, error_type) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: trigger_error
    // *     example 1: user_error('Cannot divide by zero', 256);
    // *     returns 1: true
    return this.trigger_error(error_msg, error_type);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/errorfunc/user_error.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/errorfunc/user_error.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript error_get_last function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/error_get_last
categories: [ errorfunc, functions ]
---
A JavaScript equivalent of PHP's error_get_last
<!-- more -->
{% codeblock errorfunc/error_get_last.js lang:js https://raw.github.com/kvz/phpjs/master/functions/errorfunc/error_get_last.js raw on github %}
function error_get_last () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: error_get_last();
    // *     returns 1: null
    // *     example 2: error_get_last();
    // *     returns 2: {type: 256, message: 'My user error', file: 'C:\WWW\index.php', line: 2}

    return this.php_js && this.php_js.last_error ? this.php_js.last_error : null; // Only set if error triggered within at() or trigger_error()
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/errorfunc/error_get_last.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/errorfunc/error_get_last.js">edit on github</a></li>
</ul>

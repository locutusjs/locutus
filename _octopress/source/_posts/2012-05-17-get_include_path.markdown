---
layout: post
title: "JavaScript get_include_path function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/get_include_path
categories: [functions, info ]
---
A JavaScript equivalent of PHP's get_include_path
<!-- more -->
{% codeblock info/get_include_path.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/get_include_path.js raw on github %}
function get_include_path () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: get_include_path();
    // *     returns 1: '/phpjs'

    if (this.php_js && this.php_js.ini && this.php_js.ini.include_path && this.php_js.ini.include_path.local_value) {
        return this.php_js.ini.include_path.local_value;
    }
    return '';
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/info/get_include_path.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/info/get_include_path.js">edit on github</a></li>
</ul>

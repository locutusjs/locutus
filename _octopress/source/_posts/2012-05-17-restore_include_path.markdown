---
layout: post
title: "JavaScript restore_include_path function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/restore_include_path
categories: [ info, functions ]
---
A JavaScript equivalent of PHP's restore_include_path
<!-- more -->
{% codeblock info/restore_include_path.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/restore_include_path.js raw on github %}
function restore_include_path () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: restore_include_path();
    // *     returns 1: undefined

    if (this.php_js && this.php_js.ini && this.php_js.ini.include_path) {
        this.php_js.ini.include_path.local_value = this.php_js.ini.include_path.global_value;
    }
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/info/restore_include_path.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/info/restore_include_path.js">edit on github</a></li>
</ul>

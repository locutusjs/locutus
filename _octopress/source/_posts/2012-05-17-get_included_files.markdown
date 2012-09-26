---
layout: post
title: "JavaScript get_included_files function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/get_included_files
categories: [ info, functions ]
---
A JavaScript equivalent of PHP's get_included_files
<!-- more -->
{% codeblock info/get_included_files.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/get_included_files.js raw on github %}
function get_included_files () {
    // http://kevin.vanzonneveld.net
    // +   original by: Michael White (http://getsprink.com)
    // %        note 1: Uses global: php_js to keep track of included files
    // *     example 1: get_included_files();
    // *     returns 1: ['http://kevin.vanzonneveld.net/pj_tester.php']
    var cur_file = {};
    cur_file[this.window.location.href] = 1;
    if (!this.php_js) {
        this.php_js = {};
    }
    if (!this.php_js.includes) {
        this.php_js.includes = cur_file;
    }

    var includes = [];
    var i = 0;
    for (var key in this.php_js.includes) {
        includes[i] = key;
        i++;
    }

    return includes;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/info/get_included_files.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/info/get_included_files.js">edit on github</a></li>
</ul>

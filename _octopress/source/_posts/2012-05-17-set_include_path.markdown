---
layout: post
title: "JavaScript set_include_path function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/set_include_path
categories: [functions, info ]
---
A JavaScript equivalent of PHP's set_include_path
<!-- more -->
{% codeblock info/set_include_path.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/set_include_path.js raw on github %}
function set_include_path (new_include_path) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Should influence require(), include(), fopen(), file(), readfile() and file_get_contents()
    // %          note 1: Paths could conceivably allow multiple paths (separated by semicolon and allowing ".", etc.), by
    // %          note 1: checking first for valid HTTP header at targeted address
    // *     example 1: set_include_path('/php_js');
    // *     returns 1: '/old_incl_path'

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    var old_path = this.php_js.ini.include_path && this.php_js.ini.include_path.local_value;
    if (!old_path) {
        this.php_js.ini.include_path = {
            global_value: new_include_path,
            local_value: new_include_path
        };
    } else {
        this.php_js.ini.include_path.global_value = new_include_path;
        this.php_js.ini.include_path.local_value = new_include_path;
    }
    return old_path;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/info/set_include_path.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/info/set_include_path.js">edit on github</a></li>
</ul>

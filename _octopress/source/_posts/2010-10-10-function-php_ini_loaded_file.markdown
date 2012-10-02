---
layout: post
title: "JavaScript php_ini_loaded_file function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/php_ini_loaded_file
alias:
- /functions/php_ini_loaded_file:601
- /functions/601
categories: [ info, functions ]
---
A JavaScript equivalent of PHP's php_ini_loaded_file
<!-- more -->
{% codeblock info/php_ini_loaded_file.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/php_ini_loaded_file.js raw on github %}
function php_ini_loaded_file () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This string representing the path of the main ini file must be manually set by the script to this.php_js.ini_loaded_file
    // *     example 1: php_ini_loaded_file();
    // *     returns 1: 'myini.js'
    if (!this.php_js || !this.php_js.ini_loaded_file) {
        return false;
    }
    return this.php_js.ini_loaded_file;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/info/php_ini_loaded_file.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/info/php_ini_loaded_file.js">edit on github</a></li>
</ul>

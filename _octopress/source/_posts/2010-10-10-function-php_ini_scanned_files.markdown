---
layout: post
title: "JavaScript php_ini_scanned_files function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/php_ini_scanned_files
alias:
- /functions/php_ini_scanned_files:602
- /functions/602
categories: [ info, functions ]
---
A JavaScript equivalent of PHP's php_ini_scanned_files
<!-- more -->
{% codeblock info/php_ini_scanned_files.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/php_ini_scanned_files.js raw on github %}
function php_ini_scanned_files () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This comma-separated string of files contained in one directory must be manually set by the script to this.php_js.ini_scanned_files
    // *     example 1: php_ini_scanned_files();
    // *     returns 1: 'myini.js,myini2.js'
    if (!this.php_js || !this.php_js.ini_scanned_files) {
        return false;
    }
    return this.php_js.ini_scanned_files;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/info/php_ini_scanned_files.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/info/php_ini_scanned_files.js">edit on github</a></li>
</ul>

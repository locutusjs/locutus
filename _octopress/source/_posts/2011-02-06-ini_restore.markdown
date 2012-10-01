---
layout: post
title: "JavaScript ini_restore function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/ini_restore
alias:
- /phpjs/functions/ini_restore:599
- /phpjs/functions/599
categories: [ info, functions ]
---
A JavaScript equivalent of PHP's ini_restore
<!-- more -->
{% codeblock info/ini_restore.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/ini_restore.js raw on github %}
function ini_restore (varname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ini_restore('date.timezone');
    // *     returns 1: 'America/Chicago'
    if (this.php_js && this.php_js.ini && this.php_js.ini[varname]) {
        this.php_js.ini[varname].local_value = this.php_js.ini[varname].global_value;
    }
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/info/ini_restore.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/info/ini_restore.js">edit on github</a></li>
</ul>

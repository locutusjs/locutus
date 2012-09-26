---
layout: post
title: "JavaScript error_reporting function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/error_reporting
categories: [ errorfunc, functions ]
---
A JavaScript equivalent of PHP's error_reporting
<!-- more -->
{% codeblock errorfunc/error_reporting.js lang:js https://raw.github.com/kvz/phpjs/master/functions/errorfunc/error_reporting.js raw on github %}
function error_reporting (level) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: ini_set
    // %        note 1: This will not set a global_value or access level for the ini item
    // %        note 2: If you wish the default value to be as in PHP, you must manually set it
    // %        note 3: This function depends on functions implementing error handling
    // %        note 4: See also our at() error suppressor function (@ operator in PHP) in experimental/language/
    // *     example 1: error_reporting(1);
    // *     returns 1: 6135
    return this.ini_set('error_reporting', level);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/errorfunc/error_reporting.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/errorfunc/error_reporting.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript ctype_digit function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/ctype_digit
categories: [ ctype, functions ]
---
A JavaScript equivalent of PHP's ctype_digit
<!-- more -->
{% codeblock ctype/ctype_digit.js lang:js https://raw.github.com/kvz/phpjs/master/functions/ctype/ctype_digit.js raw on github %}
function ctype_digit (text) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: ctype_digit('150');
    // *     returns 1: true
    if (typeof text !== 'string') {
        return false;
    }
    // BEGIN REDUNDANT
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END REDUNDANT
    return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.dg) !== -1;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/ctype/ctype_digit.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/ctype/ctype_digit.js">edit on github</a></li>
</ul>

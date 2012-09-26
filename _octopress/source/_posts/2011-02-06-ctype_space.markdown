---
layout: post
title: "JavaScript ctype_space function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/ctype_space
categories: [ ctype, functions ]
---
A JavaScript equivalent of PHP's ctype_space
<!-- more -->
{% codeblock ctype/ctype_space.js lang:js https://raw.github.com/kvz/phpjs/master/functions/ctype/ctype_space.js raw on github %}
function ctype_space (text) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: ctype_space('\t\n');
    // *     returns 1: true
    if (typeof text !== 'string') {
        return false;
    }
    // BEGIN REDUNDANT
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END REDUNDANT
    return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.sp) !== -1;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/ctype/ctype_space.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/ctype/ctype_space.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript sql_regcase function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/sql_regcase
categories: [functions, pcre ]
---
A JavaScript equivalent of PHP's sql_regcase
<!-- more -->
{% codeblock pcre/sql_regcase.js lang:js https://raw.github.com/kvz/phpjs/master/functions/pcre/sql_regcase.js raw on github %}
function sql_regcase (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: sql_regcase('Foo - bar.');
    // *     returns 1: '[Ff][Oo][Oo] - [Bb][Aa][Rr].'
    this.setlocale('LC_ALL', 0);
    var i = 0,
        upper = '',
        lower = '',
        pos = 0,
        retStr = '';

    upper = this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.upper;
    lower = this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.lower;

    for (i = 0; i < str.length; i++) {
        if (((pos = upper.indexOf(str.charAt(i))) !== -1) || ((pos = lower.indexOf(str.charAt(i))) !== -1)) {
            retStr += '[' + upper.charAt(pos) + lower.charAt(pos) + ']';
        } else {
            retStr += str.charAt(i);
        }
    }
    return retStr;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/pcre/sql_regcase.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/pcre/sql_regcase.js">edit on github</a></li>
</ul>

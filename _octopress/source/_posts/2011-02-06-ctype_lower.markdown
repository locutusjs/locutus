---
layout: post
title: "JavaScript ctype_lower function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /functions/ctype_lower
alias:
- /functions/ctype_lower:756
- /functions/756
categories: [ ctype, functions ]
---
A JavaScript equivalent of PHP's ctype_lower
<!-- more -->
{% codeblock ctype/ctype_lower.js lang:js https://raw.github.com/kvz/phpjs/master/functions/ctype/ctype_lower.js raw on github %}
function ctype_lower (text) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: ctype_lower('abc');
    // *     returns 1: true
    if (typeof text !== 'string') {
        return false;
    }
    // BEGIN REDUNDANT
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END REDUNDANT
    return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.lw) !== -1;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/ctype/ctype_lower.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/ctype/ctype_lower.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript ctype_cntrl function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /functions/ctype_cntrl
alias:
- /functions/ctype_cntrl:753
- /functions/753
categories: [ ctype, functions ]
---
A JavaScript equivalent of PHP's ctype_cntrl
<!-- more -->
{% codeblock ctype/ctype_cntrl.js lang:js https://raw.github.com/kvz/phpjs/master/functions/ctype/ctype_cntrl.js raw on github %}
function ctype_cntrl (text) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: ctype_cntrl('\u0020');
    // *     returns 1: true
    if (typeof text !== 'string') {
        return false;
    }
    // BEGIN REDUNDANT
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END REDUNDANT
    return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.ct) !== -1;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/ctype/ctype_cntrl.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/ctype/ctype_cntrl.js">edit on github</a></li>
</ul>

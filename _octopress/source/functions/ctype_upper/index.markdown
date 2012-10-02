---
layout: page
title: "JavaScript ctype_upper function"
comments: true
sharing: true
footer: true
alias:
- /functions/ctype_upper:760
- /functions/760
---
A JavaScript equivalent of PHP's ctype_upper

{% codeblock ctype/ctype_upper.js lang:js https://raw.github.com/kvz/phpjs/master/functions/ctype/ctype_upper.js raw on github %}
function ctype_upper (text) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: ctype_upper('AZ');
    // *     returns 1: true
    if (typeof text !== 'string') {
        return false;
    }
    // BEGIN REDUNDANT
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END REDUNDANT
    return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.up) !== -1;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/ctype/ctype_upper.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/ctype/ctype_upper.js)

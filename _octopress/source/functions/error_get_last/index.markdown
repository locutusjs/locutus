---
layout: page
title: "JavaScript error_get_last function"
comments: true
sharing: true
footer: true
alias:
- /functions/error_get_last:840
- /functions/840
---
A JavaScript equivalent of PHP's error_get_last

{% codeblock errorfunc/error_get_last.js lang:js https://raw.github.com/kvz/phpjs/master/functions/errorfunc/error_get_last.js raw on github %}
function error_get_last () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: error_get_last();
    // *     returns 1: null
    // *     example 2: error_get_last();
    // *     returns 2: {type: 256, message: 'My user error', file: 'C:\WWW\index.php', line: 2}

    return this.php_js && this.php_js.last_error ? this.php_js.last_error : null; // Only set if error triggered within at() or trigger_error()
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/errorfunc/error_get_last.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/errorfunc/error_get_last.js)

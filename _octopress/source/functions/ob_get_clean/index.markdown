---
layout: page
title: "JavaScript ob_get_clean function"
comments: true
sharing: true
footer: true
alias:
- /functions/ob_get_clean:894
- /functions/894
---
A JavaScript equivalent of PHP's ob_get_clean

{% codeblock outcontrol/ob_get_clean.js lang:js https://raw.github.com/kvz/phpjs/master/functions/outcontrol/ob_get_clean.js raw on github %}
function ob_get_clean () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_get_clean();
    // *     returns 1: 'some buffer contents'

    var PHP_OUTPUT_HANDLER_START = 1,
        PHP_OUTPUT_HANDLER_END = 4;

    this.php_js = this.php_js || {};
    var phpjs = this.php_js,
        obs = phpjs.obs;
    if (!obs || !obs.length) {
        return false;
    }
    var flags = 0,
        ob = obs[obs.length - 1],
        buffer = ob.buffer;
    if (ob.callback) {
        if (!ob.status) {
            flags |= PHP_OUTPUT_HANDLER_START;
        }
        flags |= PHP_OUTPUT_HANDLER_END;
        ob.status = 2;
        buffer = ob.callback(buffer, flags);
    }
    obs.pop();
    return buffer;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/outcontrol/ob_get_clean.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/outcontrol/ob_get_clean.js)

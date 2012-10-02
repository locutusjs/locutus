---
layout: post
title: "JavaScript ob_clean function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/ob_clean
alias:
- /functions/ob_clean:890
- /functions/890
categories: [ outcontrol, functions ]
---
A JavaScript equivalent of PHP's ob_clean
<!-- more -->
{% codeblock outcontrol/ob_clean.js lang:js https://raw.github.com/kvz/phpjs/master/functions/outcontrol/ob_clean.js raw on github %}
function ob_clean () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_clean();
    // *     returns 1: undefined

    var PHP_OUTPUT_HANDLER_START = 1,
        PHP_OUTPUT_HANDLER_CONT = 2;
    this.php_js = this.php_js || {};
    var phpjs = this.php_js,
        obs = phpjs.obs;

    if (!obs || !obs.length) {
        return;
    }
    var flags = 0,
        ob = obs[obs.length - 1],
        buffer = ob.buffer;
    if (ob.callback) {
        if (!ob.status) {
            flags |= PHP_OUTPUT_HANDLER_START;
        }
        flags |= PHP_OUTPUT_HANDLER_CONT;
        ob.status = 1;
        buffer = ob.callback(buffer, flags);
    }
    ob.buffer = '';
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/outcontrol/ob_clean.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/outcontrol/ob_clean.js">edit on github</a></li>
</ul>

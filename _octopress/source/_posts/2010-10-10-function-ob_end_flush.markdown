---
layout: post
title: "JavaScript ob_end_flush function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/ob_end_flush
alias:
- /functions/ob_end_flush:892
- /functions/892
categories: [ outcontrol, functions ]
---
A JavaScript equivalent of PHP's ob_end_flush
<!-- more -->
{% codeblock outcontrol/ob_end_flush.js lang:js https://raw.github.com/kvz/phpjs/master/functions/outcontrol/ob_end_flush.js raw on github %}
function ob_end_flush () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_end_flush();
    // *     returns 1: true

    var PHP_OUTPUT_HANDLER_START = 1,
        PHP_OUTPUT_HANDLER_END = 4;

    this.php_js = this.php_js || {};
    var obs = this.php_js.obs;

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
    if (obs.length) {
        ob = obs[obs.length - 1];
        ob.buffer += buffer;
    } else {
        this.echo(buffer);
    }

    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/outcontrol/ob_end_flush.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/outcontrol/ob_end_flush.js">edit on github</a></li>
</ul>

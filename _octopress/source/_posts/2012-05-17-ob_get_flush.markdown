---
layout: post
title: "JavaScript ob_get_flush function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/ob_get_flush
categories: [ outcontrol, functions ]
---
A JavaScript equivalent of PHP's ob_get_flush
<!-- more -->
{% codeblock outcontrol/ob_get_flush.js lang:js https://raw.github.com/kvz/phpjs/master/functions/outcontrol/ob_get_flush.js raw on github %}
function ob_get_flush () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_get_flush();
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
    if (obs.length) {
        ob = obs[obs.length - 1];
        ob.buffer += buffer;
    } else {
        this.echo(buffer);
    }
    return buffer;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/outcontrol/ob_get_flush.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/outcontrol/ob_get_flush.js">edit on github</a></li>
</ul>

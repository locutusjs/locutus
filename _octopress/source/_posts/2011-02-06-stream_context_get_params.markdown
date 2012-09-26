---
layout: post
title: "JavaScript stream_context_get_params function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/stream_context_get_params
categories: [ stream, functions ]
---
A JavaScript equivalent of PHP's stream_context_get_params
<!-- more -->
{% codeblock stream/stream_context_get_params.js lang:js https://raw.github.com/kvz/phpjs/master/functions/stream/stream_context_get_params.js raw on github %}
function stream_context_get_params (stream_or_context) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var params = {notification:function (notification_code, severity, message, message_code, bytes_transferred, bytes_max) {}};
    // *     example 1: var context = stream_context_create({}, params);
    // *     example 1: stream_context_get_params(context);
    // *     returns 1: {notification:function (notification_code, severity, message, message_code, bytes_transferred, bytes_max) {}, options:{}}
    return stream_or_context.stream_params;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/stream/stream_context_get_params.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/stream/stream_context_get_params.js">edit on github</a></li>
</ul>

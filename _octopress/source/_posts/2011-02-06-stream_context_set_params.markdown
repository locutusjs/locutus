---
layout: post
title: "JavaScript stream_context_set_params function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/stream_context_set_params
alias:
- /phpjs/functions/stream_context_set_params:850
- /phpjs/functions/850
categories: [ stream, functions ]
---
A JavaScript equivalent of PHP's stream_context_set_params
<!-- more -->
{% codeblock stream/stream_context_set_params.js lang:js https://raw.github.com/kvz/phpjs/master/functions/stream/stream_context_set_params.js raw on github %}
function stream_context_set_params (stream_or_context, params) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var context = stream_context_create();
    // *     example 1: stream_context_set_params({notification:function (notification_code, severity, message, message_code, bytes_transferred, bytes_max) {}});
    // *     returns 1: true
    var param = '';

    // Docs also allow for "options" as a parameter here (i.e., setting options instead of parameters) and source seems to allow encoding, input_encoding, output_encoding, and default_mode
    for (param in params) { // Overwrites all, or just supplied? Seems like just supplied
        if (param === 'options') {
            stream_or_context.stream_options = params[param]; // Overwrite all?
        } else {
            stream_or_context.stream_params[param] = params[param];
        }
    }
    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/stream/stream_context_set_params.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/stream/stream_context_set_params.js">edit on github</a></li>
</ul>

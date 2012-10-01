---
layout: post
title: "JavaScript stream_context_set_option function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/stream_context_set_option
alias:
- /phpjs/functions/stream_context_set_option:849
- /phpjs/functions/849
categories: [ stream, functions ]
---
A JavaScript equivalent of PHP's stream_context_set_option
<!-- more -->
{% codeblock stream/stream_context_set_option.js lang:js https://raw.github.com/kvz/phpjs/master/functions/stream/stream_context_set_option.js raw on github %}
function stream_context_set_option (stream_or_context, optionsOrWrapper, option, value) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var opts = {http:{ method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n' } };
    // *     example 1: var context = stream_context_create(opts);
    // *     example 1: stream_context_set_option(context, opts);
    // *     returns 1: true
    if (option) {
        if (!stream_or_context.stream_options[optionsOrWrapper]) { // Don't overwrite all?
            stream_or_context.stream_options[optionsOrWrapper] = {};
        }
        stream_or_context.stream_options[optionsOrWrapper][option] = value;
    } else {
        stream_or_context.stream_options = optionsOrWrapper;
    }
    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/stream/stream_context_set_option.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/stream/stream_context_set_option.js">edit on github</a></li>
</ul>

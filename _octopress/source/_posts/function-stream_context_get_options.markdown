---
layout: post
title: "JavaScript stream_context_get_options function"
comments: true
sharing: true
footer: true
permalink: /functions/stream_context_get_options
alias:
- /functions/stream_context_get_options:846
- /functions/846
categories: [ stream, functions ]
---
A JavaScript equivalent of PHP's stream_context_get_options
<!-- more -->
{% codeblock stream/stream_context_get_options.js lang:js https://raw.github.com/kvz/phpjs/master/functions/stream/stream_context_get_options.js raw on github %}
function stream_context_get_options (stream_or_context) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var opts = {http:{method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n'}};
    // *     example 1: var context = stream_context_create(opts);
    // *     example 1: stream_context_get_options(context);
    // *     returns 1: {http:{ method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n' }}
    return stream_or_context.stream_options;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/stream/stream_context_get_options.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/stream/stream_context_get_options.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript stream_context_set_default function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/stream_context_set_default
categories: [functions, stream ]
---
A JavaScript equivalent of PHP's stream_context_set_default
<!-- more -->
{% codeblock stream/stream_context_set_default.js lang:js https://raw.github.com/kvz/phpjs/master/functions/stream/stream_context_set_default.js raw on github %}
function stream_context_set_default (options) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: stream_context_create
    // *     example 1: var opts = {http:{ method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n' } };
    // *     example 1: var context = stream_context_set_default(opts);
    // *     example 1: get_resource_type(context);
    // *     returns 1: 'stream-context'
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT
    if (!this.php_js.default_streams_context) {
        this.php_js.default_streams_context = this.stream_context_create(options);
    }
    this.php_js.default_streams_context.stream_options = options;

    return this.php_js.default_streams_context;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/stream/stream_context_set_default.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/stream/stream_context_set_default.js">edit on github</a></li>
</ul>

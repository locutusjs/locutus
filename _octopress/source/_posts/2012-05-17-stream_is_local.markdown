---
layout: post
title: "JavaScript stream_is_local function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/stream_is_local
categories: [ stream, functions ]
---
A JavaScript equivalent of PHP's stream_is_local
<!-- more -->
{% codeblock stream/stream_is_local.js lang:js https://raw.github.com/kvz/phpjs/master/functions/stream/stream_is_local.js raw on github %}
function stream_is_local (stream_or_url) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stream_is_local('/etc');
    // *     returns 1: true

    if (typeof stream_or_url === 'string') {
        return ((/^(https?|ftps?|ssl|tls):/).test(stream_or_url)) ? false : true; // Need a better check than this
    }
    return stream_or_url.is_local ? true : false;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/stream/stream_is_local.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/stream/stream_is_local.js">edit on github</a></li>
</ul>

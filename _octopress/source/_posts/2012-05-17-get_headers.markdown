---
layout: post
title: "JavaScript get_headers function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/get_headers
categories: [ url, functions ]
---
A JavaScript equivalent of PHP's get_headers
<!-- more -->
{% codeblock url/get_headers.js lang:js https://raw.github.com/kvz/phpjs/master/functions/url/get_headers.js raw on github %}
function get_headers (url, format) {
    // +   original by: Paulo Freitas
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: array_filter
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
    // *     example 1: get_headers('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm')[0];
    // *     returns 1: 'Date: Wed, 13 May 2009 23:53:11 GMT'
    var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) {
        throw new Error('XMLHttpRequest not supported');
    }
    var tmp, headers, pair, i, j = 0;

    req.open('HEAD', url, false);
    req.send(null);

    if (req.readyState < 3) {
        return false;
    }

    tmp = req.getAllResponseHeaders();
    tmp = tmp.split('\n');
    tmp = this.array_filter(tmp, function (value) {
        return value.substring(1) !== '';
    });
    headers = format ? {} : [];

    for (i in tmp) {
        if (format) {
            pair = tmp[i].split(':');
            headers[pair.splice(0, 1)] = pair.join(':').substring(1);
        } else {
            headers[j++] = tmp[i];
        }
    }
    return headers;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/url/get_headers.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/url/get_headers.js">edit on github</a></li>
</ul>

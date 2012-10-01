---
layout: post
title: "JavaScript stream_get_contents function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/stream_get_contents
alias:
- /phpjs/functions/stream_get_contents:856
- /phpjs/functions/856
categories: [ stream, functions ]
---
A JavaScript equivalent of PHP's stream_get_contents
<!-- more -->
{% codeblock stream/stream_get_contents.js lang:js https://raw.github.com/kvz/phpjs/master/functions/stream/stream_get_contents.js raw on github %}
function stream_get_contents (handle, maxLength, offset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var stream = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: stream_get_contents(stream, 7, 2);
    // *     returns 1: 'DOCTYPE'
    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.id) {
        return false;
    }
    offset = offset || 0;
    this.php_js.resourceDataPointer[handle.id] += offset;

    var chrs = this.php_js.resourceData[handle.id].slice(this.php_js.resourceDataPointer[handle.id]);
    chrs = maxLength >= 0 ? chrs.substr(0, maxLength) : chrs;

    this.echo(chrs);
    this.php_js.resourceDataPointer[handle.id] += chrs.length;

    return chrs;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/stream/stream_get_contents.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/stream/stream_get_contents.js">edit on github</a></li>
</ul>

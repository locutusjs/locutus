---
layout: post
title: "JavaScript fgets function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/fgets
alias:
- /functions/fgets:802
- /functions/802
categories: [ filesystem, functions ]
---
A JavaScript equivalent of PHP's fgets
<!-- more -->
{% codeblock filesystem/fgets.js lang:js https://raw.github.com/kvz/phpjs/master/functions/filesystem/fgets.js raw on github %}
function fgets (handle, length) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fgets(handle, 1);
    // *     returns 1: '<'

    var start = 0,
        fullline = '',
        endlinePos = -1,
        content = '';

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
        return false;
    }

    start = this.php_js.resourceDataPointer[handle.id];

    if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
        return false; // Resource was already closed or already reached the end of the file
    }

    content = this.php_js.resourceData[handle.id].slice(start);

    endlinePos = content.search(/\r\n?|\n/) + start + 1;
    fullline = this.php_js.resourceData[handle.id].slice(start, endlinePos + 1);
    if (fullline === '') {
        fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
    }

    length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length / 2) || 1; // two bytes per character (or surrogate), but ensure at least one

    this.php_js.resourceDataPointer[handle.id] += length;
    return this.php_js.resourceData[handle.id].substr(start, length);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/filesystem/fgets.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/filesystem/fgets.js">edit on github</a></li>
</ul>

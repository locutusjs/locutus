---
layout: post
title: "JavaScript fpassthru function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/fpassthru
categories: [functions, filesystem ]
---
A JavaScript equivalent of PHP's fpassthru
<!-- more -->
{% codeblock filesystem/fpassthru.js lang:js https://raw.github.com/kvz/phpjs/master/functions/filesystem/fpassthru.js raw on github %}
function fpassthru (handle) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fpassthru(handle);
    // *     returns 1: 3

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.id) {
        return false;
    }

    var chrs = this.php_js.resourceData[handle.id].slice(this.php_js.resourceDataPointer[handle.id]);
    this.echo(chrs);
    this.php_js.resourceDataPointer[handle.id] = this.php_js.resourceData[handle.id].length; // Place pointer at end
    return chrs;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/filesystem/fpassthru.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/filesystem/fpassthru.js">edit on github</a></li>
</ul>

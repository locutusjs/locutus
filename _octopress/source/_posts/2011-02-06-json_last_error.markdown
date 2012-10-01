---
layout: post
title: "JavaScript json_last_error function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/json_last_error
alias:
- /phpjs/functions/json_last_error:878
- /phpjs/functions/878
categories: [ json, functions ]
---
A JavaScript equivalent of PHP's json_last_error
<!-- more -->
{% codeblock json/json_last_error.js lang:js https://raw.github.com/kvz/phpjs/master/functions/json/json_last_error.js raw on github %}
function json_last_error () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: json_last_error();
    // *     returns 1: 0
/*
    JSON_ERROR_NONE = 0
    JSON_ERROR_DEPTH = 1 // max depth limit to be removed per PHP comments in json.c (not possible in JS?)
    JSON_ERROR_STATE_MISMATCH = 2 // internal use? also not documented
    JSON_ERROR_CTRL_CHAR = 3 // [\u0000-\u0008\u000B-\u000C\u000E-\u001F] if used directly within json_decode(),
                                                                  // but JSON functions auto-escape these, so error not possible in JavaScript
    JSON_ERROR_SYNTAX = 4
    */
    return this.php_js && this.php_js.last_error_json ? this.php_js.last_error_json : 0;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/json/json_last_error.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/json/json_last_error.js">edit on github</a></li>
</ul>

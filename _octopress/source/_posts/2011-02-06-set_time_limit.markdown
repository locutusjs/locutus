---
layout: post
title: "JavaScript set_time_limit function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /functions/set_time_limit
alias:
- /functions/set_time_limit:786
- /functions/786
categories: [ info, functions ]
---
A JavaScript equivalent of PHP's set_time_limit
<!-- more -->
{% codeblock info/set_time_limit.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/set_time_limit.js raw on github %}
function set_time_limit (seconds) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: set_time_limit(4);
    // *     returns 1: undefined

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT

    this.window.setTimeout(function () {
        if (!this.php_js.timeoutStatus) {
            this.php_js.timeoutStatus = true;
        }
        throw 'Maximum execution time exceeded';
    }, seconds * 1000);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/info/set_time_limit.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/info/set_time_limit.js">edit on github</a></li>
</ul>

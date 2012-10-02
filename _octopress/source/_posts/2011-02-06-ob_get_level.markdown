---
layout: post
title: "JavaScript ob_get_level function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /functions/ob_get_level
alias:
- /functions/ob_get_level:898
- /functions/898
categories: [ outcontrol, functions ]
---
A JavaScript equivalent of PHP's ob_get_level
<!-- more -->
{% codeblock outcontrol/ob_get_level.js lang:js https://raw.github.com/kvz/phpjs/master/functions/outcontrol/ob_get_level.js raw on github %}
function ob_get_level () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_get_level();
    // *     returns 1: 1

    this.php_js = this.php_js || {};
    var phpjs = this.php_js,
        ini = phpjs.ini,
        obs = phpjs.obs;

    if (!obs || !obs.length) {
        return (ini && ini['output_buffering'] && (typeof ini['output_buffering'].local_value !== 'string' || ini['output_buffering'].local_value.toLowerCase() !== 'off')) ? 1 : 0;
    }
    return obs.length;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/outcontrol/ob_get_level.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/outcontrol/ob_get_level.js">edit on github</a></li>
</ul>

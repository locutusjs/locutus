---
layout: post
title: "JavaScript ob_get_contents function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/ob_get_contents
categories: [ outcontrol, functions ]
---
A JavaScript equivalent of PHP's ob_get_contents
<!-- more -->
{% codeblock outcontrol/ob_get_contents.js lang:js https://raw.github.com/kvz/phpjs/master/functions/outcontrol/ob_get_contents.js raw on github %}
function ob_get_contents () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_get_contents();
    // *     returns 1: 'some buffer contents'

    this.php_js = this.php_js || {};
    var phpjs = this.php_js,
        ini = phpjs.ini,
        obs = phpjs.obs;
    if (!obs || !obs.length) {
        return (ini && ini.output_buffering && (typeof ini.output_buffering.local_value !== 'string' || ini.output_buffering.local_value.toLowerCase() !== 'off')) ? '' : false; // If output was already buffered, it would be available in obs
    }
    return obs[obs.length - 1].buffer; // Retrieve most recently added buffer contents
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/outcontrol/ob_get_contents.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/outcontrol/ob_get_contents.js">edit on github</a></li>
</ul>

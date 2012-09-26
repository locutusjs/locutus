---
layout: post
title: "JavaScript setcookie function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/setcookie
categories: [ network, functions ]
---
A JavaScript equivalent of PHP's setcookie
<!-- more -->
{% codeblock network/setcookie.js lang:js https://raw.github.com/kvz/phpjs/master/functions/network/setcookie.js raw on github %}
function setcookie (name, value, expires, path, domain, secure) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Andreas
    // +   bugfixed by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: setrawcookie
    // *     example 1: setcookie('author_name', 'Kevin van Zonneveld');
    // *     returns 1: true
    return this.setrawcookie(name, encodeURIComponent(value), expires, path, domain, secure);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/network/setcookie.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/network/setcookie.js">edit on github</a></li>
</ul>

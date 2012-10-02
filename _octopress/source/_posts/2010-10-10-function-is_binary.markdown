---
layout: post
title: "JavaScript is_binary function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/is_binary
alias:
- /functions/is_binary:591
- /functions/591
categories: [ var, functions ]
---
A JavaScript equivalent of PHP's is_binary
<!-- more -->
{% codeblock var/is_binary.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/is_binary.js raw on github %}
function is_binary (vr) {
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: is_binary('This could be binary as far as JavaScript knows...');
    // *     returns 1: true
    return typeof vr === 'string'; // If it is a string of any kind, it could be binary
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/var/is_binary.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/var/is_binary.js">edit on github</a></li>
</ul>

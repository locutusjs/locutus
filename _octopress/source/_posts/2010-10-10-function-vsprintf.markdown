---
layout: post
title: "JavaScript vsprintf function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/vsprintf
alias:
- /functions/vsprintf:580
- /functions/580
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's vsprintf
<!-- more -->
{% codeblock strings/vsprintf.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/vsprintf.js raw on github %}
function vsprintf (format, args) {
    // http://kevin.vanzonneveld.net
    // +   original by: ejsanders
    // -    depends on: sprintf
    // *     example 1: vsprintf('%04d-%02d-%02d', [1988, 8, 1]);
    // *     returns 1: '1988-08-01'
    return this.sprintf.apply(this, [format].concat(args));
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/vsprintf.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/vsprintf.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript quotemeta function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /functions/quotemeta
alias:
- /functions/quotemeta:496
- /functions/496
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's quotemeta
<!-- more -->
{% codeblock strings/quotemeta.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/quotemeta.js raw on github %}
function quotemeta (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    // *     example 1: quotemeta(". + * ? ^ ( $ )");
    // *     returns 1: '\. \+ \* \? \^ \( \$ \)'
    return (str + '').replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1');
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/quotemeta.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/quotemeta.js">edit on github</a></li>
</ul>

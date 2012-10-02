---
layout: post
title: "JavaScript quotemeta function"
comments: true
sharing: true
footer: true
permalink: /functions/quotemeta
alias:
- /functions/quotemeta:496
- /functions/496
categories:
- php strings extension
- functions
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

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/strings/quotemeta.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/strings/quotemeta.js)


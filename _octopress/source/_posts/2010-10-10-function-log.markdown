---
layout: post
title: "JavaScript log function"
comments: true
sharing: true
footer: true
permalink: /functions/log
alias:
- /functions/log:464
- /functions/464
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's log

<!-- more -->

{% codeblock math/log.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/log.js raw on github %}
function log (arg, base) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: log(8723321.4, 7);
    // *     returns 1: 8.212871815082147
    return (typeof base === 'undefined') ? 
        Math.log(arg) :
        Math.log(arg) / Math.log(base);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/log.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/log.js)


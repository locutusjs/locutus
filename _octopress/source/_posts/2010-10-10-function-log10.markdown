---
layout: post
title: "JavaScript log10 function"
comments: true
sharing: true
footer: true
permalink: /functions/log10
alias:
- /functions/log10:465
- /functions/465
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's log10

<!-- more -->

{% codeblock math/log10.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/log10.js raw on github %}
function log10 (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Onno Marsman
    // +   improved by: Tod Gentille
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: log10(10);
    // *     returns 1: 1
    // *     example 2: log10(1);
    // *     returns 2: 0
    return Math.log(arg) / 2.302585092994046; // Math.LN10
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/log10.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/log10.js)


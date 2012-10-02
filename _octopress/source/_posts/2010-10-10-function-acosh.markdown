---
layout: post
title: "JavaScript acosh function"
comments: true
sharing: true
footer: true
permalink: /functions/acosh
alias:
- /functions/acosh:302
- /functions/302
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's acosh

<!-- more -->

{% codeblock math/acosh.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/acosh.js raw on github %}
function acosh (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: acosh(8723321.4);
    // *     returns 1: 16.674657798418625
    return Math.log(arg + Math.sqrt(arg * arg - 1));
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/acosh.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/acosh.js)


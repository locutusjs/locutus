---
layout: post
title: "JavaScript tan function"
comments: true
sharing: true
footer: true
permalink: /functions/tan
alias:
- /functions/tan:560
- /functions/560
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's tan

<!-- more -->

{% codeblock math/tan.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/tan.js raw on github %}
function tan (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: tan(8723321.4);
    // *     returns 1: 5.4251848798444815
    return Math.tan(arg);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/tan.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/tan.js)


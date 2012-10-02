---
layout: post
title: "JavaScript floor function"
comments: true
sharing: true
footer: true
permalink: /functions/floor
alias:
- /functions/floor:403
- /functions/403
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's floor

<!-- more -->

{% codeblock math/floor.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/floor.js raw on github %}
function floor (value) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: floor(8723321.4);
    // *     returns 1: 8723321
    return Math.floor(value);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/floor.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/floor.js)


---
layout: page
title: "JavaScript hypot function"
comments: true
sharing: true
footer: true
alias:
- /functions/hypot:429
- /functions/429
---
A JavaScript equivalent of PHP's hypot

{% codeblock math/hypot.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/hypot.js raw on github %}
function hypot (x, y) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: hypot(3, 4);
    // *     returns 1: 5
    // *     example 2: hypot([], 'a');
    // *     returns 2: 0
    return Math.sqrt(x * x + y * y) || 0;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/hypot.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/hypot.js)

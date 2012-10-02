---
layout: page
title: "JavaScript atan2 function"
comments: true
sharing: true
footer: true
alias:
- /functions/atan2:768
- /functions/768
---
A JavaScript equivalent of PHP's atan2

{% codeblock math/atan2.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/atan2.js raw on github %}
function atan2 (y, x) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: atan2(1, 1);
    // *     returns 1: 0.7853981633974483
    return Math.atan2(y, x);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/atan2.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/atan2.js)

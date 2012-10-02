---
layout: page
title: "JavaScript is_long function"
comments: true
sharing: true
footer: true
alias:
- /functions/is_long:446
- /functions/446
---
A JavaScript equivalent of PHP's is_long

{% codeblock var/is_long.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/is_long.js raw on github %}
function is_long (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    //  -   depends on: is_float
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: is_long(186.31);
    // *     returns 1: true
    return this.is_float(mixed_var);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/var/is_long.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/var/is_long.js)

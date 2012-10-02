---
layout: page
title: "JavaScript is_scalar function"
comments: true
sharing: true
footer: true
alias:
- /functions/is_scalar:452
- /functions/452
---
A JavaScript equivalent of PHP's is_scalar

{% codeblock var/is_scalar.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/is_scalar.js raw on github %}
function is_scalar (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    // *     example 1: is_scalar(186.31);
    // *     returns 1: true
    // *     example 2: is_scalar({0: 'Kevin van Zonneveld'});
    // *     returns 2: false
    return (/boolean|number|string/).test(typeof mixed_var);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/var/is_scalar.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/var/is_scalar.js)

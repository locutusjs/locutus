---
layout: page
title: "JavaScript is_null function"
comments: true
sharing: true
footer: true
alias:
- /functions/is_null:448
- /functions/448
---
A JavaScript equivalent of PHP's is_null

{% codeblock var/is_null.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/is_null.js raw on github %}
function is_null (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: is_null('23');
    // *     returns 1: false
    // *     example 2: is_null(null);
    // *     returns 2: true
    return (mixed_var === null);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/var/is_null.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/var/is_null.js)

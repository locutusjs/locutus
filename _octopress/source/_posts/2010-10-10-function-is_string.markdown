---
layout: post
title: "JavaScript is_string function"
comments: true
sharing: true
footer: true
permalink: /functions/is_string
alias:
- /functions/is_string:453
- /functions/453
categories:
- php var extension
- functions
---
A JavaScript equivalent of PHP's is_string

<!-- more -->

{% codeblock var/is_string.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/is_string.js raw on github %}
function is_string (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: is_string('23');
    // *     returns 1: true
    // *     example 2: is_string(23.5);
    // *     returns 2: false
    return (typeof(mixed_var) == 'string');
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/var/is_string.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/var/is_string.js)


---
layout: page
title: "JavaScript is_float function"
comments: true
sharing: true
footer: true
alias:
- /functions/is_float:442
- /functions/442
---
A JavaScript equivalent of PHP's is_float

{% codeblock var/is_float.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/is_float.js raw on github %}
function is_float (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: is_float(186.31);
    // *     returns 1: true

    return +mixed_var === mixed_var && (!isFinite(mixed_var) || !!(mixed_var % 1));
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/var/is_float.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/var/is_float.js)

---
layout: page
title: "JavaScript chop function"
comments: true
sharing: true
footer: true
alias:
- /functions/chop:367
- /functions/367
---
A JavaScript equivalent of PHP's chop

{% codeblock strings/chop.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/chop.js raw on github %}
function chop (str, charlist) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    // -    depends on: rtrim
    // *     example 1: rtrim('    Kevin van Zonneveld    ');
    // *     returns 1: '    Kevin van Zonneveld'
    return this.rtrim(str, charlist);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/strings/chop.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/strings/chop.js)

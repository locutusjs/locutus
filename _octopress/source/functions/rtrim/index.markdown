---
layout: page
title: "JavaScript rtrim function"
comments: true
sharing: true
footer: true
alias:
- /functions/rtrim:507
- /functions/507
---
A JavaScript equivalent of PHP's rtrim

{% codeblock strings/rtrim.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/rtrim.js raw on github %}
function rtrim (str, charlist) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   input by: rem
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: rtrim('    Kevin van Zonneveld    ');
    // *     returns 1: '    Kevin van Zonneveld'
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
    var re = new RegExp('[' + charlist + ']+$', 'g');
    return (str + '').replace(re, '');
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/strings/rtrim.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/strings/rtrim.js)

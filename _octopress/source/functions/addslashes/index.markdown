---
layout: page
title: "JavaScript addslashes function"
comments: true
sharing: true
footer: true
alias:
- /functions/addslashes:303
- /functions/303
---
A JavaScript equivalent of PHP's addslashes

{% codeblock strings/addslashes.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/addslashes.js raw on github %}
function addslashes (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: marrtins
    // +   improved by: Nate
    // +   improved by: Onno Marsman
    // +   input by: Denny Wardhana
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Oskar Larsson Högfeldt (http://oskar-lh.name/)
    // *     example 1: addslashes("kevin's birthday");
    // *     returns 1: 'kevin\'s birthday'
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/strings/addslashes.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/strings/addslashes.js)

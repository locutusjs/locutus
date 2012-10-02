---
layout: page
title: "JavaScript split function"
comments: true
sharing: true
footer: true
alias:
- /functions/split:521
- /functions/521
---
A JavaScript equivalent of PHP's split

{% codeblock strings/split.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/split.js raw on github %}
function split (delimiter, string) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: explode
    // *     example 1: split(' ', 'Kevin van Zonneveld');
    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
    return this.explode(delimiter, string);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/strings/split.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/strings/split.js)

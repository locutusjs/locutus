---
layout: post
title: "JavaScript strripos function"
comments: true
sharing: true
footer: true
permalink: /functions/strripos
alias:
- /functions/strripos:548
- /functions/548
categories:
- php strings extension
- functions
---
A JavaScript equivalent of PHP's strripos

<!-- more -->

{% codeblock strings/strripos.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/strripos.js raw on github %}
function strripos (haystack, needle, offset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   input by: saulius
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: strripos('Kevin van Zonneveld', 'E');
    // *     returns 1: 16
    haystack = (haystack + '').toLowerCase();
    needle = (needle + '').toLowerCase();

    var i = -1;
    if (offset) {
        i = (haystack + '').slice(offset).lastIndexOf(needle); // strrpos' offset indicates starting point of range till end,
        // while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
        if (i !== -1) {
            i += offset;
        }
    } else {
        i = (haystack + '').lastIndexOf(needle);
    }
    return i >= 0 ? i : false;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/strings/strripos.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/strings/strripos.js)


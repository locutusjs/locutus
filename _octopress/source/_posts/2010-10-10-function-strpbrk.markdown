---
layout: post
title: "JavaScript strpbrk function"
comments: true
sharing: true
footer: true
permalink: /functions/strpbrk
alias:
- /functions/strpbrk:544
- /functions/544
categories:
- php strings extension
- functions
---
A JavaScript equivalent of PHP's strpbrk

<!-- more -->

{% codeblock strings/strpbrk.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/strpbrk.js raw on github %}
function strpbrk (haystack, char_list) {
    // http://kevin.vanzonneveld.net
    // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
    // +   bugfixed by: Onno Marsman
    // +    revised by: Christoph
    // +    improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: strpbrk('This is a Simple text.', 'is');
    // *     returns 1: 'is is a Simple text.'
    for (var i = 0, len = haystack.length; i < len; ++i) {
        if (char_list.indexOf(haystack.charAt(i)) >= 0) {
            return haystack.slice(i);
        }
    }
    return false;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/strings/strpbrk.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/strings/strpbrk.js)


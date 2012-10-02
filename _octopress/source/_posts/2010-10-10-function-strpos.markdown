---
layout: post
title: "JavaScript strpos function"
comments: true
sharing: true
footer: true
permalink: /functions/strpos
alias:
- /functions/strpos:545
- /functions/545
categories:
- php strings extension
- functions
---
A JavaScript equivalent of PHP's strpos

<!-- more -->

{% codeblock strings/strpos.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/strpos.js raw on github %}
function strpos (haystack, needle, offset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Onno Marsman    
    // +   bugfixed by: Daniel Esteban
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
    // *     returns 1: 14
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/strings/strpos.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/strings/strpos.js)


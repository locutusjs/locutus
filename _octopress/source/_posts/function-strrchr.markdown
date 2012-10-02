---
layout: post
title: "JavaScript strrchr function"
comments: true
sharing: true
footer: true
permalink: /functions/strrchr
alias:
- /functions/strrchr:546
- /functions/546
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's strrchr
<!-- more -->
{% codeblock strings/strrchr.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/strrchr.js raw on github %}
function strrchr (haystack, needle) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Jason Wong (http://carrot.org/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: strrchr("Line 1\nLine 2\nLine 3", 10).substr(1)
    // *     returns 1: 'Line 3'
    var pos = 0;

    if (typeof needle !== 'string') {
        needle = String.fromCharCode(parseInt(needle, 10));
    }
    needle = needle.charAt(0);
    pos = haystack.lastIndexOf(needle);
    if (pos === -1) {
        return false;
    }

    return haystack.substr(pos);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/strrchr.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/strrchr.js">edit on github</a></li>
</ul>

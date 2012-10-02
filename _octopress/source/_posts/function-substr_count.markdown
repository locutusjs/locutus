---
layout: post
title: "JavaScript substr_count function"
comments: true
sharing: true
footer: true
permalink: /functions/substr_count
alias:
- /functions/substr_count:559
- /functions/559
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's substr_count
<!-- more -->
{% codeblock strings/substr_count.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/substr_count.js raw on github %}
function substr_count (haystack, needle, offset, length) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Thomas
    // *     example 1: substr_count('Kevin van Zonneveld', 'e');
    // *     returns 1: 3
    // *     example 2: substr_count('Kevin van Zonneveld', 'K', 1);
    // *     returns 2: 0
    // *     example 3: substr_count('Kevin van Zonneveld', 'Z', 0, 10);
    // *     returns 3: false

    var cnt = 0;

    haystack += '';
    needle += '';
    if (isNaN(offset)) {
        offset = 0;
    }
    if (isNaN(length)) {
        length = 0;
    }
    offset--;

    while ((offset = haystack.indexOf(needle, offset + 1)) != -1) {
        if (length > 0 && (offset + needle.length) > length) {
            return false;
        }
        cnt++;
    }

    return cnt;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/substr_count.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/substr_count.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript str_shuffle function"
comments: true
sharing: true
footer: true
permalink: /functions/str_shuffle
alias:
- /functions/str_shuffle:529
- /functions/529
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's str_shuffle
<!-- more -->
{% codeblock strings/str_shuffle.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/str_shuffle.js raw on github %}
function str_shuffle (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: shuffled = str_shuffle("abcdef");
    // *     results 1: shuffled.length == 6
    if (arguments.length === 0) {
        throw 'Wrong parameter count for str_shuffle()';
    }
    
    if (str == null) {
        return '';
    }
    
    str += '';

    var newStr = '', rand, i = str.length;

    while (i) {
        rand = Math.floor(Math.random() * i);
        newStr += str.charAt(rand);
        str = str.substring(0, rand) + str.substr(rand + 1);
        i--;
    }

    return newStr;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/str_shuffle.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/str_shuffle.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript stripslashes function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/stripslashes
alias:
- /functions/stripslashes:537
- /functions/537
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's stripslashes
<!-- more -->
{% codeblock strings/stripslashes.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/stripslashes.js raw on github %}
function stripslashes (str) {
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +      fixed by: Mick@el
    // +   improved by: marrtins
    // +   bugfixed by: Onno Marsman
    // +   improved by: rezna
    // +   input by: Rick Waldron
    // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Brant Messenger (http://www.brantmessenger.com/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stripslashes('Kevin\'s code');
    // *     returns 1: "Kevin's code"
    // *     example 2: stripslashes('Kevin\\\'s code');
    // *     returns 2: "Kevin\'s code"
    return (str + '').replace(/\\(.?)/g, function (s, n1) {
        switch (n1) {
        case '\\':
            return '\\';
        case '0':
            return '\u0000';
        case '':
            return '';
        default:
            return n1;
        }
    });
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/stripslashes.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/stripslashes.js">edit on github</a></li>
</ul>

---
layout: page
title: "JavaScript stripslashes function"
comments: true
sharing: true
footer: true
alias:
- /functions/stripslashes:537
- /functions/537
---
A JavaScript equivalent of PHP's stripslashes

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

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/strings/stripslashes.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/strings/stripslashes.js)

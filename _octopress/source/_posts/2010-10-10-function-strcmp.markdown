---
layout: post
title: "JavaScript strcmp function"
comments: true
sharing: true
footer: true
permalink: /functions/strcmp
alias:
- /functions/strcmp:533
- /functions/533
categories:
- php strings extension
- functions
---
A JavaScript equivalent of PHP's strcmp

<!-- more -->

{% codeblock strings/strcmp.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/strcmp.js raw on github %}
function strcmp (str1, str2) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // +      input by: Steve Hilder
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: gorthaur
    // *     example 1: strcmp( 'waldo', 'owald' );
    // *     returns 1: 1
    // *     example 2: strcmp( 'owald', 'waldo' );
    // *     returns 2: -1
    return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/strings/strcmp.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/strings/strcmp.js)


---
layout: post
title: "JavaScript strchr function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/strchr
alias:
- /functions/strchr:532
- /functions/532
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's strchr
<!-- more -->
{% codeblock strings/strchr.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/strchr.js raw on github %}
function strchr (haystack, needle, bool) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // -    depends on: strstr
    // *     example 1: strchr('Kevin van Zonneveld', 'van');
    // *     returns 1: 'van Zonneveld'
    // *     example 2: strchr('Kevin van Zonneveld', 'van', true);
    // *     returns 2: 'Kevin '
    return this.strstr(haystack, needle, bool);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/strchr.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/strchr.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript basename function"
comments: true
sharing: true
footer: true
permalink: /functions/basename
alias:
- /functions/basename:360
- /functions/360
categories: [ filesystem, functions ]
---
A JavaScript equivalent of PHP's basename
<!-- more -->
{% codeblock filesystem/basename.js lang:js https://raw.github.com/kvz/phpjs/master/functions/filesystem/basename.js raw on github %}
function basename (path, suffix) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Lincoln Ramsay
    // +   improved by: djmix
    // *     example 1: basename('/www/site/home.htm', '.htm');
    // *     returns 1: 'home'
    // *     example 2: basename('ecra.php?p=1');
    // *     returns 2: 'ecra.php?p=1'
    var b = path.replace(/^.*[\/\\]/g, '');

    if (typeof(suffix) == 'string' && b.substr(b.length - suffix.length) == suffix) {
        b = b.substr(0, b.length - suffix.length);
    }

    return b;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/filesystem/basename.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/filesystem/basename.js">edit on github</a></li>
</ul>

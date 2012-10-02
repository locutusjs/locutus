---
layout: post
title: "JavaScript feof function"
comments: true
sharing: true
footer: true
permalink: /functions/feof
alias:
- /functions/feof:772
- /functions/772
categories: [ filesystem, functions ]
---
A JavaScript equivalent of PHP's feof
<!-- more -->
{% codeblock filesystem/feof.js lang:js https://raw.github.com/kvz/phpjs/master/functions/filesystem/feof.js raw on github %}
function feof (handle) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var handle = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fread(handle, 1);
    // *     example 1: feof(handle);
    // *     returns 1: false

    if (!handle || !this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer) {
        return true;
    }

    return !this.php_js.resourceData[handle.id][this.php_js.resourceDataPointer[handle.id]];

}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/filesystem/feof.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/filesystem/feof.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript sha1_file function"
comments: true
sharing: true
footer: true
permalink: /functions/sha1_file
alias:
- /functions/sha1_file:513
- /functions/513
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's sha1_file
<!-- more -->
{% codeblock strings/sha1_file.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/sha1_file.js raw on github %}
function sha1_file (str_filename) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: file_get_contents
    // -    depends on: sha1
    // *     example 1: sha1_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '40bd001563085fc35165329ea1ff5c5ecbdbbeef'
    var buf = this.file_get_contents(str_filename);
    return this.sha1(buf);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/sha1_file.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/sha1_file.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript readfile function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/readfile
alias:
- /functions/readfile:809
- /functions/809
categories: [ filesystem, functions ]
---
A JavaScript equivalent of PHP's readfile
<!-- more -->
{% codeblock filesystem/readfile.js lang:js https://raw.github.com/kvz/phpjs/master/functions/filesystem/readfile.js raw on github %}
function readfile (filename, use_include_path, context) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: echo
    // *     example 1: readfile('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'

    var read_data = this.file_get_contents(filename, use_include_path, context); // bitwise-or use_include_path?
    this.echo(read_data);
    return read_data;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/filesystem/readfile.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/filesystem/readfile.js">edit on github</a></li>
</ul>

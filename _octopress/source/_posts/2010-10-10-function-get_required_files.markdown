---
layout: post
title: "JavaScript get_required_files function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/get_required_files
alias:
- /functions/get_required_files:594
- /functions/594
categories: [ info, functions ]
---
A JavaScript equivalent of PHP's get_required_files
<!-- more -->
{% codeblock info/get_required_files.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/get_required_files.js raw on github %}
function get_required_files () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: get_included_files
    // *     example 1: get_required_files();
    // *     returns 1: ['http://kevin.vanzonneveld.net/pj_tester.php']
    return this.get_included_files();
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/info/get_required_files.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/info/get_required_files.js">edit on github</a></li>
</ul>

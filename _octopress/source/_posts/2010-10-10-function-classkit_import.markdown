---
layout: post
title: "JavaScript classkit_import function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/classkit_import
alias:
- /functions/classkit_import:762
- /functions/762
categories: [ classkit, functions ]
---
A JavaScript equivalent of PHP's classkit_import
<!-- more -->
{% codeblock classkit/classkit_import.js lang:js https://raw.github.com/kvz/phpjs/master/functions/classkit/classkit_import.js raw on github %}
function classkit_import (file) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: file_get_contents
    // %        note 1: does not return an associative array as in PHP
    // %        note 2: Implement instead with include?
    // %        note 3: CLASSKIT_AGGREGATE_OVERRIDE is mentioned as a flag at http://www.php.net/manual/en/runkit.constants.php but not in classkit docs
    // *     example 1: classkit_import('http://example.com/somefile.js');
    // *     returns 1: undefined

    eval(this.file_get_contents(file));
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/classkit/classkit_import.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/classkit/classkit_import.js">edit on github</a></li>
</ul>

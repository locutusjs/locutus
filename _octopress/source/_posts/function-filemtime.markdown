---
layout: post
title: "JavaScript filemtime function"
comments: true
sharing: true
footer: true
permalink: /functions/filemtime
alias:
- /functions/filemtime:838
- /functions/838
categories: [ filesystem, functions ]
---
A JavaScript equivalent of PHP's filemtime
<!-- more -->
{% codeblock filesystem/filemtime.js lang:js https://raw.github.com/kvz/phpjs/master/functions/filesystem/filemtime.js raw on github %}
function filemtime (file) {
    // +   original by: Ole Vrijenhoek (http://www.nervous.nl/)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: get_headers
    // %        note 1:  Looks for Last-Modified in response header.
    // *     example 1: filemtime('http://www.un.org');
    // *     returns 1: 1241532483

    var headers = {};
    headers = this.get_headers(file, 1);
    return (headers && headers['Last-Modified'] && Date.parse(headers['Last-Modified']) / 1000) || false;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/filesystem/filemtime.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/filesystem/filemtime.js">edit on github</a></li>
</ul>

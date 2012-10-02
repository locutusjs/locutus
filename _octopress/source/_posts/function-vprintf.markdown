---
layout: post
title: "JavaScript vprintf function"
comments: true
sharing: true
footer: true
permalink: /functions/vprintf
alias:
- /functions/vprintf:579
- /functions/579
categories: [ strings, functions ]
---
A JavaScript equivalent of PHP's vprintf
<!-- more -->
{% codeblock strings/vprintf.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/vprintf.js raw on github %}
function vprintf (format, args) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Michael White (http://getsprink.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: sprintf
    // *     example 1: printf("%01.2f", 123.1);
    // *     returns 1: 6
    var body, elmt;
    var ret = '',
        d = this.window.document;

    // .shift() does not work to get first item in bodies
    var HTMLNS = 'http://www.w3.org/1999/xhtml';
    body = d.getElementsByTagNameNS ? (d.getElementsByTagNameNS(HTMLNS, 'body')[0] ? d.getElementsByTagNameNS(HTMLNS, 'body')[0] : d.documentElement.lastChild) : d.getElementsByTagName('body')[0];

    if (!body) {
        return false;
    }

    ret = this.sprintf.apply(this, [format].concat(args));

    elmt = d.createTextNode(ret);
    body.appendChild(elmt);

    return ret.length;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/strings/vprintf.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/strings/vprintf.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript ctype_graph function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/ctype_graph
categories: [ ctype, functions ]
---
A JavaScript equivalent of PHP's ctype_graph
<!-- more -->
{% codeblock ctype/ctype_graph.js lang:js https://raw.github.com/kvz/phpjs/master/functions/ctype/ctype_graph.js raw on github %}
function ctype_graph (text) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: ctype_graph('!%');
    // *     returns 1: true
    if (typeof text !== 'string') {
        return false;
    }
    // BEGIN REDUNDANT
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END REDUNDANT
    return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.gr) !== -1;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/ctype/ctype_graph.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/ctype/ctype_graph.js">edit on github</a></li>
</ul>

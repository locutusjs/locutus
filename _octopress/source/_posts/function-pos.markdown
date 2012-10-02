---
layout: post
title: "JavaScript pos function"
comments: true
sharing: true
footer: true
permalink: /functions/pos
alias:
- /functions/pos:489
- /functions/489
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's pos
<!-- more -->
{% codeblock array/pos.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/pos.js raw on github %}
function pos (arr) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Uses global: php_js to store the array pointer
    // -    depends on: current
    // *     example 1: transport = ['foot', 'bike', 'car', 'plane'];
    // *     example 1: pos(transport);
    // *     returns 1: 'foot'
    return this.current(arr);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/pos.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/pos.js">edit on github</a></li>
</ul>

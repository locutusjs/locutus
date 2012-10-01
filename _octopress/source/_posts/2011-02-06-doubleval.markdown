---
layout: post
title: "JavaScript doubleval function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/doubleval
alias:
- /phpjs/functions/doubleval:389
- /phpjs/functions/389
categories: [ var, functions ]
---
A JavaScript equivalent of PHP's doubleval
<!-- more -->
{% codeblock var/doubleval.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/doubleval.js raw on github %}
function doubleval (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    //  -   depends on: floatval
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: doubleval(186);
    // *     returns 1: 186.00
    return this.floatval(mixed_var);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/var/doubleval.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/var/doubleval.js">edit on github</a></li>
</ul>

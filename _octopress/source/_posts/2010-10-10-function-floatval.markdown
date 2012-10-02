---
layout: post
title: "JavaScript floatval function"
comments: true
sharing: true
footer: true
permalink: /functions/floatval
alias:
- /functions/floatval:402
- /functions/402
categories:
- php var extension
- functions
---
A JavaScript equivalent of PHP's floatval

<!-- more -->

{% codeblock var/floatval.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/floatval.js raw on github %}
function floatval (mixed_var) {
    // +   original by: Michael White (http://getsprink.com)
    // %        note 1: The native parseFloat() method of JavaScript returns NaN when it encounters a string before an int or float value.
    // *     example 1: floatval('150.03_page-section');
    // *     returns 1: 150.03
    // *     example 2: floatval('page: 3');
    // *     returns 2: 0
    // *     example 2: floatval('-50 + 8');
    // *     returns 2: -50
    return (parseFloat(mixed_var) || 0);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/var/floatval.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/var/floatval.js)


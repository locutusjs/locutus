---
layout: post
title: "JavaScript asinh function"
comments: true
sharing: true
footer: true
permalink: /functions/asinh
alias:
- /functions/asinh:353
- /functions/353
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's asinh

<!-- more -->

{% codeblock math/asinh.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/asinh.js raw on github %}
function asinh (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: asinh(8723321.4);
    // *     returns 1: 16.67465779841863
    return Math.log(arg + Math.sqrt(arg * arg + 1));
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/asinh.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/asinh.js)


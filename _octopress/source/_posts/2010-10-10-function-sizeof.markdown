---
layout: post
title: "JavaScript sizeof function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/sizeof
alias:
- /functions/sizeof:517
- /functions/517
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's sizeof
<!-- more -->
{% codeblock array/sizeof.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/sizeof.js raw on github %}
function sizeof (mixed_var, mode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // -    depends on: count
    // *     example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6
    return this.count(mixed_var, mode);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/sizeof.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/sizeof.js">edit on github</a></li>
</ul>

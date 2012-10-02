---
layout: post
title: "JavaScript bcscale function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/bcscale
alias:
- /functions/bcscale:874
- /functions/874
categories: [ bc, functions ]
---
A JavaScript equivalent of PHP's bcscale
<!-- more -->
{% codeblock bc/bcscale.js lang:js https://raw.github.com/kvz/phpjs/master/functions/bc/bcscale.js raw on github %}
function bcscale (scale) {
    // http://kevin.vanzonneveld.net
    // +   original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)this.
    // -    depends on: _phpjs_shared_bc
    // *     example 1: bcscale(1);
    // *     returns 1: 3
    //  @todo: implement these testcases
    //        bcscale(0);
    //
    //        bcmath.test.result('bcscale', 1, false, bcscale('fail'));
    //        bcmath.test.result('bcscale', 2, false, bcscale(-1));
    //        bcmath.test.result('bcscale', 3, true, bcscale(5));
    //        bcmath.test.result('bcscale', 4, true, bcscale(0));
    var libbcmath = this._phpjs_shared_bc();

    scale = parseInt(scale, 10);
    if (isNaN(scale)) {
        return false;
    }
    if (scale < 0) {
        return false;
    }
    libbcmath.scale = scale;
    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/bc/bcscale.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/bc/bcscale.js">edit on github</a></li>
</ul>

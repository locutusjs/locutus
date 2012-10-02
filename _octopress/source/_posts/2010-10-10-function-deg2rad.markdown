---
layout: post
title: "JavaScript deg2rad function"
comments: true
sharing: true
footer: true
permalink: /functions/deg2rad
alias:
- /functions/deg2rad:386
- /functions/386
categories:
- php math extension
- functions
---
A JavaScript equivalent of PHP's deg2rad

<!-- more -->

{% codeblock math/deg2rad.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/deg2rad.js raw on github %}
function deg2rad (angle) {
    // http://kevin.vanzonneveld.net
    // +   original by: Enrique Gonzalez
    // +     improved by: Thomas Grainger (http://graingert.co.uk)
    // *     example 1: deg2rad(45);
    // *     returns 1: 0.7853981633974483
    return angle * .017453292519943295; // (angle / 180) * Math.PI;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/deg2rad.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/deg2rad.js)


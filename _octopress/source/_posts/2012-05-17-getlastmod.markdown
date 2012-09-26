---
layout: post
title: "JavaScript getlastmod function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/getlastmod
categories: [functions, info ]
---
A JavaScript equivalent of PHP's getlastmod
<!-- more -->
{% codeblock info/getlastmod.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/getlastmod.js raw on github %}
function getlastmod () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Will not work on browsers which don't support document.lastModified
    // *     example 1: getlastmod();
    // *     returns 1: 1237610043
    return new Date(this.window.document.lastModified).getTime() / 1000;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/info/getlastmod.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/info/getlastmod.js">edit on github</a></li>
</ul>

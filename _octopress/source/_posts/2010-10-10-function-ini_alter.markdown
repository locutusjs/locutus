---
layout: post
title: "JavaScript ini_alter function"
comments: true
sharing: true
footer: true
permalink: /functions/ini_alter
alias:
- /functions/ini_alter:596
- /functions/596
categories:
- php info extension
- functions
---
A JavaScript equivalent of PHP's ini_alter

<!-- more -->

{% codeblock info/ini_alter.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/ini_alter.js raw on github %}
function ini_alter (varname, newvalue) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: ini_set
    // *     example 1: ini_alter('date.timezone', 'America/Chicago');
    // *     returns 1: 'Asia/Hong_Kong'
    return this.ini_set(varname, newvalue);
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/info/ini_alter.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/info/ini_alter.js)


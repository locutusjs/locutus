---
layout: post
title: "JavaScript array_walk function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/array_walk
categories: array
---
A JavaScript equivalent of PHP's array_walk
<!-- more -->
{% codeblock array/array_walk.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_walk.js raw on github %}
function array_walk (array, funcname, userdata) {
    // http://kevin.vanzonneveld.net
    // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
    // *     example 1: array_walk ({'a':'b'}, 'void', 'userdata');
    // *     returns 1: true
    // *     example 2: array_walk ('a', 'void', 'userdata');
    // *     returns 2: false
    var key;

    if (typeof array !== 'object' || array === null) {
        return false;
    }

    for (key in array) {
        if (typeof(userdata) !== 'undefined') {
            eval(funcname + '( array [key] , key , userdata  )');
        } else {
            eval(funcname + '(  userdata ) ');
        }
    }

    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_walk.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_walk.js">edit on github</a></li>
</ul>

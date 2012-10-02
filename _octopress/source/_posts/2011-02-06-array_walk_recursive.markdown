---
layout: post
title: "JavaScript array_walk_recursive function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /functions/array_walk_recursive
alias:
- /functions/array_walk_recursive:350
- /functions/350
categories: [ array, functions ]
---
A JavaScript equivalent of PHP's array_walk_recursive
<!-- more -->
{% codeblock array/array_walk_recursive.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_walk_recursive.js raw on github %}
function array_walk_recursive (array, funcname, userdata) {
    // http://kevin.vanzonneveld.net
    // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
    // *     example 1: array_walk_recursive ({'a': 'b', 'c': {'d': 'e'}}, 'void', 'userdata');
    // *     returns 1: true
    // *     example 2: array_walk_recursive ('a', 'void', 'userdata');
    // *     returns 2: false
    var key;

    if (typeof array != 'object') {
        return false;
    }

    for (key in array) {
        if (typeof array[key] == 'object') {
            return this.array_walk_recursive(array[key], funcname, userdata);
        }

        if (typeof(userdata) != 'undefined') {
            eval(funcname + '( array [key] , key , userdata  )');
        } else {
            eval(funcname + '(  userdata ) ');
        }
    }

    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_walk_recursive.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_walk_recursive.js">edit on github</a></li>
</ul>

---
layout: post
title: "JavaScript array_rand function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/array_rand
categories: [functions, array ]
---
A JavaScript equivalent of PHP's array_rand
<!-- more -->
{% codeblock array/array_rand.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_rand.js raw on github %}
function array_rand (input, num_req) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // *     example 1: array_rand( ['Kevin'], 1 );
    // *     returns 1: 0
    var indexes = [];
    var ticks = num_req || 1;
    var checkDuplicate = function (input, value) {
        var exist = false,
            index = 0,
            il = input.length;
        while (index < il) {
            if (input[index] === value) {
                exist = true;
                break;
            }
            index++;
        }
        return exist;
    };

    if (Object.prototype.toString.call(input) === '[object Array]' && ticks <= input.length) {
        while (true) {
            var rand = Math.floor((Math.random() * input.length));
            if (indexes.length === ticks) {
                break;
            }
            if (!checkDuplicate(indexes, rand)) {
                indexes.push(rand);
            }
        }
    } else {
        indexes = null;
    }

    return ((ticks == 1) ? indexes.join() : indexes);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/array/array_rand.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/array/array_rand.js">edit on github</a></li>
</ul>

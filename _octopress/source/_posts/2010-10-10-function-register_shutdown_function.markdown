---
layout: post
title: "JavaScript register_shutdown_function function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/register_shutdown_function
alias:
- /functions/register_shutdown_function:810
- /functions/810
categories: [ funchand, functions ]
---
A JavaScript equivalent of PHP's register_shutdown_function
<!-- more -->
{% codeblock funchand/register_shutdown_function.js lang:js https://raw.github.com/kvz/phpjs/master/functions/funchand/register_shutdown_function.js raw on github %}
function register_shutdown_function (cb) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: register_shutdown_function(function(first, middle, last) {alert('Goodbye '+first+' '+middle+' '+last+'!');}, 'Kevin', 'van', 'Zonneveld');
    // *     returns 1: 'Goodbye Kevin van Zonneveld!'
    var args = [],
        _addEvent = function (el, type, handler, capturing) {
            if (el.addEventListener) { /* W3C */
                el.addEventListener(type, handler, !! capturing);
            } else if (el.attachEvent) { /* IE */
                el.attachEvent('on' + type, handler);
            } else { /* OLDER BROWSERS (DOM0) */
                el['on' + type] = handler;
            }
        };

    args = Array.prototype.slice.call(arguments, 1);
    _addEvent(this.window, 'unload', function () {
        cb.apply(null, args);
    }, false);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/funchand/register_shutdown_function.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/funchand/register_shutdown_function.js">edit on github</a></li>
</ul>

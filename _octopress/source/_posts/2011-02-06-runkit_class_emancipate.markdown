---
layout: post
title: "JavaScript runkit_class_emancipate function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/runkit_class_emancipate
categories: [ runkit, functions ]
---
A JavaScript equivalent of PHP's runkit_class_emancipate
<!-- more -->
{% codeblock runkit/runkit_class_emancipate.js lang:js https://raw.github.com/kvz/phpjs/master/functions/runkit/runkit_class_emancipate.js raw on github %}
function runkit_class_emancipate (classname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Function can only obtain classes from the global context
    // %          note 2: We have to delete all items on the prototype
    // *     example 1: function A () {}
    // *     example 1: A.prototype.methodA = function () {};
    // *     example 1: function B () {}
    // *     example 1: runkit_class_adopt('B', 'A');
    // *     example 1: runkit_class_emancipate('B');
    // *     returns 1: true

    if (typeof this.window[classname] !== 'function') {
        return false;
    }

    for (var p in this.window[classname].prototype) {
        delete this.window[classname].prototype[p];
    }
    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/runkit/runkit_class_emancipate.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/runkit/runkit_class_emancipate.js">edit on github</a></li>
</ul>

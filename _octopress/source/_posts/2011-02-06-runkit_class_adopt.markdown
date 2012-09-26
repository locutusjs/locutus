---
layout: post
title: "JavaScript runkit_class_adopt function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/runkit_class_adopt
categories: [ runkit, functions ]
---
A JavaScript equivalent of PHP's runkit_class_adopt
<!-- more -->
{% codeblock runkit/runkit_class_adopt.js lang:js https://raw.github.com/kvz/phpjs/master/functions/runkit/runkit_class_adopt.js raw on github %}
function runkit_class_adopt (classname, parentname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Function can only obtain and set classes from the global context
    // *     example 1: function A () {}
    // *     example 1: A.prototype.methodA = function () {};
    // *     example 1: function B () {}
    // *     example 1: runkit_class_adopt('B', 'A');
    // *     returns 1: true

    if (typeof this.window[classname] !== 'function' || typeof this.window[parentname] !== 'function') {
        return false;
    }

    // Classical style of inheritance
    this.window[classname].prototype = new this.window[parentname](); // Has side effects by calling the constructor!

/*
    // Prototypal completely by reference
    this.window[classname].prototype = parentname.prototype; // By mutual reference!
*/

/*
    // Mixin (deep copy, not by reference)
    var _copy = function (child, parent) {
        var p = '';
        for (p in parent) {
            if (typeof parent[p] === 'object') {
                child[p] = _copy(child[p], parent[p]);
            }
            else {
                child[p] = parent[p];
            }
        }
    };
    _copy(this.window[classname].prototype, this.window[parentname].prototype);
*/

    // Put original constructor property back
    this.window[classname].constructor = this.window[classname];
    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/runkit/runkit_class_adopt.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/runkit/runkit_class_adopt.js">edit on github</a></li>
</ul>

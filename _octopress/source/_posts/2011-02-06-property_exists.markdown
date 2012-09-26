---
layout: post
title: "JavaScript property_exists function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: functions/property_exists
categories: [ classobj, functions ]
---
A JavaScript equivalent of PHP's property_exists
<!-- more -->
{% codeblock classobj/property_exists.js lang:js https://raw.github.com/kvz/phpjs/master/functions/classobj/property_exists.js raw on github %}
function property_exists (cls, prop) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: function class_a () {this.prop1 = 'one'};
    // *     example 1: var instance_a = new class_a();
    // *     example 1: property_exists(instance_a, 'prop1');
    // *     returns 1: true
    // *     example 2: function class_a () {this.prop1 = 'one'};
    // *     example 2: var instance_a = new class_a();
    // *     example 2: property_exists(instance_a, 'prop2');
    // *     returns 2: false
    cls = (typeof cls === 'string') ? this.window[cls] : cls;

    if (typeof cls === 'function' && cls.toSource && cls.toSource().match(new RegExp('this\\.' + prop + '\\s'))) {
        // Hackish and non-standard but can probably detect if setting
        // the property (we don't want to test by instantiating as that
        // may have side-effects)
        return true;
    }

    return (cls[prop] !== undefined && typeof cls[prop] !== 'function') || (cls.prototype !== undefined && cls.prototype[prop] !== undefined && typeof cls.prototype[prop] !== 'function') || (cls.constructor && cls.constructor[prop] !== undefined && typeof cls.constructor[prop] !== 'function');
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/classobj/property_exists.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/classobj/property_exists.js">edit on github</a></li>
</ul>

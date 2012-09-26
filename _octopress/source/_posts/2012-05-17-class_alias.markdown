---
layout: post
title: "JavaScript class_alias function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/class_alias
categories: [functions, classobj ]
---
A JavaScript equivalent of PHP's class_alias
<!-- more -->
{% codeblock classobj/class_alias.js lang:js https://raw.github.com/kvz/phpjs/master/functions/classobj/class_alias.js raw on github %}
function class_alias (clss, alias, autoload) {
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This function is not documented and only available in PHP source
    // *     example 1: function someFunc () {}
    // *     example 1: class_alias('someFunc', 'olFunc');
    // *     returns 1: true

    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (autoload && typeof this.window.__autoload === 'function') {
        this.window.__autoload(clss);
    }
    if (typeof clss === 'string') {
        clss = this.window[clss];
    }
    if (typeof clss === 'undefined') {
        throw "Class '" + getFuncName(clss) + "' not found";
        return false; // Return false until replace throw with error triggering
    }
    if (typeof clss !== 'function') {
        throw 'First argument of class_alias() must be a name of user defined class';
        return false;
    }
    if (typeof this.window[alias] === 'function') {
        throw 'Cannot redeclare class ' + alias;
        return false;
    }

    this.window[alias] = clss;
    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/classobj/class_alias.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/classobj/class_alias.js">edit on github</a></li>
</ul>

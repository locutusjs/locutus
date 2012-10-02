---
layout: post
title: "JavaScript classkit_method_rename function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/classkit_method_rename
alias:
- /functions/classkit_method_rename:767
- /functions/767
categories: [ classkit, functions ]
---
A JavaScript equivalent of PHP's classkit_method_rename
<!-- more -->
{% codeblock classkit/classkit_method_rename.js lang:js https://raw.github.com/kvz/phpjs/master/functions/classkit/classkit_method_rename.js raw on github %}
function classkit_method_rename (classname, methodname, newname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: classkit_method_rename('someClass', 'someMethod', 'newMethod');
    // *     returns 1: true

    if (typeof classname === 'string') {
        classname = this.window[classname];
    }

/*
    var method = classname[methodname]; // Static
    classname[newname] = method;
    delete classname[methodname];
    */

    var method = classname.prototype[methodname];
    classname.prototype[newname] = method;
    delete classname.prototype[methodname];

    return true;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/classkit/classkit_method_rename.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/classkit/classkit_method_rename.js">edit on github</a></li>
</ul>

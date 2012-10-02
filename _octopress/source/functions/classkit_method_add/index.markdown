---
layout: page
title: "JavaScript classkit_method_add function"
comments: true
sharing: true
footer: true
alias:
- /functions/classkit_method_add:763
- /functions/763
---
A JavaScript equivalent of PHP's classkit_method_add

{% codeblock classkit/classkit_method_add.js lang:js https://raw.github.com/kvz/phpjs/master/functions/classkit/classkit_method_add.js raw on github %}
function classkit_method_add (classname, methodname, args, code, flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: function a(){}
    // *     example 1: classkit_method_add ('a', 'b', 'a,b', 'return a+b');
    // *     returns 1: true

    var func, argmnts = [];

    switch (flags) {
    case 'CLASSKIT_ACC_PROTECTED':
        throw 'Protected not supported';
    case 'CLASSKIT_ACC_PRIVATE':
        throw 'Private not supported';
    case 'CLASSKIT_ACC_PUBLIC':
    default:
        break;
    }

    argmnts = args.split(/,\s*/);

    if (typeof classname === 'string') {
        classname = this.window[classname];
    }

    // Could use the following to add as a static method to the class
    //        func = Function.apply(null, argmnts.concat(code));
    //            classname[methodname] = func;
    func = Function.apply(null, argmnts.concat(code));
    classname.prototype[methodname] = func;
    return true;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/classkit/classkit_method_add.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/classkit/classkit_method_add.js)

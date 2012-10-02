---
layout: post
title: "JavaScript runkit_method_redefine function"
comments: true
sharing: true
footer: true
permalink: /functions/runkit_method_redefine
alias:
- /functions/runkit_method_redefine:815
- /functions/815
categories: [ runkit, functions ]
---
A JavaScript equivalent of PHP's runkit_method_redefine
<!-- more -->
{% codeblock runkit/runkit_method_redefine.js lang:js https://raw.github.com/kvz/phpjs/master/functions/runkit/runkit_method_redefine.js raw on github %}
function runkit_method_redefine (classname, methodname, args, code, flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: runkit_method_redefine('someClass', 'someMethod', 'a,b', 'return a+b');
    // *     returns 1: true
    // In JavaScript, this is identical to runkit_method_add
    var argmnts = [],
        func;
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };

    switch (flags) {
    case 'RUNKIT_ACC_PROTECTED':
        throw 'Protected not supported';
    case 'RUNKIT_ACC_PRIVATE':
        throw 'Private not supported';
    case 'RUNKIT_ACC_PUBLIC':
    default:
        break;
    }

    argmnts = args.split(/,\s*/);

    if (typeof classname === 'string') {
        classname = this.window[classname];
    }

    if (getFuncName(classname) !== 'PHP_JS' || // By default, don't allow overriding of PHP functions
    (this.php_js && this.php_js.ini && this.php_js.ini['runkit.internal_override'] && (this.php_js.ini['runkit.internal_override'].local_value === true || this.php_js.ini['runkit.internal_override'].local_value === 1 || this.php_js.ini['runkit.internal_override'].local_value === '1' || this.php_js.ini['runkit.internal_override'].local_value === 'true'))) {
        // Could use the following to add as a static method to the class
        //        func = Function.apply(null, argmnts.concat(code));
        //            classname[methodname] = func;
        func = Function.apply(null, argmnts.concat(code));
        classname.prototype[methodname] = func;
        return true;
    }
    return false;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/runkit/runkit_method_redefine.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/runkit/runkit_method_redefine.js">edit on github</a></li>
</ul>

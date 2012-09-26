---
layout: post
title: "JavaScript runkit_method_remove function"
date: 2012-05-17 18:49
comments: true
sharing: true
footer: true
permalink: functions/runkit_method_remove
categories: [functions, runkit ]
---
A JavaScript equivalent of PHP's runkit_method_remove
<!-- more -->
{% codeblock runkit/runkit_method_remove.js lang:js https://raw.github.com/kvz/phpjs/master/functions/runkit/runkit_method_remove.js raw on github %}
function runkit_method_remove (classname, methodname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: runkit_method_remove('someClass', 'someMethod');
    // *     returns 1: true
    if (typeof classname === 'string') {
        classname = this.window[classname];
    }
    if (getFuncName(classname) !== 'PHP_JS' || // By default, don't allow overriding of PHP functions
    (this.php_js && this.php_js.ini && this.php_js.ini['runkit.internal_override'] && (this.php_js.ini['runkit.internal_override'].local_value === true || this.php_js.ini['runkit.internal_override'].local_value === 1 || this.php_js.ini['runkit.internal_override'].local_value === '1' || this.php_js.ini['runkit.internal_override'].local_value === 'true'))) {
        delete classname.prototype[methodname]; // Delete any on prototype
        return true;
    }
    // delete classname[methodname]; // Delete any as static class method
    return false;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/runkit/runkit_method_remove.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/runkit/runkit_method_remove.js">edit on github</a></li>
</ul>

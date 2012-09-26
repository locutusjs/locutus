---
layout: post
title: "JavaScript runkit_superglobals function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/runkit_superglobals
categories: [ runkit, functions ]
---
A JavaScript equivalent of PHP's runkit_superglobals
<!-- more -->
{% codeblock runkit/runkit_superglobals.js lang:js https://raw.github.com/kvz/phpjs/master/functions/runkit/runkit_superglobals.js raw on github %}
function runkit_superglobals () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: You must manually define the superglobals to be able to use them.
    // %          note 2: Another alternative (though you can't reflect on them with this function) is to use import_request_variables()
    // *     example 1: runkit_superglobals();
    // *     returns 1: []
    var superglobal = {},
        p = '',
        arr = [];
    var superglobals = ['$_GET', '$_POST', '$_REQUEST', '$_COOKIE', '$_SESSION', '$_SERVER', '$_ENV', '$_FILES'];
    for (var i = 0; i < superglobals.length; i++) {
        superglobal = this.window[superglobals[i]];
        for (p in superglobal) {
            arr.push(superglobal[p]);
        }
    }
    return arr;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/runkit/runkit_superglobals.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/runkit/runkit_superglobals.js">edit on github</a></li>
</ul>

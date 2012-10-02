---
layout: page
title: "JavaScript dirname function"
comments: true
sharing: true
footer: true
alias:
- /functions/dirname:388
- /functions/388
---
A JavaScript equivalent of PHP's dirname

{% codeblock filesystem/dirname.js lang:js https://raw.github.com/kvz/phpjs/master/functions/filesystem/dirname.js raw on github %}
function dirname (path) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ozh
    // +   improved by: XoraX (http://www.xorax.info)
    // *     example 1: dirname('/etc/passwd');
    // *     returns 1: '/etc'
    // *     example 2: dirname('c:/Temp/x');
    // *     returns 2: 'c:/Temp'
    // *     example 3: dirname('/dir/test/');
    // *     returns 3: '/dir'
    return path.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/filesystem/dirname.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/filesystem/dirname.js)

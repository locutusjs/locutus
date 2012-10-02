---
layout: page
title: "JavaScript in_array function"
comments: true
sharing: true
footer: true
alias:
- /functions/in_array:432
- /functions/432
---
A JavaScript equivalent of PHP's in_array

{% codeblock array/in_array.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/in_array.js raw on github %}
function in_array (needle, haystack, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: vlado houba
    // +   input by: Billy
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    // *     returns 2: false
    // *     example 3: in_array(1, ['1', '2', '3']);
    // *     returns 3: true
    // *     example 3: in_array(1, ['1', '2', '3'], false);
    // *     returns 3: true
    // *     example 4: in_array(1, ['1', '2', '3'], true);
    // *     returns 4: false
    var key = '',
        strict = !! argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/array/in_array.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/array/in_array.js)

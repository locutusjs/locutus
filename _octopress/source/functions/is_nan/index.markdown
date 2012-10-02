---
layout: page
title: "JavaScript is_nan function"
comments: true
sharing: true
footer: true
alias:
- /functions/is_nan:447
- /functions/447
---
A JavaScript equivalent of PHP's is_nan

{% codeblock math/is_nan.js lang:js https://raw.github.com/kvz/phpjs/master/functions/math/is_nan.js raw on github %}
function is_nan (val) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // +      input by: Robin
    // *     example 1: is_nan(NaN);
    // *     returns 1: true
    // *     example 2: is_nan(0);
    // *     returns 2: false
    var warningType = '';

    if (typeof val == 'number' && isNaN(val)) {
        return true;
    }

    //Some errors for maximum PHP compatibility
    if (typeof val == 'object') {
        warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
    }
    else if (typeof val == 'string' && !val.match(/^[\+\-]?\d/)) {
        //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
        warningType = 'string';
    }
    if (warningType) {
        throw new Error('Warning: is_nan() expects parameter 1 to be double, ' + warningType + ' given');
    }

    return false;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/math/is_nan.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/math/is_nan.js)

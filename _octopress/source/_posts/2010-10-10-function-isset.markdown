---
layout: post
title: "JavaScript isset function"
comments: true
sharing: true
footer: true
permalink: /functions/isset
alias:
- /functions/isset:454
- /functions/454
categories:
- php var extension
- functions
---
A JavaScript equivalent of PHP's isset

<!-- more -->

{% codeblock var/isset.js lang:js https://raw.github.com/kvz/phpjs/master/functions/var/isset.js raw on github %}
function isset () {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: FremyCompany
    // +   improved by: Onno Marsman
    // +   improved by: Rafał Kukawski
    // *     example 1: isset( undefined, true);
    // *     returns 1: false
    // *     example 2: isset( 'Kevin van Zonneveld' );
    // *     returns 2: true
    var a = arguments,
        l = a.length,
        i = 0,
        undef;

    if (l === 0) {
        throw new Error('Empty isset');
    }

    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false;
        }
        i++;
    }
    return true;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/var/isset.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/var/isset.js)


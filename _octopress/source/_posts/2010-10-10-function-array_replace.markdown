---
layout: post
title: "JavaScript array_replace function"
comments: true
sharing: true
footer: true
permalink: /functions/array_replace
alias:
- /functions/array_replace:859
- /functions/859
categories:
- php array extension
- functions
---
A JavaScript equivalent of PHP's array_replace

<!-- more -->

{% codeblock array/array_replace.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/array_replace.js raw on github %}
function array_replace (arr) {
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_replace(["orange", "banana", "apple", "raspberry"], {0 : "pineapple", 4 : "cherry"}, {0:"grape"});
    // *     returns 1: {0: 'grape', 1: 'banana', 2: 'apple', 3: 'raspberry', 4: 'cherry'}
    
    var retObj = {},
        i = 0,
        p = '',
        argl = arguments.length;
    
    if (argl < 2) {
        throw new Error('There should be at least 2 arguments passed to array_replace()');
    }

    // Although docs state that the arguments are passed in by reference, it seems they are not altered, but rather the copy that is returned (just guessing), so we make a copy here, instead of acting on arr itself
    for (p in arr) {
        retObj[p] = arr[p];
    }

    for (i = 1; i < argl; i++) {
        for (p in arguments[i]) {
            retObj[p] = arguments[i][p];
        }
    }
    return retObj;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/array/array_replace.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/array/array_replace.js)


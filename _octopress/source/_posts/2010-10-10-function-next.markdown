---
layout: post
title: "JavaScript next function"
comments: true
sharing: true
footer: true
permalink: /functions/next
alias:
- /functions/next:479
- /functions/479
categories:
- php array extension
- functions
---
A JavaScript equivalent of PHP's next

<!-- more -->

{% codeblock array/next.js lang:js https://raw.github.com/kvz/phpjs/master/functions/array/next.js raw on github %}
function next (arr) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Uses global: php_js to store the array pointer
    // *     example 1: transport = ['foot', 'bike', 'car', 'plane'];
    // *     example 1: next(transport);
    // *     example 1: next(transport);
    // *     returns 1: 'car'
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.pointers = this.php_js.pointers || [];
    var indexOf = function (value) {
        for (var i = 0, length = this.length; i < length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    };
    // END REDUNDANT
    var pointers = this.php_js.pointers;
    if (!pointers.indexOf) {
        pointers.indexOf = indexOf;
    }
    if (pointers.indexOf(arr) === -1) {
        pointers.push(arr, 0);
    }
    var arrpos = pointers.indexOf(arr);
    var cursor = pointers[arrpos + 1];
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        var ct = 0;
        for (var k in arr) {
            if (ct === cursor + 1) {
                pointers[arrpos + 1] += 1;
                return arr[k];
            }
            ct++;
        }
        return false; // End
    }
    if (arr.length === 0 || cursor === (arr.length - 1)) {
        return false;
    }
    pointers[arrpos + 1] += 1;
    return arr[pointers[arrpos + 1]];
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/array/next.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/array/next.js)


---
layout: post
title: "JavaScript aggregate_info function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/aggregate_info
alias:
- /functions/aggregate_info:792
- /functions/792
categories: [ objaggregation, functions ]
---
A JavaScript equivalent of PHP's aggregate_info
<!-- more -->
{% codeblock objaggregation/aggregate_info.js lang:js https://raw.github.com/kvz/phpjs/master/functions/objaggregation/aggregate_info.js raw on github %}
function aggregate_info (obj) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: aggregate_info
    // *     example 1: var A = function () {};
    // *     example 1: A.prop = 5;
    // *     example 1: A.prototype.someMethod = function () {};
    // *     example 1: var b = {};
    // *     example 1: aggregate(b, 'A');
    // *     example 1: aggregate_info(b);
    // *     returns 1: {'A':{methods:['someMethod'], properties:['prop']}}

    var idx = -1,
        p = '',
        infoObj = {},
        retObj = {},
        i = 0,
        name = '';
    var indexOf = function (value) {
        for (var i = 0, length = this.length; i < length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    };

    if (!this.php_js || !this.php_js.aggregateRecords || !this.php_js.aggregateKeys || !this.php_js.aggregateClasses) {
        return false; // Is this what is returned?
    }

    if (!this.php_js.aggregateKeys.indexOf) {
        this.php_js.aggregateKeys.indexOf = indexOf;
    }
    idx = this.php_js.aggregateKeys.indexOf(obj);
    if (idx === -1) {
        return false;
    }

    for (i = 0; i < this.php_js.aggregateClasses[idx].length; i++) {
        name = this.php_js.aggregateClasses[idx][i];
        infoObj = {
            methods: [],
            properties: []
        };
        for (p in this.php_js.aggregateRecords[idx][i]) {
            if (typeof this.php_js.aggregateRecords[idx][i][p] === 'function') {
                infoObj.methods.push(p);
            } else {
                infoObj.properties.push(p);
            }
        }
        retObj[name] = infoObj;
    }

    return retObj;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/objaggregation/aggregate_info.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/objaggregation/aggregate_info.js">edit on github</a></li>
</ul>

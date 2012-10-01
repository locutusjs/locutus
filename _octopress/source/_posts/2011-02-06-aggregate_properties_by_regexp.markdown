---
layout: post
title: "JavaScript aggregate_properties_by_regexp function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/aggregate_properties_by_regexp
alias:
- /phpjs/functions/aggregate_properties_by_regexp:798
- /phpjs/functions/798
categories: [ objaggregation, functions ]
---
A JavaScript equivalent of PHP's aggregate_properties_by_regexp
<!-- more -->
{% codeblock objaggregation/aggregate_properties_by_regexp.js lang:js https://raw.github.com/kvz/phpjs/master/functions/objaggregation/aggregate_properties_by_regexp.js raw on github %}
function aggregate_properties_by_regexp (obj, class_name, regexp, exclude) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: We can't copy instance properties, as those require instantiation (with potential side-effects when called)
    // %          note 1: We've chosen not to assign to or create a prototype object on the destination object even if the original object had the properties on its prototype
    // *     example 1: var A = function () {};
    // *     example 1: A.prototype.prop = 10;
    // *     example 1: var b = {};
    // *     example 1: aggregate_properties_by_regexp(b, 'A', /^pr/, false);
    // *     returns 1: undefined

    var p = '',
        test = false,
        record = {},
        pos = -1,
        indexOf = function (value) {
            for (var i = 0, length = this.length; i < length; i++) {
                if (this[i] === value) {
                    return i;
                }
            }
            return -1;
        };

    if (typeof regexp === 'string') { // If passing the regular expression as a string, note that this behavior may change in the future as we seek to implement PHP-style regexp (e.g., delimiteres and modifier flags within the string)
        regexp = eval(regexp);
    }

    if (typeof class_name === 'string') { // PHP behavior
        class_name = this.window[class_name];
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.aggregateKeys = this.php_js.aggregateKeys || [];
    this.php_js.aggregateRecords = this.php_js.aggregateRecords || []; // Needed to allow deaggregate() and aggregate_info()
    this.php_js.aggregateClasses = this.php_js.aggregateClasses || [];
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    // END REDUNDANT

    for (p in class_name) {
        test = exclude ? p.search(regexp) === -1 : p.search(regexp) !== -1;
        if (!(p in obj) && typeof class_name[p] !== 'function' && p[0] !== '_' && test) { // Static (non-private) class properties
            obj[p] = class_name[p];
            record[p] = class_name[p];
        }
    }
    for (p in class_name.prototype) {
        test = exclude ? p.search(regexp) === -1 : p.search(regexp) !== -1;
        if (!(p in obj) && typeof class_name.prototype[p] !== 'function' && p[0] !== '_' && test) { // Prototype (non-private) default properties
            obj[p] = class_name.prototype[p];
            record[p] = class_name.prototype[p];
        }
    }
    if (!this.php_js.aggregateKeys.indexOf) {
        this.php_js.aggregateKeys.indexOf = indexOf;
    }
    pos = this.php_js.aggregateKeys.indexOf(obj);
    if (pos !== -1) {
        this.php_js.aggregateRecords[pos].push(record);
        this.php_js.aggregateClasses[pos].push(getFuncName(class_name));
    } else {
        this.php_js.aggregateKeys.push(obj);
        this.php_js.aggregateRecords.push([record]);
        this.php_js.aggregateClasses[0] = [];
        this.php_js.aggregateClasses[0].push(getFuncName(class_name));
    }
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/objaggregation/aggregate_properties_by_regexp.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/objaggregation/aggregate_properties_by_regexp.js">edit on github</a></li>
</ul>

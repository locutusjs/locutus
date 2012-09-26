---
layout: post
title: "JavaScript aggregation_info function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/aggregation_info
categories: [ objaggregation, functions ]
---
A JavaScript equivalent of PHP's aggregation_info
<!-- more -->
{% codeblock objaggregation/aggregation_info.js lang:js https://raw.github.com/kvz/phpjs/master/functions/objaggregation/aggregation_info.js raw on github %}
function aggregation_info (obj) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: aggregate_info
    // *     example 1: var A = function () {};
    // *     example 1: A.prop = 5;
    // *     example 1: A.prototype.someMethod = function () {};
    // *     example 1: var b = {};
    // *     example 1: aggregate(b, 'A');
    // *     example 1: aggregation_info(b);
    // *     returns 1: {'A':{methods:['someMethod'], properties:['prop']}}

    return this.aggregate_info(obj);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/objaggregation/aggregation_info.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/objaggregation/aggregation_info.js">edit on github</a></li>
</ul>

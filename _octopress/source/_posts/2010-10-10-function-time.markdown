---
layout: post
title: "JavaScript time function"
date: 2010-10-10 10:10:10
comments: true
sharing: true
footer: true
permalink: /functions/time
alias:
- /functions/time:562
- /functions/562
categories: [ datetime, functions ]
---
A JavaScript equivalent of PHP's time
<!-- more -->
{% codeblock datetime/time.js lang:js https://raw.github.com/kvz/phpjs/master/functions/datetime/time.js raw on github %}
function time () {
    // http://kevin.vanzonneveld.net
    // +   original by: GeekFG (http://geekfg.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: metjay
    // +   improved by: HKM
    // *     example 1: timeStamp = time();
    // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
    return Math.floor(new Date().getTime() / 1000);
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/datetime/time.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/datetime/time.js">edit on github</a></li>
</ul>

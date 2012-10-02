---
layout: post
title: "JavaScript get_cfg_var function"
comments: true
sharing: true
footer: true
permalink: /functions/get_cfg_var
alias:
- /functions/get_cfg_var:776
- /functions/776
categories: [ info, functions ]
---
A JavaScript equivalent of PHP's get_cfg_var
<!-- more -->
{% codeblock info/get_cfg_var.js lang:js https://raw.github.com/kvz/phpjs/master/functions/info/get_cfg_var.js raw on github %}
function get_cfg_var (varname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: The ini values must be set within an ini file
    // *     example 1: get_cfg_var('date.timezone');
    // *     returns 1: 'Asia/Hong_Kong'
    if (this.php_js && this.php_js.ini && this.php_js.ini[varname].global_value !== undefined) {
        if (this.php_js.ini[varname].global_value === null) {
            return '';
        }
        return this.php_js.ini[varname].global_value;
    }
    return '';
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/info/get_cfg_var.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/info/get_cfg_var.js">edit on github</a></li>
</ul>

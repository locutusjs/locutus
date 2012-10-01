---
layout: post
title: "JavaScript get_meta_tags function"
date: 2011-02-06 12:00:00
comments: true
sharing: true
footer: true
permalink: /phpjs/functions/get_meta_tags
alias:
- /phpjs/functions/get_meta_tags:418
- /phpjs/functions/418
categories: [ url, functions ]
---
A JavaScript equivalent of PHP's get_meta_tags
<!-- more -->
{% codeblock url/get_meta_tags.js lang:js https://raw.github.com/kvz/phpjs/master/functions/url/get_meta_tags.js raw on github %}
function get_meta_tags (file) {
    // Extracts all meta tag content attributes from a file and returns an array
    //
    // version: 905.3122
    // discuss at: http://phpjs.org/functions/get_meta_tags
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
    // -    depends on: file_get_contents
    // *     example 1: get_meta_tags('http://kevin.vanzonneveld.net/pj_test_supportfile_2.htm');
    // *     returns 1: {description: 'a php manual', author: 'name', keywords: 'php documentation', 'geo_position': '49.33;-86.59'}
    var fulltxt = '';

    if (false) {
        // Use this for testing instead of the line above:
        fulltxt = '<meta name="author" content="name">' + '<meta name="keywords" content="php documentation">' + '<meta name="DESCRIPTION" content="a php manual">' + '<meta name="geo.position" content="49.33;-86.59">' + '</head>';
    } else {
        fulltxt = this.file_get_contents(file).match(/^[\s\S]*<\/head>/i); // We have to disallow some character, so we choose a Unicode non-character
    }

    var patt = /<meta[^>]*?>/gim;
    var patt1 = /<meta\s+.*?name\s*=\s*(['"]?)(.*?)\1\s+.*?content\s*=\s*(['"]?)(.*?)\3/gim;
    var patt2 = /<meta\s+.*?content\s*=\s*(['"?])(.*?)\1\s+.*?name\s*=\s*(['"]?)(.*?)\3/gim;
    var txt, match, name, arr = {};

    while ((txt = patt.exec(fulltxt)) !== null) {
        while ((match = patt1.exec(txt)) !== null) {
            name = match[2].replace(/\W/g, '_').toLowerCase();
            arr[name] = match[4];
        }
        while ((match = patt2.exec(txt)) !== null) {
            name = match[4].replace(/\W/g, '_').toLowerCase();
            arr[name] = match[2];
        }
    }
    return arr;
}
{% endcodeblock %}
<ul>
 <li><a href="https://github.com/kvz/phpjs/blob/master/functions/url/get_meta_tags.js">view on github</a></li>
 <li><a href="https://github.com/kvz/phpjs/edit/master/functions/url/get_meta_tags.js">edit on github</a></li>
</ul>

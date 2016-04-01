---
examples:
  - - "strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');"
  - - "strip_tags('<p>Kevin <img src=\"someimage.png\" onmouseover=\"someFunction()\">van <i>Zonneveld</i></p>', '<p>');"
  - - "strip_tags(\"<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>\", \"<a>\");"
  - - "strip_tags('1 < 5 5 > 1');"
  - - "strip_tags('1 <br/> 1');"
  - - "strip_tags('1 <br/> 1', '<br>');"
  - - "strip_tags('1 <br/> 1', '<br><br/>');"
returns:
  - - "'Kevin <b>van</b> <i>Zonneveld</i>'"
  - - "'<p>Kevin van Zonneveld</p>'"
  - - "\"<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>\""
  - - "'1 < 5 5 > 1'"
  - - "'1  1'"
  - - "'1 <br/> 1'"
  - - "'1 <br/> 1'"
authors:
  original by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
  improved by:
    - Luke Godfrey
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
  bugfixed by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - Onno Marsman
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - Eric Nagel
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - Tomasz Wesolowski
  revised by:
    - 'Rafał Kukawski (http://blog.kukawski.pl/)'
  input by:
    - Pul
    - Alex
    - Marc Palau
    - 'Brett Zamir (http://brett-zamir.me)'
    - Bobby Drake
    - Evertjan Garretsen
notes: []
layout: function
function: strip_tags
category: strings
code: "function strip_tags (input, allowed) {\n  //  discuss at: http://phpjs.org/functions/strip_tags/\n  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // improved by: Luke Godfrey\n  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  //    input by: Pul\n  //    input by: Alex\n  //    input by: Marc Palau\n  //    input by: Brett Zamir (http://brett-zamir.me)\n  //    input by: Bobby Drake\n  //    input by: Evertjan Garretsen\n  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // bugfixed by: Onno Marsman\n  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // bugfixed by: Eric Nagel\n  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // bugfixed by: Tomasz Wesolowski\n  //  revised by: Rafał Kukawski (http://blog.kukawski.pl/)\n  //   example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');\n  //   returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'\n  //   example 2: strip_tags('<p>Kevin <img src=\"someimage.png\" onmouseover=\"someFunction()\">van <i>Zonneveld</i></p>', '<p>');\n  //   returns 2: '<p>Kevin van Zonneveld</p>'\n  //   example 3: strip_tags(\"<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>\", \"<a>\");\n  //   returns 3: \"<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>\"\n  //   example 4: strip_tags('1 < 5 5 > 1');\n  //   returns 4: '1 < 5 5 > 1'\n  //   example 5: strip_tags('1 <br/> 1');\n  //   returns 5: '1  1'\n  //   example 6: strip_tags('1 <br/> 1', '<br>');\n  //   returns 6: '1 <br/> 1'\n  //   example 7: strip_tags('1 <br/> 1', '<br><br/>');\n  //   returns 7: '1 <br/> 1'\n\n  allowed = (((allowed || '') + '')\n      .toLowerCase()\n      .match(/<[a-z][a-z0-9]*>/g) || [])\n    .join('') // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)\n  var tags = /<\\/?([a-z][a-z0-9]*)\\b[^>]*>/gi,\n    commentsAndPhpTags = /<!--[\\s\\S]*?-->|<\\?(?:php)?[\\s\\S]*?\\?>/gi\n  return input.replace(commentsAndPhpTags, '')\n    .replace(tags, function ($0, $1) {\n      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''\n    })\n}\n"
permalink: /functions/strip_tags/
redirect_from:
  - /functions/strings/strip_tags/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
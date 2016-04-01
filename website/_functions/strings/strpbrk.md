---
examples:
  - - "strpbrk('This is a Simple text.', 'is');"
returns:
  - - "'is is a Simple text.'"
authors:
  original by:
    - 'Alfonso Jimenez (http://www.alfonsojimenez.com)'
  improved by:
    - 'Brett Zamir (http://brett-zamir.me)'
  bugfixed by:
    - Onno Marsman
  revised by:
    - Christoph
notes: []
layout: function
function: strpbrk
category: strings
code: |
  function strpbrk (haystack, char_list) {
    //  discuss at: http://phpjs.org/functions/strpbrk/
    // original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
    // bugfixed by: Onno Marsman
    //  revised by: Christoph
    // improved by: Brett Zamir (http://brett-zamir.me)
    //   example 1: strpbrk('This is a Simple text.', 'is');
    //   returns 1: 'is is a Simple text.'

    for (var i = 0, len = haystack.length; i < len; ++i) {
      if (char_list.indexOf(haystack.charAt(i)) >= 0) {
        return haystack.slice(i)
      }
    }
    return false
  }
permalink: /functions/strpbrk/
redirect_from:
  - /functions/strings/strpbrk/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
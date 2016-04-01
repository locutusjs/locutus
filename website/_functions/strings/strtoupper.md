---
examples:
  - - "strtoupper('Kevin van Zonneveld');"
returns:
  - - "'KEVIN VAN ZONNEVELD'"
authors:
  original by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
  improved by:
    - Onno Marsman
notes: []
layout: function
function: strtoupper
category: strings
code: |
  function strtoupper (str) {
    //  discuss at: http://phpjs.org/functions/strtoupper/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Onno Marsman
    //   example 1: strtoupper('Kevin van Zonneveld');
    //   returns 1: 'KEVIN VAN ZONNEVELD'

    return (str + '')
      .toUpperCase()
  }
permalink: /functions/strtoupper/
redirect_from:
  - /functions/strings/strtoupper/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
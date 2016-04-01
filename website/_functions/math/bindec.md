---
examples:
  - - "bindec('110011');"
  - - "bindec('000110011');"
  - - "bindec('111');"
returns:
  - - '51'
  - - '51'
  - - '7'
authors:
  original by:
    - Philippe Baumann
notes: []
layout: function
function: bindec
category: math
code: |
  function bindec (binary_string) {
    //  discuss at: http://phpjs.org/functions/bindec/
    // original by: Philippe Baumann
    //   example 1: bindec('110011');
    //   returns 1: 51
    //   example 2: bindec('000110011');
    //   returns 2: 51
    //   example 3: bindec('111');
    //   returns 3: 7

    binary_string = (binary_string + '')
      .replace(/[^01]/gi, '')
    return parseInt(binary_string, 2)
  }
permalink: /functions/bindec/
redirect_from:
  - /functions/math/bindec/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
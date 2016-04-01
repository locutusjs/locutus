---
examples:
  - - atanh(0.3);
returns:
  - - '0.3095196042031118'
authors:
  original by:
    - Onno Marsman
notes: []
layout: function
function: atanh
category: math
code: |
  function atanh (arg) {
    //  discuss at: http://phpjs.org/functions/atanh/
    // original by: Onno Marsman
    //   example 1: atanh(0.3);
    //   returns 1: 0.3095196042031118

    return 0.5 * Math.log((1 + arg) / (1 - arg))
  }
permalink: /functions/atanh/
redirect_from:
  - /functions/math/atanh/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
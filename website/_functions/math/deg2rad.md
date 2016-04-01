---
examples:
  - - deg2rad(45);
returns:
  - - '0.7853981633974483'
authors:
  original by:
    - Enrique Gonzalez
  improved by:
    - 'Thomas Grainger (http://graingert.co.uk)'
notes: []
layout: function
function: deg2rad
category: math
code: |
  function deg2rad (angle) {
    //  discuss at: http://phpjs.org/functions/deg2rad/
    // original by: Enrique Gonzalez
    // improved by: Thomas Grainger (http://graingert.co.uk)
    //   example 1: deg2rad(45);
    //   returns 1: 0.7853981633974483

    return angle * .017453292519943295 // (angle / 180) * Math.PI;
  }
permalink: /functions/deg2rad/
redirect_from:
  - /functions/math/deg2rad/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
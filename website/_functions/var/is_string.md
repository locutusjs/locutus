---
examples:
  - - "is_string('23');"
  - - is_string(23.5);
returns:
  - - 'true'
  - - 'false'
authors:
  original by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
notes: []
layout: function
function: is_string
category: var
code: |
  function is_string (mixed_var) {
    //  discuss at: http://phpjs.org/functions/is_string/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //   example 1: is_string('23');
    //   returns 1: true
    //   example 2: is_string(23.5);
    //   returns 2: false

    return (typeof mixed_var === 'string')
  }
permalink: /functions/is_string/
redirect_from:
  - /functions/var/is_string/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
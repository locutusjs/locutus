---
examples:
  - - "strrchr(\"Line 1\\nLine 2\\nLine 3\", 10).substr(1)"
returns:
  - - "'Line 3'"
authors:
  original by:
    - 'Brett Zamir (http://brett-zamir.me)'
  bugfixed by:
    - 'Brett Zamir (http://brett-zamir.me)'
  input by:
    - 'Jason Wong (http://carrot.org/)'
notes: []
layout: function
function: strrchr
category: strings
code: "function strrchr (haystack, needle) {\n  //  discuss at: http://phpjs.org/functions/strrchr/\n  // original by: Brett Zamir (http://brett-zamir.me)\n  //    input by: Jason Wong (http://carrot.org/)\n  // bugfixed by: Brett Zamir (http://brett-zamir.me)\n  //   example 1: strrchr(\"Line 1\\nLine 2\\nLine 3\", 10).substr(1)\n  //   returns 1: 'Line 3'\n\n  var pos = 0\n\n  if (typeof needle !== 'string') {\n    needle = String.fromCharCode(parseInt(needle, 10))\n  }\n  needle = needle.charAt(0)\n  pos = haystack.lastIndexOf(needle)\n  if (pos === -1) {\n    return false\n  }\n\n  return haystack.substr(pos)\n}\n"
permalink: /functions/strrchr/
redirect_from:
  - /functions/strings/strrchr/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
---
examples:
  - - "var arr = [1, 4, 4.5, 3, 'a', 4.4];"
    - "preg_grep(\"/^(\\\\d+)?\\\\.\\\\d+$/\", arr);"
returns:
  - - '{2: 4.5, 5: 4.4}'
authors:
  original by:
    - 'Brett Zamir (http://brett-zamir.me)'
notes:
  - - 'If pass pattern as string, must escape backslashes, even for single quotes'
    - The regular expression itself must be expressed JavaScript style
    - 'It is not recommended to submit the pattern as a string, as we may implement'
    - 'parsing of PHP-style expressions (flags, etc.) in the future'
layout: function
function: preg_grep
category: pcre
code: "function preg_grep (pattern, input, flags) {\n  //  discuss at: http://phpjs.org/functions/preg_grep/\n  // original by: Brett Zamir (http://brett-zamir.me)\n  //        note: If pass pattern as string, must escape backslashes, even for single quotes\n  //        note: The regular expression itself must be expressed JavaScript style\n  //        note: It is not recommended to submit the pattern as a string, as we may implement\n  //        note: parsing of PHP-style expressions (flags, etc.) in the future\n  //   example 1: var arr = [1, 4, 4.5, 3, 'a', 4.4];\n  //   example 1: preg_grep(\"/^(\\\\d+)?\\\\.\\\\d+$/\", arr);\n  //   returns 1: {2: 4.5, 5: 4.4}\n\n  var p = ''\n  var retObj = {}\n  // Todo: put flags as number and do bitwise checks (at least if other flags allowable); see pathinfo()\n  var invert = (flags === 1 || flags === 'PREG_GREP_INVERT')\n\n  if (typeof pattern === 'string') {\n    pattern = eval(pattern)\n  }\n\n  if (invert) {\n    for (p in input) {\n      if ((input[p] + '')\n        .search(pattern) === -1) {\n        retObj[p] = input[p]\n      }\n    }\n  } else {\n    for (p in input) {\n      if ((input[p] + '')\n        .search(pattern) !== -1) {\n        retObj[p] = input[p]\n      }\n    }\n  }\n\n  return retObj\n}\n"
permalink: /functions/preg_grep/
redirect_from:
  - /functions/pcre/preg_grep/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
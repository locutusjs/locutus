---
examples:
  - - "substr('abcdef', 0, -1);"
  - - 'substr(2, 0, -6);'
  - - "ini_set('unicode.semantics',  'on');"
    - "substr('a\\uD801\\uDC00', 0, -1);"
  - - "ini_set('unicode.semantics',  'on');"
    - "substr('a\\uD801\\uDC00', 0, 2);"
  - - "ini_set('unicode.semantics',  'on');"
    - "substr('a\\uD801\\uDC00', -1, 1);"
  - - "ini_set('unicode.semantics',  'on');"
    - "substr('a\\uD801\\uDC00z\\uD801\\uDC00', -3, 2);"
  - - "ini_set('unicode.semantics',  'on');"
    - "substr('a\\uD801\\uDC00z\\uD801\\uDC00', -3, -1)"
returns:
  - - "'abcde'"
  - - 'false'
  - - "'a'"
  - - "'a\\uD801\\uDC00'"
  - - "'\\uD801\\uDC00'"
  - - "'\\uD801\\uDC00z'"
  - - "'\\uD801\\uDC00z'"
authors:
  original by:
    - Martijn Wieringa
  improved by:
    - Onno Marsman
    - 'Brett Zamir (http://brett-zamir.me)'
  bugfixed by:
    - T.Wild
  revised by:
    - Theriault
notes:
  - - "Handles rare Unicode characters if 'unicode.semantics' ini (PHP6) is set to 'on'"
layout: function
function: substr
category: strings
code: "function substr (str, start, len) {\n  //  discuss at: http://phpjs.org/functions/substr/\n  //     version: 909.322\n  // original by: Martijn Wieringa\n  // bugfixed by: T.Wild\n  // improved by: Onno Marsman\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  //  revised by: Theriault\n  //        note: Handles rare Unicode characters if 'unicode.semantics' ini (PHP6) is set to 'on'\n  //   example 1: substr('abcdef', 0, -1);\n  //   returns 1: 'abcde'\n  //   example 2: substr(2, 0, -6);\n  //   returns 2: false\n  //   example 3: ini_set('unicode.semantics',  'on');\n  //   example 3: substr('a\\uD801\\uDC00', 0, -1);\n  //   returns 3: 'a'\n  //   example 4: ini_set('unicode.semantics',  'on');\n  //   example 4: substr('a\\uD801\\uDC00', 0, 2);\n  //   returns 4: 'a\\uD801\\uDC00'\n  //   example 5: ini_set('unicode.semantics',  'on');\n  //   example 5: substr('a\\uD801\\uDC00', -1, 1);\n  //   returns 5: '\\uD801\\uDC00'\n  //   example 6: ini_set('unicode.semantics',  'on');\n  //   example 6: substr('a\\uD801\\uDC00z\\uD801\\uDC00', -3, 2);\n  //   returns 6: '\\uD801\\uDC00z'\n  //   example 7: ini_set('unicode.semantics',  'on');\n  //   example 7: substr('a\\uD801\\uDC00z\\uD801\\uDC00', -3, -1)\n  //   returns 7: '\\uD801\\uDC00z'\n\n  var i = 0,\n    allBMP = true,\n    es = 0,\n    el = 0,\n    se = 0,\n    ret = ''\n  str += ''\n  var end = str.length\n\n  // BEGIN REDUNDANT\n  this.php_js = this.php_js || {}\n  this.php_js.ini = this.php_js.ini || {}\n  // END REDUNDANT\n  switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {\n    case 'on':\n    // Full-blown Unicode including non-Basic-Multilingual-Plane characters\n    // strlen()\n      for (i = 0; i < str.length; i++) {\n        if (/[\\uD800-\\uDBFF]/.test(str.charAt(i)) && /[\\uDC00-\\uDFFF]/.test(str.charAt(i + 1))) {\n          allBMP = false\n          break\n        }\n      }\n\n      if (!allBMP) {\n        if (start < 0) {\n          for (i = end - 1, es = (start += end); i >= es; i--) {\n            if (/[\\uDC00-\\uDFFF]/.test(str.charAt(i)) && /[\\uD800-\\uDBFF]/.test(str.charAt(i - 1))) {\n              start--\n              es--\n            }\n          }\n        } else {\n          var surrogatePairs = /[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]/g\n          while ((surrogatePairs.exec(str)) != null) {\n            var li = surrogatePairs.lastIndex\n            if (li - 2 < start) {\n              start++\n            } else {\n              break\n            }\n          }\n        }\n\n        if (start >= end || start < 0) {\n          return false\n        }\n        if (len < 0) {\n          for (i = end - 1, el = (end += len); i >= el; i--) {\n            if (/[\\uDC00-\\uDFFF]/.test(str.charAt(i)) && /[\\uD800-\\uDBFF]/.test(str.charAt(i - 1))) {\n              end--\n              el--\n            }\n          }\n          if (start > end) {\n            return false\n          }\n          return str.slice(start, end)\n        } else {\n          se = start + len\n          for (i = start; i < se; i++) {\n            ret += str.charAt(i)\n            if (/[\\uD800-\\uDBFF]/.test(str.charAt(i)) && /[\\uDC00-\\uDFFF]/.test(str.charAt(i + 1))) {\n            // Go one further, since one of the \"characters\" is part of a surrogate pair\n              se++\n            }\n          }\n          return ret\n        }\n        break\n      }\n    // Fall-through\n    case 'off':\n    // assumes there are no non-BMP characters;\n    //    if there may be such characters, then it is best to turn it on (critical in true XHTML/XML)\n    default:\n      if (start < 0) {\n        start += end\n      }\n      end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start)\n    // PHP returns false if start does not fall within the string.\n    // PHP returns false if the calculated end comes before the calculated start.\n    // PHP returns an empty string if start and end are the same.\n    // Otherwise, PHP returns the portion of the string from start to end.\n      return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end)\n  }\n  // Please Netbeans\n  return undefined\n}\n"
permalink: /functions/substr/
redirect_from:
  - /functions/strings/substr/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->

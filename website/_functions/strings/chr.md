---
examples:
  - - "chr(75) === 'K';"
    - "chr(65536) === '\\uD800\\uDC00';"
returns:
  - - 'true'
    - 'true'
authors:
  original by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
  improved by:
    - 'Brett Zamir (http://brett-zamir.me)'
notes: []
layout: function
function: chr
category: strings
code: "function chr (codePt) {\n  //  discuss at: http://phpjs.org/functions/chr/\n  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  //   example 1: chr(75) === 'K';\n  //   example 1: chr(65536) === '\\uD800\\uDC00';\n  //   returns 1: true\n  //   returns 1: true\n\n  if (codePt > 0xFFFF) { // Create a four-byte string (length 2) since this code point is high\n    //   enough for the UTF-16 encoding (JavaScript internal use), to\n    //   require representation with two surrogates (reserved non-characters\n    //   used for building other characters; the first is \"high\" and the next \"low\")\n    codePt -= 0x10000\n    return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF))\n  }\n  return String.fromCharCode(codePt)\n}\n"
permalink: /functions/chr/
redirect_from:
  - /functions/strings/chr/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
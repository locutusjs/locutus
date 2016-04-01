---
examples:
  - - 'sprintf("%01.2f", 123.1);'
  - - "sprintf(\"[%10s]\", 'monkey');"
  - - "sprintf(\"[%'#10s]\", 'monkey');"
  - - 'sprintf("%d", 123456789012345);'
  - - "sprintf('%-03s', 'E');"
returns:
  - - '123.10'
  - - "'[    monkey]'"
  - - "'[####monkey]'"
  - - "'123456789012345'"
  - - "'E00'"
authors:
  original by:
    - 'Ash Searle (http://hexmen.com/blog/)'
  improved by:
    - 'Michael White (http://getsprink.com)'
    - Jack
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - Dj
    - Allidylls
  input by:
    - Paulo Freitas
    - 'Brett Zamir (http://brett-zamir.me)'
notes: []
layout: function
function: sprintf
category: strings
code: "function sprintf () {\n  //  discuss at: http://phpjs.org/functions/sprintf/\n  // original by: Ash Searle (http://hexmen.com/blog/)\n  // improved by: Michael White (http://getsprink.com)\n  // improved by: Jack\n  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // improved by: Dj\n  // improved by: Allidylls\n  //    input by: Paulo Freitas\n  //    input by: Brett Zamir (http://brett-zamir.me)\n  //   example 1: sprintf(\"%01.2f\", 123.1);\n  //   returns 1: 123.10\n  //   example 2: sprintf(\"[%10s]\", 'monkey');\n  //   returns 2: '[    monkey]'\n  //   example 3: sprintf(\"[%'#10s]\", 'monkey');\n  //   returns 3: '[####monkey]'\n  //   example 4: sprintf(\"%d\", 123456789012345);\n  //   returns 4: '123456789012345'\n  //   example 5: sprintf('%-03s', 'E');\n  //   returns 5: 'E00'\n\n  var regex = /%%|%(\\d+\\$)?([\\-+\\'#0 ]*)(\\*\\d+\\$|\\*|\\d+)?(?:\\.(\\*\\d+\\$|\\*|\\d+))?([scboxXuideEfFgG])/g\n  var a = arguments\n  var i = 0\n  var format = a[i++]\n\n  // pad()\n  var pad = function (str, len, chr, leftJustify) {\n    if (!chr) {\n      chr = ' '\n    }\n    var padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0)\n      .join(chr)\n    return leftJustify ? str + padding : padding + str\n  }\n\n  // justify()\n  var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {\n    var diff = minWidth - value.length\n    if (diff > 0) {\n      if (leftJustify || !zeroPad) {\n        value = pad(value, minWidth, customPadChar, leftJustify)\n      } else {\n        value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length)\n      }\n    }\n    return value\n  }\n\n  // formatBaseX()\n  var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {\n    // Note: casts negative numbers to positive ones\n    var number = value >>> 0\n    prefix = (prefix && number && {\n      '2': '0b',\n      '8': '0',\n      '16': '0x'\n    }[base]) || ''\n    value = prefix + pad(number.toString(base), precision || 0, '0', false)\n    return justify(value, prefix, leftJustify, minWidth, zeroPad)\n  }\n\n  // formatString()\n  var formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {\n    if (precision !== null && precision !== undefined) {\n      value = value.slice(0, precision)\n    }\n    return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar)\n  }\n\n  // doFormat()\n  var doFormat = function (substring, valueIndex, flags, minWidth, precision, type) {\n    var number, prefix, method, textTransform, value\n\n    if (substring === '%%') {\n      return '%'\n    }\n\n    // parse flags\n    var leftJustify = false\n    var positivePrefix = ''\n    var zeroPad = false\n    var prefixBaseX = false\n    var customPadChar = ' '\n    var flagsl = flags.length\n    var j\n    for (j = 0; flags && j < flagsl; j++) {\n      switch (flags.charAt(j)) {\n        case ' ':\n          positivePrefix = ' '\n          break\n        case '+':\n          positivePrefix = '+'\n          break\n        case '-':\n          leftJustify = true\n          break\n        case \"'\":\n          customPadChar = flags.charAt(j + 1)\n          break\n        case '0':\n          zeroPad = true\n          customPadChar = '0'\n          break\n        case '#':\n          prefixBaseX = true\n          break\n      }\n    }\n\n    // parameters may be null, undefined, empty-string or real valued\n    // we want to ignore null, undefined and empty-string values\n    if (!minWidth) {\n      minWidth = 0\n    } else if (minWidth === '*') {\n      minWidth = +a[i++]\n    } else if (minWidth.charAt(0) === '*') {\n      minWidth = +a[minWidth.slice(1, -1)]\n    } else {\n      minWidth = +minWidth\n    }\n\n    // Note: undocumented perl feature:\n    if (minWidth < 0) {\n      minWidth = -minWidth\n      leftJustify = true\n    }\n\n    if (!isFinite(minWidth)) {\n      throw new Error('sprintf: (minimum-)width must be finite')\n    }\n\n    if (!precision) {\n      precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined\n    } else if (precision === '*') {\n      precision = +a[i++]\n    } else if (precision.charAt(0) === '*') {\n      precision = +a[precision.slice(1, -1)]\n    } else {\n      precision = +precision\n    }\n\n    // grab value using valueIndex if required?\n    value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++]\n\n    switch (type) {\n      case 's':\n        return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar)\n      case 'c':\n        return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad)\n      case 'b':\n        return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad)\n      case 'o':\n        return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad)\n      case 'x':\n        return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad)\n      case 'X':\n        return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad)\n        .toUpperCase()\n      case 'u':\n        return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad)\n      case 'i':\n      case 'd':\n        number = +value || 0\n      // Plain Math.round doesn't just truncate\n        number = Math.round(number - number % 1)\n        prefix = number < 0 ? '-' : positivePrefix\n        value = prefix + pad(String(Math.abs(number)), precision, '0', false)\n        return justify(value, prefix, leftJustify, minWidth, zeroPad)\n      case 'e':\n      case 'E':\n      case 'f': // Should handle locales (as per setlocale)\n      case 'F':\n      case 'g':\n      case 'G':\n        number = +value\n        prefix = number < 0 ? '-' : positivePrefix\n        method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())]\n        textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2]\n        value = prefix + Math.abs(number)[method](precision)\n        return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]()\n      default:\n        return substring\n    }\n  }\n\n  return format.replace(regex, doFormat)\n}\n"
permalink: /functions/sprintf/
redirect_from:
  - /functions/strings/sprintf/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->

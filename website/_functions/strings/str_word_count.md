---
examples:
  - - "str_word_count(\"Hello fri3nd, you're\\r\\n       looking          good today!\", 1);"
  - - "str_word_count(\"Hello fri3nd, you're\\r\\n       looking          good today!\", 2);"
  - - "str_word_count(\"Hello fri3nd, you're\\r\\n       looking          good today!\", 1, '\\u00e0\\u00e1\\u00e3\\u00e73');"
  - - "str_word_count('hey', 2);"
returns:
  - - "['Hello', 'fri', 'nd', \"you're\", 'looking', 'good', 'today']"
  - - "{0: 'Hello', 6: 'fri', 10: 'nd', 14: \"you're\", 29: 'looking', 46: 'good', 51: 'today'}"
  - - "['Hello', 'fri3nd', \"you're\", 'looking', 'good', 'today']"
  - - "{0: 'hey'}"
authors:
  original by:
    - Ole Vrijenhoek
  improved by:
    - 'Brett Zamir (http://brett-zamir.me)'
  bugfixed by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - 'Brett Zamir (http://brett-zamir.me)'
    - 'Brett Zamir (http://brett-zamir.me)'
  input by:
    - Bug?
notes: []
layout: function
function: str_word_count
category: strings
code: "function str_word_count (str, format, charlist) {\n  //  discuss at: http://phpjs.org/functions/str_word_count/\n  // original by: Ole Vrijenhoek\n  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // bugfixed by: Brett Zamir (http://brett-zamir.me)\n  // bugfixed by: Brett Zamir (http://brett-zamir.me)\n  //    input by: Bug?\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  //  depends on: ctype_alpha\n  //   example 1: str_word_count(\"Hello fri3nd, you're\\r\\n       looking          good today!\", 1);\n  //   returns 1: ['Hello', 'fri', 'nd', \"you're\", 'looking', 'good', 'today']\n  //   example 2: str_word_count(\"Hello fri3nd, you're\\r\\n       looking          good today!\", 2);\n  //   returns 2: {0: 'Hello', 6: 'fri', 10: 'nd', 14: \"you're\", 29: 'looking', 46: 'good', 51: 'today'}\n  //   example 3: str_word_count(\"Hello fri3nd, you're\\r\\n       looking          good today!\", 1, '\\u00e0\\u00e1\\u00e3\\u00e73');\n  //   returns 3: ['Hello', 'fri3nd', \"you're\", 'looking', 'good', 'today']\n  //   example 4: str_word_count('hey', 2);\n  //   returns 4: {0: 'hey'}\n\n  var len = str.length,\n    cl = charlist && charlist.length,\n    chr = '',\n    tmpStr = '',\n    i = 0,\n    c = '',\n    wArr = [],\n    wC = 0,\n    assoc = {},\n    aC = 0,\n    reg = '',\n    match = false\n\n  // BEGIN STATIC\n  var _preg_quote = function (str) {\n    return (str + '')\n      .replace(/([\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!<>\\|\\:])/g, '\\\\$1')\n  }\n  _getWholeChar = function (str, i) {\n    // Use for rare cases of non-BMP characters\n    var code = str.charCodeAt(i)\n    if (code < 0xD800 || code > 0xDFFF) {\n      return str.charAt(i)\n    }\n    if (0xD800 <= code && code <= 0xDBFF) {\n      // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)\n      if (str.length <= (i + 1)) {\n        throw 'High surrogate without following low surrogate'\n      }\n      var next = str.charCodeAt(i + 1)\n      if (0xDC00 > next || next > 0xDFFF) {\n        throw 'High surrogate without following low surrogate'\n      }\n      return str.charAt(i) + str.charAt(i + 1)\n    }\n    // Low surrogate (0xDC00 <= code && code <= 0xDFFF)\n    if (i === 0) {\n      throw 'Low surrogate without preceding high surrogate'\n    }\n    var prev = str.charCodeAt(i - 1)\n    if (0xD800 > prev || prev > 0xDBFF) {\n      // (could change last hex to 0xDB7F to treat high private surrogates as single characters)\n      throw 'Low surrogate without preceding high surrogate'\n    }\n    // We can pass over low surrogates now as the second component in a pair which we have already processed\n    return false\n  }\n  // END STATIC\n  if (cl) {\n    reg = '^(' + _preg_quote(_getWholeChar(charlist, 0))\n    for (i = 1; i < cl; i++) {\n      if ((chr = _getWholeChar(charlist, i)) === false) {\n        continue\n      }\n      reg += '|' + _preg_quote(chr)\n    }\n    reg += ')$'\n    reg = new RegExp(reg)\n  }\n\n  for (i = 0; i < len; i++) {\n    if ((c = _getWholeChar(str, i)) === false) {\n      continue\n    }\n    match = this.ctype_alpha(c) || (reg && c.search(reg) !== -1) || ((i !== 0 && i !== len - 1) && c === '-') || // No hyphen at beginning or end unless allowed in charlist (or locale)\n      // No apostrophe at beginning unless allowed in charlist (or locale)\n      (i !== 0 && c === \"'\")\n    if (match) {\n      if (tmpStr === '' && format === 2) {\n        aC = i\n      }\n      tmpStr = tmpStr + c\n    }\n    if (i === len - 1 || !match && tmpStr !== '') {\n      if (format !== 2) {\n        wArr[wArr.length] = tmpStr\n      } else {\n        assoc[aC] = tmpStr\n      }\n      tmpStr = ''\n      wC++\n    }\n  }\n\n  if (!format) {\n    return wC\n  } else if (format === 1) {\n    return wArr\n  } else if (format === 2) {\n    return assoc\n  }\n\n  throw 'You have supplied an incorrect format'\n}\n"
permalink: /functions/str_word_count/
redirect_from:
  - /functions/strings/str_word_count/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->

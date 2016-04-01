---
examples:
  - - 'var arr = {};'
    - "parse_str('first=foo&second=bar', arr);"
    - $result = arr
  - - 'var arr = {};'
    - "parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', arr);"
    - $result = arr
  - - "var abc = {3:'a'};"
    - "parse_str('abc[a][b][\"c\"]=def&abc[q]=t+5');"
returns:
  - - "{ first: 'foo', second: 'bar' }"
  - - "{ str_a: \"Jack and Jill didn't see the well.\" }"
  - - '{"3":"a","a":{"b":{"c":"def"}},"q":"t 5"}'
authors:
  original by:
    - Cagri Ekin
  improved by:
    - 'Michael White (http://getsprink.com)'
    - Jack
    - 'Brett Zamir (http://brett-zamir.me)'
  bugfixed by:
    - Onno Marsman
    - 'Brett Zamir (http://brett-zamir.me)'
    - stag019
    - 'Brett Zamir (http://brett-zamir.me)'
    - 'MIO_KODUKI (http://mio-koduki.blogspot.com/)'
  input by:
    - Dreamer
    - 'Zaide (http://zaidesthings.com/)'
    - 'David Pesta (http://davidpesta.com/)'
    - jeicquest
notes:
  - - 'When no argument is specified, will put variables in global scope.'
    - 'When a particular argument has been passed, and the returned value is different parse_str of PHP. For example, a=b=c&d====c'
layout: function
function: parse_str
category: strings
code: "function parse_str (str, array) {\n  //       discuss at: http://phpjs.org/functions/parse_str/\n  //      original by: Cagri Ekin\n  //      improved by: Michael White (http://getsprink.com)\n  //      improved by: Jack\n  //      improved by: Brett Zamir (http://brett-zamir.me)\n  //      bugfixed by: Onno Marsman\n  //      bugfixed by: Brett Zamir (http://brett-zamir.me)\n  //      bugfixed by: stag019\n  //      bugfixed by: Brett Zamir (http://brett-zamir.me)\n  //      bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)\n  // reimplemented by: stag019\n  //         input by: Dreamer\n  //         input by: Zaide (http://zaidesthings.com/)\n  //         input by: David Pesta (http://davidpesta.com/)\n  //         input by: jeicquest\n  //             note: When no argument is specified, will put variables in global scope.\n  //             note: When a particular argument has been passed, and the returned value is different parse_str of PHP. For example, a=b=c&d====c\n  //             test: skip\n  //        example 1: var arr = {};\n  //        example 1: parse_str('first=foo&second=bar', arr);\n  //        example 1: $result = arr\n  //        returns 1: { first: 'foo', second: 'bar' }\n  //        example 2: var arr = {};\n  //        example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', arr);\n  //        example 2: $result = arr\n  //        returns 2: { str_a: \"Jack and Jill didn't see the well.\" }\n  //        example 3: var abc = {3:'a'};\n  //        example 3: parse_str('abc[a][b][\"c\"]=def&abc[q]=t+5');\n  //        returns 3: {\"3\":\"a\",\"a\":{\"b\":{\"c\":\"def\"}},\"q\":\"t 5\"}\n\n  var strArr = String(str)\n    .replace(/^&/, '')\n    .replace(/&$/, '')\n    .split('&'),\n    sal = strArr.length,\n    i, j, ct, p, lastObj, obj, lastIter, undef, chr, tmp, key, value,\n    postLeftBracketPos, keys, keysLen,\n    fixStr = function (str) {\n      return decodeURIComponent(str.replace(/\\+/g, '%20'))\n    }\n\n  if (!array) {\n    array = this.window\n  }\n\n  for (i = 0; i < sal; i++) {\n    tmp = strArr[i].split('=')\n    key = fixStr(tmp[0])\n    value = (tmp.length < 2) ? '' : fixStr(tmp[1])\n\n    while (key.charAt(0) === ' ') {\n      key = key.slice(1)\n    }\n    if (key.indexOf('\\x00') > -1) {\n      key = key.slice(0, key.indexOf('\\x00'))\n    }\n    if (key && key.charAt(0) !== '[') {\n      keys = []\n      postLeftBracketPos = 0\n      for (j = 0; j < key.length; j++) {\n        if (key.charAt(j) === '[' && !postLeftBracketPos) {\n          postLeftBracketPos = j + 1\n        } else if (key.charAt(j) === ']') {\n          if (postLeftBracketPos) {\n            if (!keys.length) {\n              keys.push(key.slice(0, postLeftBracketPos - 1))\n            }\n            keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos))\n            postLeftBracketPos = 0\n            if (key.charAt(j + 1) !== '[') {\n              break\n            }\n          }\n        }\n      }\n      if (!keys.length) {\n        keys = [key]\n      }\n      for (j = 0; j < keys[0].length; j++) {\n        chr = keys[0].charAt(j)\n        if (chr === ' ' || chr === '.' || chr === '[') {\n          keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1)\n        }\n        if (chr === '[') {\n          break\n        }\n      }\n\n      obj = array\n      for (j = 0, keysLen = keys.length; j < keysLen; j++) {\n        key = keys[j].replace(/^['\"]/, '')\n          .replace(/['\"]$/, '')\n        lastIter = j !== keys.length - 1\n        lastObj = obj\n        if ((key !== '' && key !== ' ') || j === 0) {\n          if (obj[key] === undef) {\n            obj[key] = {}\n          }\n          obj = obj[key]\n        } else {\n          // To insert new dimension\n          ct = -1\n          for (p in obj) {\n            if (obj.hasOwnProperty(p)) {\n              if (+p > ct && p.match(/^\\d+$/g)) {\n                ct = +p\n              }\n            }\n          }\n          key = ct + 1\n        }\n      }\n      lastObj[key] = value\n    }\n  }\n}\n"
permalink: /functions/parse_str/
redirect_from:
  - /functions/strings/parse_str/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->

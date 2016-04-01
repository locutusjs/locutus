---
examples:
  - - "xdiff_string_patch('', '@@ -0,0 +1,1 @@\\n+Hello world!');"
returns:
  - - "'Hello world!'"
authors:
  original by:
    - 'Brett Zamir (http://brett-zamir.me)'
  improved by:
    - Steven Levithan (stevenlevithan.com)
notes:
  - - The XDIFF_PATCH_IGNORESPACE flag and the error argument are not currently supported
    - This has not been widely tested
layout: function
function: xdiff_string_patch
category: xdiff
code: "function xdiff_string_patch (originalStr, patch, flags, error) {\n  //  discuss at: http://phpjs.org/functions/xdiff_string_patch/\n  // original by: Brett Zamir (http://brett-zamir.me)\n  // improved by: Steven Levithan (stevenlevithan.com)\n  //        note: The XDIFF_PATCH_IGNORESPACE flag and the error argument are not currently supported\n  //        note: This has not been widely tested\n  //   example 1: xdiff_string_patch('', '@@ -0,0 +1,1 @@\\n+Hello world!');\n  //   returns 1: 'Hello world!'\n\n  // First two functions were adapted from Steven Levithan, also under an MIT license\n  // Adapted from XRegExp 1.5.0\n  // (c) 2007-2010 Steven Levithan\n  // MIT License\n  // <http://xregexp.com>\n  var getNativeFlags = function (regex) {\n      return (regex.global ? 'g' : '') + (regex.ignoreCase ? 'i' : '') + (regex.multiline ? 'm' : '') + (regex.extended ?\n          'x' : '') + // Proposed for ES4; included in AS3\n        (regex.sticky ? 'y' : '')\n    },\n    cbSplit = function (string, sep /* separator */) {\n      // If separator `s` is not a regex, use the native `split`\n      if (!(sep instanceof RegExp)) {\n        // Had problems to get it to work here using prototype test\n        return String.prototype.split.apply(string, arguments)\n      }\n      var str = String(string),\n        output = [],\n        lastLastIndex = 0,\n        match, lastLength, limit = Infinity,\n\n        // This is required if not `s.global`, and it avoids needing to set `s.lastIndex` to zero\n        // and restore it to its original value when we're done using the regex\n        x = sep._xregexp,\n        // Brett paring down\n        s = new RegExp(sep.source, getNativeFlags(sep) + 'g')\n      if (x) {\n        s._xregexp = {\n          source: x.source,\n          captureNames: x.captureNames ? x.captureNames.slice(0) : null\n        }\n      }\n\n      while ((match = s.exec(str))) {\n        // Run the altered `exec` (required for `lastIndex` fix, etc.)\n        if (s.lastIndex > lastLastIndex) {\n          output.push(str.slice(lastLastIndex, match.index))\n\n          if (match.length > 1 && match.index < str.length) {\n            Array.prototype.push.apply(output, match.slice(1))\n          }\n\n          lastLength = match[0].length\n          lastLastIndex = s.lastIndex\n\n          if (output.length >= limit) {\n            break\n          }\n        }\n\n        if (s.lastIndex === match.index) {\n          s.lastIndex++\n        }\n      }\n\n      if (lastLastIndex === str.length) {\n        if (!s.test('') || lastLength) {\n          output.push('')\n        }\n      } else {\n        output.push(str.slice(lastLastIndex))\n      }\n\n      return output.length > limit ? output.slice(0, limit) : output\n    },\n    i = 0,\n    ll = 0,\n    ranges = [],\n    lastLinePos = 0,\n    firstChar = '',\n    rangeExp = /^@@\\s+-(\\d+),(\\d+)\\s+\\+(\\d+),(\\d+)\\s+@@$/,\n    lineBreaks = /\\r?\\n/,\n    lines = cbSplit(patch.replace(/(\\r?\\n)+$/, ''), lineBreaks),\n    origLines = cbSplit(originalStr, lineBreaks),\n    newStrArr = [],\n    linePos = 0,\n    errors = '',\n    // Both string & integer (constant) input is allowed\n    optTemp = 0,\n    OPTS = {\n      // Unsure of actual PHP values, so better to rely on string\n      'XDIFF_PATCH_NORMAL': 1,\n      'XDIFF_PATCH_REVERSE': 2,\n      'XDIFF_PATCH_IGNORESPACE': 4\n    }\n\n  // Input defaulting & sanitation\n  if (typeof originalStr !== 'string' || !patch) {\n    return false\n  }\n  if (!flags) {\n    flags = 'XDIFF_PATCH_NORMAL'\n  }\n\n  if (typeof flags !== 'number') {\n    // Allow for a single string or an array of string flags\n    flags = [].concat(flags)\n    for (i = 0; i < flags.length; i++) {\n      // Resolve string input to bitwise e.g. 'XDIFF_PATCH_NORMAL' becomes 1\n      if (OPTS[flags[i]]) {\n        optTemp = optTemp | OPTS[flags[i]]\n      }\n    }\n    flags = optTemp\n  }\n\n  if (flags & OPTS.XDIFF_PATCH_NORMAL) {\n    for (i = 0, ll = lines.length; i < ll; i++) {\n      ranges = lines[i].match(rangeExp)\n      if (ranges) {\n        lastLinePos = linePos\n        linePos = ranges[1] - 1\n        while (lastLinePos < linePos) {\n          newStrArr[newStrArr.length] = origLines[lastLinePos++]\n        }\n        while (lines[++i] && (rangeExp.exec(lines[i])) === null) {\n          firstChar = lines[i].charAt(0)\n          switch (firstChar) {\n            case '-':\n            // Skip including that line\n              ++linePos\n              break\n            case '+':\n              newStrArr[newStrArr.length] = lines[i].slice(1)\n              break\n            case ' ':\n              newStrArr[newStrArr.length] = origLines[linePos++]\n              break\n            default:\n            // Reconcile with returning errrors arg?\n              throw 'Unrecognized initial character in unidiff line'\n          }\n        }\n        if (lines[i]) {\n          i--\n        }\n      }\n    }\n    while (linePos > 0 && linePos < origLines.length) {\n      newStrArr[newStrArr.length] = origLines[linePos++]\n    }\n  } else if (flags & OPTS.XDIFF_PATCH_REVERSE) {\n    // Only differs from above by a few lines\n    for (i = 0, ll = lines.length; i < ll; i++) {\n      ranges = lines[i].match(rangeExp)\n      if (ranges) {\n        lastLinePos = linePos\n        linePos = ranges[3] - 1\n        while (lastLinePos < linePos) {\n          newStrArr[newStrArr.length] = origLines[lastLinePos++]\n        }\n        while (lines[++i] && (rangeExp.exec(lines[i])) === null) {\n          firstChar = lines[i].charAt(0)\n          switch (firstChar) {\n            case '-':\n              newStrArr[newStrArr.length] = lines[i].slice(1)\n              break\n            case '+':\n            // Skip including that line\n              ++linePos\n              break\n            case ' ':\n              newStrArr[newStrArr.length] = origLines[linePos++]\n              break\n            default:\n            // Reconcile with returning errrors arg?\n              throw 'Unrecognized initial character in unidiff line'\n          }\n        }\n        if (lines[i]) {\n          i--\n        }\n      }\n    }\n    while (linePos > 0 && linePos < origLines.length) {\n      newStrArr[newStrArr.length] = origLines[linePos++]\n    }\n  }\n  if (typeof error === 'string') {\n    this.window[error] = errors\n  }\n  return newStrArr.join('\\n')\n}\n"
permalink: /functions/xdiff_string_patch/
redirect_from:
  - /functions/xdiff/xdiff_string_patch/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
---
examples:
  - - "json_encode('Kevin');"
returns:
  - - "'\"Kevin\"'"
authors:
  original by:
    - 'Public Domain (http://www.json.org/json2.js)'
  improved by:
    - Michael White
  bugfixed by:
    - 'Brett Zamir (http://brett-zamir.me)'
  input by:
    - felix
notes: []
layout: function
function: json_encode
category: json
code: "function json_encode (mixed_val) {\n  //       discuss at: http://phpjs.org/functions/json_encode/\n  //      original by: Public Domain (http://www.json.org/json2.js)\n  // reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  //      improved by: Michael White\n  //         input by: felix\n  //      bugfixed by: Brett Zamir (http://brett-zamir.me)\n  //        example 1: json_encode('Kevin');\n  //        returns 1: '\"Kevin\"'\n\n  /*\n        http://www.JSON.org/json2.js\n        2008-11-19\n        Public Domain.\n        NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.\n        See http://www.JSON.org/js.html\n      */\n  var retVal, json = this.window.JSON\n  try {\n    if (typeof json === 'object' && typeof json.stringify === 'function') {\n      // Errors will not be caught here if our own equivalent to resource\n      retVal = json.stringify(mixed_val)\n      //  (an instance of PHPJS_Resource) is used\n      if (retVal === undefined) {\n        throw new SyntaxError('json_encode')\n      }\n      return retVal\n    }\n\n    var value = mixed_val\n\n    var quote = function (string) {\n      var escapable =\n        /[\\\\\\\"\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]/g\n      var meta = {\n        // table of character substitutions\n        '\\b': '\\\\b',\n        '\\t': '\\\\t',\n        '\\n': '\\\\n',\n        '\\f': '\\\\f',\n        '\\r': '\\\\r',\n        '\"': '\\\\\"',\n        '\\\\': '\\\\\\\\'\n      }\n\n      escapable.lastIndex = 0\n      return escapable.test(string) ? '\"' + string.replace(escapable, function (a) {\n        var c = meta[a]\n        return typeof c === 'string' ? c : '\\\\u' + ('0000' + a.charCodeAt(0)\n            .toString(16))\n          .slice(-4)\n      }) + '\"' : '\"' + string + '\"'\n    }\n\n    var str = function (key, holder) {\n      var gap = ''\n      var indent = '    '\n      // The loop counter.\n      var i = 0\n      // The member key.\n      var k = ''\n      // The member value.\n      var v = ''\n      var length = 0\n      var mind = gap\n      var partial = []\n      var value = holder[key]\n\n      // If the value has a toJSON method, call it to obtain a replacement value.\n      if (value && typeof value === 'object' && typeof value.toJSON === 'function') {\n        value = value.toJSON(key)\n      }\n\n      // What happens next depends on the value's type.\n      switch (typeof value) {\n        case 'string':\n          return quote(value)\n\n        case 'number':\n        // JSON numbers must be finite. Encode non-finite numbers as null.\n          return isFinite(value) ? String(value) : 'null'\n\n        case 'boolean':\n        case 'null':\n        // If the value is a boolean or null, convert it to a string. Note:\n        // typeof null does not produce 'null'. The case is included here in\n        // the remote chance that this gets fixed someday.\n          return String(value)\n\n        case 'object':\n        // If the type is 'object', we might be dealing with an object or an array or\n        // null.\n        // Due to a specification blunder in ECMAScript, typeof null is 'object',\n        // so watch out for that case.\n          if (!value) {\n            return 'null'\n          }\n          if ((this.PHPJS_Resource && value instanceof this.PHPJS_Resource) || (window.PHPJS_Resource &&\n            value instanceof window.PHPJS_Resource)) {\n            throw new SyntaxError('json_encode')\n          }\n\n        // Make an array to hold the partial results of stringifying this object value.\n          gap += indent\n          partial = []\n\n        // Is the value an array?\n          if (Object.prototype.toString.apply(value) === '[object Array]') {\n          // The value is an array. Stringify every element. Use null as a placeholder\n          // for non-JSON values.\n            length = value.length\n            for (i = 0; i < length; i += 1) {\n              partial[i] = str(i, value) || 'null'\n            }\n\n          // Join all of the elements together, separated with commas, and wrap them in\n          // brackets.\n            v = partial.length === 0 ? '[]' : gap ? '[\\n' + gap + partial.join(',\\n' + gap) + '\\n' + mind +\n            ']' : '[' + partial.join(',') + ']'\n            gap = mind\n            return v\n          }\n\n        // Iterate through all of the keys in the object.\n          for (k in value) {\n            if (Object.hasOwnProperty.call(value, k)) {\n              v = str(k, value)\n              if (v) {\n                partial.push(quote(k) + (gap ? ': ' : ':') + v)\n              }\n            }\n          }\n\n        // Join all of the member texts together, separated with commas,\n        // and wrap them in braces.\n          v = partial.length === 0 ? '{}' : gap ? '{\\n' + gap + partial.join(',\\n' + gap) + '\\n' + mind + '}' :\n          '{' + partial.join(',') + '}'\n          gap = mind\n          return v\n        case 'undefined':\n        // Fall-through\n        case 'function':\n        // Fall-through\n        default:\n          throw new SyntaxError('json_encode')\n      }\n    }\n\n    // Make a fake root object containing our value under the key of ''.\n    // Return the result of stringifying the value.\n    return str('', {\n      '': value\n    })\n\n  } catch (err) {\n    // Todo: ensure error handling above throws a SyntaxError in all cases where it could\n    // (i.e., when the JSON global is not available and there is an error)\n    if (!(err instanceof SyntaxError)) {\n      throw new Error('Unexpected error type in json_encode()')\n    }\n    this.php_js = this.php_js || {}\n    // usable by json_last_error()\n    this.php_js.last_error_json = 4\n    return null\n  }\n}\n"
permalink: /functions/json_encode/
redirect_from:
  - /functions/json/json_encode/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
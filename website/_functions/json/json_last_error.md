---
examples:
  - - json_last_error();
returns:
  - - '0'
authors:
  original by:
    - 'Brett Zamir (http://brett-zamir.me)'
notes: []
layout: function
function: json_last_error
category: json
code: "function json_last_error () {\n  //  discuss at: http://phpjs.org/functions/json_last_error/\n  // original by: Brett Zamir (http://brett-zamir.me)\n  //   example 1: json_last_error();\n  //   returns 1: 0\n\n  /*\n      JSON_ERROR_NONE = 0\n      JSON_ERROR_DEPTH = 1 // max depth limit to be removed per PHP comments in json.c (not possible in JS?)\n      JSON_ERROR_STATE_MISMATCH = 2 // internal use? also not documented\n      JSON_ERROR_CTRL_CHAR = 3 // [\\u0000-\\u0008\\u000B-\\u000C\\u000E-\\u001F] if used directly within json_decode(),\n                                      // but JSON functions auto-escape these, so error not possible in JavaScript\n      JSON_ERROR_SYNTAX = 4\n      */\n  return this.php_js && this.php_js.last_error_json ? this.php_js.last_error_json : 0\n}\n"
permalink: /functions/json_last_error/
redirect_from:
  - /functions/json/json_last_error/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
{
  "headKeys": {
    "discuss at": [
      [
        "http://phpjs.org/functions/array_change_key_case/"
      ]
    ],
    "original by": [
      [
        "Ates Goral (http://magnetiq.com)"
      ]
    ],
    "improved by": [
      [
        "marrtins",
        "Brett Zamir (http://brett-zamir.me)"
      ]
    ],
    "depends on": [
      [
        "pos",
        "is_binary"
      ]
    ],
    "example": [
      [
        "array_change_key_case(42);"
      ],
      [
        "array_change_key_case([ 3, 5 ]);"
      ],
      [
        "array_change_key_case({ FuBaR: 42 });"
      ],
      [
        "array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');"
      ],
      [
        "array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');"
      ],
      [
        "array_change_key_case({ FuBaR: 42 }, 2);"
      ],
      [
        "ini_set('phpjs.return_phpjs_arrays', 'on');",
        "var arr = [{a: 0}, {B: 1}, {c: 2}];",
        "var newArr = array_change_key_case(arr);",
        "newArr.splice(1, 1);"
      ]
    ],
    "returns": [
      [
        "false"
      ],
      [
        "[3, 5]"
      ],
      [
        "{\"fubar\": 42}"
      ],
      [
        "{\"fubar\": 42}"
      ],
      [
        "{\"FUBAR\": 42}"
      ],
      [
        "{\"FUBAR\": 42}"
      ],
      [
        "{b: 1}"
      ]
    ]
  },
  "body": "var case_fn, key, tmp_ar = {};\n\n  if (Object.prototype.toString.call(array) === '[object Array]') {\n    return array;\n  }\n  if (array && typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array\n    return array.change_key_case(cs);\n  }\n  if (array && typeof array === 'object') {\n    case_fn = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';\n    for (key in array) {\n      tmp_ar[key[case_fn]()] = array[key];\n    }\n    return tmp_ar;\n  }\n\n  return false;",
  "head": "  //  discuss at: http://phpjs.org/functions/array_change_key_case/\n  // original by: Ates Goral (http://magnetiq.com)\n  // improved by: marrtins\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  //  depends on: pos\n  //  depends on: is_binary\n  //   example 1: array_change_key_case(42);\n  //   returns 1: false\n  //   example 2: array_change_key_case([ 3, 5 ]);\n  //   returns 2: [3, 5]\n  //   example 3: array_change_key_case({ FuBaR: 42 });\n  //   returns 3: {\"fubar\": 42}\n  //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');\n  //   returns 4: {\"fubar\": 42}\n  //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');\n  //   returns 5: {\"FUBAR\": 42}\n  //   example 6: array_change_key_case({ FuBaR: 42 }, 2);\n  //   returns 6: {\"FUBAR\": 42}\n  //   example 7: ini_set('phpjs.return_phpjs_arrays', 'on');\n  //   example 7: var arr = [{a: 0}, {B: 1}, {c: 2}];\n  //   example 7: var newArr = array_change_key_case(arr);\n  //   example 7: newArr.splice(1, 1);\n  //   returns 7: {b: 1}",
  "name": "array_change_key_case",
  "code": "function array_change_key_case(array, cs) {\n  //  discuss at: http://phpjs.org/functions/array_change_key_case/\n  // original by: Ates Goral (http://magnetiq.com)\n  // improved by: marrtins\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  //  depends on: pos\n  //  depends on: is_binary\n  //   example 1: array_change_key_case(42);\n  //   returns 1: false\n  //   example 2: array_change_key_case([ 3, 5 ]);\n  //   returns 2: [3, 5]\n  //   example 3: array_change_key_case({ FuBaR: 42 });\n  //   returns 3: {\"fubar\": 42}\n  //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');\n  //   returns 4: {\"fubar\": 42}\n  //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');\n  //   returns 5: {\"FUBAR\": 42}\n  //   example 6: array_change_key_case({ FuBaR: 42 }, 2);\n  //   returns 6: {\"FUBAR\": 42}\n  //   example 7: ini_set('phpjs.return_phpjs_arrays', 'on');\n  //   example 7: var arr = [{a: 0}, {B: 1}, {c: 2}];\n  //   example 7: var newArr = array_change_key_case(arr);\n  //   example 7: newArr.splice(1, 1);\n  //   returns 7: {b: 1}\n\n  var case_fn, key, tmp_ar = {};\n\n  if (Object.prototype.toString.call(array) === '[object Array]') {\n    return array;\n  }\n  if (array && typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array\n    return array.change_key_case(cs);\n  }\n  if (array && typeof array === 'object') {\n    case_fn = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';\n    for (key in array) {\n      tmp_ar[key[case_fn]()] = array[key];\n    }\n    return tmp_ar;\n  }\n\n  return false;\n}",
  "dependencies": {
    "pos": {
      "headKeys": {
        "discuss at": [
          [
            "http://phpjs.org/functions/pos/"
          ]
        ],
        "original by": [
          [
            "Brett Zamir (http://brett-zamir.me)"
          ]
        ],
        "note": [
          [
            "Uses global: php_js to store the array pointer"
          ]
        ],
        "depends on": [
          [
            "current"
          ]
        ],
        "example": [
          [
            "transport = ['foot', 'bike', 'car', 'plane'];",
            "pos(transport);"
          ]
        ],
        "returns": [
          [
            "'foot'"
          ]
        ]
      },
      "body": "return this.current(arr);",
      "head": "  //  discuss at: http://phpjs.org/functions/pos/\n  // original by: Brett Zamir (http://brett-zamir.me)\n  //        note: Uses global: php_js to store the array pointer\n  //  depends on: current\n  //   example 1: transport = ['foot', 'bike', 'car', 'plane'];\n  //   example 1: pos(transport);\n  //   returns 1: 'foot'",
      "name": "pos",
      "code": "function pos(arr) {\n  //  discuss at: http://phpjs.org/functions/pos/\n  // original by: Brett Zamir (http://brett-zamir.me)\n  //        note: Uses global: php_js to store the array pointer\n  //  depends on: current\n  //   example 1: transport = ['foot', 'bike', 'car', 'plane'];\n  //   example 1: pos(transport);\n  //   returns 1: 'foot'\n\n  return this.current(arr);\n}",
      "dependencies": {
        "current": {
          "headKeys": {
            "discuss at": [
              [
                "http://phpjs.org/functions/current/"
              ]
            ],
            "original by": [
              [
                "Brett Zamir (http://brett-zamir.me)"
              ]
            ],
            "note": [
              [
                "Uses global: php_js to store the array pointer"
              ]
            ],
            "example": [
              [
                "transport = ['foot', 'bike', 'car', 'plane'];",
                "current(transport);"
              ]
            ],
            "returns": [
              [
                "'foot'"
              ]
            ]
          },
          "body": "this.php_js = this.php_js || {};\n  this.php_js.pointers = this.php_js.pointers || [];\n  var indexOf = function (value) {\n    for (var i = 0, length = this.length; i < length; i++) {\n      if (this[i] === value) {\n        return i;\n      }\n    }\n    return -1;\n  };\n  // END REDUNDANT\n  var pointers = this.php_js.pointers;\n  if (!pointers.indexOf) {\n    pointers.indexOf = indexOf;\n  }\n  if (pointers.indexOf(arr) === -1) {\n    pointers.push(arr, 0);\n  }\n  var arrpos = pointers.indexOf(arr);\n  var cursor = pointers[arrpos + 1];\n  if (Object.prototype.toString.call(arr) === '[object Array]') {\n    return arr[cursor] || false;\n  }\n  var ct = 0;\n  for (var k in arr) {\n    if (ct === cursor) {\n      return arr[k];\n    }\n    ct++;\n  }\n  // Empty\n  return false;",
          "head": "  //  discuss at: http://phpjs.org/functions/current/\n  // original by: Brett Zamir (http://brett-zamir.me)\n  //        note: Uses global: php_js to store the array pointer\n  //   example 1: transport = ['foot', 'bike', 'car', 'plane'];\n  //   example 1: current(transport);\n  //   returns 1: 'foot'",
          "name": "current",
          "code": "function current(arr) {\n  //  discuss at: http://phpjs.org/functions/current/\n  // original by: Brett Zamir (http://brett-zamir.me)\n  //        note: Uses global: php_js to store the array pointer\n  //   example 1: transport = ['foot', 'bike', 'car', 'plane'];\n  //   example 1: current(transport);\n  //   returns 1: 'foot'\n\n  this.php_js = this.php_js || {};\n  this.php_js.pointers = this.php_js.pointers || [];\n  var indexOf = function (value) {\n    for (var i = 0, length = this.length; i < length; i++) {\n      if (this[i] === value) {\n        return i;\n      }\n    }\n    return -1;\n  };\n  // END REDUNDANT\n  var pointers = this.php_js.pointers;\n  if (!pointers.indexOf) {\n    pointers.indexOf = indexOf;\n  }\n  if (pointers.indexOf(arr) === -1) {\n    pointers.push(arr, 0);\n  }\n  var arrpos = pointers.indexOf(arr);\n  var cursor = pointers[arrpos + 1];\n  if (Object.prototype.toString.call(arr) === '[object Array]') {\n    return arr[cursor] || false;\n  }\n  var ct = 0;\n  for (var k in arr) {\n    if (ct === cursor) {\n      return arr[k];\n    }\n    ct++;\n  }\n  // Empty\n  return false;\n}",
          "dependencies": {},
          "func_signature": "function current(arr) {\n  ",
          "func_name": "current",
          "func_arguments": [
            "arr"
          ],
          "commentBlocks": [
            {
              "clean": [
                "discuss at: http://phpjs.org/functions/current/",
                "original by: Brett Zamir (http://brett-zamir.me)",
                "note: Uses global: php_js to store the array pointer",
                "example 1: transport = ['foot', 'bike', 'car', 'plane'];",
                "example 1: current(transport);",
                "returns 1: 'foot'"
              ],
              "raw": [
                "  //  discuss at: http://phpjs.org/functions/current/",
                "  // original by: Brett Zamir (http://brett-zamir.me)",
                "  //        note: Uses global: php_js to store the array pointer",
                "  //   example 1: transport = ['foot', 'bike', 'car', 'plane'];",
                "  //   example 1: current(transport);",
                "  //   returns 1: 'foot'"
              ]
            },
            {
              "clean": [
                "END REDUNDANT"
              ],
              "raw": [
                "  // END REDUNDANT"
              ]
            },
            {
              "clean": [
                "Empty"
              ],
              "raw": [
                "  // Empty"
              ]
            }
          ]
        }
      },
      "func_signature": "function pos(arr) {\n  ",
      "func_name": "pos",
      "func_arguments": [
        "arr"
      ],
      "commentBlocks": [
        {
          "clean": [
            "discuss at: http://phpjs.org/functions/pos/",
            "original by: Brett Zamir (http://brett-zamir.me)",
            "note: Uses global: php_js to store the array pointer",
            "depends on: current",
            "example 1: transport = ['foot', 'bike', 'car', 'plane'];",
            "example 1: pos(transport);",
            "returns 1: 'foot'"
          ],
          "raw": [
            "  //  discuss at: http://phpjs.org/functions/pos/",
            "  // original by: Brett Zamir (http://brett-zamir.me)",
            "  //        note: Uses global: php_js to store the array pointer",
            "  //  depends on: current",
            "  //   example 1: transport = ['foot', 'bike', 'car', 'plane'];",
            "  //   example 1: pos(transport);",
            "  //   returns 1: 'foot'"
          ]
        }
      ]
    },
    "current": {
      "headKeys": {
        "discuss at": [
          [
            "http://phpjs.org/functions/current/"
          ]
        ],
        "original by": [
          [
            "Brett Zamir (http://brett-zamir.me)"
          ]
        ],
        "note": [
          [
            "Uses global: php_js to store the array pointer"
          ]
        ],
        "example": [
          [
            "transport = ['foot', 'bike', 'car', 'plane'];",
            "current(transport);"
          ]
        ],
        "returns": [
          [
            "'foot'"
          ]
        ]
      },
      "body": "this.php_js = this.php_js || {};\n  this.php_js.pointers = this.php_js.pointers || [];\n  var indexOf = function (value) {\n    for (var i = 0, length = this.length; i < length; i++) {\n      if (this[i] === value) {\n        return i;\n      }\n    }\n    return -1;\n  };\n  // END REDUNDANT\n  var pointers = this.php_js.pointers;\n  if (!pointers.indexOf) {\n    pointers.indexOf = indexOf;\n  }\n  if (pointers.indexOf(arr) === -1) {\n    pointers.push(arr, 0);\n  }\n  var arrpos = pointers.indexOf(arr);\n  var cursor = pointers[arrpos + 1];\n  if (Object.prototype.toString.call(arr) === '[object Array]') {\n    return arr[cursor] || false;\n  }\n  var ct = 0;\n  for (var k in arr) {\n    if (ct === cursor) {\n      return arr[k];\n    }\n    ct++;\n  }\n  // Empty\n  return false;",
      "head": "  //  discuss at: http://phpjs.org/functions/current/\n  // original by: Brett Zamir (http://brett-zamir.me)\n  //        note: Uses global: php_js to store the array pointer\n  //   example 1: transport = ['foot', 'bike', 'car', 'plane'];\n  //   example 1: current(transport);\n  //   returns 1: 'foot'",
      "name": "current",
      "code": "function current(arr) {\n  //  discuss at: http://phpjs.org/functions/current/\n  // original by: Brett Zamir (http://brett-zamir.me)\n  //        note: Uses global: php_js to store the array pointer\n  //   example 1: transport = ['foot', 'bike', 'car', 'plane'];\n  //   example 1: current(transport);\n  //   returns 1: 'foot'\n\n  this.php_js = this.php_js || {};\n  this.php_js.pointers = this.php_js.pointers || [];\n  var indexOf = function (value) {\n    for (var i = 0, length = this.length; i < length; i++) {\n      if (this[i] === value) {\n        return i;\n      }\n    }\n    return -1;\n  };\n  // END REDUNDANT\n  var pointers = this.php_js.pointers;\n  if (!pointers.indexOf) {\n    pointers.indexOf = indexOf;\n  }\n  if (pointers.indexOf(arr) === -1) {\n    pointers.push(arr, 0);\n  }\n  var arrpos = pointers.indexOf(arr);\n  var cursor = pointers[arrpos + 1];\n  if (Object.prototype.toString.call(arr) === '[object Array]') {\n    return arr[cursor] || false;\n  }\n  var ct = 0;\n  for (var k in arr) {\n    if (ct === cursor) {\n      return arr[k];\n    }\n    ct++;\n  }\n  // Empty\n  return false;\n}",
      "dependencies": {},
      "func_signature": "function current(arr) {\n  ",
      "func_name": "current",
      "func_arguments": [
        "arr"
      ],
      "commentBlocks": [
        {
          "clean": [
            "discuss at: http://phpjs.org/functions/current/",
            "original by: Brett Zamir (http://brett-zamir.me)",
            "note: Uses global: php_js to store the array pointer",
            "example 1: transport = ['foot', 'bike', 'car', 'plane'];",
            "example 1: current(transport);",
            "returns 1: 'foot'"
          ],
          "raw": [
            "  //  discuss at: http://phpjs.org/functions/current/",
            "  // original by: Brett Zamir (http://brett-zamir.me)",
            "  //        note: Uses global: php_js to store the array pointer",
            "  //   example 1: transport = ['foot', 'bike', 'car', 'plane'];",
            "  //   example 1: current(transport);",
            "  //   returns 1: 'foot'"
          ]
        },
        {
          "clean": [
            "END REDUNDANT"
          ],
          "raw": [
            "  // END REDUNDANT"
          ]
        },
        {
          "clean": [
            "Empty"
          ],
          "raw": [
            "  // Empty"
          ]
        }
      ]
    }
  },
  "func_signature": "function array_change_key_case(array, cs) {\n  ",
  "func_name": "array_change_key_case",
  "func_arguments": [
    "array",
    "cs"
  ],
  "commentBlocks": [
    {
      "clean": [
        "discuss at: http://phpjs.org/functions/array_change_key_case/",
        "original by: Ates Goral (http://magnetiq.com)",
        "improved by: marrtins",
        "improved by: Brett Zamir (http://brett-zamir.me)",
        "depends on: pos",
        "depends on: is_binary",
        "example 1: array_change_key_case(42);",
        "returns 1: false",
        "example 2: array_change_key_case([ 3, 5 ]);",
        "returns 2: [3, 5]",
        "example 3: array_change_key_case({ FuBaR: 42 });",
        "returns 3: {\"fubar\": 42}",
        "example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');",
        "returns 4: {\"fubar\": 42}",
        "example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');",
        "returns 5: {\"FUBAR\": 42}",
        "example 6: array_change_key_case({ FuBaR: 42 }, 2);",
        "returns 6: {\"FUBAR\": 42}",
        "example 7: ini_set('phpjs.return_phpjs_arrays', 'on');",
        "example 7: var arr = [{a: 0}, {B: 1}, {c: 2}];",
        "example 7: var newArr = array_change_key_case(arr);",
        "example 7: newArr.splice(1, 1);",
        "returns 7: {b: 1}"
      ],
      "raw": [
        "  //  discuss at: http://phpjs.org/functions/array_change_key_case/",
        "  // original by: Ates Goral (http://magnetiq.com)",
        "  // improved by: marrtins",
        "  // improved by: Brett Zamir (http://brett-zamir.me)",
        "  //  depends on: pos",
        "  //  depends on: is_binary",
        "  //   example 1: array_change_key_case(42);",
        "  //   returns 1: false",
        "  //   example 2: array_change_key_case([ 3, 5 ]);",
        "  //   returns 2: [3, 5]",
        "  //   example 3: array_change_key_case({ FuBaR: 42 });",
        "  //   returns 3: {\"fubar\": 42}",
        "  //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');",
        "  //   returns 4: {\"fubar\": 42}",
        "  //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');",
        "  //   returns 5: {\"FUBAR\": 42}",
        "  //   example 6: array_change_key_case({ FuBaR: 42 }, 2);",
        "  //   returns 6: {\"FUBAR\": 42}",
        "  //   example 7: ini_set('phpjs.return_phpjs_arrays', 'on');",
        "  //   example 7: var arr = [{a: 0}, {B: 1}, {c: 2}];",
        "  //   example 7: var newArr = array_change_key_case(arr);",
        "  //   example 7: newArr.splice(1, 1);",
        "  //   returns 7: {b: 1}"
      ]
    }
  ]
}
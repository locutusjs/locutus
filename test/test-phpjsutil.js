var assert    = require('assert');
var fs        = require('fs');
var __root    = __dirname + '/..';
var phpjsutil = new require('../lib/phpjsutil');
var PhpjsUtil = phpjsutil({
  injectDependencies: ['ini_set', 'ini_get'],
});

var files = {
  "array_change_key_case": fs.readFileSync(__root + '/test/fixtures/array_change_key_case.js', 'utf-8')
};

var fixtures = {
  "array_change_key_case": {
    "headKeys":{
      "discuss at":[
        [
          "http://phpjs.org/functions/array_change_key_case/"
        ]
      ],
      "original by":[
        [
          "Ates Goral (http://magnetiq.com)"
        ]
      ],
      "improved by":[
        [
          "marrtins",
          "Brett Zamir (http://brett-zamir.me)"
        ]
      ],
      "example":[
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
      "returns":[
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
    "body":"var case_fn, key, tmp_ar = {};\n\n  if (Object.prototype.toString.call(array) === '[object Array]') {\n    return array;\n  }\n  if (array && typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array\n    return array.change_key_case(cs);\n  }\n  if (array && typeof array === 'object') {\n    case_fn = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';\n    for (key in array) {\n      tmp_ar[key[case_fn]()] = array[key];\n    }\n    return tmp_ar;\n  }\n\n  return false;",
    "head":"  //  discuss at: http://phpjs.org/functions/array_change_key_case/\n  // original by: Ates Goral (http://magnetiq.com)\n  // improved by: marrtins\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  //   example 1: array_change_key_case(42);\n  //   returns 1: false\n  //   example 2: array_change_key_case([ 3, 5 ]);\n  //   returns 2: [3, 5]\n  //   example 3: array_change_key_case({ FuBaR: 42 });\n  //   returns 3: {\"fubar\": 42}\n  //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');\n  //   returns 4: {\"fubar\": 42}\n  //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');\n  //   returns 5: {\"FUBAR\": 42}\n  //   example 6: array_change_key_case({ FuBaR: 42 }, 2);\n  //   returns 6: {\"FUBAR\": 42}\n  //   example 7: ini_set('phpjs.return_phpjs_arrays', 'on');\n  //   example 7: var arr = [{a: 0}, {B: 1}, {c: 2}];\n  //   example 7: var newArr = array_change_key_case(arr);\n  //   example 7: newArr.splice(1, 1);\n  //   returns 7: {b: 1}",
    "name":"array_change_key_case",
    "code":"function array_change_key_case(array, cs) {\n  //  discuss at: http://phpjs.org/functions/array_change_key_case/\n  // original by: Ates Goral (http://magnetiq.com)\n  // improved by: marrtins\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  //   example 1: array_change_key_case(42);\n  //   returns 1: false\n  //   example 2: array_change_key_case([ 3, 5 ]);\n  //   returns 2: [3, 5]\n  //   example 3: array_change_key_case({ FuBaR: 42 });\n  //   returns 3: {\"fubar\": 42}\n  //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');\n  //   returns 4: {\"fubar\": 42}\n  //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');\n  //   returns 5: {\"FUBAR\": 42}\n  //   example 6: array_change_key_case({ FuBaR: 42 }, 2);\n  //   returns 6: {\"FUBAR\": 42}\n  //   example 7: ini_set('phpjs.return_phpjs_arrays', 'on');\n  //   example 7: var arr = [{a: 0}, {B: 1}, {c: 2}];\n  //   example 7: var newArr = array_change_key_case(arr);\n  //   example 7: newArr.splice(1, 1);\n  //   returns 7: {b: 1}\n\n  var case_fn, key, tmp_ar = {};\n\n  if (Object.prototype.toString.call(array) === '[object Array]') {\n    return array;\n  }\n  if (array && typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array\n    return array.change_key_case(cs);\n  }\n  if (array && typeof array === 'object') {\n    case_fn = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';\n    for (key in array) {\n      tmp_ar[key[case_fn]()] = array[key];\n    }\n    return tmp_ar;\n  }\n\n  return false;\n}",
    "dependencies":{

    },
    "func_signature":"function array_change_key_case(array, cs) {\n  ",
    "func_name":"array_change_key_case",
    "func_arguments":[
      "array",
      "cs"
    ],
    "commentBlocks":[
      {
        "clean":[
          "discuss at: http://phpjs.org/functions/array_change_key_case/",
          "original by: Ates Goral (http://magnetiq.com)",
          "improved by: marrtins",
          "improved by: Brett Zamir (http://brett-zamir.me)",
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
        "raw":[
          "  //  discuss at: http://phpjs.org/functions/array_change_key_case/",
          "  // original by: Ates Goral (http://magnetiq.com)",
          "  // improved by: marrtins",
          "  // improved by: Brett Zamir (http://brett-zamir.me)",
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
};

describe('phpjsutil', function(){
  describe('parse', function(){
    it('should return exact fixture', function(done){
      PhpjsUtil.parse('array_change_key_case', files['array_change_key_case'], function(err, params) {
        assert.deepEqual(params, fixtures['array_change_key_case']);
        done();
      });
    });
  });
});

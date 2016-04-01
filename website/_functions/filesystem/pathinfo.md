---
examples:
  - - "pathinfo('/www/htdocs/index.html', 1);"
  - - "pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME');"
  - - "pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION');"
  - - "pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME');"
  - - "pathinfo('/www/htdocs/index.html', 2 | 4);"
  - - "pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL');"
  - - "pathinfo('/www/htdocs/index.html');"
returns:
  - - "'/www/htdocs'"
  - - "'index.html'"
  - - "'html'"
  - - "'index'"
  - - "{basename: 'index.html', extension: 'html'}"
  - - "{dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}"
  - - "{dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}"
authors:
  original by:
    - Nate
  improved by:
    - 'Brett Zamir (http://brett-zamir.me)'
    - Dmitry Gorelenkov
  revised by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
  input by:
    - Timo
notes: []
layout: function
function: pathinfo
category: filesystem
code: "function pathinfo (path, options) {\n  //  discuss at: http://phpjs.org/functions/pathinfo/\n  // original by: Nate\n  //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  // improved by: Dmitry Gorelenkov\n  //    input by: Timo\n  //        note: Inspired by actual PHP source: php5-5.2.6/ext/standard/string.c line #1559\n  //        note: The way the bitwise arguments are handled allows for greater flexibility\n  //        note: & compatability. We might even standardize this code and use a similar approach for\n  //        note: other bitwise PHP functions\n  //        note: php.js tries very hard to stay away from a core.js file with global dependencies, because we like\n  //        note: that you can just take a couple of functions and be on your way.\n  //        note: But by way we implemented this function, if you want you can still declare the PATHINFO_*\n  //        note: yourself, and then you can use: pathinfo('/www/index.html', PATHINFO_BASENAME | PATHINFO_EXTENSION);\n  //        note: which makes it fully compliant with PHP syntax.\n  //  depends on: basename\n  //   example 1: pathinfo('/www/htdocs/index.html', 1);\n  //   returns 1: '/www/htdocs'\n  //   example 2: pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME');\n  //   returns 2: 'index.html'\n  //   example 3: pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION');\n  //   returns 3: 'html'\n  //   example 4: pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME');\n  //   returns 4: 'index'\n  //   example 5: pathinfo('/www/htdocs/index.html', 2 | 4);\n  //   returns 5: {basename: 'index.html', extension: 'html'}\n  //   example 6: pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL');\n  //   returns 6: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}\n  //   example 7: pathinfo('/www/htdocs/index.html');\n  //   returns 7: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}\n\n  var opt = '',\n    real_opt = '',\n    optName = '',\n    optTemp = 0,\n    tmp_arr = {},\n    cnt = 0,\n    i = 0\n  var have_basename = false,\n    have_extension = false,\n    have_filename = false\n\n  // Input defaulting & sanitation\n  if (!path) {\n    return false\n  }\n  if (!options) {\n    options = 'PATHINFO_ALL'\n  }\n\n  // Initialize binary arguments. Both the string & integer (constant) input is\n  // allowed\n  var OPTS = {\n    'PATHINFO_DIRNAME': 1,\n    'PATHINFO_BASENAME': 2,\n    'PATHINFO_EXTENSION': 4,\n    'PATHINFO_FILENAME': 8,\n    'PATHINFO_ALL': 0\n  }\n  // PATHINFO_ALL sums up all previously defined PATHINFOs (could just pre-calculate)\n  for (optName in OPTS) {\n    if (OPTS.hasOwnProperty(optName)) {\n      OPTS.PATHINFO_ALL = OPTS.PATHINFO_ALL | OPTS[optName]\n    }\n  }\n  if (typeof options !== 'number') {\n    // Allow for a single string or an array of string flags\n    options = [].concat(options)\n    for (i = 0; i < options.length; i++) {\n      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4\n      if (OPTS[options[i]]) {\n        optTemp = optTemp | OPTS[options[i]]\n      }\n    }\n    options = optTemp\n  }\n\n  // Internal Functions\n  var __getExt = function (path) {\n    var str = path + ''\n    var dotP = str.lastIndexOf('.') + 1\n    return !dotP ? false : dotP !== str.length ? str.substr(dotP) : ''\n  }\n\n  // Gather path infos\n  if (options & OPTS.PATHINFO_DIRNAME) {\n    var dirName = path.replace(/\\\\/g, '/')\n      .replace(/\\/[^\\/]*\\/?$/, '') // dirname\n    tmp_arr.dirname = dirName === path ? '.' : dirName\n  }\n\n  if (options & OPTS.PATHINFO_BASENAME) {\n    if (false === have_basename) {\n      have_basename = this.basename(path)\n    }\n    tmp_arr.basename = have_basename\n  }\n\n  if (options & OPTS.PATHINFO_EXTENSION) {\n    if (false === have_basename) {\n      have_basename = this.basename(path)\n    }\n    if (false === have_extension) {\n      have_extension = __getExt(have_basename)\n    }\n    if (false !== have_extension) {\n      tmp_arr.extension = have_extension\n    }\n  }\n\n  if (options & OPTS.PATHINFO_FILENAME) {\n    if (false === have_basename) {\n      have_basename = this.basename(path)\n    }\n    if (false === have_extension) {\n      have_extension = __getExt(have_basename)\n    }\n    if (false === have_filename) {\n      have_filename = have_basename.slice(0, have_basename.length - (have_extension ? have_extension.length + 1 :\n        have_extension === false ? 0 : 1))\n    }\n\n    tmp_arr.filename = have_filename\n  }\n\n  // If array contains only 1 element: return string\n  cnt = 0\n  for (opt in tmp_arr) {\n    if (tmp_arr.hasOwnProperty(opt)) {\n      cnt++\n      real_opt = opt\n    }\n  }\n  if (cnt === 1) {\n    return tmp_arr[real_opt]\n  }\n\n  // Return full-blown array\n  return tmp_arr\n}\n"
permalink: /functions/pathinfo/
redirect_from:
  - /functions/filesystem/pathinfo/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->

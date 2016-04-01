---
examples:
  - - 'print_r(1, true);'
returns:
  - - '1'
authors:
  original by:
    - 'Michael White (http://getsprink.com)'
  improved by:
    - Ben Bryan
    - 'Brett Zamir (http://brett-zamir.me)'
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
  input by:
    - 'Brett Zamir (http://brett-zamir.me)'
notes: []
layout: function
function: print_r
category: var
code: "function print_r (array, return_val) {\n  //  discuss at: http://phpjs.org/functions/print_r/\n  // original by: Michael White (http://getsprink.com)\n  // improved by: Ben Bryan\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  //    input by: Brett Zamir (http://brett-zamir.me)\n  //  depends on: echo\n  //   example 1: print_r(1, true);\n  //   returns 1: 1\n\n  var output = '',\n    pad_char = ' ',\n    pad_val = 4,\n    d = this.window.document,\n    getFuncName = function (fn) {\n      var name = (/\\W*function\\s+([\\w\\$]+)\\s*\\(/)\n        .exec(fn)\n      if (!name) {\n        return '(Anonymous)'\n      }\n      return name[1]\n    }\n  repeat_char = function (len, pad_char) {\n    var str = ''\n    for (var i = 0; i < len; i++) {\n      str += pad_char\n    }\n    return str\n  }\n  formatArray = function (obj, cur_depth, pad_val, pad_char) {\n    if (cur_depth > 0) {\n      cur_depth++\n    }\n\n    var base_pad = repeat_char(pad_val * cur_depth, pad_char)\n    var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char)\n    var str = ''\n\n    if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !==\n      'PHPJS_Resource') {\n      str += 'Array\\n' + base_pad + '(\\n'\n      for (var key in obj) {\n        if (Object.prototype.toString.call(obj[key]) === '[object Array]') {\n          str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char)\n        } else {\n          str += thick_pad + '[' + key + '] => ' + obj[key] + '\\n'\n        }\n      }\n      str += base_pad + ')\\n'\n    } else if (obj === null || obj === undefined) {\n      str = ''\n    } else {\n      // for our \"resource\" class\n      str = obj.toString()\n    }\n\n    return str\n  }\n\n  output = formatArray(array, 0, pad_val, pad_char)\n\n  if (return_val !== true) {\n    if (d.body) {\n      this.echo(output)\n    } else {\n      try {\n        // We're in XUL, so appending as plain text won't work; trigger an error out of XUL\n        d = XULDocument\n        this.echo('<pre xmlns=\"http://www.w3.org/1999/xhtml\" style=\"white-space:pre;\">' + output + '</pre>')\n      } catch (e) {\n        // Outputting as plain text may work in some plain XML\n        this.echo(output)\n      }\n    }\n    return true\n  }\n  return output\n}\n"
permalink: /functions/print_r/
redirect_from:
  - /functions/var/print_r/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
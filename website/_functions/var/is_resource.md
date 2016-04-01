---
examples:
  - - "is_resource('a');"
returns:
  - - 'false'
authors:
  original by:
    - 'Brett Zamir (http://brett-zamir.me)'
  improved by:
    - 'Luis Salazar (http://www.freaky-media.com/)'
notes: []
layout: function
function: is_resource
category: var
code: "function is_resource (handle) {\n  //  discuss at: http://phpjs.org/functions/is_resource/\n  // original by: Brett Zamir (http://brett-zamir.me)\n  // improved by: Luis Salazar (http://www.freaky-media.com/)\n  //   example 1: is_resource('a');\n  //   returns 1: false\n\n  var getFuncName = function (fn) {\n    var name = (/\\W*function\\s+([\\w\\$]+)\\s*\\(/)\n      .exec(fn)\n    if (!name) {\n      return '(Anonymous)'\n    }\n    return name[1]\n  }\n  return !(!handle || typeof handle !== 'object' || !handle.constructor || getFuncName(handle.constructor) !==\n    'PHPJS_Resource')\n}\n"
permalink: /functions/is_resource/
redirect_from:
  - /functions/var/is_resource/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
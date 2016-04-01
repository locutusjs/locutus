---
examples:
  - - "serialize(['Kevin', 'van', 'Zonneveld']);"
  - - "serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});"
returns:
  - - "'a:3:{i:0;s:5:\"Kevin\";i:1;s:3:\"van\";i:2;s:9:\"Zonneveld\";}'"
  - - "'a:3:{s:9:\"firstName\";s:5:\"Kevin\";s:7:\"midName\";s:3:\"van\";s:7:\"surName\";s:9:\"Zonneveld\";}'"
authors:
  original by:
    - 'Arpad Ray (mailto:arpad@php.net)'
  improved by:
    - Dino
    - 'Le Torbi (http://www.letorbi.de/)'
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net/)'
  bugfixed by:
    - Andrej Pavlovic
    - Garagoth
    - 'Russell Walker (http://www.nbill.co.uk/)'
    - 'Jamie Beck (http://www.terabit.ca/)'
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net/)'
    - 'Ben (http://benblume.co.uk/)'
    - 'Codestar (http://codestarlive.com/)'
  input by:
    - 'DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)'
    - 'Martin (http://www.erlenwiese.de/)'
notes: []
layout: function
function: serialize
category: var
code: "function serialize (mixed_value) {\n  //  discuss at: http://phpjs.org/functions/serialize/\n  // original by: Arpad Ray (mailto:arpad@php.net)\n  // improved by: Dino\n  // improved by: Le Torbi (http://www.letorbi.de/)\n  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)\n  // bugfixed by: Andrej Pavlovic\n  // bugfixed by: Garagoth\n  // bugfixed by: Russell Walker (http://www.nbill.co.uk/)\n  // bugfixed by: Jamie Beck (http://www.terabit.ca/)\n  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)\n  // bugfixed by: Ben (http://benblume.co.uk/)\n  // bugfixed by: Codestar (http://codestarlive.com/)\n  //    input by: DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)\n  //    input by: Martin (http://www.erlenwiese.de/)\n  //        note: We feel the main purpose of this function should be to ease the transport of data between php & js\n  //        note: Aiming for PHP-compatibility, we have to translate objects to arrays\n  //   example 1: serialize(['Kevin', 'van', 'Zonneveld']);\n  //   returns 1: 'a:3:{i:0;s:5:\"Kevin\";i:1;s:3:\"van\";i:2;s:9:\"Zonneveld\";}'\n  //   example 2: serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});\n  //   returns 2: 'a:3:{s:9:\"firstName\";s:5:\"Kevin\";s:7:\"midName\";s:3:\"van\";s:7:\"surName\";s:9:\"Zonneveld\";}'\n\n  var val, key, okey,\n    ktype = '',\n    vals = '',\n    count = 0,\n    _utf8Size = function (str) {\n      var size = 0,\n        i = 0,\n        l = str.length,\n        code = ''\n      for (i = 0; i < l; i++) {\n        code = str.charCodeAt(i)\n        if (code < 0x0080) {\n          size += 1\n        } else if (code < 0x0800) {\n          size += 2\n        } else {\n          size += 3\n        }\n      }\n      return size\n    },\n    _getType = function (inp) {\n      var match, key, cons, types, type = typeof inp\n\n      if (type === 'object' && !inp) {\n        return 'null'\n      }\n\n      if (type === 'object') {\n        if (!inp.constructor) {\n          return 'object'\n        }\n        cons = inp.constructor.toString()\n        match = cons.match(/(\\w+)\\(/)\n        if (match) {\n          cons = match[1].toLowerCase()\n        }\n        types = ['boolean', 'number', 'string', 'array']\n        for (key in types) {\n          if (cons === types[key]) {\n            type = types[key]\n            break\n          }\n        }\n      }\n      return type\n    },\n    type = _getType(mixed_value)\n\n  switch (type) {\n    case 'function':\n      val = ''\n      break\n    case 'boolean':\n      val = 'b:' + (mixed_value ? '1' : '0')\n      break\n    case 'number':\n      val = (Math.round(mixed_value) === mixed_value ? 'i' : 'd') + ':' + mixed_value\n      break\n    case 'string':\n      val = 's:' + _utf8Size(mixed_value) + ':\"' + mixed_value + '\"'\n      break\n    case 'array':\n    case 'object':\n      val = 'a'\n    /*\n        if (type === 'object') {\n          var objname = mixed_value.constructor.toString().match(/(\\w+)\\(\\)/);\n          if (objname == undefined) {\n            return;\n          }\n          objname[1] = this.serialize(objname[1]);\n          val = 'O' + objname[1].substring(1, objname[1].length - 1);\n        }\n        */\n\n      for (key in mixed_value) {\n        if (mixed_value.hasOwnProperty(key)) {\n          ktype = _getType(mixed_value[key])\n          if (ktype === 'function') {\n            continue\n          }\n\n          okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key)\n          vals += this.serialize(okey) + this.serialize(mixed_value[key])\n          count++\n        }\n      }\n      val += ':' + count + ':{' + vals + '}'\n      break\n    case 'undefined':\n    // Fall-through\n    default:\n    // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP\n      val = 'N'\n      break\n  }\n  if (type !== 'object' && type !== 'array') {\n    val += ';'\n  }\n  return val\n}\n"
permalink: /functions/serialize/
redirect_from:
  - /functions/var/serialize/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->

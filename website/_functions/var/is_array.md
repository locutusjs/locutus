---
examples:
  - - "is_array(['Kevin', 'van', 'Zonneveld']);"
  - - "is_array('Kevin van Zonneveld');"
  - - "is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});"
  - - "is_array(function tmp_a(){this.name = 'Kevin'});"
returns:
  - - 'true'
  - - 'false'
  - - 'true'
  - - 'false'
authors:
  original by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
  improved by:
    - Legaev Andrey
    - Onno Marsman
    - 'Brett Zamir (http://brett-zamir.me)'
    - Nathan Sepulveda
    - 'Brett Zamir (http://brett-zamir.me)'
  bugfixed by:
    - Cord
    - Manish
    - 'Brett Zamir (http://brett-zamir.me)'
notes:
  - - 'In php.js, javascript objects are like php associative arrays, thus JavaScript objects will also'
    - 'return true in this function (except for objects which inherit properties, being thus used as objects),'
    - "unless you do ini_set('phpjs.objectsAsArrays', 0), in which case only genuine JavaScript arrays"
    - will return true
layout: function
function: is_array
category: var
code: "function is_array (mixed_var) {\n  //  discuss at: http://phpjs.org/functions/is_array/\n  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // improved by: Legaev Andrey\n  // improved by: Onno Marsman\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  // improved by: Nathan Sepulveda\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  // bugfixed by: Cord\n  // bugfixed by: Manish\n  // bugfixed by: Brett Zamir (http://brett-zamir.me)\n  //        note: In php.js, javascript objects are like php associative arrays, thus JavaScript objects will also\n  //        note: return true in this function (except for objects which inherit properties, being thus used as objects),\n  //        note: unless you do ini_set('phpjs.objectsAsArrays', 0), in which case only genuine JavaScript arrays\n  //        note: will return true\n  //   example 1: is_array(['Kevin', 'van', 'Zonneveld']);\n  //   returns 1: true\n  //   example 2: is_array('Kevin van Zonneveld');\n  //   returns 2: false\n  //   example 3: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});\n  //   returns 3: true\n  //   example 4: is_array(function tmp_a(){this.name = 'Kevin'});\n  //   returns 4: false\n\n  var ini,\n    _getFuncName = function (fn) {\n      var name = (/\\W*function\\s+([\\w\\$]+)\\s*\\(/)\n        .exec(fn)\n      if (!name) {\n        return '(Anonymous)'\n      }\n      return name[1]\n    }\n  _isArray = function (mixed_var) {\n    // return Object.prototype.toString.call(mixed_var) === '[object Array]';\n    // The above works, but let's do the even more stringent approach: (since Object.prototype.toString could be overridden)\n    // Null, Not an object, no length property so couldn't be an Array (or String)\n    if (!mixed_var || typeof mixed_var !== 'object' || typeof mixed_var.length !== 'number') {\n      return false\n    }\n    var len = mixed_var.length\n    mixed_var[mixed_var.length] = 'bogus'\n    // The only way I can think of to get around this (or where there would be trouble) would be to have an object defined\n    // with a custom \"length\" getter which changed behavior on each call (or a setter to mess up the following below) or a custom\n    // setter for numeric properties, but even that would need to listen for specific indexes; but there should be no false negatives\n    // and such a false positive would need to rely on later JavaScript innovations like __defineSetter__\n    if (len !== mixed_var.length) {\n      // We know it's an array since length auto-changed with the addition of a\n      // numeric property at its length end, so safely get rid of our bogus element\n      mixed_var.length -= 1\n      return true\n    }\n    // Get rid of the property we added onto a non-array object; only possible\n    // side-effect is if the user adds back the property later, it will iterate\n    // this property in the older order placement in IE (an order which should not\n    // be depended on anyways)\n    delete mixed_var[mixed_var.length]\n    return false\n  }\n\n  if (!mixed_var || typeof mixed_var !== 'object') {\n    return false\n  }\n\n  // BEGIN REDUNDANT\n  this.php_js = this.php_js || {}\n  this.php_js.ini = this.php_js.ini || {}\n  // END REDUNDANT\n\n  ini = this.php_js.ini['phpjs.objectsAsArrays']\n\n  return _isArray(mixed_var) ||\n    // Allow returning true unless user has called\n    // ini_set('phpjs.objectsAsArrays', 0) to disallow objects as arrays\n    ((!ini || ( // if it's not set to 0 and it's not 'off', check for objects as arrays\n      (parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !==\n        'off')))) && (\n      Object.prototype.toString.call(mixed_var) === '[object Object]' && _getFuncName(mixed_var.constructor) ===\n      'Object' // Most likely a literal and intended as assoc. array\n    ))\n}\n"
permalink: /functions/is_array/
redirect_from:
  - /functions/var/is_array/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->

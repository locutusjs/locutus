function gettype(mixed_var) {
  //  discuss at: http://phpjs.org/functions/gettype/
  // original by: Paulo Freitas
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Douglas Crockford (http://javascript.crockford.com)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //    input by: KELAN
  //  depends on: is_float
  //        note: php.js treats objects as associative arrays, so unless config is set, it will return "array" for objects
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: gettype(1);
  //   returns 1: 'integer'
  //   example 2: gettype(undefined);
  //   returns 2: 'undefined'
  //   example 3: gettype('foo');
  //   returns 3: 'string'
  //   example 4: gettype(['test']);
  //   returns 4: 'array'
  //   example 5: gettype({0: 'Kevin van Zonneveld'});
  //   returns 5: 'array'
  //   example 6: gettype({0: function () {return false;}});
  //   returns 6: 'array'
  //   example 7: gettype({0: 'test', length: 1, splice: function () {}});
  //   returns 7: 'array'

  var s = typeof mixed_var,
    name;
  var getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/)
      .exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (s === 'object') {
    if (mixed_var !== null) { // From: http://javascript.crockford.com/remedial.html
      if (typeof mixed_var.length === 'number' && !(mixed_var.propertyIsEnumerable('length')) && typeof mixed_var
        .splice === 'function') {
        
        // BEGIN REDUNDANT
        this.php_js = this.php_js || {};
        this.php_js.ini = this.php_js.ini || {};
        // END REDUNDANT

        // Call ini_set('phpjs.objectsAsArrays', 0) to disallow objects as arrays
        ini = this.php_js.ini['phpjs.objectsAsArrays'];
        if  (!ini || ( // if it's not set to 0 and it's not 'off', check for objects as arrays
            (parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !==
                'off')))) {
            s = 'object';
        }
        else {
            s = 'array';
        }
      } else if (mixed_var.constructor && getFuncName(mixed_var.constructor)) {
        name = getFuncName(mixed_var.constructor);
        if (name === 'Date') {
          s = 'date'; // not in PHP
        } else if (name === 'RegExp') {
          s = 'regexp'; // not in PHP
        } else if (name === 'PHPJS_Resource') { // Check against our own resource constructor
          s = 'resource';
        }
      }
    } else {
      s = 'null';
    }
  } else if (s === 'number') {
    s = this.is_float(mixed_var) ? 'double' : 'integer';
  }
  return s;
}
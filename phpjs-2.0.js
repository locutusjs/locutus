/*! phpjs 2.0 | phpjs.org/about/ */
function array () {
  // http://kevin.vanzonneveld.net
  // +   original by: d3x
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array('Kevin', 'van', 'Zonneveld');
  // *     returns 1: ['Kevin', 'van', 'Zonneveld']
  // *     example 2: ini_set('phpjs.return_phpjs_arrays', 'on');
  // *     example 2: var arr = array({0:2}, {a:41}, {2:3}).change_key_case('CASE_UPPER').keys();
  // *     returns 1: [0,'A',2]

  var arrInst, e, __, that = this, PHPJS_Array = function PHPJS_Array() {},
    mainArgs = arguments, p = this.php_js = this.php_js || {},
    _indexOf = function (value, from, strict) {
      var i = from || 0, nonstrict = !strict, length = this.length;
      while (i < length) {
        if (this[i] === value || (nonstrict && this[i] == value)) {
          return i;
        }
        i++;
      }
      return -1;
    };
  // BEGIN REDUNDANT
  if (!p.Relator) {
    p.Relator = (function () {// Used this functional class for giving privacy to the class we are creating
      // Code adapted from http://www.devpro.it/code/192.html
      // Relator explained at http://webreflection.blogspot.com/2008/07/javascript-relator-object-aka.html
      // Its use as privacy technique described at http://webreflection.blogspot.com/2008/10/new-relator-object-plus-unshared.html
      // 1) At top of closure, put: var __ = Relator.$();
      // 2) In constructor, put: var _ = __.constructor(this);
      // 3) At top of each prototype method, put: var _ = __.method(this);
      // 4) Use like:  _.privateVar = 5;
      function _indexOf (value) {
        var i = 0, length = this.length;
        while (i < length) {
          if (this[i] === value) {
            return i;
          }
          i++;
        }
        return -1;
      }
      function Relator () {
        var Stack = [], Array = [];
        if (!Stack.indexOf) {
          Stack.indexOf = _indexOf;
        }
        return {
          // create a new relator
          $ : function () {
            return Relator();
          },
          constructor : function (that) {
            var i = Stack.indexOf(that);
            ~i ? Array[i] : Array[Stack.push(that) - 1] = {};
            this.method(that).that = that;
            return this.method(that);
          },
          method : function (that) {
            return Array[Stack.indexOf(that)];
          }
        };
      }
      return Relator();
    }());
  }
  // END REDUNDANT

  if (p && p.ini && p.ini['phpjs.return_phpjs_arrays'].local_value.toLowerCase() === 'on') {
    if (!p.PHPJS_Array) {
      // We keep this Relator outside the class in case adding prototype methods below
      // Prototype methods added elsewhere can also use this ArrayRelator to share these "pseudo-global mostly-private" variables
      __ = p.ArrayRelator = p.ArrayRelator || p.Relator.$();
      // We could instead allow arguments of {key:XX, value:YY} but even more cumbersome to write
      p.PHPJS_Array = function PHPJS_Array () {
        var _ = __.constructor(this), args = arguments, i = 0, argl, p;
        args = (args.length === 1 && args[0] && typeof args[0] === 'object' &&
            args[0].length && !args[0].propertyIsEnumerable('length')) ? args[0] : args; // If first and only arg is an array, use that (Don't depend on this)
        if (!_.objectChain) {
          _.objectChain = args;
          _.object = {};
          _.keys = [];
          _.values = [];
        }
        for (argl = args.length; i < argl; i++) {
          for (p in args[i]) {
            // Allow for access by key; use of private members to store sequence allows these to be iterated via for...in (but for read-only use, with hasOwnProperty or function filtering to avoid prototype methods, and per ES, potentially out of order)
            this[p] = _.object[p] = args[i][p];
            // Allow for easier access by prototype methods
            _.keys[_.keys.length] = p;
            _.values[_.values.length] = args[i][p];
            break;
          }
        }
      };
      e = p.PHPJS_Array.prototype;
      e.change_key_case = function (cs) {
        var _ = __.method(this), oldkey, newkey, i = 0, kl = _.keys.length,
          case_fn = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';
        while (i < kl) {
          oldkey = _.keys[i];
          newkey = _.keys[i] = _.keys[i][case_fn]();
          if (oldkey !== newkey) {
              this[oldkey] = _.object[oldkey] = _.objectChain[i][oldkey] = null; // Break reference before deleting
              delete this[oldkey];
              delete _.object[oldkey];
              delete _.objectChain[i][oldkey];
              this[newkey] = _.object[newkey] = _.objectChain[i][newkey] = _.values[i]; // Fix: should we make a deep copy?
          }
          i++;
        }
        return this;
      };
      e.flip = function () {
        var _ = __.method(this), i = 0, kl = _.keys.length;
        while (i < kl) {
          oldkey = _.keys[i];
          newkey = _.values[i];
          if (oldkey !== newkey) {
            this[oldkey] = _.object[oldkey] = _.objectChain[i][oldkey] = null; // Break reference before deleting
            delete this[oldkey];
            delete _.object[oldkey];
            delete _.objectChain[i][oldkey];
            this[newkey] = _.object[newkey] = _.objectChain[i][newkey] = oldkey;
            _.keys[i] = newkey;
          }
          i++;
        }
        return this;
      };
      e.walk = function (funcname, userdata) {
        var _ = __.method(this), obj, func, ini, i = 0, kl = 0;

        try {
          if (typeof funcname === 'function') {
            for (i = 0, kl = _.keys.length; i < kl; i++) {
              if (arguments.length > 1) {
                funcname(_.values[i], _.keys[i], userdata);
              }
              else {
                funcname(_.values[i], _.keys[i]);
              }
            }
          }
          else if (typeof funcname === 'string') {
            this.php_js = this.php_js || {};
            this.php_js.ini = this.php_js.ini || {};
            ini = this.php_js.ini['phpjs.no-eval'];
            if (ini && (
              parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !== 'off')
            )) {
              if (arguments.length > 1) {
                for (i = 0, kl = _.keys.length; i < kl; i++) {
                  this.window[funcname](_.values[i], _.keys[i], userdata);
                }
              }
              else {
                for (i = 0, kl = _.keys.length; i < kl; i++) {
                  this.window[funcname](_.values[i], _.keys[i]);
                }
              }
            }
            else {
              if (arguments.length > 1) {
                for (i = 0, kl = _.keys.length; i < kl; i++) {
                  eval(funcname + '(_.values[i], _.keys[i], userdata)');
                }
              }
              else {
                for (i = 0, kl = _.keys.length; i < kl; i++) {
                  eval(funcname + '(_.values[i], _.keys[i])');
                }
              }
            }
          }
          else if (funcname && typeof funcname === 'object' && funcname.length === 2) {
            obj = funcname[0];
            func = funcname[1];
            if (arguments.length > 1) {
              for (i = 0, kl = _.keys.length; i < kl; i++) {
                obj[func](_.values[i], _.keys[i], userdata);
              }
            }
            else {
              for (i = 0, kl = _.keys.length; i < kl; i++) {
                obj[func](_.values[i], _.keys[i]);
              }
            }
          }
          else {
            return false;
          }
        }
        catch (e) {
          return false;
        }

        return this;
      };
      // Here we'll return actual arrays since most logical and practical for these functions to do this
      e.keys = function (search_value, argStrict) {
        var _ = __.method(this), pos,
          search = typeof search_value !== 'undefined',
          tmp_arr = [],
          strict = !!argStrict;
        if (!search) {
          return _.keys;
        }
        while ((pos = _indexOf(_.values, pos, strict)) !== -1) {
          tmp_arr[tmp_arr.length] = _.keys[pos];
        }
        return tmp_arr;
      };
      e.values = function () {var _ = __.method(this);
        return _.values;
      };
      // Return non-object, non-array values, since most sensible
      e.search = function (needle, argStrict) {
        var _ = __.method(this),
          strict = !!argStrict, haystack = _.values, i, vl, val, flags;
        if (typeof needle === 'object' && needle.exec) { // Duck-type for RegExp
          if (!strict) { // Let's consider case sensitive searches as strict
            flags = 'i' + (needle.global ? 'g' : '') +
                  (needle.multiline ? 'm' : '') +
                  (needle.sticky ? 'y' : ''); // sticky is FF only
            needle = new RegExp(needle.source, flags);
          }
          for (i=0, vl = haystack.length; i < vl; i++) {
            val = haystack[i];
            if (needle.test(val)) {
              return _.keys[i];
            }
          }
          return false;
        }
        for (i = 0, vl = haystack.length; i < vl; i++) {
          val = haystack[i];
          if ((strict && val === needle) || (!strict && val == needle)) {
            return _.keys[i];
          }
        }
        return false;
      };
      e.sum = function () {
        var _ = __.method(this), sum = 0, i = 0, kl = _.keys.length;
        while (i < kl) {
          if (!isNaN(parseFloat(_.values[i]))) {
            sum += parseFloat(_.values[i]);
          }
          i++;
        }
        return sum;
      };
      // Experimental functions
      e.foreach = function (handler) {
        var _ = __.method(this), i = 0, kl = _.keys.length;
        while (i < kl) {
          if (handler.length === 1) {
            handler(_.values[i]); // only pass the value
          }
          else {
            handler(_.keys[i], _.values[i]);
          }
          i++;
        }
        return this;
      };
      e.list = function () {
        var key, _ = __.method(this), i = 0, argl = arguments.length;
        while (i < argl) {
          key = _.keys[i];
          if (key && key.length === parseInt(key, 10).toString().length && // Key represents an int
            parseInt(key, 10) < argl) { // Key does not exceed arguments
            that.window[arguments[key]] = _.values[key];
          }
          i++;
        }
        return this;
      };
      // Parallel functionality and naming of built-in JavaScript array methods
      e.forEach = function (handler) {
        var _ = __.method(this), i = 0, kl = _.keys.length;
        while (i < kl) {
          handler(_.values[i], _.keys[i], this);
          i++;
        }
        return this;
      };
      // Our own custom convenience functions
      e.$object = function () {var _ = __.method(this);
        return _.object;
      };
      e.$objectChain = function () {var _ = __.method(this);
        return _.objectChain;
      };
    }
    PHPJS_Array.prototype = p.PHPJS_Array.prototype;
    arrInst = new PHPJS_Array();
    p.PHPJS_Array.apply(arrInst, mainArgs);
    return arrInst;
  }
  return Array.prototype.slice.call(mainArgs);
}
function array_change_key_case (array, cs) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ates Goral (http://magnetiq.com)
  // +   improved by: marrtins
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_change_key_case(42);
  // *     returns 1: false
  // *     example 2: array_change_key_case([ 3, 5 ]);
  // *     returns 2: {0: 3, 1: 5}
  // *     example 3: array_change_key_case({ FuBaR: 42 });
  // *     returns 3: {"fubar": 42}
  // *     example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');
  // *     returns 4: {"fubar": 42}
  // *     example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');
  // *     returns 5: {"FUBAR": 42}
  // *     example 6: array_change_key_case({ FuBaR: 42 }, 2);
  // *     returns 6: {"FUBAR": 42}
  // *     example 7: ini_set('phpjs.return_phpjs_arrays', 'on');
  // *     example 7: var arr = array({a: 0}, {B: 1}, {c: 2});
  // *     example 7: var newArr = array_change_key_case(arr);
  // *     example 7: newArr.b
  // *     example 7: 1

  var case_fn, key, tmp_ar = {};

  if (Object.prototype.toString.call(array) === '[object Array]') {
    return array;
  }
  if (array && typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
    return array.change_key_case(cs);
  }
  if (array && typeof array === 'object' ) {
    case_fn = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';
    for (key in array) {
      tmp_ar[key[case_fn]()] = array[key];
    }
    return tmp_ar;
  }
  return false;
}
function array_chunk (input, size, preserve_keys) {
  // http://kevin.vanzonneveld.net
  // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Important note: Per the ECMAScript specification, objects may not always iterate in a predictable order
  // *     example 1: array_chunk(['Kevin', 'van', 'Zonneveld'], 2);
  // *     returns 1: [['Kevin', 'van'], ['Zonneveld']]
  // *     example 2: array_chunk(['Kevin', 'van', 'Zonneveld'], 2, true);
  // *     returns 2: [{0:'Kevin', 1:'van'}, {2: 'Zonneveld'}]
  // *     example 3: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2);
  // *     returns 3: [['Kevin', 'van'], ['Zonneveld']]
  // *     example 4: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2, true);
  // *     returns 4: [{1: 'Kevin', 2: 'van'}, {3: 'Zonneveld'}]

  var x, p = '', i = 0, c = -1, l = input.length || 0, n = [];

  if (size < 1) {
    return null;
  }

  if (Object.prototype.toString.call(input) === '[object Array]') {
    if (preserve_keys) {
      while (i < l) {
        (x = i % size) ? n[c][i] = input[i] : n[++c] = {}, n[c][i] = input[i];
        i++;
      }
    }
    else {
      while (i < l) {
        (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
        i++;
      }
    }
  }
  else {
    if (preserve_keys) {
      for (p in input) {
        if (input.hasOwnProperty(p)) {
          (x = i % size) ? n[c][p] = input[p] : n[++c] = {}, n[c][p] = input[p];
          i++;
        }
      }
    }
    else {
      for (p in input) {
        if (input.hasOwnProperty(p)) {
          (x = i % size) ? n[c][x] = input[p] : n[++c] = [input[p]];
          i++;
        }
      }
    }
  }
  return n;
}
function array_combine (keys, values) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_combine([0,1,2], ['kevin','van','zonneveld']);
  // *     returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}
  var new_array = {},
    keycount = keys && keys.length,
    i = 0;

  // input sanitation
  if (typeof keys !== 'object' || typeof values !== 'object' || // Only accept arrays or array-like objects
  typeof keycount !== 'number' || typeof values.length !== 'number' || !keycount) { // Require arrays to have a count
    return false;
  }

  // number of elements does not match
  if (keycount != values.length) {
    return false;
  }

  for (i = 0; i < keycount; i++) {
    new_array[keys[i]] = values[i];
  }

  return new_array;
}
function array_count_values (array) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ates Goral (http://magnetiq.com)
  // + namespaced by: Michael White (http://getsprink.com)
  // +      input by: sankai
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   input by: Shingo
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);
  // *     returns 1: {3:2, 5:1, "foo":2, "bar":1}
  // *     example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });
  // *     returns 2: {3:2, 5:1, "foo":2, "bar":1}
  // *     example 3: array_count_values([ true, 4.2, 42, "fubar" ]);
  // *     returns 3: {42:1, "fubar":1}
  var tmp_arr = {},
    key = '',
    t = '';

  var __getType = function (obj) {
    // Objects are php associative arrays.
    var t = typeof obj;
    t = t.toLowerCase();
    if (t === "object") {
      t = "array";
    }
    return t;
  };

  var __countValue = function (value) {
    switch (typeof(value)) {
    case "number":
      if (Math.floor(value) !== value) {
        return;
      }
      // Fall-through
    case "string":
      if (value in this && this.hasOwnProperty(value)) {
        ++this[value];
      } else {
        this[value] = 1;
      }
    }
  };

  t = __getType(array);
  if (t === 'array') {
    for (key in array) {
      if (array.hasOwnProperty(key)) {
        __countValue.call(tmp_arr, array[key]);
      }
    }
  }
  return tmp_arr;
}
function array_diff (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Sanjoy Roy
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
  // *     returns 1: {0:'Kevin'}
  var retArr = {},
    argl = arguments.length,
    k1 = '',
    i = 1,
    k = '',
    arr = {};

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1]) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys;
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
}
function array_diff_assoc (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: 0m3r
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});
  // *     returns 1: {1: 'van', 2: 'Zonneveld'}
  var retArr = {},
    argl = arguments.length,
    k1 = '',
    i = 1,
    k = '',
    arr = {};

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys;
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
}
function array_diff_key (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ates Goral (http://magnetiq.com)
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // +    input by: Everlasto
  // *     example 1: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5});
  // *     returns 1: {"green":2, "blue":3, "white":4}
  // *     example 2: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5});
  // *     returns 2: {"green":2, "blue":3, "white":4}
  var argl = arguments.length,
    retArr = {},
    k1 = '',
    i = 1,
    k = '',
    arr = {};

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys;
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
}
function array_diff_uassoc (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  // *     example 1: array_diff_uassoc($array1, $array2, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
  // *     returns 1: {b: 'brown', c: 'blue', 0: 'red'}
  var retArr = {},
    arglm1 = arguments.length - 1,
    cb = arguments[arglm1],
    arr = {},
    i = 1,
    k1 = '',
    k = '';
  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys;
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
}
function array_diff_ukey (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: $array1 = {blue: 1, red: 2, green: 3, purple: 4}
  // *     example 1: $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
  // *     example 1: array_diff_ukey($array1, $array2, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
  // *     returns 1: {red: 2, purple: 4}
  var retArr = {},
    arglm1 = arguments.length - 1,
    cb = arguments[arglm1],
    arr = {},
    i = 1,
    k1 = '',
    k = '';

  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys;
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
}
function array_fill (start_index, num, mixed_val) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Waldo Malqui Silva
  // *     example 1: array_fill(5, 6, 'banana');
  // *     returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }
  var key, tmp_arr = {};

  if (!isNaN(start_index) && !isNaN(num)) {
    for (key = 0; key < num; key++) {
      tmp_arr[(key + start_index)] = mixed_val;
    }
  }

  return tmp_arr;
}
function array_fill_keys (keys, value) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
  // *     example 1: array_fill_keys(keys, 'banana')
  // *     returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}
  var retObj = {},
    key = '';

  for (key in keys) {
    retObj[keys[key]] = value;
  }

  return retObj;
}
function array_filter (arr, func) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: max4ever
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Takes a function as an argument, not a function's name
  // *     example 1: var odd = function (num) {return (num & 1);};
  // *     example 1: array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd);
  // *     returns 1: {"a": 1, "c": 3, "e": 5}
  // *     example 2: var even = function (num) {return (!(num & 1));}
  // *     example 2: array_filter([6, 7, 8, 9, 10, 11, 12], even);
  // *     returns 2: {0: 6, 2: 8, 4: 10, 6: 12}
  // *     example 3: var arr = array_filter({"a": 1, "b": false, "c": -1, "d": 0, "e": null, "f":'', "g":undefined});
  // *     returns 3: {"a":1, "c":-1};

  var retObj = {},
    k;

  func = func || function (v) { return v; };

  // Fix: Issue #73
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    retObj = [];
  }

  for (k in arr) {
    if (func(arr[k])) {
      retObj[k] = arr[k];
    }
  }

  return retObj;
}
function array_flip (trans) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      improved by: Pier Paolo Ramon (http://www.mastersoup.com/)
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_flip( {a: 1, b: 1, c: 2} );
  // *     returns 1: {1: 'b', 2: 'c'}
  // *     example 2: ini_set('phpjs.return_phpjs_arrays', 'on');
  // *     example 2: array_flip(array({a: 0}, {b: 1}, {c: 2}))[1];
  // *     returns 2: 'b'

  var key, tmp_ar = {};

  if (trans && typeof trans=== 'object' && trans.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
    return trans.flip();
  }

  for (key in trans) {
    if (!trans.hasOwnProperty(key)) {continue;}
    tmp_ar[trans[key]] = key;
  }

  return tmp_ar;
}
function array_intersect (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: These only output associative arrays (would need to be
  // %        note 1: all numeric and counting from zero to be numeric)
  // *     example 1: $array1 = {'a' : 'green', 0:'red', 1: 'blue'};
  // *     example 1: $array2 = {'b' : 'green', 0:'yellow', 1:'red'};
  // *     example 1: $array3 = ['green', 'red'];
  // *     example 1: $result = array_intersect($array1, $array2, $array3);
  // *     returns 1: {0: 'red', a: 'green'}
  var retArr = {},
    argl = arguments.length,
    arglm1 = argl - 1,
    k1 = '',
    arr = {},
    i = 0,
    k = '';

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1]) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value, continue the loop until done
          continue arrs;
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys;
    }
  }

  return retArr;
}
function array_intersect_assoc (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: These only output associative arrays (would need to be
  // %        note 1: all numeric and counting from zero to be numeric)
  // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  // *     example 1: $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
  // *     example 1: array_intersect_assoc($array1, $array2)
  // *     returns 1: {a: 'green'}
  var retArr = {},
    argl = arguments.length,
    arglm1 = argl - 1,
    k1 = '',
    arr = {},
    i = 0,
    k = '';

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && k === k1) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value, continue the loop until done
          continue arrs;
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys;
    }
  }

  return retArr;
}
function array_intersect_key (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: These only output associative arrays (would need to be
  // %        note 1: all numeric and counting from zero to be numeric)
  // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  // *     example 1: $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
  // *     example 1: array_intersect_key($array1, $array2)
  // *     returns 1: {0: 'red', a: 'green'}
  var retArr = {},
    argl = arguments.length,
    arglm1 = argl - 1,
    k1 = '',
    arr = {},
    i = 0,
    k = '';

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (k === k1) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value, continue the loop until done
          continue arrs;
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys;
    }
  }

  return retArr;
}
function array_intersect_uassoc (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  // *     example 1: array_intersect_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;});
  // *     returns 1: {b: 'brown'}
  var retArr = {},
    arglm1 = arguments.length - 1,
    arglm2 = arglm1 - 1,
    cb = arguments[arglm1],
    k1 = '',
    i = 1,
    arr = {},
    k = '';

  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value, continue the loop until done
          continue arrs;
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys;
    }
  }

  return retArr;
}
function array_intersect_ukey (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: $array1 = {blue: 1, red: 2, green: 3, purple: 4}
  // *     example 1: $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
  // *     example 1: array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
  // *     returns 1: {blue: 1, green: 3}
  var retArr = {},
    arglm1 = arguments.length - 1,
    arglm2 = arglm1 - 1,
    cb = arguments[arglm1],
    k1 = '',
    i = 1,
    arr = {},
    k = '';

  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb(k, k1) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value, continue the loop until done
          continue arrs;
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys;
    }
  }

  return retArr;

}
function array_key_exists (key, search) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
  // *     example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'});
  // *     returns 1: true
  // input sanitation
  if (!search || (search.constructor !== Array && search.constructor !== Object)) {
    return false;
  }

  return key in search;
}
function array_keys (input, search_value, argStrict) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: jd
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   input by: P
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
  // *     returns 1: {0: 'firstname', 1: 'surname'}

  var search = typeof search_value !== 'undefined',
    tmp_arr = [],
    strict = !!argStrict,
    include = true,
    key = '';

  if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
    return input.keys(search_value, argStrict);
  }

  for (key in input) {
    if (input.hasOwnProperty(key)) {
      include = true;
      if (search) {
        if (strict && input[key] !== search_value) {
          include = false;
        }
        else if (input[key] != search_value) {
          include = false;
        }
      }

      if (include) {
        tmp_arr[tmp_arr.length] = key;
      }
    }
  }

  return tmp_arr;
}
function array_map (callback) {
  // http://kevin.vanzonneveld.net
  // +   original by: Andrea Giammarchi (http://webreflection.blogspot.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Takes a function as an argument, not a function's name
  // %        note 2: If the callback is a string, it can only work if the function name is in the global context
  // *     example 1: array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] );
  // *     returns 1: [ 1, 8, 27, 64, 125 ]
  var argc = arguments.length,
    argv = arguments;
  var j = argv[1].length,
    i = 0,
    k = 1,
    m = 0;
  var tmp = [],
    tmp_ar = [];

  while (i < j) {
    while (k < argc) {
      tmp[m++] = argv[k++][i];
    }

    m = 0;
    k = 1;

    if (callback) {
      if (typeof callback === 'string') {
        callback = this.window[callback];
      }
      tmp_ar[i++] = callback.apply(null, tmp);
    } else {
      tmp_ar[i++] = tmp;
    }

    tmp = [];
  }

  return tmp_ar;
}
function array_merge () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Nate
  // +   input by: josh
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: arr1 = {"color": "red", 0: 2, 1: 4}
  // *     example 1: arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
  // *     example 1: array_merge(arr1, arr2)
  // *     returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
  // *     example 2: arr1 = []
  // *     example 2: arr2 = {1: "data"}
  // *     example 2: array_merge(arr1, arr2)
  // *     returns 2: {0: "data"}
  var args = Array.prototype.slice.call(arguments),
    argl = args.length,
    arg,
    retObj = {},
    k = '',
    argil = 0,
    j = 0,
    i = 0,
    ct = 0,
    toStr = Object.prototype.toString,
    retArr = true;

  for (i = 0; i < argl; i++) {
    if (toStr.call(args[i]) !== '[object Array]') {
      retArr = false;
      break;
    }
  }

  if (retArr) {
    retArr = [];
    for (i = 0; i < argl; i++) {
      retArr = retArr.concat(args[i]);
    }
    return retArr;
  }

  for (i = 0, ct = 0; i < argl; i++) {
    arg = args[i];
    if (toStr.call(arg) === '[object Array]') {
      for (j = 0, argil = arg.length; j < argil; j++) {
        retObj[ct++] = arg[j];
      }
    }
    else {
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          if (parseInt(k, 10) + '' === k) {
            retObj[ct++] = arg[k];
          }
          else {
            retObj[k] = arg[k];
          }
        }
      }
    }
  }
  return retObj;
}
function array_merge_recursive (arr1, arr2) {
  // http://kevin.vanzonneveld.net
  // +   original by: Subhasis Deb
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: array_merge
  // *     example 1: arr1 = {'color': {'favourite': 'read'}, 0: 5}
  // *     example 1: arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}}
  // *     example 1: array_merge_recursive(arr1, arr2)
  // *     returns 1: {'color': {'favorite': {0: 'red', 1: 'green'}, 0: 'blue'}, 1: 5, 1: 10}
  var idx = '';

  if (arr1 && Object.prototype.toString.call(arr1) === '[object Array]' &&
    arr2 && Object.prototype.toString.call(arr2) === '[object Array]') {
    for (idx in arr2) {
      arr1.push(arr2[idx]);
    }
  } else if ((arr1 && (arr1 instanceof Object)) && (arr2 && (arr2 instanceof Object))) {
    for (idx in arr2) {
      if (idx in arr1) {
        if (typeof arr1[idx] == 'object' && typeof arr2 == 'object') {
          arr1[idx] = this.array_merge(arr1[idx], arr2[idx]);
        } else {
          arr1[idx] = arr2[idx];
        }
      } else {
        arr1[idx] = arr2[idx];
      }
    }
  }

  return arr1;
}
function array_multisort (arr) {
  // +   original by: Theriault
  // *     example 1: array_multisort([1, 2, 1, 2, 1, 2], [1, 2, 3, 4, 5, 6]);
  // *     returns 1: true
  // *     example 2: characters = {A: 'Edward', B: 'Locke', C: 'Sabin', D: 'Terra', E: 'Edward'};
  // *     example 2: jobs = {A: 'Warrior', B: 'Thief', C: 'Monk', D: 'Mage', E: 'Knight'};
  // *     example 2: array_multisort(characters, 'SORT_DESC', 'SORT_STRING', jobs, 'SORT_ASC', 'SORT_STRING');
  // *     returns 2: true
  // *     results 2: characters == {D: 'Terra', C: 'Sabin', B: 'Locke', E: 'Edward', A: 'Edward'};
  // *     results 2: jobs == {D: 'Mage', C: 'Monk', B: 'Thief', E: 'Knight', A: 'Warrior'};
  // *     example 3: lastnames = [ 'Carter','Adams','Monroe','Tyler','Madison','Kennedy','Adams'];
  // *     example 3: firstnames = ['James', 'John' ,'James', 'John', 'James',  'John',   'John'];
  // *     example 3: president = [ 39,      6,      5,       10,     4,       35,        2    ];
  // *     example 3: array_multisort(firstnames, 'SORT_DESC', 'SORT_STRING', lastnames, 'SORT_ASC', 'SORT_STRING', president, 'SORT_NUMERIC');
  // *     returns 3: true
  // *     results 3: firstnames == ['John', 'John', 'John',   'John', 'James', 'James',  'James'];
  // *     results 3: lastnames ==  ['Adams','Adams','Kennedy','Tyler','Carter','Madison','Monroe'];
  // *     results 3: president ==  [2,      6,      35,       10,     39,       4,       5];
  // Fix: this function must be fixed like asort(), etc., to return a (shallow) copy by default, since IE does not support!
  // VARIABLE DESCRIPTIONS
  //
  // flags: Translation table for sort arguments. Each argument turns on certain bits in the flag byte through addition.
  //        bits:    HGFE DCBA
  //        bit A: Only turned on if SORT_NUMERIC was an argument.
  //        bit B: Only turned on if SORT_STRING was an argument.
  //        bit C: Reserved bit for SORT_ASC; not turned on.
  //        bit D: Only turned on if SORT_DESC was an argument.
  //        bit E: Turned on if either SORT_REGULAR, SORT_NUMERIC, or SORT_STRING was an argument. If already turned on, function would return FALSE like in PHP.
  //        bit F: Turned on if either SORT_ASC or SORT_DESC was an argument. If already turned on, function would return FALSE like in PHP.
  //        bit G and H: (Unused)
  //
  // sortFlag: Holds sort flag byte of every array argument.
  //
  // sortArrs: Holds the values of array arguments.
  //
  // sortKeys: Holds the keys of object arguments.
  //
  // nLastSort: Holds a copy of the current lastSort so that the lastSort is not destroyed
  //
  // nLastSort: Holds a copy of the current lastSort so that the lastSort is not destroyed
  //
  // args: Holds pointer to arguments for reassignment
  //
  // lastSort: Holds the last Javascript sort pattern to duplicate the sort for the last sortComponent.
  //
  // lastSorts: Holds the lastSort for each sortComponent to duplicate the sort of each component on each array.
  //
  // tmpArray: Holds a copy of the last sortComponent's array elements to reiterate over the array
  //
  // elIndex: Holds the index of the last sortComponent's array elements to reiterate over the array
  //
  // sortDuplicator: Function for duplicating previous sort.
  //
  // sortRegularASC: Function for sorting regular, ascending.
  //
  // sortRegularDESC: Function for sorting regular, descending.
  //
  // thingsToSort: Holds a bit that indicates which indexes in the arrays can be sorted. Updated after every array is sorted.
  var argl = arguments.length,
    sal = 0,
    flags = {
      'SORT_REGULAR': 16,
      'SORT_NUMERIC': 17,
      'SORT_STRING': 18,
      'SORT_ASC': 32,
      'SORT_DESC': 40
    },
    sortArrs = [
      []
    ],
    sortFlag = [0],
    sortKeys = [
      []
    ],
    g = 0,
    i = 0,
    j = 0,
    k = '',
    l = 0,
    thingsToSort = [],
    vkey = 0,
    zlast = null,
    args = arguments,
    nLastSort = [],
    lastSort = [],
    lastSorts = [],
    tmpArray = [],
    elIndex = 0,
    sortDuplicator = function (a, b) {
      return nLastSort.shift();
    },
    sortFunctions = [
      [function (a, b) {
        lastSort.push(a > b ? 1 : (a < b ? -1 : 0));
        return a > b ? 1 : (a < b ? -1 : 0);
      }, function (a, b) {
        lastSort.push(b > a ? 1 : (b < a ? -1 : 0));
        return b > a ? 1 : (b < a ? -1 : 0);
      }],
      [function (a, b) {
        lastSort.push(a - b);
        return a - b;
      }, function (a, b) {
        lastSort.push(b - a);
        return b - a;
      }],
      [function (a, b) {
        lastSort.push((a + '') > (b + '') ? 1 : ((a + '') < (b + '') ? -1 : 0));
        return (a + '') > (b + '') ? 1 : ((a + '') < (b + '') ? -1 : 0);
      }, function (a, b) {
        lastSort.push((b + '') > (a + '') ? 1 : ((b + '') < (a + '') ? -1 : 0));
        return (b + '') > (a + '') ? 1 : ((b + '') < (a + '') ? -1 : 0);
      }]
    ];

  // Store first argument into sortArrs and sortKeys if an Object.
  // First Argument should be either a Javascript Array or an Object, otherwise function would return FALSE like in PHP
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    sortArrs[0] = arr;
  }
  else if (arr && typeof arr === 'object') {
    for (i in arr) {
      if (arr.hasOwnProperty(i)) {
        sortKeys[0].push(i);
        sortArrs[0].push(arr[i]);
      }
    }
  }
  else {
    return false;
  }


  // arrMainLength: Holds the length of the first array. All other arrays must be of equal length, otherwise function would return FALSE like in PHP
  //
  // sortComponents: Holds 2 indexes per every section of the array that can be sorted. As this is the start, the whole array can be sorted.
  var arrMainLength = sortArrs[0].length,
    sortComponents = [0, arrMainLength];

  // Loop through all other arguments, checking lengths and sort flags of arrays and adding them to the above variables.
  for (j = 1; j < argl; j++) {
    if (Object.prototype.toString.call(arguments[j]) === '[object Array]') {
      sortArrs[j] = arguments[j];
      sortFlag[j] = 0;
      if (arguments[j].length !== arrMainLength) {
        return false;
      }
    } else if (arguments[j] && typeof arguments[j] === 'object') {
      sortKeys[j] = [];
      sortArrs[j] = [];
      sortFlag[j] = 0;
      for (i in arguments[j]) {
        if (arguments[j].hasOwnProperty(i)) {
          sortKeys[j].push(i);
          sortArrs[j].push(arguments[j][i]);
        }
      }
      if (sortArrs[j].length !== arrMainLength) {
        return false;
      }
    } else if (typeof arguments[j] === 'string') {
      var lFlag = sortFlag.pop();
      if (typeof flags[arguments[j]] === 'undefined' || ((((flags[arguments[j]]) >>> 4) & (lFlag >>> 4)) > 0)) { // Keep extra parentheses around latter flags check to avoid minimization leading to CDATA closer
        return false;
      }
      sortFlag.push(lFlag + flags[arguments[j]]);
    } else {
      return false;
    }
  }


  for (i = 0; i !== arrMainLength; i++) {
    thingsToSort.push(true);
  }

  // Sort all the arrays....
  for (i in sortArrs) {
    if (sortArrs.hasOwnProperty(i)) {
      lastSorts = [];
      tmpArray = [];
      elIndex = 0;
      nLastSort = [];
      lastSort = [];

      // If ther are no sortComponents, then no more sorting is neeeded. Copy the array back to the argument.
      if (sortComponents.length === 0) {
        if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
          args[i] = sortArrs[i];
        } else {
          for (k in arguments[i]) {
            if (arguments[i].hasOwnProperty(k)) {
              delete arguments[i][k];
            }
          }
          sal = sortArrs[i].length;
          for (j = 0, vkey = 0; j < sal; j++) {
            vkey = sortKeys[i][j];
            args[i][vkey] = sortArrs[i][j];
          }
        }
        delete sortArrs[i];
        delete sortKeys[i];
        continue;
      }

      // Sort function for sorting. Either sorts asc or desc, regular/string or numeric.
      var sFunction = sortFunctions[(sortFlag[i] & 3)][((sortFlag[i] & 8) > 0) ? 1 : 0];

      // Sort current array.
      for (l = 0; l !== sortComponents.length; l += 2) {
        tmpArray = sortArrs[i].slice(sortComponents[l], sortComponents[l + 1] + 1);
        tmpArray.sort(sFunction);
        lastSorts[l] = [].concat(lastSort); // Is there a better way to copy an array in Javascript?
        elIndex = sortComponents[l];
        for (g in tmpArray) {
          if (tmpArray.hasOwnProperty(g)) {
            sortArrs[i][elIndex] = tmpArray[g];
            elIndex++;
          }
        }
      }

      // Duplicate the sorting of the current array on future arrays.
      sFunction = sortDuplicator;
      for (j in sortArrs) {
        if (sortArrs.hasOwnProperty(j)) {
          if (sortArrs[j] === sortArrs[i]) {
            continue;
          }
          for (l = 0; l !== sortComponents.length; l += 2) {
            tmpArray = sortArrs[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
            nLastSort = [].concat(lastSorts[l]); // alert(l + ':' + nLastSort);
            tmpArray.sort(sFunction);
            elIndex = sortComponents[l];
            for (g in tmpArray) {
              if (tmpArray.hasOwnProperty(g)) {
                sortArrs[j][elIndex] = tmpArray[g];
                elIndex++;
              }
            }
          }
        }
      }

      // Duplicate the sorting of the current array on array keys
      for (j in sortKeys) {
        if (sortKeys.hasOwnProperty(j)) {
          for (l = 0; l !== sortComponents.length; l += 2) {
            tmpArray = sortKeys[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
            nLastSort = [].concat(lastSorts[l]);
            tmpArray.sort(sFunction);
            elIndex = sortComponents[l];
            for (g in tmpArray) {
              if (tmpArray.hasOwnProperty(g)) {
                sortKeys[j][elIndex] = tmpArray[g];
                elIndex++;
              }
            }
          }
        }
      }

      // Generate the next sortComponents
      zlast = null;
      sortComponents = [];
      for (j in sortArrs[i]) {
        if (sortArrs[i].hasOwnProperty(j)) {
          if (!thingsToSort[j]) {
            if ((sortComponents.length & 1)) {
              sortComponents.push(j - 1);
            }
            zlast = null;
            continue;
          }
          if (!(sortComponents.length & 1)) {
            if (zlast !== null) {
              if (sortArrs[i][j] === zlast) {
                sortComponents.push(j - 1);
              } else {
                thingsToSort[j] = false;
              }
            }
            zlast = sortArrs[i][j];
          } else {
            if (sortArrs[i][j] !== zlast) {
              sortComponents.push(j - 1);
              zlast = sortArrs[i][j];
            }
          }
        }
      }

      if (sortComponents.length & 1) {
        sortComponents.push(j);
      }
      if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
        args[i] = sortArrs[i];
      }
      else {
        for (j in arguments[i]) {
          if (arguments[i].hasOwnProperty(j)) {
            delete arguments[i][j];
          }
        }

        sal = sortArrs[i].length;
        for (j = 0, vkey = 0; j < sal; j++) {
          vkey = sortKeys[i][j];
          args[i][vkey] = sortArrs[i][j];
        }

      }
      delete sortArrs[i];
      delete sortKeys[i];
    }
  }
  return true;
}
function array_pad (input, pad_size, pad_value) {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // *     example 1: array_pad([ 7, 8, 9 ], 2, 'a');
  // *     returns 1: [ 7, 8, 9]
  // *     example 2: array_pad([ 7, 8, 9 ], 5, 'a');
  // *     returns 2: [ 7, 8, 9, 'a', 'a']
  // *     example 3: array_pad([ 7, 8, 9 ], 5, 2);
  // *     returns 3: [ 7, 8, 9, 2, 2]
  // *     example 4: array_pad([ 7, 8, 9 ], -5, 'a');
  // *     returns 4: [ 'a', 'a', 7, 8, 9 ]
  var pad = [],
    newArray = [],
    newLength,
    diff = 0,
    i = 0;

  if (Object.prototype.toString.call(input) === '[object Array]' && !isNaN(pad_size)) {
    newLength = ((pad_size < 0) ? (pad_size * -1) : pad_size);
    diff = newLength - input.length;

    if (diff > 0) {
      for (i = 0; i < diff; i++) {
        newArray[i] = pad_value;
      }
      pad = ((pad_size < 0) ? newArray.concat(input) : input.concat(newArray));
    } else {
      pad = input;
    }
  }

  return pad;
}
function array_pop (inputArr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Theriault
  // %        note 1: While IE (and other browsers) support iterating an object's
  // %        note 1: own properties in order, if one attempts to add back properties
  // %        note 1: in IE, they may end up in their former position due to their position
  // %        note 1: being retained. So use of this function with "associative arrays"
  // %        note 1: (objects) may lead to unexpected behavior in an IE environment if
  // %        note 1: you add back properties with the same keys that you removed
  // *     example 1: array_pop([0,1,2]);
  // *     returns 1: 2
  // *     example 2: data = {firstName: 'Kevin', surName: 'van Zonneveld'};
  // *     example 2: lastElem = array_pop(data);
  // *     returns 2: 'van Zonneveld'
  // *     results 2: data == {firstName: 'Kevin'}
  var key = '',
    lastKey = '';

  if (inputArr.hasOwnProperty('length')) {
    // Indexed
    if (!inputArr.length) {
      // Done popping, are we?
      return null;
    }
    return inputArr.pop();
  } else {
    // Associative
    for (key in inputArr) {
      if (inputArr.hasOwnProperty(key)) {
        lastKey = key;
      }
    }
    if (lastKey) {
      var tmp = inputArr[lastKey];
      delete(inputArr[lastKey]);
      return tmp;
    } else {
      return null;
    }
  }
}
function array_product (input) {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // *     example 1: array_product([ 2, 4, 6, 8 ]);
  // *     returns 1: 384
  var idx = 0,
    product = 1,
    il = 0;

  if (Object.prototype.toString.call(input) !== '[object Array]') {
    return null;
  }

  il = input.length;
  while (idx < il) {
    product *= (!isNaN(input[idx]) ? input[idx] : 0);
    idx++;
  }
  return product;
}
function array_push (inputArr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Note also that IE retains information about property position even
  // %        note 1: after being supposedly deleted, so if you delete properties and then
  // %        note 1: add back properties with the same keys (including numeric) that had
  // %        note 1: been deleted, the order will be as before; thus, this function is not
  // %        note 1: really recommended with associative arrays (objects) in IE environments
  // *     example 1: array_push(['kevin','van'], 'zonneveld');
  // *     returns 1: 3
  var i = 0,
    pr = '',
    argv = arguments,
    argc = argv.length,
    allDigits = /^\d$/,
    size = 0,
    highestIdx = 0,
    len = 0;
  if (inputArr.hasOwnProperty('length')) {
    for (i = 1; i < argc; i++) {
      inputArr[inputArr.length] = argv[i];
    }
    return inputArr.length;
  }

  // Associative (object)
  for (pr in inputArr) {
    if (inputArr.hasOwnProperty(pr)) {
      ++len;
      if (pr.search(allDigits) !== -1) {
        size = parseInt(pr, 10);
        highestIdx = size > highestIdx ? size : highestIdx;
      }
    }
  }
  for (i = 1; i < argc; i++) {
    inputArr[++highestIdx] = argv[i];
  }
  return len + i - 1;
}
function array_rand (input, num_req) {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // *     example 1: array_rand( ['Kevin'], 1 );
  // *     returns 1: 0
  var indexes = [];
  var ticks = num_req || 1;
  var checkDuplicate = function (input, value) {
    var exist = false,
      index = 0,
      il = input.length;
    while (index < il) {
      if (input[index] === value) {
        exist = true;
        break;
      }
      index++;
    }
    return exist;
  };

  if (Object.prototype.toString.call(input) === '[object Array]' && ticks <= input.length) {
    while (true) {
      var rand = Math.floor((Math.random() * input.length));
      if (indexes.length === ticks) {
        break;
      }
      if (!checkDuplicate(indexes, rand)) {
        indexes.push(rand);
      }
    }
  } else {
    indexes = null;
  }

  return ((ticks == 1) ? indexes.join() : indexes);
}
function array_reduce (a_input, callback) {
  // http://kevin.vanzonneveld.net
  // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
  // %        note 1: Takes a function as an argument, not a function's name
  // *     example 1: array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;});
  // *     returns 1: 15
  var lon = a_input.length;
  var res = 0,
    i = 0;
  var tmp = [];


  for (i = 0; i < lon; i += 2) {
    tmp[0] = a_input[i];
    if (a_input[(i + 1)]) {
      tmp[1] = a_input[(i + 1)];
    } else {
      tmp[1] = 0;
    }
    res += callback.apply(null, tmp);
    tmp = [];
  }

  return res;
}
function array_replace (arr) {
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_replace(["orange", "banana", "apple", "raspberry"], {0 : "pineapple", 4 : "cherry"}, {0:"grape"});
  // *     returns 1: {0: 'grape', 1: 'banana', 2: 'apple', 3: 'raspberry', 4: 'cherry'}

  var retObj = {},
    i = 0,
    p = '',
    argl = arguments.length;

  if (argl < 2) {
    throw new Error('There should be at least 2 arguments passed to array_replace()');
  }

  // Although docs state that the arguments are passed in by reference, it seems they are not altered, but rather the copy that is returned (just guessing), so we make a copy here, instead of acting on arr itself
  for (p in arr) {
    retObj[p] = arr[p];
  }

  for (i = 1; i < argl; i++) {
    for (p in arguments[i]) {
      retObj[p] = arguments[i][p];
    }
  }
  return retObj;
}
function array_replace_recursive (arr) {
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_replace_recursive({'citrus' : ["orange"], 'berries' : ["blackberry", "raspberry"]}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']});
  // *     returns 1: {citrus : ['pineapple'], berries : ['blueberry', 'raspberry']}

  var retObj = {},
    i = 0,
    p = '',
    argl = arguments.length;

  if (argl < 2) {
    throw new Error('There should be at least 2 arguments passed to array_replace_recursive()');
  }

  // Although docs state that the arguments are passed in by reference, it seems they are not altered, but rather the copy that is returned (just guessing), so we make a copy here, instead of acting on arr itself
  for (p in arr) {
    retObj[p] = arr[p];
  }

  for (i = 1; i < argl; i++) {
    for (p in arguments[i]) {
      if (retObj[p] && typeof retObj[p] === 'object') {
        retObj[p] = this.array_replace_recursive(retObj[p], arguments[i][p]);
      } else {
        retObj[p] = arguments[i][p];
      }
    }
  }
  return retObj;
}
function array_reverse (array, preserve_keys) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Karol Kowalski
  // *     example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true);
  // *     returns 1: { 2: ['green', 'red'], 1: 4, 0: 'php'}
  var isArray = Object.prototype.toString.call(array) === "[object Array]",
    tmp_arr = preserve_keys ? {} : [],
    key;

  if (isArray && !preserve_keys) {
    return array.slice(0).reverse();
  }

  if (preserve_keys) {
    var keys = [];
    for (key in array) {
      // if (array.hasOwnProperty(key)) {
      keys.push(key);
      // }
    }

    var i = keys.length;
    while (i--) {
      key = keys[i];
      // FIXME: don't rely on browsers keeping keys in insertion order
      // it's implementation specific
      // eg. the result will differ from expected in Google Chrome
      tmp_arr[key] = array[key];
    }
  } else {
    for (key in array) {
      // if (array.hasOwnProperty(key)) {
      tmp_arr.unshift(array[key]);
      // }
    }
  }

  return tmp_arr;
}
function array_search (needle, haystack, argStrict) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
  // *     returns 1: 'surname'
  // *     example 2: ini_set('phpjs.return_phpjs_arrays', 'on');
  // *     example 2: var ordered_arr = array({3:'value'}, {2:'value'}, {'a':'value'}, {'b':'value'});
  // *     example 2: var key = array_search(/val/g, ordered_arr); // or var key = ordered_arr.search(/val/g);
  // *     returns 2: '3'

  var strict = !!argStrict,
    key = '';

  if (haystack && typeof haystack === 'object' && haystack.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
    return haystack.search(needle, argStrict);
  }
  if (typeof needle === 'object' && needle.exec) { // Duck-type for RegExp
    if (!strict) { // Let's consider case sensitive searches as strict
      var flags = 'i' + (needle.global ? 'g' : '') +
            (needle.multiline ? 'm' : '') +
            (needle.sticky ? 'y' : ''); // sticky is FF only
      needle = new RegExp(needle.source, flags);
    }
    for (key in haystack) {
      if (needle.test(haystack[key])) {
        return key;
      }
    }
    return false;
  }

  for (key in haystack) {
    if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
      return key;
    }
  }

  return false;
}
function array_shift (inputArr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Martijn Wieringa
  // %        note 1: Currently does not handle objects
  // *     example 1: array_shift(['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: 'Kevin'
  var props = false,
    shift = undefined,
    pr = '',
    allDigits = /^\d$/,
    int_ct = -1,
    _checkToUpIndices = function (arr, ct, key) {
      // Deal with situation, e.g., if encounter index 4 and try to set it to 0, but 0 exists later in loop (need to
      // increment all subsequent (skipping current key, since we need its value below) until find unused)
      if (arr[ct] !== undefined) {
        var tmp = ct;
        ct += 1;
        if (ct === key) {
          ct += 1;
        }
        ct = _checkToUpIndices(arr, ct, key);
        arr[ct] = arr[tmp];
        delete arr[tmp];
      }
      return ct;
    };


  if (inputArr.length === 0) {
    return null;
  }
  if (inputArr.length > 0) {
    return inputArr.shift();
  }

/*
  UNFINISHED FOR HANDLING OBJECTS
  for (pr in inputArr) {
    if (inputArr.hasOwnProperty(pr)) {
      props = true;
      shift = inputArr[pr];
      delete inputArr[pr];
      break;
    }
  }
  for (pr in inputArr) {
    if (inputArr.hasOwnProperty(pr)) {
      if (pr.search(allDigits) !== -1) {
        int_ct += 1;
        if (parseInt(pr, 10) === int_ct) { // Key is already numbered ok, so don't need to change key for value
          continue;
        }
        _checkToUpIndices(inputArr, int_ct, pr);
        arr[int_ct] = arr[pr];
        delete arr[pr];
      }
    }
  }
  if (!props) {
    return null;
  }
  return shift;
  */
}
function array_slice (arr, offst, lgth, preserve_keys) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: is_int
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // %          note: Relies on is_int because !isNaN accepts floats
  // *     example 1: array_slice(["a", "b", "c", "d", "e"], 2, -1);
  // *     returns 1: {0: 'c', 1: 'd'}
  // *     example 2: array_slice(["a", "b", "c", "d", "e"], 2, -1, true);
  // *     returns 2: {2: 'c', 3: 'd'}
/*
  if ('callee' in arr && 'length' in arr) {
    arr = Array.prototype.slice.call(arr);
  }
  */

  var key = '';

  if (Object.prototype.toString.call(arr) !== '[object Array]' ||
    (preserve_keys && offst !== 0)) { // Assoc. array as input or if required as output
    var lgt = 0,
      newAssoc = {};
    for (key in arr) {
      //if (key !== 'length') {
      lgt += 1;
      newAssoc[key] = arr[key];
      //}
    }
    arr = newAssoc;

    offst = (offst < 0) ? lgt + offst : offst;
    lgth = lgth === undefined ? lgt : (lgth < 0) ? lgt + lgth - offst : lgth;

    var assoc = {};
    var start = false,
      it = -1,
      arrlgth = 0,
      no_pk_idx = 0;
    for (key in arr) {
      ++it;
      if (arrlgth >= lgth) {
        break;
      }
      if (it == offst) {
        start = true;
      }
      if (!start) {
        continue;
      }++arrlgth;
      if (this.is_int(key) && !preserve_keys) {
        assoc[no_pk_idx++] = arr[key];
      } else {
        assoc[key] = arr[key];
      }
    }
    //assoc.length = arrlgth; // Make as array-like object (though length will not be dynamic)
    return assoc;
  }

  if (lgth === undefined) {
    return arr.slice(offst);
  } else if (lgth >= 0) {
    return arr.slice(offst, offst + lgth);
  } else {
    return arr.slice(offst, lgth);
  }
}
function array_splice (arr, offst, lgth, replacement) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Theriault
  // %        note 1: Order does get shifted in associative array input with numeric indices,
  // %        note 1: since PHP behavior doesn't preserve keys, but I understand order is
  // %        note 1: not reliable anyways
  // %        note 2: Note also that IE retains information about property position even
  // %        note 2: after being supposedly deleted, so use of this function may produce
  // %        note 2: unexpected results in IE if you later attempt to add back properties
  // %        note 2: with the same keys that had been deleted
  // -    depends on: is_int
  // *     example 1: input = {4: "red", 'abc': "green", 2: "blue", 'dud': "yellow"};
  // *     example 1: array_splice(input, 2);
  // *     returns 1: {0: "blue", 'dud': "yellow"}
  // *     results 1: input == {'abc':"green", 0:"red"}
  // *     example 2: input = ["red", "green", "blue", "yellow"];
  // *     example 2: array_splice(input, 3, 0, "purple");
  // *     returns 2: []
  // *     results 2: input == ["red", "green", "blue", "purple", "yellow"]
  // *     example 3: input = ["red", "green", "blue", "yellow"]
  // *     example 3: array_splice(input, -1, 1, ["black", "maroon"]);
  // *     returns 3: ["yellow"]
  // *     results 3: input == ["red", "green", "blue", "black", "maroon"]
  var _checkToUpIndices = function (arr, ct, key) {
    // Deal with situation, e.g., if encounter index 4 and try to set it to 0, but 0 exists later in loop (need to
    // increment all subsequent (skipping current key, since we need its value below) until find unused)
    if (arr[ct] !== undefined) {
      var tmp = ct;
      ct += 1;
      if (ct === key) {
        ct += 1;
      }
      ct = _checkToUpIndices(arr, ct, key);
      arr[ct] = arr[tmp];
      delete arr[tmp];
    }
    return ct;
  };

  if (replacement && typeof replacement !== 'object') {
    replacement = [replacement];
  }
  if (lgth === undefined) {
    lgth = offst >= 0 ? arr.length - offst : -offst;
  } else if (lgth < 0) {
    lgth = (offst >= 0 ? arr.length - offst : -offst) + lgth;
  }

  if (Object.prototype.toString.call(arr) !== '[object Array]') {
/*if (arr.length !== undefined) { // Deal with array-like objects as input
    delete arr.length;
    }*/
    var lgt = 0,
      ct = -1,
      rmvd = [],
      rmvdObj = {},
      repl_ct = -1,
      int_ct = -1;
    var returnArr = true,
      rmvd_ct = 0,
      rmvd_lgth = 0,
      key = '';
    // rmvdObj.length = 0;
    for (key in arr) { // Can do arr.__count__ in some browsers
      lgt += 1;
    }
    offst = (offst >= 0) ? offst : lgt + offst;
    for (key in arr) {
      ct += 1;
      if (ct < offst) {
        if (this.is_int(key)) {
          int_ct += 1;
          if (parseInt(key, 10) === int_ct) { // Key is already numbered ok, so don't need to change key for value
            continue;
          }
          _checkToUpIndices(arr, int_ct, key); // Deal with situation, e.g.,
          // if encounter index 4 and try to set it to 0, but 0 exists later in loop
          arr[int_ct] = arr[key];
          delete arr[key];
        }
        continue;
      }
      if (returnArr && this.is_int(key)) {
        rmvd.push(arr[key]);
        rmvdObj[rmvd_ct++] = arr[key]; // PHP starts over here too
      } else {
        rmvdObj[key] = arr[key];
        returnArr = false;
      }
      rmvd_lgth += 1;
      // rmvdObj.length += 1;
      if (replacement && replacement[++repl_ct]) {
        arr[key] = replacement[repl_ct];
      } else {
        delete arr[key];
      }
    }
    // arr.length = lgt - rmvd_lgth + (replacement ? replacement.length : 0); // Make (back) into an array-like object
    return returnArr ? rmvd : rmvdObj;
  }

  if (replacement) {
    replacement.unshift(offst, lgth);
    return Array.prototype.splice.apply(arr, replacement);
  }
  return arr.splice(offst, lgth);
}
function array_sum (array) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Nate
  // +   bugfixed by: Gilbert
  // +   improved by: David Pilia (http://www.beteck.it/)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_sum([4, 9, 182.6]);
  // *     returns 1: 195.6
  // *     example 2: total = []; index = 0.1; for (y=0; y < 12; y++){total[y] = y + index;}
  // *     example 2: array_sum(total);
  // *     returns 2: 67.2
  var key, sum = 0;

  if (array && typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
    return array.sum.apply(array, Array.prototype.slice.call(arguments, 0));
  }

  // input sanitation
  if (typeof array !== 'object') {
    return null;
  }

  for (key in array) {
    if (!isNaN(parseFloat(array[key]))) {
      sum += parseFloat(array[key]);
    }
  }

  return sum;
}
function array_udiff (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  // *     example 1: array_udiff($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;});
  // *     returns 1: {c: 'blue'}
  var retArr = {},
    arglm1 = arguments.length - 1,
    cb = arguments[arglm1],
    arr = '',
    i = 1,
    k1 = '',
    k = '';
  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb(arr[k], arr1[k1]) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys;
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
}
function array_udiff_assoc (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_udiff_assoc({0: 'kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;});
  // *     returns 1: {1: 'van', 2: 'Zonneveld'}
  var retArr = {},
    arglm1 = arguments.length - 1,
    cb = arguments[arglm1],
    arr = {},
    i = 1,
    k1 = '',
    k = '';
  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb(arr[k], arr1[k1]) === 0 && k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys;
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
}
function array_udiff_uassoc (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  // *     example 1: array_udiff_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;});
  // *     returns 1: {0: 'red', c: 'blue'}
  var retArr = {},
    arglm1 = arguments.length - 1,
    arglm2 = arglm1 - 1,
    cb = arguments[arglm1],
    cb0 = arguments[arglm2],
    k1 = '',
    i = 1,
    k = '',
    arr = {};

  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;
  cb0 = (typeof cb0 === 'string') ? this.window[cb0] : (Object.prototype.toString.call(cb0) === '[object Array]') ? this.window[cb0[0]][cb0[1]] : cb0;

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < arglm2; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys;
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
}
function array_uintersect (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Demosthenes Koptsis
  // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  // *     example 1: array_uintersect($array1, $array2, function( f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;});
  // *     returns 1: {a: 'green', b: 'brown', 0: 'red'}
  var retArr = {},
    arglm1 = arguments.length - 1,
    arglm2 = arglm1 - 1,
    cb = arguments[arglm1],
    k1 = '',
    i = 1,
    arr = {},
    k = '';

  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb(arr[k], arr1[k1]) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value, continue the loop until done
          continue arrs;
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys;
    }
  }

  return retArr;
}
function array_uintersect_assoc (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  // *     example 1: array_uintersect_assoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;});
  // *     returns 1: {a: 'green', b: 'brown'}
  var retArr = {},
    arglm1 = arguments.length - 1,
    arglm2 = arglm1 - 2,
    cb = arguments[arglm1],
    k1 = '',
    i = 1,
    arr = {},
    k = '';

  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (k === k1 && cb(arr[k], arr1[k1]) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value, continue the loop until done
          continue arrs;
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys;
    }
  }

  return retArr;
}
function array_uintersect_uassoc (arr1) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  // *     example 1: array_uintersect_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;});
  // *     returns 1: {a: 'green', b: 'brown'}
  var retArr = {},
    arglm1 = arguments.length - 1,
    arglm2 = arglm1 - 1,
    cb = arguments[arglm1],
    cb0 = arguments[arglm2],
    k1 = '',
    i = 1,
    k = '',
    arr = {};

  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[cb[0]][cb[1]] : cb;
  cb0 = (typeof cb0 === 'string') ? this.window[cb0] : (Object.prototype.toString.call(cb0) === '[object Array]') ? this.window[cb0[0]][cb0[1]] : cb0;

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < arglm2; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
          if (i === arguments.length - 3) {
            retArr[k1] = arr1[k1];
          }
          continue arrs; // If the innermost loop always leads at least once to an equal value, continue the loop until done
        }
      }
      continue arr1keys; // If it reaches here, it wasn't found in at least one array, so try next value
    }
  }

  return retArr;
}
function array_unique (inputArr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  // +      input by: duncan
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Nate
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Michael Grier
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: The second argument, sort_flags is not implemented;
  // %          note 1: also should be sorted (asort?) first according to docs
  // *     example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
  // *     returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
  // *     example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
  // *     returns 2: {a: 'green', 0: 'red', 1: 'blue'}
  var key = '',
    tmp_arr2 = {},
    val = '';

  var __array_search = function (needle, haystack) {
    var fkey = '';
    for (fkey in haystack) {
      if (haystack.hasOwnProperty(fkey)) {
        if ((haystack[fkey] + '') === (needle + '')) {
          return fkey;
        }
      }
    }
    return false;
  };

  for (key in inputArr) {
    if (inputArr.hasOwnProperty(key)) {
      val = inputArr[key];
      if (false === __array_search(val, tmp_arr2)) {
        tmp_arr2[key] = val;
      }
    }
  }

  return tmp_arr2;
}
function array_unshift (array) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Martijn Wieringa
  // +   improved by: jmweb
  // %        note 1: Currently does not handle objects
  // *     example 1: array_unshift(['van', 'Zonneveld'], 'Kevin');
  // *     returns 1: 3
  var i = arguments.length;

  while (--i !== 0) {
    arguments[0].unshift(arguments[i]);
  }

  return arguments[0].length;
}
function array_values (input) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
  // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}
  var tmp_arr = [],
    key = '';

  if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
    return input.values();
  }

  for (key in input) {
    tmp_arr[tmp_arr.length] = input[key];
  }

  return tmp_arr;
}
function array_walk (array, funcname, userdata) {
  // http://kevin.vanzonneveld.net
  // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
  // +   bugfixed by: David
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %   note 1: Using ini_set('phpjs.no-eval', true) will only work with
  // %   note 1:  user-defined string functions, not built-in functions like void()
  // *     example 1: array_walk ({'a':'b'}, 'void', 'userdata');
  // *     returns 1: true
  // *     example 2: array_walk ('a', 'void', 'userdata');
  // *     returns 2: false
  // *     example 3: array_walk ([3, 4], function () {}, 'userdata');
  // *     returns 3: true
  // *     example 4: array_walk ({40: 'My age', 50: 'My IQ'}, [window, 'prompt']);
  // *     returns 4: true
  // *     example 5: ini_set('phpjs.return_phpjs_arrays', 'on');
  // *     example 5: var arr = array({40: 'My age'}, {50: 'My IQ'});
  // *     example 5: array_walk(arr, [window, 'prompt']);
  // *     returns 5: [object Object]
  var key, value, ini;

  if (!array || typeof array !== 'object') {
    return false;
  }
  if (typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
    if (arguments.length > 2) {
      return array.walk(funcname, userdata);
    }
    else {
      return array.walk(funcname);
    }
  }

  try {
    if (typeof funcname === 'function') {
      for (key in array) {
        if (arguments.length > 2) {
          funcname(array[key], key, userdata);
        }
        else {
          funcname(array[key], key);
        }
      }
    }
    else if (typeof funcname === 'string') {
      this.php_js = this.php_js || {};
      this.php_js.ini = this.php_js.ini || {};
      ini = this.php_js.ini['phpjs.no-eval'];
      if (ini && (
        parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !== 'off')
      )) {
        if (arguments.length > 2) {
          for (key in array) {
            this.window[funcname](array[key], key, userdata);
          }
        }
        else {
          for (key in array) {
            this.window[funcname](array[key], key);
          }
        }
      }
      else {
        if (arguments.length > 2) {
          for (key in array) {
            eval(funcname + '(array[key], key, userdata)');
          }
        }
        else {
          for (key in array) {
            eval(funcname + '(array[key], key)');
          }
        }
      }
    }
    else if (funcname && typeof funcname === 'object' && funcname.length === 2) {
      var obj = funcname[0], func = funcname[1];
      if (arguments.length > 2) {
        for (key in array) {
          obj[func](array[key], key, userdata);
        }
      }
      else {
        for (key in array) {
          obj[func](array[key], key);
        }
      }
    }
    else {
      return false;
    }
  }
  catch (e) {
    return false;
  }

  return true;
}
function array_walk_recursive (array, funcname, userdata) {
  // http://kevin.vanzonneveld.net
  // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
  // *     example 1: array_walk_recursive ({'a': 'b', 'c': {'d': 'e'}}, 'void', 'userdata');
  // *     returns 1: true
  // *     example 2: array_walk_recursive ('a', 'void', 'userdata');
  // *     returns 2: false
  var key;

  if (typeof array !== 'object') {
    return false;
  }

  for (key in array) {
    if (typeof array[key] == 'object') {
      return this.array_walk_recursive(array[key], funcname, userdata);
    }

    if (typeof(userdata) != 'undefined') {
      eval(funcname + '( array [key] , key , userdata  )');
    } else {
      eval(funcname + '(  userdata ) ');
    }
  }

  return true;
}
function arsort (inputArr, sort_flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  // %        note 1: integrated into all of these functions by adapting the code at
  // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  // %        note 2: The examples are correct, this is a new way
  // %        note 2: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
  // %        note 3: This function deviates from PHP in returning a copy of the array instead
  // %        note 3: of acting by reference and returning true; this was necessary because
  // %        note 3: IE does not allow deleting and re-adding of properties without caching
  // %        note 3: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 3: get the PHP behavior, but use this only if you are in an environment
  // %        note 3: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 3: property deletion is supported. Note that we intend to implement the PHP
  // %        note 3: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 3: is by reference in PHP anyways
  // %        note 4: Since JS objects' keys are always strings, and (the
  // %        note 4: default) SORT_REGULAR flag distinguishes by key type,
  // %        note 4: if the content is a numeric string, we treat the
  // %        note 4: "original type" as numeric.
  // -    depends on: i18n_loc_get_default
  // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 1: data = arsort(data);
  // *     returns 1: data == {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
  // *     example 2: ini_set('phpjs.strictForIn', true);
  // *     example 2: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 2: arsort(data);
  // *     results 2: data == {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
  // *     returns 2: true
  var valArr = [], valArrLen = 0,
    k, i, ret, sorter, that = this,
    strictForIn = false,
    populateArr = {};

  switch (sort_flags) {
  case 'SORT_STRING':
    // compare items as strings
    sorter = function (a, b) {
      return that.strnatcmp(b, a);
    };
    break;
  case 'SORT_LOCALE_STRING':
    // compare items as strings, based on the current locale (set with i18n_loc_set_default() as of PHP6)
    var loc = this.i18n_loc_get_default();
    sorter = this.php_js.i18nLocales[loc].sorting;
    break;
  case 'SORT_NUMERIC':
    // compare items numerically
    sorter = function (a, b) {
      return (a - b);
    };
    break;
  case 'SORT_REGULAR':
    // compare items normally (don't change types)
  default:
    sorter = function (b, a) {
      var aFloat = parseFloat(a),
        bFloat = parseFloat(b),
        aNumeric = aFloat + '' === a,
        bNumeric = bFloat + '' === b;
      if (aNumeric && bNumeric) {
        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
      } else if (aNumeric && !bNumeric) {
        return 1;
      } else if (!aNumeric && bNumeric) {
        return -1;
      }
      return a > b ? 1 : a < b ? -1 : 0;
    };
    break;
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;


  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return sorter(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0, valArrLen = valArr.length; i < valArrLen; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return strictForIn || populateArr;
}
function asort (inputArr, sort_flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   input by: paulo kuong
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Adam Wallner (http://web2.bitbaro.hu/)
  // +   improved by: Theriault
  // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  // %        note 1: integrated into all of these functions by adapting the code at
  // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  // %        note 2: The examples are correct, this is a new way
  // %        note 2: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
  // %        note 3: This function deviates from PHP in returning a copy of the array instead
  // %        note 3: of acting by reference and returning true; this was necessary because
  // %        note 3: IE does not allow deleting and re-adding of properties without caching
  // %        note 3: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 3: get the PHP behavior, but use this only if you are in an environment
  // %        note 3: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 3: property deletion is supported. Note that we intend to implement the PHP
  // %        note 3: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 3: is by reference in PHP anyways
  // %        note 4: Since JS objects' keys are always strings, and (the
  // %        note 4: default) SORT_REGULAR flag distinguishes by key type,
  // %        note 4: if the content is a numeric string, we treat the
  // %        note 4: "original type" as numeric.
  // -    depends on: strnatcmp
  // -    depends on: i18n_loc_get_default
  // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 1: data = asort(data);
  // *     results 1: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
  // *     returns 1: true
  // *     example 2: ini_set('phpjs.strictForIn', true);
  // *     example 2: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 2: asort(data);
  // *     results 2: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
  // *     returns 2: true
  var valArr = [], valArrLen = 0,
    k, i, ret, sorter, that = this,
    strictForIn = false,
    populateArr = {};

  switch (sort_flags) {
  case 'SORT_STRING':
    // compare items as strings
    sorter = function (a, b) {
      return that.strnatcmp(a, b);
    };
    break;
  case 'SORT_LOCALE_STRING':
    // compare items as strings, based on the current locale (set with i18n_loc_set_default() as of PHP6)
    var loc = this.i18n_loc_get_default();
    sorter = this.php_js.i18nLocales[loc].sorting;
    break;
  case 'SORT_NUMERIC':
    // compare items numerically
    sorter = function (a, b) {
      return (a - b);
    };
    break;
  case 'SORT_REGULAR':
    // compare items normally (don't change types)
  default:
    sorter = function (a, b) {
      var aFloat = parseFloat(a),
        bFloat = parseFloat(b),
        aNumeric = aFloat + '' === a,
        bNumeric = bFloat + '' === b;
      if (aNumeric && bNumeric) {
        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
      } else if (aNumeric && !bNumeric) {
        return 1;
      } else if (!aNumeric && bNumeric) {
        return -1;
      }
      return a > b ? 1 : a < b ? -1 : 0;
    };
    break;
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }

  valArr.sort(function (a, b) {
    return sorter(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0, valArrLen = valArr.length; i < valArrLen; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return strictForIn || populateArr;
}
function compact () {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // +    tweaked by: Jack
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: var1 = 'Kevin'; var2 = 'van'; var3 = 'Zonneveld';
  // *     example 1: compact('var1', 'var2', 'var3');
  // *     returns 1: {'var1': 'Kevin', 'var2': 'van', 'var3': 'Zonneveld'}
  var matrix = {},
    that = this;

  var process = function (value) {
    var i = 0,
      l = value.length,
      key_value = '';
    for (i = 0; i < l; i++) {
      key_value = value[i];
      if (Object.prototype.toString.call(key_value) === '[object Array]') {
        process(key_value);
      } else {
        if (typeof that.window[key_value] !== 'undefined') {
          matrix[key_value] = that.window[key_value];
        }
      }
    }
    return true;
  };

  process(arguments);
  return matrix;
}
function count (mixed_var, mode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Waldo Malqui Silva
  // +   bugfixed by: Soren Hansen
  // +      input by: merabi
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Olivier Louvignes (http://mg-crea.com/)
  // *     example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
  // *     returns 1: 6
  // *     example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
  // *     returns 2: 6
  var key, cnt = 0;

  if (mixed_var === null || typeof mixed_var === 'undefined') {
    return 0;
  } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
    return 1;
  }

  if (mode === 'COUNT_RECURSIVE') {
    mode = 1;
  }
  if (mode != 1) {
    mode = 0;
  }

  for (key in mixed_var) {
    if (mixed_var.hasOwnProperty(key)) {
      cnt++;
      if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object)) {
        cnt += this.count(mixed_var[key], 1);
      }
    }
  }

  return cnt;
}
function current (arr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to store the array pointer
  // *     example 1: transport = ['foot', 'bike', 'car', 'plane'];
  // *     example 1: current(transport);
  // *     returns 1: 'foot'
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.pointers = this.php_js.pointers || [];
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  // END REDUNDANT
  var pointers = this.php_js.pointers;
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return arr[cursor] || false;
  }
  var ct = 0;
  for (var k in arr) {
    if (ct === cursor) {
      return arr[k];
    }
    ct++;
  }
  return false; // Empty
}
function each (arr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ates Goral (http://magnetiq.com)
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to store the array pointer
  // *     example 1: each({a: "apple", b: "balloon"});
  // *     returns 1: {0: "a", 1: "apple", key: "a", value: "apple"}
  //  Will return a 4-item object unless a class property 'returnArrayOnly'
  //  is set to true on this function if want to only receive a two-item
  //  numerically-indexed array (for the sake of array destructuring in
  //  JavaScript 1.7+ (similar to list() in PHP, but as PHP does it automatically
  //  in that context and JavaScript cannot, we needed something to allow that option)
  //  See https://developer.mozilla.org/en/New_in_JavaScript_1.7#Destructuring_assignment
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.pointers = this.php_js.pointers || [];
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  // END REDUNDANT
  var pointers = this.php_js.pointers;
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  var pos = 0;

  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor) {
        pointers[arrpos + 1] += 1;
        if (each.returnArrayOnly) {
          return [k, arr[k]];
        } else {
          return {
            1: arr[k],
            value: arr[k],
            0: k,
            key: k
          };
        }
      }
      ct++;
    }
    return false; // Empty
  }
  if (arr.length === 0 || cursor === arr.length) {
    return false;
  }
  pos = cursor;
  pointers[arrpos + 1] += 1;
  if (each.returnArrayOnly) {
    return [pos, arr[pos]];
  } else {
    return {
      1: arr[pos],
      value: arr[pos],
      0: pos,
      key: pos
    };
  }
}
function end (arr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Legaev Andrey
  // +    revised by: J A R
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   restored by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to store the array pointer
  // *     example 1: end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
  // *     returns 1: 'Zonneveld'
  // *     example 2: end(['Kevin', 'van', 'Zonneveld']);
  // *     returns 2: 'Zonneveld'
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.pointers = this.php_js.pointers || [];
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  // END REDUNDANT
  var pointers = this.php_js.pointers;
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      ct++;
      var val = arr[k];
    }
    if (ct === 0) {
      return false; // Empty
    }
    pointers[arrpos + 1] = ct - 1;
    return val;
  }
  if (arr.length === 0) {
    return false;
  }
  pointers[arrpos + 1] = arr.length - 1;
  return arr[pointers[arrpos + 1]];
}
function extract (arr, type, prefix) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Only works by extracting into global context (whether called in the global scope or
  // %        note 1: within a function); also, the EXTR_REFS flag I believe can't be made to work
  // *     example 1: size = 'large';
  // *     example 1: var_array = {'color' : 'blue', 'size' : 'medium', 'shape' : 'sphere'};
  // *     example 1: extract(var_array, 'EXTR_PREFIX_SAME', 'wddx');
  // *     example 1: color+'-'+size+'-'+shape+'-'+wddx_size;
  // *     returns 1: 'blue-large-sphere-medium'
  if (Object.prototype.toString.call(arr) === '[object Array]' &&
    (type !== 'EXTR_PREFIX_ALL' && type !== 'EXTR_PREFIX_INVALID')) {
    return 0;
  }
  var targetObj = this.window;
  if (this.php_js && this.php_js.ini && this.php_js.ini['phpjs.extractTargetObj'] && this.php_js.ini['phpjs.extractTargetObj'].local_value) { // Allow designated object to be used instead of window
    targetObj = this.php_js.ini['phpjs.extractTargetObj'].local_value;
  }
  var chng = 0;

  for (var i in arr) {
    var validIdent = /^[_a-zA-Z$][\w|$]*$/; // TODO: Refine regexp to allow JS 1.5+ Unicode identifiers
    var prefixed = prefix + '_' + i;
    try {
      switch (type) {
      case 'EXTR_PREFIX_SAME' || 2:
        if (targetObj[i] !== undefined) {
          if (prefixed.match(validIdent) !== null) {
            targetObj[prefixed] = arr[i];
            ++chng;
          }
        } else {
          targetObj[i] = arr[i];
          ++chng;
        }
        break;
      case 'EXTR_SKIP' || 1:
        if (targetObj[i] === undefined) {
          targetObj[i] = arr[i];
          ++chng;
        }
        break;
      case 'EXTR_PREFIX_ALL' || 3:
        if (prefixed.match(validIdent) !== null) {
          targetObj[prefixed] = arr[i];
          ++chng;
        }
        break;
      case 'EXTR_PREFIX_INVALID' || 4:
        if (i.match(validIdent) !== null) {
          if (prefixed.match(validIdent) !== null) {
            targetObj[prefixed] = arr[i];
            ++chng;
          }
        } else {
          targetObj[i] = arr[i];
          ++chng;
        }
        break;
      case 'EXTR_IF_EXISTS' || 6:
        if (targetObj[i] !== undefined) {
          targetObj[i] = arr[i];
          ++chng;
        }
        break;
      case 'EXTR_PREFIX_IF_EXISTS' || 5:
        if (targetObj[i] !== undefined && prefixed.match(validIdent) !== null) {
          targetObj[prefixed] = arr[i];
          ++chng;
        }
        break;
      case 'EXTR_REFS' || 256:
        throw 'The EXTR_REFS type will not work in JavaScript';
      case 'EXTR_OVERWRITE' || 0:
        // Fall-through
      default:
        targetObj[i] = arr[i];
        ++chng;
        break;
      }
    } catch (e) { // Just won't increment for problem assignments
    }
  }
  return chng;
}
function in_array (needle, haystack, argStrict) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: vlado houba
  // +   input by: Billy
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: true
  // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
  // *     returns 2: false
  // *     example 3: in_array(1, ['1', '2', '3']);
  // *     returns 3: true
  // *     example 3: in_array(1, ['1', '2', '3'], false);
  // *     returns 3: true
  // *     example 4: in_array(1, ['1', '2', '3'], true);
  // *     returns 4: false
  var key = '',
    strict = !! argStrict;

  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true;
      }
    }
  } else {
    for (key in haystack) {
      if (haystack[key] == needle) {
        return true;
      }
    }
  }

  return false;
}
function key (arr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Riddler (http://www.frontierwebdev.com/)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to store the array pointer
  // *     example 1: array = {fruit1: 'apple', 'fruit2': 'orange'}
  // *     example 1: key(array);
  // *     returns 1: 'fruit1'
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.pointers = this.php_js.pointers || [];
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  // END REDUNDANT
  var pointers = this.php_js.pointers;
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }

  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var cursor = pointers[pointers.indexOf(arr) + 1];
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor) {
        return k;
      }
      ct++;
    }
    return false; // Empty
  }
  if (arr.length === 0) {
    return false;
  }
  return cursor;
}
function krsort (inputArr, sort_flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: GeekFG (http://geekfg.blogspot.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: The examples are correct, this is a new way
  // %        note 2: This function deviates from PHP in returning a copy of the array instead
  // %        note 2: of acting by reference and returning true; this was necessary because
  // %        note 2: IE does not allow deleting and re-adding of properties without caching
  // %        note 2: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 2: get the PHP behavior, but use this only if you are in an environment
  // %        note 2: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 2: property deletion is supported. Note that we intend to implement the PHP
  // %        note 2: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 2: is by reference in PHP anyways
  // %        note 3: Since JS objects' keys are always strings, and (the
  // %        note 3: default) SORT_REGULAR flag distinguishes by key type,
  // %        note 3: if the content is a numeric string, we treat the
  // %        note 3: "original type" as numeric.
  // -    depends on: i18n_loc_get_default
  // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 1: data = krsort(data);
  // *     results 1: {d: 'lemon', c: 'apple', b: 'banana', a: 'orange'}
  // *     example 2: ini_set('phpjs.strictForIn', true);
  // *     example 2: data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};
  // *     example 2: krsort(data);
  // *     results 2: data == {3: 'Kevin', 2: 'van', 1: 'Zonneveld'}
  // *     returns 2: true
  var tmp_arr = {},
    keys = [],
    sorter, i, k, that = this,
    strictForIn = false,
    populateArr = {};

  switch (sort_flags) {
  case 'SORT_STRING':
    // compare items as strings
    sorter = function (a, b) {
      return that.strnatcmp(b, a);
    };
    break;
  case 'SORT_LOCALE_STRING':
    // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
    var loc = this.i18n_loc_get_default();
    sorter = this.php_js.i18nLocales[loc].sorting;
    break;
  case 'SORT_NUMERIC':
    // compare items numerically
    sorter = function (a, b) {
      return (b - a);
    };
    break;
  case 'SORT_REGULAR':
    // compare items normally (don't change types)
  default:
    sorter = function (b, a) {
      var aFloat = parseFloat(a),
        bFloat = parseFloat(b),
        aNumeric = aFloat + '' === a,
        bNumeric = bFloat + '' === b;
      if (aNumeric && bNumeric) {
        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
      } else if (aNumeric && !bNumeric) {
        return 1;
      } else if (!aNumeric && bNumeric) {
        return -1;
      }
      return a > b ? 1 : a < b ? -1 : 0;
    };
    break;
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }
  keys.sort(sorter);

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;


  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmp_arr[k] = inputArr[k];
    if (strictForIn) {
      delete inputArr[k];
    }
  }
  for (i in tmp_arr) {
    if (tmp_arr.hasOwnProperty(i)) {
      populateArr[i] = tmp_arr[i];
    }
  }

  return strictForIn || populateArr;
}
function ksort (inputArr, sort_flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: GeekFG (http://geekfg.blogspot.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: The examples are correct, this is a new way
  // %        note 2: This function deviates from PHP in returning a copy of the array instead
  // %        note 2: of acting by reference and returning true; this was necessary because
  // %        note 2: IE does not allow deleting and re-adding of properties without caching
  // %        note 2: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 2: get the PHP behavior, but use this only if you are in an environment
  // %        note 2: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 2: property deletion is supported. Note that we intend to implement the PHP
  // %        note 2: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 2: is by reference in PHP anyways
  // %        note 3: Since JS objects' keys are always strings, and (the
  // %        note 3: default) SORT_REGULAR flag distinguishes by key type,
  // %        note 3: if the content is a numeric string, we treat the
  // %        note 3: "original type" as numeric.
  // -    depends on: i18n_loc_get_default
  // -    depends on: strnatcmp
  // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 1: data = ksort(data);
  // *     results 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
  // *     example 2: ini_set('phpjs.strictForIn', true);
  // *     example 2: data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};
  // *     example 2: ksort(data);
  // *     results 2: data == {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}
  // *     returns 2: true
  var tmp_arr = {},
    keys = [],
    sorter, i, k, that = this,
    strictForIn = false,
    populateArr = {};

  switch (sort_flags) {
  case 'SORT_STRING':
    // compare items as strings
    sorter = function (a, b) {
      return that.strnatcmp(a, b);
    };
    break;
  case 'SORT_LOCALE_STRING':
    // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
    var loc = this.i18n_loc_get_default();
    sorter = this.php_js.i18nLocales[loc].sorting;
    break;
  case 'SORT_NUMERIC':
    // compare items numerically
    sorter = function (a, b) {
      return ((a + 0) - (b + 0));
    };
    break;
    // case 'SORT_REGULAR': // compare items normally (don't change types)
  default:
    sorter = function (a, b) {
      var aFloat = parseFloat(a),
        bFloat = parseFloat(b),
        aNumeric = aFloat + '' === a,
        bNumeric = bFloat + '' === b;
      if (aNumeric && bNumeric) {
        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
      } else if (aNumeric && !bNumeric) {
        return 1;
      } else if (!aNumeric && bNumeric) {
        return -1;
      }
      return a > b ? 1 : a < b ? -1 : 0;
    };
    break;
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }
  keys.sort(sorter);

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmp_arr[k] = inputArr[k];
    if (strictForIn) {
      delete inputArr[k];
    }
  }
  for (i in tmp_arr) {
    if (tmp_arr.hasOwnProperty(i)) {
      populateArr[i] = tmp_arr[i];
    }
  }

  return strictForIn || populateArr;
}
function natcasesort (inputArr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // %        note 1: This function deviates from PHP in returning a copy of the array instead
  // %        note 1: of acting by reference and returning true; this was necessary because
  // %        note 1: IE does not allow deleting and re-adding of properties without caching
  // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 1: get the PHP behavior, but use this only if you are in an environment
  // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 1: property deletion is supported. Note that we intend to implement the PHP
  // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 1: is by reference in PHP anyways
  // %        note 2: We cannot use numbers as keys and have them be reordered since they
  // %        note 2: adhere to numerical order in some implementations
  // -    depends on: strnatcasecmp
  // *     example 1: $array1 = {a:'IMG0.png', b:'img12.png', c:'img10.png', d:'img2.png', e:'img1.png', f:'IMG3.png'};
  // *     example 1: $array1 = natcasesort($array1);
  // *     returns 1: {a: 'IMG0.png', e: 'img1.png', d: 'img2.png', f: 'IMG3.png', c: 'img10.png', b: 'img12.png'}
  var valArr = [],
    k, i, ret, that = this,
    strictForIn = false,
    populateArr = {};

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return that.strnatcasecmp(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0; i < valArr.length; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return strictForIn || populateArr;
}
function natsort (inputArr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // %        note 1: This function deviates from PHP in returning a copy of the array instead
  // %        note 1: of acting by reference and returning true; this was necessary because
  // %        note 1: IE does not allow deleting and re-adding of properties without caching
  // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 1: get the PHP behavior, but use this only if you are in an environment
  // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 1: property deletion is supported. Note that we intend to implement the PHP
  // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 1: is by reference in PHP anyways
  // -    depends on: strnatcmp
  // *     example 1: $array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"};
  // *     example 1: $array1 = natsort($array1);
  // *     returns 1: {d: 'img1.png', c: 'img2.png', b: 'img10.png', a: 'img12.png'}
  var valArr = [],
    k, i, ret, that = this,
    strictForIn = false,
    populateArr = {};

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return that.strnatcmp(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0; i < valArr.length; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return strictForIn || populateArr;
}
function next (arr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to store the array pointer
  // *     example 1: transport = ['foot', 'bike', 'car', 'plane'];
  // *     example 1: next(transport);
  // *     example 1: next(transport);
  // *     returns 1: 'car'
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.pointers = this.php_js.pointers || [];
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  // END REDUNDANT
  var pointers = this.php_js.pointers;
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor + 1) {
        pointers[arrpos + 1] += 1;
        return arr[k];
      }
      ct++;
    }
    return false; // End
  }
  if (arr.length === 0 || cursor === (arr.length - 1)) {
    return false;
  }
  pointers[arrpos + 1] += 1;
  return arr[pointers[arrpos + 1]];
}
function pos (arr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to store the array pointer
  // -    depends on: current
  // *     example 1: transport = ['foot', 'bike', 'car', 'plane'];
  // *     example 1: pos(transport);
  // *     returns 1: 'foot'
  return this.current(arr);
}
function prev (arr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to store the array pointer
  // *     example 1: transport = ['foot', 'bike', 'car', 'plane'];
  // *     example 1: prev(transport);
  // *     returns 1: false
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.pointers = this.php_js.pointers || [];
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  // END REDUNDANT
  var pointers = this.php_js.pointers;
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  if (pointers.indexOf(arr) === -1 || cursor === 0) {
    return false;
  }
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor - 1) {
        pointers[arrpos + 1] -= 1;
        return arr[k];
      }
      ct++;
    }
    // Shouldn't reach here
  }
  if (arr.length === 0) {
    return false;
  }
  pointers[arrpos + 1] -= 1;
  return arr[pointers[arrpos + 1]];
}
function range (low, high, step) {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // *     example 1: range ( 0, 12 );
  // *     returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  // *     example 2: range( 0, 100, 10 );
  // *     returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  // *     example 3: range( 'a', 'i' );
  // *     returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  // *     example 4: range( 'c', 'a' );
  // *     returns 4: ['c', 'b', 'a']
  var matrix = [];
  var inival, endval, plus;
  var walker = step || 1;
  var chars = false;

  if (!isNaN(low) && !isNaN(high)) {
    inival = low;
    endval = high;
  } else if (isNaN(low) && isNaN(high)) {
    chars = true;
    inival = low.charCodeAt(0);
    endval = high.charCodeAt(0);
  } else {
    inival = (isNaN(low) ? 0 : low);
    endval = (isNaN(high) ? 0 : high);
  }

  plus = ((inival > endval) ? false : true);
  if (plus) {
    while (inival <= endval) {
      matrix.push(((chars) ? String.fromCharCode(inival) : inival));
      inival += walker;
    }
  } else {
    while (inival >= endval) {
      matrix.push(((chars) ? String.fromCharCode(inival) : inival));
      inival -= walker;
    }
  }

  return matrix;
}
function reset (arr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Legaev Andrey
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to store the array pointer
  // *     example 1: reset({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
  // *     returns 1: 'Kevin'
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.pointers = this.php_js.pointers || [];
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  // END REDUNDANT
  var pointers = this.php_js.pointers;
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    for (var k in arr) {
      if (pointers.indexOf(arr) === -1) {
        pointers.push(arr, 0);
      } else {
        pointers[arrpos + 1] = 0;
      }
      return arr[k];
    }
    return false; // Empty
  }
  if (arr.length === 0) {
    return false;
  }
  pointers[arrpos + 1] = 0;
  return arr[pointers[arrpos + 1]];
}
function rsort (inputArr, sort_flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  // %        note 1: integrated into all of these functions by adapting the code at
  // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  // %        note 2: This function deviates from PHP in returning a copy of the array instead
  // %        note 2: of acting by reference and returning true; this was necessary because
  // %        note 2: IE does not allow deleting and re-adding of properties without caching
  // %        note 2: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 2: get the PHP behavior, but use this only if you are in an environment
  // %        note 2: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 2: property deletion is supported. Note that we intend to implement the PHP
  // %        note 2: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 2: is by reference in PHP anyways
  // %        note 3: Since JS objects' keys are always strings, and (the
  // %        note 3: default) SORT_REGULAR flag distinguishes by key type,
  // %        note 3: if the content is a numeric string, we treat the
  // %        note 3: "original type" as numeric.
  // -    depends on: i18n_loc_get_default
  // *     example 1: rsort(['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: ['van', 'Zonneveld', 'Kevin']
  // *     example 2: ini_set('phpjs.strictForIn', true);
  // *     example 2: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 2: rsort(fruits);
  // *     results 2: fruits == {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}
  // *     returns 2: true
  var valArr = [],
    k = '',
    i = 0,
    sorter = false,
    that = this,
    strictForIn = false,
    populateArr = [];

  switch (sort_flags) {
  case 'SORT_STRING':
    // compare items as strings
    sorter = function (a, b) {
      return that.strnatcmp(b, a);
    };
    break;
  case 'SORT_LOCALE_STRING':
    // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
    var loc = this.i18n_loc_get_default();
    sorter = this.php_js.i18nLocales[loc].sorting;
    break;
  case 'SORT_NUMERIC':
    // compare items numerically
    sorter = function (a, b) {
      return (b - a);
    };
    break;
  case 'SORT_REGULAR':
    // compare items normally (don't change types)
  default:
    sorter = function (b, a) {
      var aFloat = parseFloat(a),
        bFloat = parseFloat(b),
        aNumeric = aFloat + '' === a,
        bNumeric = bFloat + '' === b;
      if (aNumeric && bNumeric) {
        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
      } else if (aNumeric && !bNumeric) {
        return 1;
      } else if (!aNumeric && bNumeric) {
        return -1;
      }
      return a > b ? 1 : a < b ? -1 : 0;
    };
    break;
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  for (k in inputArr) { // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }

  valArr.sort(sorter);

  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
    populateArr[i] = valArr[i];
  }
  return strictForIn || populateArr;
}
function shuffle (inputArr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: This function deviates from PHP in returning a copy of the array instead
  // %        note 1: of acting by reference and returning true; this was necessary because
  // %        note 1: IE does not allow deleting and re-adding of properties without caching
  // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 1: get the PHP behavior, but use this only if you are in an environment
  // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 1: property deletion is supported. Note that we intend to implement the PHP
  // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 1: is by reference in PHP anyways
  // *     example 1: ini_set('phpjs.strictForIn', true);
  // *     example 1: shuffle({5:'a', 2:'3', 3:'c', 4:5, 'q':5});
  // *     returns 1: {5:'a', 4:5, 'q':5, 3:'c', 2:'3'}
  // *     example 2: ini_set('phpjs.strictForIn', true);
  // *     example 2: var data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5};
  // *     example 2: shuffle(data);
  // *     results 2: {5:'a', 'q':5, 3:'c', 2:'3', 4:5}
  // *     returns 2: true
  var valArr = [],
    k = '',
    i = 0,
    strictForIn = false,
    populateArr = [];

  for (k in inputArr) { // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function () {
    return 0.5 - Math.random();
  });

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
    populateArr[i] = valArr[i];
  }

  return strictForIn || populateArr;
}
function sizeof (mixed_var, mode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // -    depends on: count
  // *     example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE');
  // *     returns 1: 6
  // *     example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
  // *     returns 2: 6
  return this.count(mixed_var, mode);
}
function sort (inputArr, sort_flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  // %        note 1: integrated into all of these functions by adapting the code at
  // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  // %        note 2: This function deviates from PHP in returning a copy of the array instead
  // %        note 2: of acting by reference and returning true; this was necessary because
  // %        note 2: IE does not allow deleting and re-adding of properties without caching
  // %        note 2: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 2: get the PHP behavior, but use this only if you are in an environment
  // %        note 2: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 2: property deletion is supported. Note that we intend to implement the PHP
  // %        note 2: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 2: is by reference in PHP anyways
  // %        note 3: Since JS objects' keys are always strings, and (the
  // %        note 3: default) SORT_REGULAR flag distinguishes by key type,
  // %        note 3: if the content is a numeric string, we treat the
  // %        note 3: "original type" as numeric.
  // -    depends on: i18n_loc_get_default
  // *     example 1: sort(['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: ['Kevin', 'Zonneveld', 'van']
  // *     example 2: ini_set('phpjs.strictForIn', true);
  // *     example 2: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 2: sort(fruits);
  // *     results 2: fruits == {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
  // *     returns 2: true
  var valArr = [],
    keyArr = [],
    k = '',
    i = 0,
    sorter = false,
    that = this,
    strictForIn = false,
    populateArr = [];

  switch (sort_flags) {
  case 'SORT_STRING':
    // compare items as strings
    sorter = function (a, b) {
      return that.strnatcmp(a, b);
    };
    break;
  case 'SORT_LOCALE_STRING':
    // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
    var loc = this.i18n_loc_get_default();
    sorter = this.php_js.i18nLocales[loc].sorting;
    break;
  case 'SORT_NUMERIC':
    // compare items numerically
    sorter = function (a, b) {
      return (a - b);
    };
    break;
  case 'SORT_REGULAR':
    // compare items normally (don't change types)
  default:
    sorter = function (a, b) {
      var aFloat = parseFloat(a),
        bFloat = parseFloat(b),
        aNumeric = aFloat + '' === a,
        bNumeric = bFloat + '' === b;
      if (aNumeric && bNumeric) {
        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
      } else if (aNumeric && !bNumeric) {
        return 1;
      } else if (!aNumeric && bNumeric) {
        return -1;
      }
      return a > b ? 1 : a < b ? -1 : 0;
    };
    break;
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  for (k in inputArr) { // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }

  valArr.sort(sorter);

  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
    populateArr[i] = valArr[i];
  }
  return strictForIn || populateArr;
}
function uasort (inputArr, sorter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // %        note 1: This function deviates from PHP in returning a copy of the array instead
  // %        note 1: of acting by reference and returning true; this was necessary because
  // %        note 1: IE does not allow deleting and re-adding of properties without caching
  // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 1: get the PHP behavior, but use this only if you are in an environment
  // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 1: property deletion is supported. Note that we intend to implement the PHP
  // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 1: is by reference in PHP anyways
  // *     example 1: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 1: fruits = uasort(fruits, function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;});
  // *     results 1: fruits == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
  var valArr = [],
    tempKeyVal, tempValue, ret, k = '',
    i = 0,
    strictForIn = false,
    populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this[sorter];
  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
    sorter = this[sorter[0]][sorter[1]];
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;


  for (k in inputArr) { // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return sorter(a[1], b[1]);
  });

  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return strictForIn || populateArr;
}
function uksort (inputArr, sorter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: The examples are correct, this is a new way
  // %        note 2: This function deviates from PHP in returning a copy of the array instead
  // %        note 2: of acting by reference and returning true; this was necessary because
  // %        note 2: IE does not allow deleting and re-adding of properties without caching
  // %        note 2: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 2: get the PHP behavior, but use this only if you are in an environment
  // %        note 2: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 2: property deletion is supported. Note that we intend to implement the PHP
  // %        note 2: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 2: is by reference in PHP anyways
  // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 1: data = uksort(data, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
  // *     results 1: data == {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
  // *     returns 1: true
  var tmp_arr = {},
    keys = [],
    i = 0,
    k = '',
    strictForIn = false,
    populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this.window[sorter];
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }

  // Sort key names
  try {
    if (sorter) {
      keys.sort(sorter);
    } else {
      keys.sort();
    }
  } catch (e) {
    return false;
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;


  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmp_arr[k] = inputArr[k];
    if (strictForIn) {
      delete inputArr[k];
    }
  }
  for (i in tmp_arr) {
    if (tmp_arr.hasOwnProperty(i)) {
      populateArr[i] = tmp_arr[i];
    }
  }
  return strictForIn || populateArr;
}
function usort (inputArr, sorter) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: This function deviates from PHP in returning a copy of the array instead
  // %        note 1: of acting by reference and returning true; this was necessary because
  // %        note 1: IE does not allow deleting and re-adding of properties without caching
  // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 1: get the PHP behavior, but use this only if you are in an environment
  // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 1: property deletion is supported. Note that we intend to implement the PHP
  // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 1: is by reference in PHP anyways
  // *     example 1: stuff = {d: '3', a: '1', b: '11', c: '4'};
  // *     example 1: stuff = usort(stuff, function (a, b) {return(a-b);});
  // *     results 1: stuff = {0: '1', 1: '3', 2: '4', 3: '11'};
  var valArr = [],
    k = '',
    i = 0,
    strictForIn = false,
    populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this[sorter];
  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
    sorter = this[sorter[0]][sorter[1]];
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;


  for (k in inputArr) { // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  try {
    valArr.sort(sorter);
  } catch (e) {
    return false;
  }
  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
    populateArr[i] = valArr[i];
  }

  return strictForIn || populateArr;
}
function bcadd (left_operand, right_operand, scale) {
  // http://kevin.vanzonneveld.net
  // +   original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  // -    depends on: _phpjs_shared_bc
  // *     example 1: bcadd(1, 2);
  // *     returns 1: 3
  //  @todo: implement these testcases
  //        bcscale(0);
  //
  //        bcmath.test.result('bcadd', 1, '3', bcadd("1", "2"));
  //        bcmath.test.result('bcadd', 2, '4.0000', bcadd("-1", "5", 4));
  //        bcmath.test.result('bcadd', 3, '8728932003911564969352217864684.00', bcadd("1928372132132819737213", "8728932001983192837219398127471", 2));
  //        bcmath.test.result('bcadd', 4, '3.357000', bcadd('1.123', '2.234', 6));
  var libbcmath = this._phpjs_shared_bc();

  var first, second, result;

  if (typeof(scale) == 'undefined') {
    scale = libbcmath.scale;
  }
  scale = ((scale < 0) ? 0 : scale);

  // create objects
  first = libbcmath.bc_init_num();
  second = libbcmath.bc_init_num();
  result = libbcmath.bc_init_num();

  first = libbcmath.php_str2num(left_operand.toString());
  second = libbcmath.php_str2num(right_operand.toString());


  result = libbcmath.bc_add(first, second, scale);

  if (result.n_scale > scale) {
    result.n_scale = scale;
  }

  return result.toString();
}
function bccomp (left_operand, right_operand, scale) {
  // http://kevin.vanzonneveld.net
  // +   original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  // -    depends on: _phpjs_shared_bc
  // *     example 1: bccomp(1, 2);
  // *     returns 1: 3
  //  @todo: implement these testcases
  //        bcscale(0);
  //
  //        bcmath.test.result('bccomp', 1, -1, bccomp('-1','5', 4));
  //        bcmath.test.result('bccomp', 2, -1, bccomp('1928372132132819737213', '8728932001983192837219398127471'));
  //        bcmath.test.result('bccomp', 3,  0, bccomp('1.00000000000000000001', '1', 2));
  //        bcmath.test.result('bccomp', 4,  1, bccomp('97321', '2321'));
  var libbcmath = this._phpjs_shared_bc();

  var first, second; //bc_num
  if (typeof(scale) == 'undefined') {
    scale = libbcmath.scale;
  }
  scale = ((scale < 0) ? 0 : scale);

  first = libbcmath.bc_init_num();
  second = libbcmath.bc_init_num();

  first = libbcmath.bc_str2num(left_operand.toString(), scale); // note bc_ not php_str2num
  second = libbcmath.bc_str2num(right_operand.toString(), scale); // note bc_ not php_str2num
  return libbcmath.bc_compare(first, second, scale);
}
function bcdiv (left_operand, right_operand, scale) {
  // http://kevin.vanzonneveld.net
  // +   original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  // -    depends on: _phpjs_shared_bc
  // *     example 1: bcdiv(1, 2);
  // *     returns 1: 3
  //  @todo: implement these testcases
  //        bcscale(0);
  //
  //        bcmath.test.result('bcdiv', 1, '0', bcdiv("1", "2"));
  //        bcmath.test.result('bcdiv', 2, '0.50', bcdiv("1", "2", 2));
  //        bcmath.test.result('bcdiv', 3, '-0.2000', bcdiv("-1", "5", 4));
  //        bcmath.test.result('bcdiv', 4, '3333.3333', bcdiv("10000.0000", "3", 4));
  //        bcmath.test.result('bcdiv', 5, '2387.8877', bcdiv("5573.33", "2.334", 4));
  //        bcmath.test.result('bcdiv', 7, '1.00', bcdiv('6.00', '6.00', 2));
  //        bcmath.test.result('bcdiv', 8, '1.00', bcdiv('2.00', '2.00', 2));
  //        bcmath.test.result('bcdiv', 9, '59.51111111', bcdiv('66.95', '1.125', 8));
  //        bcmath.test.result('bcdiv', 10, '4526580661.75', bcdiv('8728932001983192837219398127471.00', '1928372132132819737213.00', 2));
  var libbcmath = this._phpjs_shared_bc();

  var first, second, result;

  if (typeof(scale) == 'undefined') {
    scale = libbcmath.scale;
  }
  scale = ((scale < 0) ? 0 : scale);

  // create objects
  first = libbcmath.bc_init_num();
  second = libbcmath.bc_init_num();
  result = libbcmath.bc_init_num();

  first = libbcmath.php_str2num(left_operand.toString());
  second = libbcmath.php_str2num(right_operand.toString());

  result = libbcmath.bc_divide(first, second, scale);
  if (result === -1) {
    // error
    throw new Error(11, "(BC) Division by zero");
  }
  if (result.n_scale > scale) {
    result.n_scale = scale;
  }
  return result.toString();
}
function bcmul (left_operand, right_operand, scale) {
  // http://kevin.vanzonneveld.net
  // +   original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  // -    depends on: _phpjs_shared_bc
  // *     example 1: bcmul(1, 2);
  // *     returns 1: 3
  //  @todo: implement these testcases
  //        bcscale(0);
  //
  //        bcmath.test.result('bcmul', 1, '2', bcmul("1", "2"));
  //        bcmath.test.result('bcmul', 2, '-15', bcmul("-3", "5"));
  //        bcmath.test.result('bcmul', 3, '12193263111263526900', bcmul("1234567890", "9876543210"));
  //        bcmath.test.result('bcmul', 4, '3.75', bcmul("2.5", "1.5", 2));
  //        bcmath.test.result('bcmul', 5, '13008.1522', bcmul("5573.33", "2.334", 4));
  var libbcmath = this._phpjs_shared_bc();

  var first, second, result;

  if (typeof(scale) == 'undefined') {
    scale = libbcmath.scale;
  }
  scale = ((scale < 0) ? 0 : scale);

  // create objects
  first = libbcmath.bc_init_num();
  second = libbcmath.bc_init_num();
  result = libbcmath.bc_init_num();

  first = libbcmath.php_str2num(left_operand.toString());
  second = libbcmath.php_str2num(right_operand.toString());

  result = libbcmath.bc_multiply(first, second, scale);

  if (result.n_scale > scale) {
    result.n_scale = scale;
  }
  return result.toString();
}
function bcround (val, precision) {
  // http://kevin.vanzonneveld.net
  // +   original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  // -    depends on: _phpjs_shared_bc
  // *     example 1: bcround(1, 2);
  // *     returns 1: 3
  //  @todo: implement these testcases
  //        bcscale(0);
  //
  //        bcmath.test.result('bcround', 1, '-2', bcround('-1.5', 0));
  //        bcmath.test.result('bcround', 2, '-1.1235', bcround('-1.1234567', 4));
  //        bcmath.test.result('bcround', 3, '2', bcround('1.5', 0));
  //        bcmath.test.result('bcround', 4, '1.1235', bcround('1.1234567', 4));
  //        bcmath.test.result('bcround', 5, '1', bcround('1.499999999', 0));
  //        bcmath.test.result('bcround', 6, '2', bcround('1.5555555555555555555', 0));
  //        bcmath.test.result('bcround', 7, '1.44', bcround('1.444999', 2));
  //        bcmath.test.result('bcround', 8, '-1.44', bcround('-1.444999', 2));
  var libbcmath = this._phpjs_shared_bc();

  var temp, result, digit;
  var right_operand;

  // create number
  temp = libbcmath.bc_init_num();
  temp = libbcmath.php_str2num(val.toString());

  // check if any rounding needs
  if (precision >= temp.n_scale) {
    // nothing to round, just add the zeros.
    while (temp.n_scale < precision) {
      temp.n_value[temp.n_len + temp.n_scale] = 0;
      temp.n_scale++;
    }
    return temp.toString();
  }

  // get the digit we are checking (1 after the precision)
  // loop through digits after the precision marker
  digit = temp.n_value[temp.n_len + precision];

  right_operand = libbcmath.bc_init_num();
  right_operand = libbcmath.bc_new_num(1, precision);

  if (digit >= 5) {
    //round away from zero by adding 1 (or -1) at the "precision".. ie 1.44999 @ 3dp = (1.44999 + 0.001).toString().substr(0,5)
    right_operand.n_value[right_operand.n_len + right_operand.n_scale - 1] = 1;
    if (temp.n_sign == libbcmath.MINUS) {
      // round down
      right_operand.n_sign = libbcmath.MINUS;
    }
    result = libbcmath.bc_add(temp, right_operand, precision);
  } else {
    // leave-as-is.. just truncate it.
    result = temp;
  }

  if (result.n_scale > precision) {
    result.n_scale = precision;
  }
  return result.toString();
}
function bcscale (scale) {
  // http://kevin.vanzonneveld.net
  // +   original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)this.
  // -    depends on: _phpjs_shared_bc
  // *     example 1: bcscale(1);
  // *     returns 1: 3
  //  @todo: implement these testcases
  //        bcscale(0);
  //
  //        bcmath.test.result('bcscale', 1, false, bcscale('fail'));
  //        bcmath.test.result('bcscale', 2, false, bcscale(-1));
  //        bcmath.test.result('bcscale', 3, true, bcscale(5));
  //        bcmath.test.result('bcscale', 4, true, bcscale(0));
  var libbcmath = this._phpjs_shared_bc();

  scale = parseInt(scale, 10);
  if (isNaN(scale)) {
    return false;
  }
  if (scale < 0) {
    return false;
  }
  libbcmath.scale = scale;
  return true;
}
function bcsub (left_operand, right_operand, scale) {
  // http://kevin.vanzonneveld.net
  // +   original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  // -    depends on: _phpjs_shared_bc
  // *     example 1: bcsub(1, 2);
  // *     returns 1: -1
  //  @todo: implement these testcases
  //        // set scale to zero
  //        bcscale(0);
  //
  //        bcmath.test.result('bcsub', 1, '-1', bcsub('1','2'));
  //        bcmath.test.result('bcsub', 2, '-6.0000', bcsub('-1','5', 4));
  //        bcmath.test.result('bcsub', 3, '8728932000054820705086578390258.00', bcsub('8728932001983192837219398127471','1928372132132819737213', 2));
  //        bcmath.test.result('bcsub', 4, '-1.111000', bcsub('1.123', '2.234', 6));
  //        bcmath.test.result('bcsub', 5, '-2.20', bcsub('1.123456', '3.333333', 2)); //-2.209877 note: rounding not applicable as bcmath truncates.
  var libbcmath = this._phpjs_shared_bc();

  var first, second, result;

  if (typeof(scale) == 'undefined') {
    scale = libbcmath.scale;
  }
  scale = ((scale < 0) ? 0 : scale);

  // create objects
  first = libbcmath.bc_init_num();
  second = libbcmath.bc_init_num();
  result = libbcmath.bc_init_num();

  first = libbcmath.php_str2num(left_operand.toString());
  second = libbcmath.php_str2num(right_operand.toString());

  result = libbcmath.bc_sub(first, second, scale);

  if (result.n_scale > scale) {
    result.n_scale = scale;
  }

  return result.toString();

}
function classkit_import (file) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: file_get_contents
  // %        note 1: does not return an associative array as in PHP
  // %        note 2: Implement instead with include?
  // %        note 3: CLASSKIT_AGGREGATE_OVERRIDE is mentioned as a flag at http://www.php.net/manual/en/runkit.constants.php but not in classkit docs
  // *     example 1: classkit_import('http://example.com/somefile.js');
  // *     returns 1: undefined

  eval(this.file_get_contents(file));
}
function classkit_method_add (classname, methodname, args, code, flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: function a(){}
  // *     example 1: classkit_method_add ('a', 'b', 'a,b', 'return a+b');
  // *     returns 1: true

  var func, argmnts = [];

  switch (flags) {
  case 'CLASSKIT_ACC_PROTECTED':
    throw 'Protected not supported';
  case 'CLASSKIT_ACC_PRIVATE':
    throw 'Private not supported';
  case 'CLASSKIT_ACC_PUBLIC':
  default:
    break;
  }

  argmnts = args.split(/,\s*/);

  if (typeof classname === 'string') {
    classname = this.window[classname];
  }

  // Could use the following to add as a static method to the class
  //        func = Function.apply(null, argmnts.concat(code));
  //            classname[methodname] = func;
  func = Function.apply(null, argmnts.concat(code));
  classname.prototype[methodname] = func;
  return true;
}
function classkit_method_copy (dClass, dMethod, sClass, sMethod) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: classkit_method_copy('newClass', 'newMethod', 'someClass', 'someMethod');
  // *     returns 1: true

/*
  function A(){}
  function C(){}
  C.d = function () {alert('inside d');}
  classkit_method_copy('A', 'b', 'C', 'd');
  A.b(); // 'inside d'
  */
  sMethod = sMethod || dMethod;

  if (typeof dClass === 'string') {
    dClass = this.window[dClass];
  }
  if (typeof sClass === 'string') {
    sClass = this.window[sClass];
  }

  //dClass[dMethod] = sClass[sMethod]; // Copy from static to static method (as per PHP example)
  dClass.prototype[dMethod] = sClass.prototype[sMethod]; // To copy from instance to instance
  return true;
}
function classkit_method_redefine (classname, methodname, args, code, flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: classkit_method_redefine('someClass', 'someMethod', 'a,b', 'return a+b');
  // *     returns 1: true

  // In JavaScript, this is identical to classkit_method_add

  var argmnts = [],
    func;

  switch (flags) {
  case 'CLASSKIT_ACC_PROTECTED':
    throw 'Protected not supported';
  case 'CLASSKIT_ACC_PRIVATE':
    throw 'Private not supported';
  case 'CLASSKIT_ACC_PUBLIC':
  default:
    break;
  }

  argmnts = args.split(/,\s*/);

  if (typeof classname === 'string') {
    classname = this.window[classname];
  }

  // Could use the following to add as a static method to the class
  //        func = Function.apply(null, argmnts.concat(code));
  //            classname[methodname] = func;
  func = Function.apply(null, argmnts.concat(code));
  classname.prototype[methodname] = func;
  return true;
}
function classkit_method_remove (classname, methodname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: classkit_method_remove('someClass', 'someMethod');
  // *     returns 1: true

  if (typeof classname === 'string') {
    classname = this.window[classname];
  }
  delete classname.prototype[methodname]; // Delete any on prototype
  // delete classname[methodname]; // Delete any as static class method
  return true;
}
function classkit_method_rename (classname, methodname, newname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: classkit_method_rename('someClass', 'someMethod', 'newMethod');
  // *     returns 1: true

  if (typeof classname === 'string') {
    classname = this.window[classname];
  }

/*
  var method = classname[methodname]; // Static
  classname[newname] = method;
  delete classname[methodname];
  */

  var method = classname.prototype[methodname];
  classname.prototype[newname] = method;
  delete classname.prototype[methodname];

  return true;
}
function class_alias (clss, alias, autoload) {
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: This function is not documented and only available in PHP source
  // *     example 1: function someFunc () {}
  // *     example 1: class_alias('someFunc', 'olFunc');
  // *     returns 1: true

  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (autoload && typeof this.window.__autoload === 'function') {
    this.window.__autoload(clss);
  }
  if (typeof clss === 'string') {
    clss = this.window[clss];
  }
  if (typeof clss === 'undefined') {
    throw "Class '" + getFuncName(clss) + "' not found";
    return false; // Return false until replace throw with error triggering
  }
  if (typeof clss !== 'function') {
    throw 'First argument of class_alias() must be a name of user defined class';
    return false;
  }
  if (typeof this.window[alias] === 'function') {
    throw 'Cannot redeclare class ' + alias;
    return false;
  }

  this.window[alias] = clss;
  return true;
}
function class_exists (cls) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: function class_a() {this.meth1 = function () {return true;}};
  // *     example 1: var instance_a = new class_a();
  // *     example 1: class_exists('class_a');
  // *     returns 1: true
  var i = '';
  cls = this.window[cls]; // Note: will prevent inner classes
  if (typeof cls !== 'function') {
    return false;
  }

  for (i in cls.prototype) {
    return true;
  }
  for (i in cls) { // If static members exist, then consider a "class"
    if (i !== 'prototype') {
      return true;
    }
  }
  if (cls.toSource && cls.toSource().match(/this\./)) {
    // Hackish and non-standard but can probably detect if setting
    // a property (we don't want to test by instantiating as that
    // may have side-effects)
    return true;
  }

  return false;
}
function get_class (obj) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ates Goral (http://magnetiq.com)
  // +   improved by: David James
  // +   improved by: David Neilsen
  // *     example 1: get_class(new (function MyClass() {}));
  // *     returns 1: "MyClass"
  // *     example 2: get_class({});
  // *     returns 2: "Object"
  // *     example 3: get_class([]);
  // *     returns 3: false
  // *     example 4: get_class(42);
  // *     returns 4: false
  // *     example 5: get_class(window);
  // *     returns 5: false
  // *     example 6: get_class(function MyFunction() {});
  // *     returns 6: false
  if (obj && typeof obj === 'object' &&
      Object.prototype.toString.call(obj) !== '[object Array]' &&
      obj.constructor && obj !== this.window) {
    var arr = obj.constructor.toString().match(/function\s*(\w+)/);

    if (arr && arr.length === 2) {
      return arr[1];
    }
  }

  return false;
}
function get_class_methods (name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: function Myclass () {this.privMethod = function (){}}
  // *     example 1: Myclass.classMethod = function () {}
  // *     example 1: Myclass.prototype.myfunc1 = function () {return(true);};
  // *     example 1: Myclass.prototype.myfunc2 = function () {return(true);}
  // *     example 1: get_class_methods('MyClass')
  // *     returns 1: {}
  var constructor, retArr = {},
    method = '';

  if (typeof name === 'function') {
    constructor = name;
  } else if (typeof name === 'string') {
    constructor = this.window[name];
  } else if (typeof name === 'object') {
    constructor = name;
    for (method in constructor.constructor) { // Get class methods of object's constructor
      if (typeof constructor.constructor[method] === 'function') {
        retArr[method] = constructor.constructor[method];
      }
    }
    // return retArr; // Uncomment to behave as "class" is usually defined in JavaScript convention (and see comment below)
  }
  for (method in constructor) {
    if (typeof constructor[method] === 'function') {
      retArr[method] = constructor[method];
    }
  }
  // Comment out this block to behave as "class" is usually defined in JavaScript convention (and see comment above)
  for (method in constructor.prototype) {
    if (typeof constructor.prototype[method] === 'function') {
      retArr[method] = constructor.prototype[method];
    }
  }

  return retArr;
}
function get_class_vars (name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: function Myclass(){privMethod = function (){};}
  // *     example 1: Myclass.classMethod = function () {}
  // *     example 1: Myclass.prototype.myfunc1 = function () {return(true);};
  // *     example 1: Myclass.prototype.myfunc2 = function () {return(true);}
  // *     example 1: get_class_vars('MyClass')
  // *     returns 1: {}

  var constructor, retArr = {},
    prop = '';

  if (typeof name === 'function') {
    constructor = name;
  } else if (typeof name === 'string') {
    constructor = this.window[name];
  }

  for (prop in constructor) {
    if (typeof constructor[prop] !== 'function' && prop !== 'prototype') {
      retArr[prop] = constructor[prop];
    }
  }
  // Comment out this block to behave as "class" is usually defined in JavaScript convention
  if (constructor.prototype) {
    for (prop in constructor.prototype) {
      if (typeof constructor.prototype[prop] !== 'function') {
        retArr[prop] = constructor.prototype[prop];
      }
    }
  }

  return retArr;
}
function get_declared_classes () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +    depends on: class_exists
  // *     example 1: function A (z) {this.z=z} // Assign 'this' in constructor, making it class-like
  // *     example 1: function B () {}
  // *     example 1: B.c = function () {}; // Add a static method, making it class-like
  // *     example 1: function C () {}
  // *     example 1: C.prototype.z = function () {}; // Add to prototype, making it behave as a "class"
  // *     example 1: get_declared_classes()
  // *     returns 1: [C, B, A]

  var i = '',
    j = '',
    arr = [],
    already = {};

  for (i in this.window) {
    try {
      if (typeof this.window[i] === 'function') {
        if (!already[i] && this.class_exists(i)) {
          already[i] = 1;
          arr.push(i);
        }
      } else if (typeof this.window[i] === 'object') {
        for (j in this.window[i]) {
          if (typeof this.window[j] === 'function' && this.window[j] && !already[j] && this.class_exists(j)) {
            already[j] = 1;
            arr.push(j);
          }
        }
      }
    } catch (e) {

    }
  }

  return arr;
}
function get_object_vars (obj) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: function Myclass () {this.privMethod = function (){}}
  // *     example 1: Myclass.classMethod = function () {}
  // *     example 1: Myclass.prototype.myfunc1 = function () {return(true);};
  // *     example 1: Myclass.prototype.myfunc2 = function () {return(true);}
  // *     example 1: get_object_vars('MyClass')
  // *     returns 1: {}
  var retArr = {},
    prop = '';

  for (prop in obj) {
    if (typeof obj[prop] !== 'function' && prop !== 'prototype') {
      retArr[prop] = obj[prop];
    }
  }
  for (prop in obj.prototype) {
    if (typeof obj.prototype[prop] !== 'function') {
      retArr[prop] = obj.prototype[prop];
    }
  }

  return retArr;
}
function method_exists (obj, method) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: function class_a() {this.meth1 = function () {return true;}};
  // *     example 1: var instance_a = new class_a();
  // *     example 1: method_exists(instance_a, 'meth1');
  // *     returns 1: true
  // *     example 2: function class_a() {this.meth1 = function () {return true;}};
  // *     example 2: var instance_a = new class_a();
  // *     example 2: method_exists(instance_a, 'meth2');
  // *     returns 2: false
  if (typeof obj === 'string') {
    return this.window[obj] && typeof this.window[obj][method] === 'function';
  }

  return typeof obj[method] === 'function';
}
function property_exists (cls, prop) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: function class_a () {this.prop1 = 'one'};
  // *     example 1: var instance_a = new class_a();
  // *     example 1: property_exists(instance_a, 'prop1');
  // *     returns 1: true
  // *     example 2: function class_a () {this.prop1 = 'one'};
  // *     example 2: var instance_a = new class_a();
  // *     example 2: property_exists(instance_a, 'prop2');
  // *     returns 2: false
  cls = (typeof cls === 'string') ? this.window[cls] : cls;

  if (typeof cls === 'function' && cls.toSource && cls.toSource().match(new RegExp('this\\.' + prop + '\\s'))) {
    // Hackish and non-standard but can probably detect if setting
    // the property (we don't want to test by instantiating as that
    // may have side-effects)
    return true;
  }

  return (cls[prop] !== undefined && typeof cls[prop] !== 'function') || (cls.prototype !== undefined && cls.prototype[prop] !== undefined && typeof cls.prototype[prop] !== 'function') || (cls.constructor && cls.constructor[prop] !== undefined && typeof cls.constructor[prop] !== 'function');
}
function ctype_alnum (text) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: ctype_alnum('AbC12');
  // *     returns 1: true
  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.an) !== -1;
}
function ctype_alpha (text) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: ctype_alpha('Az');
  // *     returns 1: true
  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.al) !== -1;
}
function ctype_cntrl (text) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: ctype_cntrl('\u0020');
  // *     returns 1: true
  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.ct) !== -1;
}
function ctype_digit (text) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: ctype_digit('150');
  // *     returns 1: true
  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.dg) !== -1;
}
function ctype_graph (text) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: ctype_graph('!%');
  // *     returns 1: true
  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.gr) !== -1;
}
function ctype_lower (text) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: ctype_lower('abc');
  // *     returns 1: true
  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.lw) !== -1;
}
function ctype_print (text) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: ctype_print('AbC!#12');
  // *     returns 1: true
  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.pr) !== -1;
}
function ctype_punct (text) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: ctype_punct('!?');
  // *     returns 1: true
  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.pu) !== -1;
}
function ctype_space (text) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: ctype_space('\t\n');
  // *     returns 1: true
  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.sp) !== -1;
}
function ctype_upper (text) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: ctype_upper('AZ');
  // *     returns 1: true
  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.up) !== -1;
}
function ctype_xdigit (text) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: ctype_xdigit('01dF');
  // *     returns 1: true
  if (typeof text !== 'string') {
    return false;
  }
  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.xd) !== -1;
}
function checkdate (m, d, y) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Pyerre
  // +   improved by: Theriault
  // *     example 1: checkdate(12, 31, 2000);
  // *     returns 1: true
  // *     example 2: checkdate(2, 29, 2001);
  // *     returns 2: false
  // *     example 3: checkdate(3, 31, 2008);
  // *     returns 3: true
  // *     example 4: checkdate(1, 390, 2000);
  // *     returns 4: false
  return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}
function date (format, timestamp) {
  // http://kevin.vanzonneveld.net
  // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: MeEtc (http://yass.meetcweb.com)
  // +   improved by: Brad Touesnard
  // +   improved by: Tim Wiel
  // +   improved by: Bryan Elliott
  //
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: David Randall
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +  derived from: gettimeofday
  // +      input by: majak
  // +   bugfixed by: majak
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Alex
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +   improved by: Thomas Beaucourt (http://www.webapp.fr)
  // +   improved by: JT
  // +   improved by: Theriault
  // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // +   bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
  // +      input by: Martin
  // +      input by: Alex Wilson
  // +   bugfixed by: Chris (http://www.devotis.nl/)
  // %        note 1: Uses global: php_js to store the default timezone
  // %        note 2: Although the function potentially allows timezone info (see notes), it currently does not set
  // %        note 2: per a timezone specified by date_default_timezone_set(). Implementers might use
  // %        note 2: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
  // %        note 2: in order to adjust the dates in this function (or our other date functions!) accordingly
  // *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
  // *     returns 1: '09:09:40 m is month'
  // *     example 2: date('F j, Y, g:i a', 1062462400);
  // *     returns 2: 'September 2, 2003, 2:26 am'
  // *     example 3: date('Y W o', 1062462400);
  // *     returns 3: '2003 36 2003'
  // *     example 4: x = date('Y m d', (new Date()).getTime()/1000);
  // *     example 4: (x+'').length == 10 // 2009 01 09
  // *     returns 4: true
  // *     example 5: date('W', 1104534000);
  // *     returns 5: '53'
  // *     example 6: date('B t', 1104534000);
  // *     returns 6: '999 31'
  // *     example 7: date('W U', 1293750000.82); // 2010-12-31
  // *     returns 7: '52 1293750000'
  // *     example 8: date('W', 1293836400); // 2011-01-01
  // *     returns 8: '52'
  // *     example 9: date('W Y-m-d', 1293974054); // 2011-01-02
  // *     returns 9: '52 2011-01-02'
    var that = this,
      jsdate,
      f,
      formatChr = /\\?([a-z])/gi,
      formatChrCb,
      // Keep this here (works, but for code commented-out
      // below for file size reasons)
      //, tal= [],
      _pad = function (n, c) {
        n = n.toString();
        return n.length < c ? _pad('0' + n, c, '0') : n;
      },
      txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  formatChrCb = function (t, s) {
    return f[t] ? f[t]() : s;
  };
  f = {
    // Day
    d: function () { // Day of month w/leading 0; 01..31
      return _pad(f.j(), 2);
    },
    D: function () { // Shorthand day name; Mon...Sun
      return f.l().slice(0, 3);
    },
    j: function () { // Day of month; 1..31
      return jsdate.getDate();
    },
    l: function () { // Full day name; Monday...Sunday
      return txt_words[f.w()] + 'day';
    },
    N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
      return f.w() || 7;
    },
    S: function(){ // Ordinal suffix for day of month; st, nd, rd, th
      var j = f.j()
      i = j%10;
      if (i <= 3 && parseInt((j%100)/10) == 1) i = 0;
      return ['st', 'nd', 'rd'][i - 1] || 'th';
    },
    w: function () { // Day of week; 0[Sun]..6[Sat]
      return jsdate.getDay();
    },
    z: function () { // Day of year; 0..365
      var a = new Date(f.Y(), f.n() - 1, f.j()),
        b = new Date(f.Y(), 0, 1);
      return Math.round((a - b) / 864e5);
    },

    // Week
    W: function () { // ISO-8601 week number
      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
        b = new Date(a.getFullYear(), 0, 4);
      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
    },

    // Month
    F: function () { // Full month name; January...December
      return txt_words[6 + f.n()];
    },
    m: function () { // Month w/leading 0; 01...12
      return _pad(f.n(), 2);
    },
    M: function () { // Shorthand month name; Jan...Dec
      return f.F().slice(0, 3);
    },
    n: function () { // Month; 1...12
      return jsdate.getMonth() + 1;
    },
    t: function () { // Days in month; 28...31
      return (new Date(f.Y(), f.n(), 0)).getDate();
    },

    // Year
    L: function () { // Is leap year?; 0 or 1
      var j = f.Y();
      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
    },
    o: function () { // ISO-8601 year
      var n = f.n(),
        W = f.W(),
        Y = f.Y();
      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
    },
    Y: function () { // Full year; e.g. 1980...2010
      return jsdate.getFullYear();
    },
    y: function () { // Last two digits of year; 00...99
      return f.Y().toString().slice(-2);
    },

    // Time
    a: function () { // am or pm
      return jsdate.getHours() > 11 ? "pm" : "am";
    },
    A: function () { // AM or PM
      return f.a().toUpperCase();
    },
    B: function () { // Swatch Internet time; 000..999
      var H = jsdate.getUTCHours() * 36e2,
        // Hours
        i = jsdate.getUTCMinutes() * 60,
        // Minutes
        s = jsdate.getUTCSeconds(); // Seconds
      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
    },
    g: function () { // 12-Hours; 1..12
      return f.G() % 12 || 12;
    },
    G: function () { // 24-Hours; 0..23
      return jsdate.getHours();
    },
    h: function () { // 12-Hours w/leading 0; 01..12
      return _pad(f.g(), 2);
    },
    H: function () { // 24-Hours w/leading 0; 00..23
      return _pad(f.G(), 2);
    },
    i: function () { // Minutes w/leading 0; 00..59
      return _pad(jsdate.getMinutes(), 2);
    },
    s: function () { // Seconds w/leading 0; 00..59
      return _pad(jsdate.getSeconds(), 2);
    },
    u: function () { // Microseconds; 000000-999000
      return _pad(jsdate.getMilliseconds() * 1000, 6);
    },

    // Timezone
    e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
      // The following works, but requires inclusion of the very large
      // timezone_abbreviations_list() function.
/*              return that.date_default_timezone_get();
*/
      throw 'Not supported (see source code of date() for timezone on how to add support)';
    },
    I: function () { // DST observed?; 0 or 1
      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
      // If they are not equal, then DST is observed.
      var a = new Date(f.Y(), 0),
        // Jan 1
        c = Date.UTC(f.Y(), 0),
        // Jan 1 UTC
        b = new Date(f.Y(), 6),
        // Jul 1
        d = Date.UTC(f.Y(), 6); // Jul 1 UTC
      return ((a - c) !== (b - d)) ? 1 : 0;
    },
    O: function () { // Difference to GMT in hour format; e.g. +0200
      var tzo = jsdate.getTimezoneOffset(),
        a = Math.abs(tzo);
      return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
    },
    P: function () { // Difference to GMT w/colon; e.g. +02:00
      var O = f.O();
      return (O.substr(0, 3) + ":" + O.substr(3, 2));
    },
    T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
      // The following works, but requires inclusion of the very
      // large timezone_abbreviations_list() function.
/*              var abbr = '', i = 0, os = 0, default = 0;
      if (!tal.length) {
        tal = that.timezone_abbreviations_list();
      }
      if (that.php_js && that.php_js.default_timezone) {
        default = that.php_js.default_timezone;
        for (abbr in tal) {
          for (i=0; i < tal[abbr].length; i++) {
            if (tal[abbr][i].timezone_id === default) {
              return abbr.toUpperCase();
            }
          }
        }
      }
      for (abbr in tal) {
        for (i = 0; i < tal[abbr].length; i++) {
          os = -jsdate.getTimezoneOffset() * 60;
          if (tal[abbr][i].offset === os) {
            return abbr.toUpperCase();
          }
        }
      }
*/
      return 'UTC';
    },
    Z: function () { // Timezone offset in seconds (-43200...50400)
      return -jsdate.getTimezoneOffset() * 60;
    },

    // Full Date/Time
    c: function () { // ISO-8601 date.
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
    },
    r: function () { // RFC 2822
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
    },
    U: function () { // Seconds since UNIX epoch
      return jsdate / 1000 | 0;
    }
  };
  this.date = function (format, timestamp) {
    that = this;
    jsdate = (timestamp === undefined ? new Date() : // Not provided
      (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
      new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    );
    return format.replace(formatChr, formatChrCb);
  };
  return this.date(format, timestamp);
}
function date_default_timezone_get () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: timezone_abbreviations_list
  // %        note 1: Uses global: php_js to store the default timezone
  // *     example 1: date_default_timezone_get();
  // *     returns 1: 'unknown'
  var tal = {},
    abbr = '',
    i = 0,
    curr_offset = -(new Date()).getTimezoneOffset() * 60;

  if (this.php_js) {
    if (this.php_js.default_timezone) { // set by date_default_timezone_set
      return this.php_js.default_timezone;
    }
    if (this.php_js.ENV && this.php_js.ENV.TZ) { // getenv
      return this.php_js.ENV.TZ;
    }
    if (this.php_js.ini && this.php_js.ini['date.timezone']) { // e.g., if set by ini_set()
      return this.php_js.ini['date.timezone'].local_value ? this.php_js.ini['date.timezone'].local_value : this.php_js.ini['date.timezone'].global_value;
    }
  }
  // Get from system
  tal = this.timezone_abbreviations_list();
  for (abbr in tal) {
    for (i = 0; i < tal[abbr].length; i++) {
      if (tal[abbr][i].offset === curr_offset) {
        return tal[abbr][i].timezone_id;
      }
    }
  }
  return 'UTC';
}
function date_default_timezone_set (tz) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: timezone_abbreviations_list
  // %        note 1: Uses global: php_js to store the default timezone
  // *     example 1: date_default_timezone_set('unknown');
  // *     returns 1: 'unknown'
  var tal = {},
    abbr = '',
    i = 0;

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT
  // PHP verifies that the timezone is valid and also sets this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST if so
  tal = this.timezone_abbreviations_list();
  for (abbr in tal) {
    for (i = 0; i < tal[abbr].length; i++) {
      if (tal[abbr][i].timezone_id === tz) {
        this.php_js.default_timezone = tz;
        return true;
      }
    }
  }
  return false;
}
function date_parse (date) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: strtotime
  // *     example 1: date_parse('2006-12-12 10:00:00.5');
  // *     returns 1: {year : 2006, month: 12, day: 12, hour: 10, minute: 0, second: 0, fraction: 0.5, warning_count: 0, warnings: [], error_count: 0, errors: [], is_localtime: false}

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT

  var warningsOffset = this.php_js.warnings ? this.php_js.warnings.length : null;
  var errorsOffset = this.php_js.errors ? this.php_js.errors.length : null;

  try {
    var ts = this.strtotime(date);
  } finally {
    if (!ts) {
      return false;
    }
  }

  var dt = new Date(ts * 1000);

  var retObj = { // Grab any new warnings or errors added (not implemented yet in strtotime()); throwing warnings, notices, or errors could also be easily monitored by using 'watch' on this.php_js.latestWarning, etc. and/or calling any defined error handlers
    warning_count: warningsOffset !== null ? this.php_js.warnings.slice(warningsOffset).length : 0,
    warnings: warningsOffset !== null ? this.php_js.warnings.slice(warningsOffset) : [],
    error_count: errorsOffset !== null ? this.php_js.errors.slice(errorsOffset).length : 0,
    errors: errorsOffset !== null ? this.php_js.errors.slice(errorsOffset) : []
  };
  retObj.year = dt.getFullYear();
  retObj.month = dt.getMonth() + 1;
  retObj.day = dt.getDate();
  retObj.hour = dt.getHours();
  retObj.minute = dt.getMinutes();
  retObj.second = dt.getSeconds();
  retObj.fraction = parseFloat('0.' + dt.getMilliseconds());
  retObj.is_localtime = dt.getTimezoneOffset !== 0;

  return retObj;
}
function getdate (timestamp) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  // +   input by: Alex
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: getdate(1055901520);
  // *     returns 1: {'seconds': 40, 'minutes': 58, 'hours': 21, 'mday': 17, 'wday': 2, 'mon': 6, 'year': 2003, 'yday': 167, 'weekday': 'Tuesday', 'month': 'June', '0': 1055901520}
  var _w = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur'];
  var _m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var d = ((typeof(timestamp) == 'undefined') ? new Date() : // Not provided
  (typeof(timestamp) == 'object') ? new Date(timestamp) : // Javascript Date()
  new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
  );
  var w = d.getDay();
  var m = d.getMonth();
  var y = d.getFullYear();
  var r = {};

  r.seconds = d.getSeconds();
  r.minutes = d.getMinutes();
  r.hours = d.getHours();
  r.mday = d.getDate();
  r.wday = w;
  r.mon = m + 1;
  r.year = y;
  r.yday = Math.floor((d - (new Date(y, 0, 1))) / 86400000);
  r.weekday = _w[w] + 'day';
  r.month = _m[m];
  r['0'] = parseInt(d.getTime() / 1000, 10);

  return r;
}
function gettimeofday (return_float) {
  // http://kevin.vanzonneveld.net
  // + original by: Brett Zamir (http://brett-zamir.me)
  // +      derived from: Josh Fraser (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/)
  // +         parts by: Breaking Par Consulting Inc (http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7)
  // +  revised by: Theriault
  // *   example 1: gettimeofday();
  // *   returns 1: {sec: 12, usec: 153000, minuteswest: -480, dsttime: 0}
  // *   example 1: gettimeofday(true);
  // *   returns 1: 1238748978.49
  var t = new Date(),
    y = 0;

  if (return_float) {
    return t.getTime() / 1000;
  }

  y = t.getFullYear(); // Store current year.
  return {
    sec: t.getUTCSeconds(),
    usec: t.getUTCMilliseconds() * 1000,
    minuteswest: t.getTimezoneOffset(),
    // Compare Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC to see if DST is observed.
    dsttime: 0 + (((new Date(y, 0)) - Date.UTC(y, 0)) !== ((new Date(y, 6)) - Date.UTC(y, 6)))
  };
}
function gmdate (format, timestamp) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Alex
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: date
  // *     example 1: gmdate('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400); // Return will depend on your timezone
  // *     returns 1: '07:09:40 m is month'
  var dt = typeof timestamp === 'undefined' ? new Date() : // Not provided
      typeof timestamp === 'object' ? new Date(timestamp) : // Javascript Date()
      new Date(timestamp * 1000); // UNIX timestamp (auto-convert to int)
  timestamp = Date.parse(dt.toUTCString().slice(0, -4)) / 1000;
  return this.date(format, timestamp);
}
function gmmktime () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   derived from: mktime
  // *     example 1: gmmktime(14, 10, 2, 2, 1, 2008);
  // *     returns 1: 1201875002
  // *     example 2: gmmktime(0, 0, -1, 1, 1, 1970);
  // *     returns 2: -1
  var d = new Date(),
    r = arguments,
    i = 0,
    e = ['Hours', 'Minutes', 'Seconds', 'Month', 'Date', 'FullYear'];

  for (i = 0; i < e.length; i++) {
    if (typeof r[i] === 'undefined') {
      r[i] = d['getUTC' + e[i]]();
      r[i] += (i === 3); // +1 to fix JS months.
    } else {
      r[i] = parseInt(r[i], 10);
      if (isNaN(r[i])) {
        return false;
      }
    }
  }

  // Map years 0-69 to 2000-2069 and years 70-100 to 1970-2000.
  r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2e3 : (r[5] <= 100 ? 1900 : 0)) : 0);

  // Set year, month (-1 to fix JS months), and date.
  // !This must come before the call to setHours!
  d.setUTCFullYear(r[5], r[3] - 1, r[4]);

  // Set hours, minutes, and seconds.
  d.setUTCHours(r[0], r[1], r[2]);

  // Divide milliseconds by 1000 to return seconds and drop decimal.
  // Add 1 second if negative or it'll be off from PHP by 1 second.
  return (d.getTime() / 1e3 >> 0) - (d.getTime() < 0);
}
function gmstrftime (format, timestamp) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Alex
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: strftime
  // *     example 1: gmstrftime("%A", 1062462400);
  // *     returns 1: 'Tuesday'
  var dt = ((typeof(timestamp) == 'undefined') ? new Date() : // Not provided
  (typeof(timestamp) == 'object') ? new Date(timestamp) : // Javascript Date()
  new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
  );
  timestamp = Date.parse(dt.toUTCString().slice(0, -4)) / 1000;
  return this.strftime(format, timestamp);
}
function idate (format, timestamp) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Alex
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +  derived from: date
  // +  derived from: gettimeofday
  // *     example 1: idate('y');
  // *     returns 1: 9
  if (format === undefined) {
    throw 'idate() expects at least 1 parameter, 0 given';
  }
  if (!format.length || format.length > 1) {
    throw 'idate format is one char';
  }

  // Fix: Need to allow date_default_timezone_set() (check for this.php_js.default_timezone and use)
  var date = ((typeof timestamp === 'undefined') ? new Date() : // Not provided
  (timestamp instanceof Date) ? new Date(timestamp) : // Javascript Date()
  new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
  ),
    a;

  switch (format) {
  case 'B':
    return Math.floor(((date.getUTCHours() * 36e2) + (date.getUTCMinutes() * 60) + date.getUTCSeconds() + 36e2) / 86.4) % 1e3;
  case 'd':
    return date.getDate();
  case 'h':
    return date.getHours() % 12 || 12;
  case 'H':
    return date.getHours();
  case 'i':
    return date.getMinutes();
  case 'I':
    // capital 'i'
    // Logic derived from getimeofday().
    // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
    // If they are not equal, then DST is observed.
    a = date.getFullYear();
    return 0 + (((new Date(a, 0)) - Date.UTC(a, 0)) !== ((new Date(a, 6)) - Date.UTC(a, 6)));
  case 'L':
    a = date.getFullYear();
    return (!(a & 3) && (a % 1e2 || !(a % 4e2))) ? 1 : 0;
  case 'm':
    return date.getMonth() + 1;
  case 's':
    return date.getSeconds();
  case 't':
    return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
  case 'U':
    return Math.round(date.getTime() / 1000);
  case 'w':
    return date.getDay();
  case 'W':
    a = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() || 7) + 3);
    return 1 + Math.round((a - (new Date(a.getFullYear(), 0, 4))) / 864e5 / 7);
  case 'y':
    return parseInt((date.getFullYear() + '').slice(2), 10); // This function returns an integer, unlike date()
  case 'Y':
    return date.getFullYear();
  case 'z':
    return Math.floor((date - new Date(date.getFullYear(), 0, 1)) / 864e5);
  case 'Z':
    return -date.getTimezoneOffset() * 60;
  default:
    throw 'Unrecognized date format token';
  }
}
function localtime (timestamp, is_assoc) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +  derived from: Josh Fraser (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/)
  // +      parts by: Breaking Par Consulting Inc (http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7)
  // +   improved by: Ryan W Tenney (http://ryan.10e.us)
  // *     example 1: localtime();
  // *     returns 1: [50,28,0,14,2,109,6,73,0]
  var t, yday, x, o = {};

  if (timestamp === undefined) {
    t = new Date();
  } else if (timestamp instanceof Date) {
    t = timestamp;
  } else {
    t = new Date(timestamp * 1000);
  }

  x = function (t, m) {
    var a = (new Date(t.getFullYear(), 0, m, 0, 0, 0, 0)).toUTCString();
    return t - new Date(a.slice(0, a.lastIndexOf(' ') - 1));
  };

  yday = Math.floor((t - new Date(t.getFullYear(), 0, 1)) / 86400000);

  o = {
    'tm_sec': t.getSeconds(),
    // seconds
    'tm_min': t.getMinutes(),
    // minutes
    'tm_hour': t.getHours(),
    // hour
    'tm_mday': t.getDate(),
    // day of the month, 1 - 31
    'tm_mon': t.getMonth(),
    // month of the year, 0 (January) to 11 (December)
    'tm_year': t.getFullYear() - 1900,
    // years since 1900
    'tm_wday': t.getDay(),
    // day of the week, 0 (Sun) to 6 (Sat)
    'tm_yday': yday,
    // day of the year
    'tm_isdst': +(x(t, 1) != x(t, 6)) // is daylight savings time in effect
  };

  return is_assoc ? o : [
  o.tm_sec, o.tm_min, o.tm_hour, o.tm_mday, o.tm_mon, o.tm_year, o.tm_wday, o.tm_yday, o.tm_isdst];
}
function microtime (get_as_float) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  // *     example 1: timeStamp = microtime(true);
  // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
  var now = new Date().getTime() / 1000;
  var s = parseInt(now, 10);

  return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
}
function mktime () {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: baris ozdil
  // +      input by: gabriel paderni
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: FGFEmperor
  // +      input by: Yannoo
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: jakes
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Marc Palau
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: 3D-GRAF
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Chris
  // +    revised by: Theriault
  // %        note 1: The return values of the following examples are
  // %        note 1: received only if your system's timezone is UTC.
  // *     example 1: mktime(14, 10, 2, 2, 1, 2008);
  // *     returns 1: 1201875002
  // *     example 2: mktime(0, 0, 0, 0, 1, 2008);
  // *     returns 2: 1196467200
  // *     example 3: make = mktime();
  // *     example 3: td = new Date();
  // *     example 3: real = Math.floor(td.getTime() / 1000);
  // *     example 3: diff = (real - make);
  // *     results 3: diff < 5
  // *     example 4: mktime(0, 0, 0, 13, 1, 1997)
  // *     returns 4: 883612800
  // *     example 5: mktime(0, 0, 0, 1, 1, 1998)
  // *     returns 5: 883612800
  // *     example 6: mktime(0, 0, 0, 1, 1, 98)
  // *     returns 6: 883612800
  // *     example 7: mktime(23, 59, 59, 13, 0, 2010)
  // *     returns 7: 1293839999
  // *     example 8: mktime(0, 0, -1, 1, 1, 1970)
  // *     returns 8: -1
  var d = new Date(),
    r = arguments,
    i = 0,
    e = ['Hours', 'Minutes', 'Seconds', 'Month', 'Date', 'FullYear'];

  for (i = 0; i < e.length; i++) {
    if (typeof r[i] === 'undefined') {
      r[i] = d['get' + e[i]]();
      r[i] += (i === 3); // +1 to fix JS months.
    } else {
      r[i] = parseInt(r[i], 10);
      if (isNaN(r[i])) {
        return false;
      }
    }
  }

  // Map years 0-69 to 2000-2069 and years 70-100 to 1970-2000.
  r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2e3 : (r[5] <= 100 ? 1900 : 0)) : 0);

  // Set year, month (-1 to fix JS months), and date.
  // !This must come before the call to setHours!
  d.setFullYear(r[5], r[3] - 1, r[4]);

  // Set hours, minutes, and seconds.
  d.setHours(r[0], r[1], r[2]);

  // Divide milliseconds by 1000 to return seconds and drop decimal.
  // Add 1 second if negative or it'll be off from PHP by 1 second.
  return (d.getTime() / 1e3 >> 0) - (d.getTime() < 0);
}
function strftime (fmt, timestamp) {
  // http://kevin.vanzonneveld.net
  // +      original by: Blues (http://tech.bluesmoon.info/)
  // + reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Alex
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // -       depends on: setlocale
  // %        note 1: Uses global: php_js to store locale info
  // *        example 1: strftime("%A", 1062462400); // Return value will depend on date and locale
  // *        returns 1: 'Tuesday'
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT
  var phpjs = this.php_js;

  // BEGIN STATIC
  var _xPad = function (x, pad, r) {
    if (typeof r === 'undefined') {
      r = 10;
    }
    for (; parseInt(x, 10) < r && r > 1; r /= 10) {
      x = pad.toString() + x;
    }
    return x.toString();
  };

  var locale = phpjs.localeCategories.LC_TIME;
  var locales = phpjs.locales;
  var lc_time = locales[locale].LC_TIME;

  var _formats = {
    a: function (d) {
      return lc_time.a[d.getDay()];
    },
    A: function (d) {
      return lc_time.A[d.getDay()];
    },
    b: function (d) {
      return lc_time.b[d.getMonth()];
    },
    B: function (d) {
      return lc_time.B[d.getMonth()];
    },
    C: function (d) {
      return _xPad(parseInt(d.getFullYear() / 100, 10), 0);
    },
    d: ['getDate', '0'],
    e: ['getDate', ' '],
    g: function (d) {
      return _xPad(parseInt(this.G(d) / 100, 10), 0);
    },
    G: function (d) {
      var y = d.getFullYear();
      var V = parseInt(_formats.V(d), 10);
      var W = parseInt(_formats.W(d), 10);

      if (W > V) {
        y++;
      } else if (W === 0 && V >= 52) {
        y--;
      }

      return y;
    },
    H: ['getHours', '0'],
    I: function (d) {
      var I = d.getHours() % 12;
      return _xPad(I === 0 ? 12 : I, 0);
    },
    j: function (d) {
      var ms = d - new Date('' + d.getFullYear() + '/1/1 GMT');
      ms += d.getTimezoneOffset() * 60000; // Line differs from Yahoo implementation which would be equivalent to replacing it here with:
      // ms = new Date('' + d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + ' GMT') - ms;
      var doy = parseInt(ms / 60000 / 60 / 24, 10) + 1;
      return _xPad(doy, 0, 100);
    },
    k: ['getHours', '0'],
    // not in PHP, but implemented here (as in Yahoo)
    l: function (d) {
      var l = d.getHours() % 12;
      return _xPad(l === 0 ? 12 : l, ' ');
    },
    m: function (d) {
      return _xPad(d.getMonth() + 1, 0);
    },
    M: ['getMinutes', '0'],
    p: function (d) {
      return lc_time.p[d.getHours() >= 12 ? 1 : 0];
    },
    P: function (d) {
      return lc_time.P[d.getHours() >= 12 ? 1 : 0];
    },
    s: function (d) { // Yahoo uses return parseInt(d.getTime()/1000, 10);
      return Date.parse(d) / 1000;
    },
    S: ['getSeconds', '0'],
    u: function (d) {
      var dow = d.getDay();
      return ((dow === 0) ? 7 : dow);
    },
    U: function (d) {
      var doy = parseInt(_formats.j(d), 10);
      var rdow = 6 - d.getDay();
      var woy = parseInt((doy + rdow) / 7, 10);
      return _xPad(woy, 0);
    },
    V: function (d) {
      var woy = parseInt(_formats.W(d), 10);
      var dow1_1 = (new Date('' + d.getFullYear() + '/1/1')).getDay();
      // First week is 01 and not 00 as in the case of %U and %W,
      // so we add 1 to the final result except if day 1 of the year
      // is a Monday (then %W returns 01).
      // We also need to subtract 1 if the day 1 of the year is
      // Friday-Sunday, so the resulting equation becomes:
      var idow = woy + (dow1_1 > 4 || dow1_1 <= 1 ? 0 : 1);
      if (idow === 53 && (new Date('' + d.getFullYear() + '/12/31')).getDay() < 4) {
        idow = 1;
      } else if (idow === 0) {
        idow = _formats.V(new Date('' + (d.getFullYear() - 1) + '/12/31'));
      }
      return _xPad(idow, 0);
    },
    w: 'getDay',
    W: function (d) {
      var doy = parseInt(_formats.j(d), 10);
      var rdow = 7 - _formats.u(d);
      var woy = parseInt((doy + rdow) / 7, 10);
      return _xPad(woy, 0, 10);
    },
    y: function (d) {
      return _xPad(d.getFullYear() % 100, 0);
    },
    Y: 'getFullYear',
    z: function (d) {
      var o = d.getTimezoneOffset();
      var H = _xPad(parseInt(Math.abs(o / 60), 10), 0);
      var M = _xPad(o % 60, 0);
      return (o > 0 ? '-' : '+') + H + M;
    },
    Z: function (d) {
      return d.toString().replace(/^.*\(([^)]+)\)$/, '$1');
/*
      // Yahoo's: Better?
      var tz = d.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/, '$2').replace(/[a-z ]/g, '');
      if(tz.length > 4) {
        tz = Dt.formats.z(d);
      }
      return tz;
      */
    },
    '%': function (d) {
      return '%';
    }
  };
  // END STATIC
/* Fix: Locale alternatives are supported though not documented in PHP; see http://linux.die.net/man/3/strptime
Ec
EC
Ex
EX
Ey
EY
Od or Oe
OH
OI
Om
OM
OS
OU
Ow
OW
Oy
*/

  var _date = ((typeof(timestamp) == 'undefined') ? new Date() : // Not provided
  (typeof(timestamp) == 'object') ? new Date(timestamp) : // Javascript Date()
  new Date(timestamp * 1000) // PHP API expects UNIX timestamp (auto-convert to int)
  );

  var _aggregates = {
    c: 'locale',
    D: '%m/%d/%y',
    F: '%y-%m-%d',
    h: '%b',
    n: '\n',
    r: 'locale',
    R: '%H:%M',
    t: '\t',
    T: '%H:%M:%S',
    x: 'locale',
    X: 'locale'
  };


  // First replace aggregates (run in a loop because an agg may be made up of other aggs)
  while (fmt.match(/%[cDFhnrRtTxX]/)) {
    fmt = fmt.replace(/%([cDFhnrRtTxX])/g, function (m0, m1) {
      var f = _aggregates[m1];
      return (f === 'locale' ? lc_time[m1] : f);
    });
  }

  // Now replace formats - we need a closure so that the date object gets passed through
  var str = fmt.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, function (m0, m1) {
    var f = _formats[m1];
    if (typeof f === 'string') {
      return _date[f]();
    } else if (typeof f === 'function') {
      return f(_date);
    } else if (typeof f === 'object' && typeof(f[0]) === 'string') {
      return _xPad(_date[f[0]](), f[1]);
    } else { // Shouldn't reach here
      return m1;
    }
  });
  return str;
}
function strptime (dateStr, format) {
  // http://kevin.vanzonneveld.net
  // +      original by: Brett Zamir (http://brett-zamir.me)
  // +      based on: strftime
  // -       depends on: setlocale
  // -       depends on: array_map
  // *        example 1: strptime('20091112222135', '%Y%m%d%H%M%S'); // Return value will depend on date and locale
  // *        returns 1: {tm_sec: 35, tm_min: 21, tm_hour: 22, tm_mday: 12, tm_mon: 10, tm_year: 109, tm_wday: 4, tm_yday: 315, unparsed: ''}
  // *        example 1: strptime('2009extra', '%Y');
  // *        returns 1: {tm_sec:0, tm_min:0, tm_hour:0, tm_mday:0, tm_mon:0, tm_year:109, tm_wday:3, tm_yday: -1, unparsed: 'extra'}

  // tm_isdst is in other docs; why not PHP?

  // Needs more thorough testing and examples

  var retObj = {
    tm_sec: 0,
    tm_min: 0,
    tm_hour: 0,
    tm_mday: 0,
    tm_mon: 0,
    tm_year: 0,
    tm_wday: 0,
    tm_yday: 0,
    unparsed: ''
  },
    that = this,
    amPmOffset = 0,
    prevHour = false,
    _date = function () {
      var o = retObj;
      // We set date to at least 1 to ensure year or month doesn't go backwards
      return _reset(new Date(Date.UTC(o.tm_year + 1900, o.tm_mon, o.tm_mday || 1, o.tm_hour, o.tm_min, o.tm_sec)), o.tm_mday);
    },
    _reset = function (dateObj, realMday) {
      // realMday is to allow for a value of 0 in return results (but without
      // messing up the Date() object)
      var o = retObj;
      var d = dateObj;
      o.tm_sec = d.getUTCSeconds();
      o.tm_min = d.getUTCMinutes();
      o.tm_hour = d.getUTCHours();
      o.tm_mday = realMday === 0 ? realMday : d.getUTCDate();
      o.tm_mon = d.getUTCMonth();
      o.tm_year = d.getUTCFullYear() - 1900;
      o.tm_wday = realMday === 0 ? (d.getUTCDay() > 0 ? d.getUTCDay() - 1 : 6) : d.getUTCDay();
      var jan1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      o.tm_yday = Math.ceil((d - jan1) / (1000 * 60 * 60 * 24));
    };

  // BEGIN STATIC
  var _NWS = /\S/,
    _WS = /\s/;

  var _aggregates = {
    c: 'locale',
    D: '%m/%d/%y',
    F: '%y-%m-%d',
    r: 'locale',
    R: '%H:%M',
    T: '%H:%M:%S',
    x: 'locale',
    X: 'locale'
  };

/* Fix: Locale alternatives are supported though not documented in PHP; see http://linux.die.net/man/3/strptime
Ec
EC
Ex
EX
Ey
EY
Od or Oe
OH
OI
Om
OM
OS
OU
Ow
OW
Oy
*/
  var _preg_quote = function (str) {
    return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, '\\$1');
  };
  // END STATIC

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  // END REDUNDANT

  var phpjs = this.php_js;
  var locale = phpjs.localeCategories.LC_TIME;
  var locales = phpjs.locales;
  var lc_time = locales[locale].LC_TIME;

  // First replace aggregates (run in a loop because an agg may be made up of other aggs)
  while (format.match(/%[cDFhnrRtTxX]/)) {
    format = format.replace(/%([cDFhnrRtTxX])/g, function (m0, m1) {
      var f = _aggregates[m1];
      return (f === 'locale' ? lc_time[m1] : f);
    });
  }

  var _addNext = function (j, regex, cb) {
    if (typeof regex === 'string') {
      regex = new RegExp('^' + regex, 'i');
    }
    var check = dateStr.slice(j);
    var match = regex.exec(check);
    // Even if the callback returns null after assigning to the return object, the object won't be saved anyways
    var testNull = match ? cb.apply(null, match) : null;
    if (testNull === null) {
      throw 'No match in string';
    }
    return j + match[0].length;
  };

  var _addLocalized = function (j, formatChar, category) {
    return _addNext(j, that.array_map(
    _preg_quote, lc_time[formatChar]).join('|'), // Could make each parenthesized instead and pass index to callback

    function (m) {
      var match = lc_time[formatChar].search(new RegExp('^' + _preg_quote(m) + '$', 'i'));
      if (match) {
        retObj[category] = match[0];
      }
    });
  };

  // BEGIN PROCESSING CHARACTERS
  for (var i = 0, j = 0; i < format.length; i++) {
    if (format.charAt(i) === '%') {
      var literalPos = ['%', 'n', 't'].indexOf(format.charAt(i + 1));
      if (literalPos !== -1) {
        if (['%', '\n', '\t'].indexOf(dateStr.charAt(j)) === literalPos) { // a matched literal
          ++i, ++j; // skip beyond
          continue;
        }
        // Format indicated a percent literal, but not actually present
        return false;
      }
      var formatChar = format.charAt(i + 1);
      try {
        switch (formatChar) {
        case 'a':
          // Fall-through // Sun-Sat
        case 'A':
          // Sunday-Saturday
          j = _addLocalized(j, formatChar, 'tm_wday'); // Changes nothing else
          break;
        case 'h':
          // Fall-through (alias of 'b');
        case 'b':
          // Jan-Dec
          j = _addLocalized(j, 'b', 'tm_mon');
          _date(); // Also changes wday, yday
          break;
        case 'B':
          // January-December
          j = _addLocalized(j, formatChar, 'tm_mon');
          _date(); // Also changes wday, yday
          break;
        case 'C':
          // 0+; century (19 for 20th)
          j = _addNext(j, /^\d?\d/, // PHP docs say two-digit, but accepts one-digit (two-digit max)

          function (d) {
            var year = (parseInt(d, 10) - 19) * 100;
            retObj.tm_year = year;
            _date();
            if (!retObj.tm_yday) {
              retObj.tm_yday = -1;
            }
            // Also changes wday; and sets yday to -1 (always?)
          });
          break;
        case 'd':
          // Fall-through  01-31 day
        case 'e':
          // 1-31 day
          j = _addNext(j, formatChar === 'd' ? /^(0[1-9]|[1-2]\d|3[0-1])/ : /^([1-2]\d|3[0-1]|[1-9])/, function (d) {
            var dayMonth = parseInt(d, 10);
            retObj.tm_mday = dayMonth;
            _date(); // Also changes w_day, y_day
          });
          break;
        case 'g':
          // No apparent effect; 2-digit year (see 'V')
          break;
        case 'G':
          // No apparent effect; 4-digit year (see 'V')'
          break;
        case 'H':
          // 00-23 hours
          j = _addNext(j, /^([0-1]\d|2[0-3])/, function (d) {
            var hour = parseInt(d, 10);
            retObj.tm_hour = hour;
            // Changes nothing else
          });
          break;
        case 'l':
          // Fall-through of lower-case 'L'; 1-12 hours
        case 'I':
          // 01-12 hours
          j = _addNext(j, formatChar === 'l' ? /^([1-9]|1[0-2])/ : /^(0[1-9]|1[0-2])/, function (d) {
            var hour = parseInt(d, 10) - 1 + amPmOffset;
            retObj.tm_hour = hour;
            prevHour = true; // Used for coordinating with am-pm
            // Changes nothing else, but affected by prior 'p/P'
          });
          break;
        case 'j':
          // 001-366 day of year
          j = _addNext(j, /^(00[1-9]|0[1-9]\d|[1-2]\d\d|3[0-6][0-6])/, function (d) {
            var dayYear = parseInt(d, 10) - 1;
            retObj.tm_yday = dayYear;
            // Changes nothing else (oddly, since if based on a given year, could calculate other fields)
          });
          break;
        case 'm':
          // 01-12 month
          j = _addNext(j, /^(0[1-9]|1[0-2])/, function (d) {
            var month = parseInt(d, 10) - 1;
            retObj.tm_mon = month;
            _date(); // Also sets wday and yday
          });
          break;
        case 'M':
          // 00-59 minutes
          j = _addNext(j, /^[0-5]\d/, function (d) {
            var minute = parseInt(d, 10);
            retObj.tm_min = minute;
            // Changes nothing else
          });
          break;
        case 'P':
          // Seems not to work; AM-PM
          return false; // Could make fall-through instead since supposed to be a synonym despite PHP docs
        case 'p':
          // am-pm
          j = _addNext(j, /^(am|pm)/i, function (d) {
            // No effect on 'H' since already 24 hours but
            //   works before or after setting of l/I hour
            amPmOffset = (/a/).test(d) ? 0 : 12;
            if (prevHour) {
              retObj.tm_hour += amPmOffset;
            }
          });
          break;
        case 's':
          // Unix timestamp (in seconds)
          j = _addNext(j, /^\d+/, function (d) {
            var timestamp = parseInt(d, 10);
            var date = new Date(Date.UTC(timestamp * 1000));
            _reset(date);
            // Affects all fields, but can't be negative (and initial + not allowed)
          });
          break;
        case 'S':
          // 00-59 seconds
          j = _addNext(j, /^[0-5]\d/, // strptime also accepts 60-61 for some reason

          function (d) {
            var second = parseInt(d, 10);
            retObj.tm_sec = second;
            // Changes nothing else
          });
          break;
        case 'u':
          // Fall-through; 1 (Monday)-7(Sunday)
        case 'w':
          // 0 (Sunday)-6(Saturday)
          j = _addNext(j, /^\d/, function (d) {
            retObj.tm_wday = d - (formatChar === 'u');
            // Changes nothing else apparently
          });
          break;
        case 'U':
          // Fall-through (week of year, from 1st Sunday)
        case 'V':
          // Fall-through (ISO-8601:1988 week number; from first 4-weekday week, starting with Monday)
        case 'W':
          // Apparently ignored (week of year, from 1st Monday)
          break;
        case 'y':
          // 69 (or higher) for 1969+, 68 (or lower) for 2068-
          j = _addNext(j, /^\d?\d/, // PHP docs say two-digit, but accepts one-digit (two-digit max)

          function (d) {
            d = parseInt(d, 10);
            var year = d >= 69 ? d : d + 100;
            retObj.tm_year = year;
            _date();
            if (!retObj.tm_yday) {
              retObj.tm_yday = -1;
            }
            // Also changes wday; and sets yday to -1 (always?)
          });
          break;
        case 'Y':
          // 2010 (4-digit year)
          j = _addNext(j, /^\d{1,4}/, // PHP docs say four-digit, but accepts one-digit (four-digit max)

          function (d) {
            var year = (parseInt(d, 10)) - 1900;
            retObj.tm_year = year;
            _date();
            if (!retObj.tm_yday) {
              retObj.tm_yday = -1;
            }
            // Also changes wday; and sets yday to -1 (always?)
          });
          break;
        case 'z':
          // Timezone; on my system, strftime gives -0800, but strptime seems not to alter hour setting
          break;
        case 'Z':
          // Timezone; on my system, strftime gives PST, but strptime treats text as unparsed
          break;
        default:
          throw 'Unrecognized formatting character in strptime()';
          break;
        }
      } catch (e) {
        if (e === 'No match in string') { // Allow us to exit
          return false; // There was supposed to be a matching format but there wasn't
        }
      }++i; // Calculate skipping beyond initial percent too
    } else if (format.charAt(i) !== dateStr.charAt(j)) {
      // If extra whitespace at beginning or end of either, or between formats, no problem
      // (just a problem when between % and format specifier)

      // If the string has white-space, it is ok to ignore
      if (dateStr.charAt(j).search(_WS) !== -1) {
        j++;
        i--; // Let the next iteration try again with the same format character
      } else if (format.charAt(i).search(_NWS) !== -1) { // Any extra formatting characters besides white-space causes
        // problems (do check after WS though, as may just be WS in string before next character)
        return false;
      } else { // Extra WS in format
        // Adjust strings when encounter non-matching whitespace, so they align in future checks above
        // Will check on next iteration (against same (non-WS) string character)
      }
    } else {
      j++;
    }
  }

  // POST-PROCESSING
  retObj.unparsed = dateStr.slice(j); // Will also get extra whitespace; empty string if none
  return retObj;
}
function strtotime (text, now) {
  // Convert string representation of date and time to a timestamp
	//
	// version: 1109.2015
	// discuss at: http://phpjs.org/functions/strtotime
	// +   original by: Caio Ariede (http://caioariede.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +      input by: David
	// +   improved by: Caio Ariede (http://caioariede.com)
	// +   improved by: Brett Zamir (http://brett-zamir.me)
	// +   bugfixed by: Wagner B. Soares
	// +   bugfixed by: Artur Tchernychev
	// +   improved by: A. Matías Quezada (http://amatiasq.com)
	// %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
	// *     example 1: strtotime('+1 day', 1129633200);
	// *     returns 1: 1129719600
	// *     example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
	// *     returns 2: 1130425202
	// *     example 3: strtotime('last month', 1129633200);
	// *     returns 3: 1127041200
	// *     example 4: strtotime('2009-05-04 08:30:00');
	// *     returns 4: 1241418600
	if (!text)
		return null;

	// Unecessary spaces
	text = text.trim()
		.replace(/\s{2,}/g, ' ')
		.replace(/[\t\r\n]/g, '')
		.toLowerCase();

	var parsed;

	if (text === 'now')
		return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
	else if (!isNaN(parse = Date.parse(text)))
		return parse / 1000 | 0;
	if (text === 'now')
		return new Date().getTime() / 1000; // Return seconds, not milli-seconds
	else if (!isNaN(parsed = Date.parse(text)))
		return parsed / 1000;

	var match = text.match(/^(\d{2,4})-(\d{2})-(\d{2})(?:\s(\d{1,2}):(\d{2})(?::\d{2})?)?(?:\.(\d+)?)?$/);
	if (match) {
		var year = match[1] >= 0 && match[1] <= 69 ? +match[1] + 2000 : match[1];
		return new Date(year, parseInt(match[2], 10) - 1, match[3],
			match[4] || 0, match[5] || 0, match[6] || 0, match[7] || 0) / 1000;
	}

	var date = now ? new Date(now * 1000) : new Date();
	var days = {
		'sun': 0,
		'mon': 1,
		'tue': 2,
		'wed': 3,
		'thu': 4,
		'fri': 5,
		'sat': 6
	};
	var ranges = {
		'yea': 'FullYear',
		'mon': 'Month',
		'day': 'Date',
		'hou': 'Hours',
		'min': 'Minutes',
		'sec': 'Seconds'
	};

	function lastNext(type, range, modifier) {
		var day = days[range];

		if (typeof(day) !== 'undefined') {
			var diff = day - date.getDay();

			if (diff === 0)
				diff = 7 * modifier;
			else if (diff > 0 && type === 'last')
				diff -= 7;
			else if (diff < 0 && type === 'next')
				diff += 7;

			date.setDate(date.getDate() + diff);
		}
	}
	function process(val) {
		var split = val.split(' ');
		var type = split[0];
		var range = split[1].substring(0, 3);
		var typeIsNumber = /\d+/.test(type);

		var ago = split[2] === 'ago';
		var num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

		if (typeIsNumber)
			num *= parseInt(type, 10);

		if (ranges.hasOwnProperty(range))
			return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
		else if (range === 'wee')
			return date.setDate(date.getDate() + (num * 7));

		if (type === 'next' || type === 'last')
			lastNext(type, range, num);
		else if (!typeIsNumber)
			return false;

		return true;
	}

	var regex = '([+-]?\\d+\\s' +
		'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
		'|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
		'|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)|(last|next)\\s' +
		'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
		'|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
		'|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))(\\sago)?';

	match = text.match(new RegExp(regex, 'gi'));
	if (!match)
		return false;

	for (var i = 0, len = match.length; i < len; i++)
		if (!process(match[i]))
			return false;

	// ECMAScript 5 only
	//if (!match.every(process))
	//	return false;

	return (date.getTime() / 1000);
}
function time () {
  // http://kevin.vanzonneveld.net
  // +   original by: GeekFG (http://geekfg.blogspot.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: metjay
  // +   improved by: HKM
  // *     example 1: timeStamp = time();
  // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
  return Math.floor(new Date().getTime() / 1000);
}
function timezone_abbreviations_list () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +      input by: ChaosNo1
  // +    revised by: Theriault
  // +    improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Based on timezonemap.h from PHP 5.3
  // *     example 1: var list = timezone_abbreviations_list()
  // *     example 1: list['acst'][0].timezone_id
  // *     returns 1: 'America/Porto_Acre'
  var list = {},
    i = 0,
    j = 0,
    len = 0,
    jlen = 0,
    indice = '',
    curr = '',
    currSub = '',
    currSubPrefix = '',
    timezone_id = '',
    tzo = 0,
    dst = false;

  // BEGIN STATIC
  try { // We can't try to access on window, since it might not exist in some environments, and if we use "this.window"
    //    we risk adding another copy if different window objects are associated with the namespaced object
    php_js_shared; // Will be private static variable in namespaced version or global in non-namespaced
    //   version since we wish to share this across all instances
  } catch (e) {
    php_js_shared = {};
  }

  // An array of arrays. The index of each array is the relative
  // abbreviation from the abbreviations array below. Each sub array
  // consists of 2 to 4 values. The first value will be DST. The
  // second value is the index of the value in the offsets array.
  // The third value is the timezone ID if applicable. Null is
  // returned if their is no value. The fourth value is the index
  // of the prefix to use for the timezone ID if applicable.
  if (!php_js_shared.tz_abbrs) { // This should really be static, but we can at least avoid rebuilding the array each time
    php_js_shared.tz_abbrs = [
      [
        [1, 14, "Porto_Acre", 9],
        [1, 14, "Eirunepe", 9],
        [1, 14, "Rio_Branco", 9],
        [1, 14, "Acre", 15]
      ],
      [
        [0, 11, "Porto_Acre", 9],
        [0, 11, "Eirunepe", 9],
        [0, 11, "Rio_Branco", 9],
        [0, 11, "Acre", 15]
      ],
      [
        [1, 25, "Goose_Bay", 9],
        [1, 25, "Pangnirtung", 9]
      ],
      [
        [1, 22, "Halifax", 9],
        [1, 22, "Barbados", 9],
        [1, 22, "Blanc-Sablon", 9],
        [1, 22, "Glace_Bay", 9],
        [1, 22, "Goose_Bay", 9],
        [1, 22, "Martinique", 9],
        [1, 22, "Moncton", 9],
        [1, 22, "Pangnirtung", 9],
        [1, 22, "Thule", 9],
        [1, 22, "Bermuda", 13],
        [1, 22, "Atlantic", 16],
        [1, 51, "Baghdad", 12]
      ],
      [
        [0, 52, "Kabul", 12]
      ],
      [
        [1, 6, "Anchorage", 9],
        [1, 6, "Alaska"]
      ],
      [
        [0, 4, "Anchorage", 9],
        [0, 4, "Adak", 9],
        [0, 4, "Atka", 9],
        [0, 4, "Alaska"],
        [0, 4, "Aleutian"]
      ],
      [
        [1, 7, "Anchorage", 9],
        [1, 7, "Juneau", 9],
        [1, 7, "Nome", 9],
        [1, 7, "Yakutat", 9],
        [1, 7, "Alaska"]
      ],
      [
        [0, 6, "Anchorage", 9],
        [0, 6, "Juneau", 9],
        [0, 6, "Nome", 9],
        [0, 6, "Yakutat", 9],
        [0, 6, "Alaska"]
      ],
      [
        [1, 57, "Aqtobe", 12]
      ],
      [
        [0, 51, "Aqtobe", 12],
        [0, 54, "Aqtobe", 12],
        [0, 57, "Aqtobe", 12]
      ],
      [
        [1, 59, "Almaty", 12]
      ],
      [
        [0, 54, "Almaty", 12],
        [0, 57, "Almaty", 12]
      ],
      [
        [1, 51, "Yerevan", 12],
        [1, 54, "Yerevan", 12],
        [1, 22, "Boa_Vista", 9],
        [1, 22, "Campo_Grande", 9],
        [1, 22, "Cuiaba", 9],
        [1, 22, "Manaus", 9],
        [1, 22, "Porto_Velho", 9],
        [1, 22, "West", 15]
      ],
      [
        [0, 47, "Yerevan", 12],
        [0, 51, "Yerevan", 12],
        [0, 14, "Boa_Vista", 9],
        [0, 14, "Campo_Grande", 9],
        [0, 14, "Cuiaba", 9],
        [0, 14, "Manaus", 9],
        [0, 14, "Porto_Velho", 9],
        [0, 14, "West", 15],
        [0, 32, "Amsterdam", 18]
      ],
      [
        [1, 76, "Anadyr", 12],
        [1, 79, "Anadyr", 12],
        [1, 81, "Anadyr", 12]
      ],
      [
        [0, 74, "Anadyr", 12],
        [0, 76, "Anadyr", 12],
        [0, 79, "Anadyr", 12]
      ],
      [
        [0, 13, "Curacao", 9],
        [0, 13, "Aruba", 9]
      ],
      [
        [1, 22, "Halifax", 9],
        [1, 22, "Blanc-Sablon", 9],
        [1, 22, "Glace_Bay", 9],
        [1, 22, "Moncton", 9],
        [1, 22, "Pangnirtung", 9],
        [1, 22, "Puerto_Rico", 9],
        [1, 22, "Atlantic", 16]
      ],
      [
        [1, 54, "Aqtau", 12],
        [1, 57, "Aqtau", 12],
        [1, 57, "Aqtobe", 12]
      ],
      [
        [0, 51, "Aqtau", 12],
        [0, 54, "Aqtau", 12],
        [0, 54, "Aqtobe", 12]
      ],
      [
        [1, 22, "Buenos_Aires", 9],
        [1, 25, "Buenos_Aires", 9],
        [1, 22, "Buenos_Aires", 2],
        [1, 22, "Catamarca", 2],
        [1, 22, "ComodRivadavia", 2],
        [1, 22, "Cordoba", 2],
        [1, 22, "Jujuy", 2],
        [1, 22, "La_Rioja", 2],
        [1, 22, "Mendoza", 2],
        [1, 22, "Rio_Gallegos", 2],
        [1, 22, "San_Juan", 2],
        [1, 22, "Tucuman", 2],
        [1, 22, "Ushuaia", 2],
        [1, 22, "Catamarca", 9],
        [1, 22, "Cordoba", 9],
        [1, 22, "Jujuy", 9],
        [1, 22, "Mendoza", 9],
        [1, 22, "Rosario", 9],
        [1, 22, "Palmer", 10],
        [1, 25, "Buenos_Aires", 2],
        [1, 25, "Catamarca", 2],
        [1, 25, "ComodRivadavia", 2],
        [1, 25, "Cordoba", 2],
        [1, 25, "Jujuy", 2],
        [1, 25, "La_Rioja", 2],
        [1, 25, "Mendoza", 2],
        [1, 25, "Rio_Gallegos", 2],
        [1, 25, "San_Juan", 2],
        [1, 25, "Tucuman", 2],
        [1, 25, "Ushuaia", 2],
        [1, 25, "Catamarca", 9],
        [1, 25, "Cordoba", 9],
        [1, 25, "Jujuy", 9],
        [1, 25, "Mendoza", 9],
        [1, 25, "Rosario", 9],
        [1, 25, "Palmer", 10]
      ],
      [
        [0, 22, "Buenos_Aires", 9],
        [0, 14, "Buenos_Aires", 9],
        [0, 22, "Buenos_Aires", 2],
        [0, 22, "Catamarca", 2],
        [0, 22, "ComodRivadavia", 2],
        [0, 22, "Cordoba", 2],
        [0, 22, "Jujuy", 2],
        [0, 22, "La_Rioja", 2],
        [0, 22, "Mendoza", 2],
        [0, 22, "Rio_Gallegos", 2],
        [0, 22, "San_Juan", 2],
        [0, 22, "Tucuman", 2],
        [0, 22, "Ushuaia", 2],
        [0, 22, "Catamarca", 9],
        [0, 22, "Cordoba", 9],
        [0, 22, "Jujuy", 9],
        [0, 22, "Mendoza", 9],
        [0, 22, "Rosario", 9],
        [0, 22, "Palmer", 10],
        [0, 14, "Buenos_Aires", 2],
        [0, 14, "Catamarca", 2],
        [0, 14, "ComodRivadavia", 2],
        [0, 14, "Cordoba", 2],
        [0, 14, "Jujuy", 2],
        [0, 14, "La_Rioja", 2],
        [0, 14, "Mendoza", 2],
        [0, 14, "Rio_Gallegos", 2],
        [0, 14, "San_Juan", 2],
        [0, 14, "Tucuman", 2],
        [0, 14, "Ushuaia", 2],
        [0, 14, "Catamarca", 9],
        [0, 14, "Cordoba", 9],
        [0, 14, "Jujuy", 9],
        [0, 14, "Mendoza", 9],
        [0, 14, "Rosario", 9],
        [0, 14, "Palmer", 10]
      ],
      [
        [1, 54, "Ashkhabad", 12],
        [1, 57, "Ashkhabad", 12],
        [1, 54, "Ashgabat", 12],
        [1, 57, "Ashgabat", 12]
      ],
      [
        [0, 51, "Ashkhabad", 12],
        [0, 54, "Ashkhabad", 12],
        [0, 51, "Ashgabat", 12],
        [0, 54, "Ashgabat", 12]
      ],
      [
        [0, 47, "Riyadh", 12],
        [0, 14, "Anguilla", 9],
        [0, 14, "Antigua", 9],
        [0, 14, "Aruba", 9],
        [0, 14, "Barbados", 9],
        [0, 14, "Blanc-Sablon", 9],
        [0, 14, "Curacao", 9],
        [0, 14, "Dominica", 9],
        [0, 14, "Glace_Bay", 9],
        [0, 14, "Goose_Bay", 9],
        [0, 14, "Grenada", 9],
        [0, 14, "Guadeloupe", 9],
        [0, 14, "Halifax", 9],
        [0, 14, "Martinique", 9],
        [0, 14, "Miquelon", 9],
        [0, 14, "Moncton", 9],
        [0, 14, "Montserrat", 9],
        [0, 14, "Pangnirtung", 9],
        [0, 14, "Port_of_Spain", 9],
        [0, 14, "Puerto_Rico", 9],
        [0, 14, "Santo_Domingo", 9],
        [0, 14, "St_Kitts", 9],
        [0, 14, "St_Lucia", 9],
        [0, 14, "St_Thomas", 9],
        [0, 14, "St_Vincent", 9],
        [0, 14, "Thule", 9],
        [0, 14, "Tortola", 9],
        [0, 14, "Virgin", 9],
        [0, 14, "Bermuda", 13],
        [0, 14, "Atlantic", 16],
        [0, 47, "Aden", 12],
        [0, 47, "Baghdad", 12],
        [0, 47, "Bahrain", 12],
        [0, 47, "Kuwait", 12],
        [0, 47, "Qatar", 12]
      ],
      [
        [1, 22, "Halifax", 9],
        [1, 22, "Blanc-Sablon", 9],
        [1, 22, "Glace_Bay", 9],
        [1, 22, "Moncton", 9],
        [1, 22, "Pangnirtung", 9],
        [1, 22, "Puerto_Rico", 9],
        [1, 22, "Atlantic", 16]
      ],
      [
        [1, 31, "Azores", 13]
      ],
      [
        [1, 28, "Azores", 13],
        [1, 31, "Azores", 13]
      ],
      [
        [0, 28, "Azores", 13],
        [0, 25, "Azores", 13]
      ],
      [
        [1, 51, "Baku", 12],
        [1, 54, "Baku", 12]
      ],
      [
        [0, 47, "Baku", 12],
        [0, 51, "Baku", 12]
      ],
      [
        [1, 51, "Baku", 12],
        [1, 54, "Baku", 12]
      ],
      [
        [0, 47, "Baku", 12],
        [0, 51, "Baku", 12]
      ],
      [
        [1, 42, "London", 18],
        [1, 42, "Belfast", 18],
        [1, 42, "Gibraltar", 18],
        [1, 42, "Guernsey", 18],
        [1, 42, "Isle_of_Man", 18],
        [1, 42, "Jersey", 18],
        [1, 42, "GB"],
        [1, 42, "GB-Eire"]
      ],
      [
        [1, 4, "Adak", 9],
        [1, 4, "Atka", 9],
        [1, 4, "Nome", 9],
        [1, 4, "Aleutian"],
        [0, 57, "Dacca", 12],
        [0, 57, "Dhaka", 12]
      ],
      [
        [0, 43, "Mogadishu"],
        [0, 43, "Kampala"],
        [0, 43, "Nairobi"]
      ],
      [
        [0, 46, "Nairobi"],
        [0, 46, "Dar_es_Salaam"],
        [0, 46, "Kampala"]
      ],
      [
        [0, 15, "Barbados", 9],
        [0, 27, "Banjul"],
        [0, 41, "Tiraspol", 18],
        [0, 41, "Chisinau", 18]
      ],
      [
        [0, 63, "Brunei", 12],
        [0, 65, "Brunei", 12]
      ],
      [
        [1, 66, "Kuching", 12]
      ],
      [
        [0, 63, "Kuching", 12],
        [0, 65, "Kuching", 12]
      ],
      [
        [1, 19, "La_Paz", 9]
      ],
      [
        [0, 14, "La_Paz", 9]
      ],
      [
        [1, 25, "Sao_Paulo", 9],
        [1, 25, "Araguaina", 9],
        [1, 25, "Bahia", 9],
        [1, 25, "Belem", 9],
        [1, 25, "Fortaleza", 9],
        [1, 25, "Maceio", 9],
        [1, 25, "Recife", 9],
        [1, 25, "East", 15]
      ],
      [
        [0, 22, "Sao_Paulo", 9],
        [0, 22, "Araguaina", 9],
        [0, 22, "Bahia", 9],
        [0, 22, "Belem", 9],
        [0, 22, "Fortaleza", 9],
        [0, 22, "Maceio", 9],
        [0, 22, "Recife", 9],
        [0, 22, "East", 15]
      ],
      [
        [0, 35, "London", 18],
        [1, 35, "London", 18],
        [0, 2, "Adak", 9],
        [0, 2, "Atka", 9],
        [0, 2, "Nome", 9],
        [0, 2, "Midway", 21],
        [0, 2, "Pago_Pago", 21],
        [0, 2, "Samoa", 21],
        [0, 2, "Aleutian"],
        [0, 2, "Samoa"],
        [0, 35, "Belfast", 18],
        [0, 35, "Guernsey", 18],
        [0, 35, "Isle_of_Man", 18],
        [0, 35, "Jersey", 18],
        [0, 35, "GB"],
        [0, 35, "GB-Eire"],
        [1, 35, "Eire"],
        [1, 35, "Belfast", 18],
        [1, 35, "Dublin", 18],
        [1, 35, "Gibraltar", 18],
        [1, 35, "Guernsey", 18],
        [1, 35, "Isle_of_Man", 18],
        [1, 35, "Jersey", 18],
        [1, 35, "GB"],
        [1, 35, "GB-Eire"]
      ],
      [
        [0, 57, "Thimbu", 12],
        [0, 57, "Thimphu", 12]
      ],
      [
        [0, 58, "Calcutta", 12],
        [0, 58, "Dacca", 12],
        [0, 58, "Dhaka", 12],
        [0, 58, "Rangoon", 12]
      ],
      [
        [0, 28, "Canary", 13]
      ],
      [
        [1, 6, "Anchorage", 9],
        [1, 6, "Alaska"]
      ],
      [
        [0, 70, "Adelaide", 14],
        [1, 47, "Gaborone"],
        [1, 47, "Khartoum"]
      ],
      [
        [0, 4, "Anchorage", 9],
        [0, 4, "Alaska"],
        [0, 42, "Khartoum"],
        [0, 42, "Blantyre"],
        [0, 42, "Gaborone"],
        [0, 42, "Harare"],
        [0, 42, "Kigali"],
        [0, 42, "Lusaka"],
        [0, 42, "Maputo"],
        [0, 42, "Windhoek"]
      ],
      [
        [1, 6, "Anchorage", 9],
        [1, 6, "Alaska"]
      ],
      [
        [1, 14, "Rankin_Inlet", 9]
      ],
      [
        [1, 11, "Chicago", 9],
        [1, 14, "Havana", 9],
        [1, 14, "Cuba"],
        [1, 11, "Atikokan", 9],
        [1, 11, "Belize", 9],
        [1, 11, "Cambridge_Bay", 9],
        [1, 11, "Cancun", 9],
        [1, 11, "Chihuahua", 9],
        [1, 11, "Coral_Harbour", 9],
        [1, 11, "Costa_Rica", 9],
        [1, 11, "El_Salvador", 9],
        [1, 11, "Fort_Wayne", 9],
        [1, 11, "Guatemala", 9],
        [1, 11, "Indianapolis", 4],
        [1, 11, "Knox", 4],
        [1, 11, "Marengo", 4],
        [1, 11, "Petersburg", 4],
        [1, 11, "Vevay", 4],
        [1, 11, "Vincennes", 4],
        [1, 11, "Winamac", 4],
        [1, 11, "Indianapolis", 9],
        [1, 11, "Iqaluit", 9],
        [1, 11, "Louisville", 6],
        [1, 11, "Monticello", 6],
        [1, 11, "Knox_IN", 9],
        [1, 11, "Louisville", 9],
        [1, 11, "Managua", 9],
        [1, 11, "Menominee", 9],
        [1, 11, "Merida", 9],
        [1, 11, "Mexico_City", 9],
        [1, 11, "Monterrey", 9],
        [1, 11, "Center", 8],
        [1, 11, "New_Salem", 8],
        [1, 11, "Pangnirtung", 9],
        [1, 11, "Rainy_River", 9],
        [1, 11, "Rankin_Inlet", 9],
        [1, 11, "Tegucigalpa", 9],
        [1, 11, "Winnipeg", 9],
        [1, 11, "Central", 16],
        [1, 11, "CST6CDT"],
        [1, 11, "General", 20],
        [1, 11, "Central"],
        [1, 11, "East-Indiana"],
        [1, 11, "Indiana-Starke"],
        [1, 69, "Shanghai", 12],
        [1, 69, "Chongqing", 12],
        [1, 69, "Chungking", 12],
        [1, 69, "Harbin", 12],
        [1, 69, "Kashgar", 12],
        [1, 69, "Taipei", 12],
        [1, 69, "Urumqi", 12],
        [1, 69, "PRC"],
        [1, 69, "ROC"]
      ],
      [
        [1, 47, "Berlin", 18],
        [1, 47, "CET"]
      ],
      [
        [1, 42, "Berlin", 18],
        [1, 47, "Kaliningrad", 18],
        [1, 42, "Algiers"],
        [1, 42, "Ceuta"],
        [1, 42, "Tripoli"],
        [1, 42, "Tunis"],
        [1, 42, "Longyearbyen", 11],
        [1, 42, "Jan_Mayen", 13],
        [1, 42, "CET"],
        [1, 42, "Amsterdam", 18],
        [1, 42, "Andorra", 18],
        [1, 42, "Athens", 18],
        [1, 42, "Belgrade", 18],
        [1, 42, "Bratislava", 18],
        [1, 42, "Brussels", 18],
        [1, 42, "Budapest", 18],
        [1, 42, "Chisinau", 18],
        [1, 42, "Copenhagen", 18],
        [1, 42, "Gibraltar", 18],
        [1, 42, "Kaliningrad", 18],
        [1, 42, "Kiev", 18],
        [1, 42, "Lisbon", 18],
        [1, 42, "Ljubljana", 18],
        [1, 42, "Luxembourg", 18],
        [1, 42, "Madrid", 18],
        [1, 42, "Malta", 18],
        [1, 42, "Minsk", 18],
        [1, 42, "Monaco", 18],
        [1, 42, "Oslo", 18],
        [1, 42, "Paris", 18],
        [1, 42, "Podgorica", 18],
        [1, 42, "Prague", 18],
        [1, 42, "Riga", 18],
        [1, 42, "Rome", 18],
        [1, 42, "San_Marino", 18],
        [1, 42, "Sarajevo", 18],
        [1, 42, "Simferopol", 18],
        [1, 42, "Skopje", 18],
        [1, 42, "Sofia", 18],
        [1, 42, "Stockholm", 18],
        [1, 42, "Tallinn", 18],
        [1, 42, "Tirane", 18],
        [1, 42, "Tiraspol", 18],
        [1, 42, "Uzhgorod", 18],
        [1, 42, "Vaduz", 18],
        [1, 42, "Vatican", 18],
        [1, 42, "Vienna", 18],
        [1, 42, "Vilnius", 18],
        [1, 42, "Warsaw", 18],
        [1, 42, "Zagreb", 18],
        [1, 42, "Zaporozhye", 18],
        [1, 42, "Zurich", 18],
        [1, 42, "Libya"],
        [1, 42, "Poland"],
        [1, 42, "Portugal"],
        [1, 42, "WET"]
      ],
      [
        [0, 35, "Berlin", 18],
        [0, 35, "Algiers"],
        [0, 35, "Casablanca"],
        [0, 35, "Ceuta"],
        [0, 35, "Tripoli"],
        [0, 35, "Tunis"],
        [0, 35, "Longyearbyen", 11],
        [0, 35, "Jan_Mayen", 13],
        [0, 35, "CET"],
        [0, 35, "Amsterdam", 18],
        [0, 35, "Andorra", 18],
        [0, 35, "Athens", 18],
        [0, 35, "Belgrade", 18],
        [0, 35, "Bratislava", 18],
        [0, 35, "Brussels", 18],
        [0, 35, "Budapest", 18],
        [0, 35, "Chisinau", 18],
        [0, 35, "Copenhagen", 18],
        [0, 35, "Gibraltar", 18],
        [0, 35, "Kaliningrad", 18],
        [0, 35, "Kiev", 18],
        [0, 35, "Lisbon", 18],
        [0, 35, "Ljubljana", 18],
        [0, 35, "Luxembourg", 18],
        [0, 35, "Madrid", 18],
        [0, 35, "Malta", 18],
        [0, 35, "Minsk", 18],
        [0, 35, "Monaco", 18],
        [0, 35, "Oslo", 18],
        [0, 35, "Paris", 18],
        [0, 35, "Podgorica", 18],
        [0, 35, "Prague", 18],
        [0, 35, "Riga", 18],
        [0, 35, "Rome", 18],
        [0, 35, "San_Marino", 18],
        [0, 35, "Sarajevo", 18],
        [0, 35, "Simferopol", 18],
        [0, 35, "Skopje", 18],
        [0, 35, "Sofia", 18],
        [0, 35, "Stockholm", 18],
        [0, 35, "Tallinn", 18],
        [0, 35, "Tirane", 18],
        [0, 35, "Tiraspol", 18],
        [0, 35, "Uzhgorod", 18],
        [0, 35, "Vaduz", 18],
        [0, 35, "Vatican", 18],
        [0, 35, "Vienna", 18],
        [0, 35, "Vilnius", 18],
        [0, 35, "Warsaw", 18],
        [0, 35, "Zagreb", 18],
        [0, 35, "Zaporozhye", 18],
        [0, 35, "Zurich", 18],
        [0, 35, "Libya"],
        [0, 35, "Poland"],
        [0, 35, "Portugal"],
        [0, 35, "WET"],
        [0, 42, "Kaliningrad", 18]
      ],
      [
        [1, 28, "Scoresbysund", 9]
      ],
      [
        [0, 25, "Scoresbysund", 9]
      ],
      [
        [1, 80, "Chatham", 21],
        [1, 80, "NZ-CHAT"]
      ],
      [
        [0, 78, "Chatham", 21],
        [0, 78, "NZ-CHAT"]
      ],
      [
        [0, 67, "Harbin", 12],
        [0, 69, "Harbin", 12]
      ],
      [
        [1, 10, "Belize", 9]
      ],
      [
        [1, 72, "Choibalsan", 12]
      ],
      [
        [0, 69, "Choibalsan", 12]
      ],
      [
        [0, 65, "Dili", 12],
        [0, 65, "Makassar", 12],
        [0, 65, "Pontianak", 12],
        [0, 65, "Ujung_Pandang", 12]
      ],
      [
        [0, 69, "Sakhalin", 12]
      ],
      [
        [1, 5, "Rarotonga", 21]
      ],
      [
        [0, 4, "Rarotonga", 21]
      ],
      [
        [1, 22, "Santiago", 9],
        [1, 14, "Santiago", 9],
        [1, 22, "Palmer", 10],
        [1, 22, "Continental", 17],
        [1, 14, "Continental", 17]
      ],
      [
        [0, 14, "Santiago", 9],
        [0, 11, "Santiago", 9],
        [0, 14, "Palmer", 10],
        [0, 14, "Continental", 17],
        [0, 11, "Continental", 17]
      ],
      [
        [1, 14, "Bogota", 9]
      ],
      [
        [0, 11, "Bogota", 9]
      ],
      [
        [1, 11, "Chicago", 9],
        [1, 11, "Atikokan", 9],
        [1, 11, "Coral_Harbour", 9],
        [1, 11, "Fort_Wayne", 9],
        [1, 11, "Indianapolis", 4],
        [1, 11, "Knox", 4],
        [1, 11, "Marengo", 4],
        [1, 11, "Petersburg", 4],
        [1, 11, "Vevay", 4],
        [1, 11, "Vincennes", 4],
        [1, 11, "Winamac", 4],
        [1, 11, "Indianapolis", 9],
        [1, 11, "Louisville", 6],
        [1, 11, "Monticello", 6],
        [1, 11, "Knox_IN", 9],
        [1, 11, "Louisville", 9],
        [1, 11, "Menominee", 9],
        [1, 11, "Rainy_River", 9],
        [1, 11, "Rankin_Inlet", 9],
        [1, 11, "Winnipeg", 9],
        [1, 11, "Central", 16],
        [1, 11, "CST6CDT"],
        [1, 11, "Central"],
        [1, 11, "East-Indiana"],
        [1, 11, "Indiana-Starke"]
      ],
      [
        [0, 9, "Chicago", 9],
        [0, 11, "Havana", 9],
        [0, 11, "Cuba"],
        [0, 9, "Atikokan", 9],
        [0, 9, "Belize", 9],
        [0, 9, "Cambridge_Bay", 9],
        [0, 9, "Cancun", 9],
        [0, 9, "Chihuahua", 9],
        [0, 9, "Coral_Harbour", 9],
        [0, 9, "Costa_Rica", 9],
        [0, 9, "Detroit", 9],
        [0, 9, "El_Salvador", 9],
        [0, 9, "Fort_Wayne", 9],
        [0, 9, "Guatemala", 9],
        [0, 9, "Hermosillo", 9],
        [0, 9, "Indianapolis", 4],
        [0, 9, "Knox", 4],
        [0, 9, "Marengo", 4],
        [0, 9, "Petersburg", 4],
        [0, 9, "Vevay", 4],
        [0, 9, "Vincennes", 4],
        [0, 9, "Winamac", 4],
        [0, 9, "Indianapolis", 9],
        [0, 9, "Iqaluit", 9],
        [0, 9, "Louisville", 6],
        [0, 9, "Monticello", 6],
        [0, 9, "Knox_IN", 9],
        [0, 9, "Louisville", 9],
        [0, 9, "Managua", 9],
        [0, 9, "Mazatlan", 9],
        [0, 9, "Menominee", 9],
        [0, 9, "Merida", 9],
        [0, 9, "Mexico_City", 9],
        [0, 9, "Monterrey", 9],
        [0, 9, "Center", 8],
        [0, 9, "New_Salem", 8],
        [0, 9, "Pangnirtung", 9],
        [0, 9, "Rainy_River", 9],
        [0, 9, "Rankin_Inlet", 9],
        [0, 9, "Regina", 9],
        [0, 9, "Swift_Current", 9],
        [0, 9, "Tegucigalpa", 9],
        [0, 9, "Winnipeg", 9],
        [0, 9, "Central", 16],
        [0, 9, "East-Saskatchewan", 16],
        [0, 9, "Saskatchewan", 16],
        [0, 9, "CST6CDT"],
        [0, 9, "BajaSur", 20],
        [0, 9, "General", 20],
        [0, 9, "Central"],
        [0, 9, "East-Indiana"],
        [0, 9, "Indiana-Starke"],
        [0, 9, "Michigan"],
        [0, 65, "Chongqing", 12],
        [0, 65, "Chungking", 12],
        [0, 65, "Harbin", 12],
        [0, 65, "Kashgar", 12],
        [0, 65, "Macao", 12],
        [0, 65, "Macau", 12],
        [0, 65, "Shanghai", 12],
        [0, 65, "Taipei", 12],
        [0, 65, "Urumqi", 12],
        [0, 65, "PRC"],
        [0, 65, "ROC"],
        [0, 70, "Jayapura", 12],
        [0, 70, "Adelaide", 14],
        [0, 70, "Broken_Hill", 14],
        [0, 70, "Darwin", 14],
        [0, 70, "North", 14],
        [0, 70, "South", 14],
        [0, 70, "Yancowinna", 14],
        [1, 73, "Adelaide", 14],
        [1, 73, "Broken_Hill", 14],
        [1, 73, "Darwin", 14],
        [1, 73, "North", 14],
        [1, 73, "South", 14],
        [1, 73, "Yancowinna", 14]
      ],
      [
        [1, 28, "Cape_Verde", 13]
      ],
      [
        [0, 28, "Cape_Verde", 13],
        [0, 25, "Cape_Verde", 13]
      ],
      [
        [0, 68, "Eucla", 14],
        [1, 71, "Eucla", 14]
      ],
      [
        [1, 11, "Chicago", 9],
        [1, 11, "Atikokan", 9],
        [1, 11, "Coral_Harbour", 9],
        [1, 11, "Fort_Wayne", 9],
        [1, 11, "Indianapolis", 4],
        [1, 11, "Knox", 4],
        [1, 11, "Marengo", 4],
        [1, 11, "Petersburg", 4],
        [1, 11, "Vevay", 4],
        [1, 11, "Vincennes", 4],
        [1, 11, "Winamac", 4],
        [1, 11, "Indianapolis", 9],
        [1, 11, "Louisville", 6],
        [1, 11, "Monticello", 6],
        [1, 11, "Knox_IN", 9],
        [1, 11, "Louisville", 9],
        [1, 11, "Menominee", 9],
        [1, 11, "Mexico_City", 9],
        [1, 11, "Rainy_River", 9],
        [1, 11, "Rankin_Inlet", 9],
        [1, 11, "Winnipeg", 9],
        [1, 11, "Central", 16],
        [1, 11, "CST6CDT"],
        [1, 11, "General", 20],
        [1, 11, "Central"],
        [1, 11, "East-Indiana"],
        [1, 11, "Indiana-Starke"]
      ],
      [
        [0, 72, "Guam", 21],
        [0, 72, "Saipan", 21]
      ],
      [
        [0, 57, "Dacca", 12],
        [0, 57, "Dhaka", 12]
      ],
      [
        [0, 59, "Davis", 10]
      ],
      [
        [0, 72, "DumontDUrville", 10]
      ],
      [
        [1, 57, "Dushanbe", 12],
        [1, 59, "Dushanbe", 12]
      ],
      [
        [0, 54, "Dushanbe", 12],
        [0, 57, "Dushanbe", 12]
      ],
      [
        [1, 11, "EasterIsland", 17],
        [1, 9, "EasterIsland", 17],
        [1, 11, "Easter", 21],
        [1, 9, "Easter", 21]
      ],
      [
        [0, 9, "EasterIsland", 17],
        [0, 8, "EasterIsland", 17],
        [0, 9, "Easter", 21],
        [0, 8, "Easter", 21],
        [1, 51, "Antananarivo", 19]
      ],
      [
        [0, 47, "Khartoum"],
        [0, 47, "Addis_Ababa"],
        [0, 47, "Asmara"],
        [0, 47, "Asmera"],
        [0, 47, "Dar_es_Salaam"],
        [0, 47, "Djibouti"],
        [0, 47, "Kampala"],
        [0, 47, "Mogadishu"],
        [0, 47, "Nairobi"],
        [0, 47, "Antananarivo", 19],
        [0, 47, "Comoro", 19],
        [0, 47, "Mayotte", 19]
      ],
      [
        [0, 11, "Guayaquil", 9],
        [0, 11, "Galapagos", 21]
      ],
      [
        [1, 22, "Iqaluit", 9]
      ],
      [
        [1, 14, "New_York", 9],
        [1, 14, "Cancun", 9],
        [1, 14, "Detroit", 9],
        [1, 14, "Fort_Wayne", 9],
        [1, 14, "Grand_Turk", 9],
        [1, 14, "Indianapolis", 4],
        [1, 14, "Marengo", 4],
        [1, 14, "Vevay", 4],
        [1, 14, "Vincennes", 4],
        [1, 14, "Winamac", 4],
        [1, 14, "Indianapolis", 9],
        [1, 14, "Iqaluit", 9],
        [1, 14, "Jamaica", 9],
        [1, 14, "Louisville", 6],
        [1, 14, "Monticello", 6],
        [1, 14, "Louisville", 9],
        [1, 14, "Montreal", 9],
        [1, 14, "Nassau", 9],
        [1, 14, "Nipigon", 9],
        [1, 14, "Pangnirtung", 9],
        [1, 14, "Port-au-Prince", 9],
        [1, 14, "Santo_Domingo", 9],
        [1, 14, "Thunder_Bay", 9],
        [1, 14, "Toronto", 9],
        [1, 14, "Eastern", 16],
        [1, 14, "EST"],
        [1, 14, "EST5EDT"],
        [1, 14, "Jamaica"],
        [1, 14, "East-Indiana"],
        [1, 14, "Eastern"],
        [1, 14, "Michigan"]
      ],
      [
        [1, 47, "Helsinki", 18],
        [1, 47, "Cairo"],
        [1, 47, "Amman", 12],
        [1, 47, "Beirut", 12],
        [1, 47, "Damascus", 12],
        [1, 47, "Gaza", 12],
        [1, 47, "Istanbul", 12],
        [1, 47, "Nicosia", 12],
        [1, 47, "EET"],
        [1, 47, "Egypt"],
        [1, 47, "Athens", 18],
        [1, 47, "Bucharest", 18],
        [1, 47, "Chisinau", 18],
        [1, 47, "Istanbul", 18],
        [1, 47, "Kaliningrad", 18],
        [1, 47, "Kiev", 18],
        [1, 47, "Mariehamn", 18],
        [1, 47, "Minsk", 18],
        [1, 47, "Moscow", 18],
        [1, 47, "Nicosia", 18],
        [1, 47, "Riga", 18],
        [1, 47, "Simferopol", 18],
        [1, 47, "Sofia", 18],
        [1, 47, "Tallinn", 18],
        [1, 47, "Tiraspol", 18],
        [1, 47, "Uzhgorod", 18],
        [1, 47, "Vilnius", 18],
        [1, 47, "Warsaw", 18],
        [1, 47, "Zaporozhye", 18],
        [1, 47, "Poland"],
        [1, 47, "Turkey"],
        [1, 47, "W-SU"]
      ],
      [
        [0, 42, "Helsinki", 18],
        [1, 47, "Gaza", 12],
        [0, 42, "Cairo"],
        [0, 42, "Tripoli"],
        [0, 42, "Amman", 12],
        [0, 42, "Beirut", 12],
        [0, 42, "Damascus", 12],
        [0, 42, "Gaza", 12],
        [0, 42, "Istanbul", 12],
        [0, 42, "Nicosia", 12],
        [0, 42, "EET"],
        [0, 42, "Egypt"],
        [0, 42, "Athens", 18],
        [0, 42, "Bucharest", 18],
        [0, 42, "Chisinau", 18],
        [0, 42, "Istanbul", 18],
        [0, 42, "Kaliningrad", 18],
        [0, 42, "Kiev", 18],
        [0, 42, "Mariehamn", 18],
        [0, 42, "Minsk", 18],
        [0, 42, "Moscow", 18],
        [0, 42, "Nicosia", 18],
        [0, 42, "Riga", 18],
        [0, 42, "Simferopol", 18],
        [0, 42, "Sofia", 18],
        [0, 42, "Tallinn", 18],
        [0, 42, "Tiraspol", 18],
        [0, 42, "Uzhgorod", 18],
        [0, 42, "Vilnius", 18],
        [0, 42, "Warsaw", 18],
        [0, 42, "Zaporozhye", 18],
        [0, 42, "Libya"],
        [0, 42, "Poland"],
        [0, 42, "Turkey"],
        [0, 42, "W-SU"]
      ],
      [
        [1, 31, "Scoresbysund", 9]
      ],
      [
        [0, 28, "Scoresbysund", 9]
      ],
      [
        [1, 13, "Santo_Domingo", 9]
      ],
      [
        [0, 69, "Jayapura", 12]
      ],
      [
        [1, 14, "New_York", 9],
        [1, 14, "Detroit", 9],
        [1, 14, "Iqaluit", 9],
        [1, 14, "Montreal", 9],
        [1, 14, "Nipigon", 9],
        [1, 14, "Thunder_Bay", 9],
        [1, 14, "Toronto", 9],
        [1, 14, "Eastern", 16],
        [1, 14, "EST"],
        [1, 14, "EST5EDT"],
        [1, 14, "Eastern"],
        [1, 14, "Michigan"]
      ],
      [
        [0, 11, "New_York", 9],
        [0, 11, "Antigua", 9],
        [0, 11, "Atikokan", 9],
        [0, 11, "Cambridge_Bay", 9],
        [0, 11, "Cancun", 9],
        [0, 11, "Cayman", 9],
        [0, 11, "Chicago", 9],
        [0, 11, "Coral_Harbour", 9],
        [0, 11, "Detroit", 9],
        [0, 11, "Fort_Wayne", 9],
        [0, 11, "Grand_Turk", 9],
        [0, 11, "Indianapolis", 4],
        [0, 11, "Knox", 4],
        [0, 11, "Marengo", 4],
        [0, 11, "Petersburg", 4],
        [0, 11, "Vevay", 4],
        [0, 11, "Vincennes", 4],
        [0, 11, "Winamac", 4],
        [0, 11, "Indianapolis", 9],
        [0, 11, "Iqaluit", 9],
        [0, 11, "Jamaica", 9],
        [0, 11, "Louisville", 6],
        [0, 11, "Monticello", 6],
        [0, 11, "Knox_IN", 9],
        [0, 11, "Louisville", 9],
        [0, 11, "Managua", 9],
        [0, 11, "Menominee", 9],
        [0, 11, "Merida", 9],
        [0, 11, "Montreal", 9],
        [0, 11, "Nassau", 9],
        [0, 11, "Nipigon", 9],
        [0, 11, "Panama", 9],
        [0, 11, "Pangnirtung", 9],
        [0, 11, "Port-au-Prince", 9],
        [0, 11, "Rankin_Inlet", 9],
        [0, 11, "Santo_Domingo", 9],
        [0, 11, "Thunder_Bay", 9],
        [0, 11, "Toronto", 9],
        [0, 11, "Eastern", 16],
        [0, 11, "EST"],
        [0, 11, "EST5EDT"],
        [0, 11, "Jamaica"],
        [0, 11, "Central"],
        [0, 11, "East-Indiana"],
        [0, 11, "Eastern"],
        [0, 11, "Indiana-Starke"],
        [0, 11, "Michigan"],
        [0, 72, "ACT", 14],
        [0, 72, "Brisbane", 14],
        [0, 72, "Canberra", 14],
        [0, 72, "Currie", 14],
        [0, 72, "Hobart", 14],
        [0, 72, "Lindeman", 14],
        [0, 72, "Melbourne", 14],
        [0, 72, "NSW", 14],
        [0, 72, "Queensland", 14],
        [0, 72, "Sydney", 14],
        [0, 72, "Tasmania", 14],
        [0, 72, "Victoria", 14],
        [1, 74, "Melbourne", 14],
        [1, 74, "ACT", 14],
        [1, 74, "Brisbane", 14],
        [1, 74, "Canberra", 14],
        [1, 74, "Currie", 14],
        [1, 74, "Hobart", 14],
        [1, 74, "Lindeman", 14],
        [1, 74, "NSW", 14],
        [1, 74, "Queensland", 14],
        [1, 74, "Sydney", 14],
        [1, 74, "Tasmania", 14],
        [1, 74, "Victoria", 14]
      ],
      [
        [1, 14, "New_York", 9],
        [1, 14, "Detroit", 9],
        [1, 14, "Iqaluit", 9],
        [1, 14, "Montreal", 9],
        [1, 14, "Nipigon", 9],
        [1, 14, "Thunder_Bay", 9],
        [1, 14, "Toronto", 9],
        [1, 14, "Eastern", 16],
        [1, 14, "EST"],
        [1, 14, "EST5EDT"],
        [1, 14, "Eastern"],
        [1, 14, "Michigan"]
      ],
      [
        [1, 79, "Fiji", 21]
      ],
      [
        [0, 76, "Fiji", 21]
      ],
      [
        [1, 22, "Stanley", 13],
        [1, 25, "Stanley", 13]
      ],
      [
        [0, 22, "Stanley", 13],
        [0, 14, "Stanley", 13]
      ],
      [
        [1, 28, "Noronha", 9],
        [1, 28, "DeNoronha", 15]
      ],
      [
        [0, 25, "Noronha", 9],
        [0, 25, "DeNoronha", 15]
      ],
      [
        [0, 51, "Aqtau", 12],
        [0, 54, "Aqtau", 12]
      ],
      [
        [1, 57, "Bishkek", 12],
        [1, 59, "Bishkek", 12]
      ],
      [
        [0, 54, "Bishkek", 12],
        [0, 57, "Bishkek", 12]
      ],
      [
        [0, 9, "Galapagos", 21]
      ],
      [
        [0, 6, "Gambier", 21]
      ],
      [
        [0, 16, "Guyana", 9]
      ],
      [
        [1, 51, "Tbilisi", 12],
        [1, 54, "Tbilisi", 12]
      ],
      [
        [0, 47, "Tbilisi", 12],
        [0, 51, "Tbilisi", 12]
      ],
      [
        [0, 22, "Cayenne", 9],
        [0, 14, "Cayenne", 9]
      ],
      [
        [1, 33, "Accra"]
      ],
      [
        [0, 31, "Abidjan"],
        [0, 31, "Accra"],
        [0, 31, "Bamako"],
        [0, 31, "Banjul"],
        [0, 31, "Bissau"],
        [0, 31, "Conakry"],
        [0, 31, "Dakar"],
        [0, 31, "Freetown"],
        [0, 31, "Malabo"],
        [0, 31, "Monrovia"],
        [0, 31, "Niamey"],
        [0, 31, "Nouakchott"],
        [0, 31, "Ouagadougou"],
        [0, 31, "Porto-Novo"],
        [0, 31, "Sao_Tome"],
        [0, 31, "Timbuktu"],
        [0, 31, "Danmarkshavn", 9],
        [0, 31, "Reykjavik", 13],
        [0, 31, "St_Helena", 13],
        [0, 31, "Eire"],
        [0, 31, "Belfast", 18],
        [0, 31, "Dublin", 18],
        [0, 31, "Gibraltar", 18],
        [0, 31, "Guernsey", 18],
        [0, 31, "Isle_of_Man", 18],
        [0, 31, "Jersey", 18],
        [0, 31, "London", 18],
        [0, 31, "GB"],
        [0, 31, "GB-Eire"],
        [0, 31, "Iceland"]
      ],
      [
        [0, 51, "Dubai", 12],
        [0, 51, "Bahrain", 12],
        [0, 51, "Muscat", 12],
        [0, 51, "Qatar", 12]
      ],
      [
        [0, 22, "Guyana", 9],
        [0, 16, "Guyana", 9],
        [0, 14, "Guyana", 9]
      ],
      [
        [1, 6, "Adak", 9],
        [1, 6, "Atka", 9],
        [1, 6, "Aleutian"]
      ],
      [
        [0, 4, "Adak", 9],
        [0, 4, "Atka", 9],
        [0, 4, "Aleutian"]
      ],
      [
        [1, 5, "Honolulu", 21],
        [1, 5, "HST"],
        [1, 5, "Hawaii"]
      ],
      [
        [1, 69, "Hong_Kong", 12],
        [1, 69, "Hongkong"]
      ],
      [
        [0, 65, "Hong_Kong", 12],
        [0, 65, "Hongkong"]
      ],
      [
        [1, 65, "Hovd", 12]
      ],
      [
        [0, 57, "Hovd", 12],
        [0, 59, "Hovd", 12]
      ],
      [
        [1, 5, "Honolulu", 21],
        [1, 5, "HST"],
        [1, 5, "Hawaii"]
      ],
      [
        [0, 4, "Honolulu", 21],
        [0, 3, "Honolulu", 21],
        [0, 4, "HST"],
        [0, 4, "Hawaii"],
        [0, 3, "HST"],
        [0, 3, "Hawaii"]
      ],
      [
        [1, 5, "Honolulu", 21],
        [1, 5, "HST"],
        [1, 5, "Hawaii"]
      ],
      [
        [0, 59, "Bangkok", 12],
        [0, 59, "Phnom_Penh", 12],
        [0, 59, "Saigon", 12],
        [0, 59, "Vientiane", 12],
        [0, 65, "Phnom_Penh", 12],
        [0, 65, "Saigon", 12],
        [0, 65, "Vientiane", 12]
      ],
      [
        [1, 51, "Jerusalem", 12],
        [1, 51, "Tel_Aviv", 12],
        [1, 51, "Israel"]
      ],
      [
        [1, 47, "Jerusalem", 12],
        [1, 47, "Gaza", 12],
        [1, 47, "Tel_Aviv", 12],
        [1, 47, "Israel"]
      ],
      [
        [1, 57, "Colombo", 12]
      ],
      [
        [0, 54, "Chagos", 19],
        [0, 57, "Chagos", 19]
      ],
      [
        [1, 52, "Tehran", 12],
        [1, 54, "Tehran", 12],
        [1, 52, "Iran"],
        [1, 54, "Iran"]
      ],
      [
        [1, 65, "Irkutsk", 12],
        [1, 69, "Irkutsk", 12]
      ],
      [
        [0, 59, "Irkutsk", 12],
        [0, 65, "Irkutsk", 12]
      ],
      [
        [0, 49, "Tehran", 12],
        [0, 51, "Tehran", 12],
        [0, 49, "Iran"],
        [0, 51, "Iran"]
      ],
      [
        [1, 31, "Reykjavik", 13],
        [1, 31, "Iceland"]
      ],
      [
        [0, 42, "Jerusalem", 12],
        [0, 28, "Reykjavik", 13],
        [0, 28, "Iceland"],
        [0, 55, "Calcutta", 12],
        [0, 55, "Colombo", 12],
        [0, 55, "Dacca", 12],
        [0, 55, "Dhaka", 12],
        [0, 55, "Karachi", 12],
        [0, 55, "Katmandu", 12],
        [0, 55, "Thimbu", 12],
        [0, 55, "Thimphu", 12],
        [1, 34, "Eire"],
        [1, 34, "Dublin", 18],
        [1, 58, "Calcutta", 12],
        [1, 58, "Colombo", 12],
        [1, 58, "Karachi", 12],
        [0, 35, "Eire"],
        [0, 35, "Dublin", 18],
        [1, 35, "Eire"],
        [1, 35, "Dublin", 18],
        [0, 42, "Gaza", 12],
        [0, 42, "Tel_Aviv", 12],
        [0, 42, "Israel"]
      ],
      [
        [0, 62, "Jakarta", 12]
      ],
      [
        [1, 72, "Tokyo", 12],
        [1, 72, "Japan"]
      ],
      [
        [0, 69, "Tokyo", 12],
        [0, 69, "Dili", 12],
        [0, 69, "Jakarta", 12],
        [0, 69, "Kuala_Lumpur", 12],
        [0, 69, "Kuching", 12],
        [0, 69, "Makassar", 12],
        [0, 69, "Manila", 12],
        [0, 69, "Pontianak", 12],
        [0, 69, "Rangoon", 12],
        [0, 69, "Sakhalin", 12],
        [0, 69, "Singapore", 12],
        [0, 69, "Ujung_Pandang", 12],
        [0, 69, "Japan"],
        [0, 69, "Nauru", 21],
        [0, 69, "Singapore"]
      ],
      [
        [0, 54, "Karachi", 12]
      ],
      [
        [0, 54, "Kashgar", 12],
        [0, 55, "Kashgar", 12]
      ],
      [
        [1, 69, "Seoul", 12],
        [1, 72, "Seoul", 12],
        [1, 69, "ROK"],
        [1, 72, "ROK"]
      ],
      [
        [1, 57, "Bishkek", 12]
      ],
      [
        [0, 54, "Bishkek", 12],
        [0, 57, "Bishkek", 12]
      ],
      [
        [1, 57, "Qyzylorda", 12]
      ],
      [
        [0, 51, "Qyzylorda", 12],
        [0, 54, "Qyzylorda", 12],
        [0, 57, "Qyzylorda", 12]
      ],
      [
        [0, 38, "Vilnius", 18]
      ],
      [
        [0, 74, "Kosrae", 21],
        [0, 76, "Kosrae", 21]
      ],
      [
        [1, 59, "Krasnoyarsk", 12],
        [1, 65, "Krasnoyarsk", 12]
      ],
      [
        [0, 57, "Krasnoyarsk", 12],
        [0, 59, "Krasnoyarsk", 12]
      ],
      [
        [0, 65, "Seoul", 12],
        [0, 67, "Seoul", 12],
        [0, 69, "Seoul", 12],
        [0, 65, "Pyongyang", 12],
        [0, 65, "ROK"],
        [0, 67, "Pyongyang", 12],
        [0, 67, "ROK"],
        [0, 69, "Pyongyang", 12],
        [0, 69, "ROK"]
      ],
      [
        [1, 47, "Samara", 18],
        [1, 51, "Samara", 18],
        [1, 54, "Samara", 18]
      ],
      [
        [0, 47, "Samara", 18],
        [0, 51, "Samara", 18]
      ],
      [
        [0, 0, "Kwajalein", 21],
        [0, 0, "Kwajalein"]
      ],
      [
        [0, 73, "Lord_Howe", 14],
        [1, 74, "Lord_Howe", 14],
        [1, 75, "Lord_Howe", 14],
        [0, 73, "LHI", 14],
        [1, 74, "LHI", 14],
        [1, 75, "LHI", 14]
      ],
      [
        [0, 4, "Kiritimati", 21],
        [0, 81, "Kiritimati", 21]
      ],
      [
        [0, 57, "Colombo", 12],
        [0, 58, "Colombo", 12]
      ],
      [
        [0, 59, "Chongqing", 12],
        [0, 59, "Chungking", 12]
      ],
      [
        [0, 29, "Monrovia"]
      ],
      [
        [1, 45, "Riga", 18]
      ],
      [
        [1, 35, "Madeira", 13]
      ],
      [
        [1, 31, "Madeira", 13]
      ],
      [
        [0, 28, "Madeira", 13]
      ],
      [
        [1, 74, "Magadan", 12],
        [1, 76, "Magadan", 12]
      ],
      [
        [0, 72, "Magadan", 12],
        [0, 74, "Magadan", 12]
      ],
      [
        [1, 62, "Singapore", 12],
        [1, 62, "Kuala_Lumpur", 12],
        [1, 62, "Singapore"]
      ],
      [
        [0, 59, "Singapore", 12],
        [0, 62, "Singapore", 12],
        [0, 63, "Singapore", 12],
        [0, 59, "Kuala_Lumpur", 12],
        [0, 59, "Singapore"],
        [0, 62, "Kuala_Lumpur", 12],
        [0, 62, "Singapore"],
        [0, 63, "Kuala_Lumpur", 12],
        [0, 63, "Singapore"]
      ],
      [
        [0, 5, "Marquesas", 21]
      ],
      [
        [0, 57, "Mawson", 10]
      ],
      [
        [1, 11, "Cambridge_Bay", 9],
        [1, 11, "Yellowknife", 9]
      ],
      [
        [1, 53, "Moscow", 18],
        [1, 53, "W-SU"]
      ],
      [
        [1, 9, "Denver", 9],
        [1, 9, "Boise", 9],
        [1, 9, "Cambridge_Bay", 9],
        [1, 9, "Chihuahua", 9],
        [1, 9, "Edmonton", 9],
        [1, 9, "Hermosillo", 9],
        [1, 9, "Inuvik", 9],
        [1, 9, "Mazatlan", 9],
        [1, 9, "Center", 8],
        [1, 9, "New_Salem", 8],
        [1, 9, "Phoenix", 9],
        [1, 9, "Regina", 9],
        [1, 9, "Shiprock", 9],
        [1, 9, "Swift_Current", 9],
        [1, 9, "Yellowknife", 9],
        [1, 9, "East-Saskatchewan", 16],
        [1, 9, "Mountain", 16],
        [1, 9, "Saskatchewan", 16],
        [1, 9, "BajaSur", 20],
        [1, 9, "MST"],
        [1, 9, "MST7MDT"],
        [1, 9, "Navajo"],
        [1, 9, "Arizona"],
        [1, 9, "Mountain"]
      ],
      [
        [1, 42, "MET"]
      ],
      [
        [0, 35, "MET"]
      ],
      [
        [0, 76, "Kwajalein", 21],
        [0, 76, "Kwajalein"],
        [0, 76, "Majuro", 21]
      ],
      [
        [0, 44, "Moscow", 18],
        [0, 58, "Rangoon", 12],
        [0, 64, "Makassar", 12],
        [0, 64, "Ujung_Pandang", 12],
        [0, 44, "W-SU"]
      ],
      [
        [1, 69, "Macao", 12],
        [1, 69, "Macau", 12]
      ],
      [
        [0, 65, "Macao", 12],
        [0, 65, "Macau", 12]
      ],
      [
        [1, 9, "Denver", 9],
        [1, 9, "Boise", 9],
        [1, 9, "Cambridge_Bay", 9],
        [1, 9, "Edmonton", 9],
        [1, 9, "Center", 8],
        [1, 9, "New_Salem", 8],
        [1, 9, "Regina", 9],
        [1, 9, "Shiprock", 9],
        [1, 9, "Swift_Current", 9],
        [1, 9, "Yellowknife", 9],
        [1, 9, "East-Saskatchewan", 16],
        [1, 9, "Mountain", 16],
        [1, 9, "Saskatchewan", 16],
        [1, 9, "MST"],
        [1, 9, "MST7MDT"],
        [1, 9, "Navajo"],
        [1, 9, "Mountain"],
        [0, 72, "Saipan", 21]
      ],
      [
        [1, 51, "Moscow", 18],
        [1, 54, "Moscow", 18],
        [1, 51, "Chisinau", 18],
        [1, 51, "Kaliningrad", 18],
        [1, 51, "Kiev", 18],
        [1, 51, "Minsk", 18],
        [1, 51, "Riga", 18],
        [1, 51, "Simferopol", 18],
        [1, 51, "Tallinn", 18],
        [1, 51, "Tiraspol", 18],
        [1, 51, "Uzhgorod", 18],
        [1, 51, "Vilnius", 18],
        [1, 51, "Zaporozhye", 18],
        [1, 51, "W-SU"],
        [1, 54, "W-SU"]
      ],
      [
        [0, 47, "Moscow", 18],
        [0, 47, "Chisinau", 18],
        [0, 47, "Kaliningrad", 18],
        [0, 47, "Kiev", 18],
        [0, 47, "Minsk", 18],
        [0, 47, "Riga", 18],
        [0, 47, "Simferopol", 18],
        [0, 47, "Tallinn", 18],
        [0, 47, "Tiraspol", 18],
        [0, 47, "Uzhgorod", 18],
        [0, 47, "Vilnius", 18],
        [0, 47, "Zaporozhye", 18],
        [0, 47, "W-SU"]
      ],
      [
        [0, 8, "Denver", 9],
        [0, 8, "Boise", 9],
        [0, 8, "Cambridge_Bay", 9],
        [0, 8, "Chihuahua", 9],
        [0, 8, "Dawson_Creek", 9],
        [0, 8, "Edmonton", 9],
        [0, 8, "Ensenada", 9],
        [0, 8, "Hermosillo", 9],
        [0, 8, "Inuvik", 9],
        [0, 8, "Mazatlan", 9],
        [0, 8, "Mexico_City", 9],
        [0, 8, "Center", 8],
        [0, 8, "New_Salem", 8],
        [0, 8, "Phoenix", 9],
        [0, 8, "Regina", 9],
        [0, 8, "Shiprock", 9],
        [0, 8, "Swift_Current", 9],
        [0, 8, "Tijuana", 9],
        [0, 8, "Yellowknife", 9],
        [0, 8, "East-Saskatchewan", 16],
        [0, 8, "Mountain", 16],
        [0, 8, "Saskatchewan", 16],
        [0, 8, "BajaNorte", 20],
        [0, 8, "BajaSur", 20],
        [0, 8, "General", 20],
        [0, 8, "MST"],
        [0, 8, "MST7MDT"],
        [0, 8, "Navajo"],
        [0, 8, "Arizona"],
        [0, 8, "Mountain"],
        [1, 50, "Moscow", 18],
        [1, 50, "W-SU"]
      ],
      [
        [0, 51, "Mauritius", 19]
      ],
      [
        [0, 54, "Maldives", 19]
      ],
      [
        [1, 9, "Denver", 9],
        [1, 9, "Boise", 9],
        [1, 9, "Cambridge_Bay", 9],
        [1, 9, "Edmonton", 9],
        [1, 9, "Center", 8],
        [1, 9, "New_Salem", 8],
        [1, 9, "Phoenix", 9],
        [1, 9, "Regina", 9],
        [1, 9, "Shiprock", 9],
        [1, 9, "Swift_Current", 9],
        [1, 9, "Yellowknife", 9],
        [1, 9, "East-Saskatchewan", 16],
        [1, 9, "Mountain", 16],
        [1, 9, "Saskatchewan", 16],
        [1, 9, "MST"],
        [1, 9, "MST7MDT"],
        [1, 9, "Navajo"],
        [1, 9, "Arizona"],
        [1, 9, "Mountain"]
      ],
      [
        [0, 65, "Kuala_Lumpur", 12],
        [0, 65, "Kuching", 12]
      ],
      [
        [1, 76, "Noumea", 21]
      ],
      [
        [0, 74, "Noumea", 21]
      ],
      [
        [1, 26, "St_Johns", 9],
        [1, 26, "Newfoundland", 16]
      ],
      [
        [1, 24, "St_Johns", 9],
        [1, 23, "St_Johns", 9],
        [1, 4, "Midway", 21],
        [1, 24, "Goose_Bay", 9],
        [1, 24, "Newfoundland", 16],
        [1, 23, "Goose_Bay", 9],
        [1, 23, "Newfoundland", 16]
      ],
      [
        [0, 21, "Paramaribo", 9]
      ],
      [
        [1, 37, "Amsterdam", 18]
      ],
      [
        [0, 33, "Amsterdam", 18]
      ],
      [
        [0, 75, "Norfolk", 21]
      ],
      [
        [1, 59, "Novosibirsk", 12],
        [1, 65, "Novosibirsk", 12]
      ],
      [
        [0, 57, "Novosibirsk", 12],
        [0, 59, "Novosibirsk", 12]
      ],
      [
        [1, 24, "St_Johns", 9],
        [1, 4, "Adak", 9],
        [1, 4, "Atka", 9],
        [1, 4, "Nome", 9],
        [1, 4, "Aleutian"],
        [1, 24, "Goose_Bay", 9],
        [1, 24, "Newfoundland", 16],
        [0, 56, "Katmandu", 12]
      ],
      [
        [0, 75, "Nauru", 21],
        [0, 76, "Nauru", 21]
      ],
      [
        [0, 21, "St_Johns", 9],
        [0, 20, "St_Johns", 9],
        [0, 21, "Goose_Bay", 9],
        [0, 21, "Newfoundland", 16],
        [0, 20, "Goose_Bay", 9],
        [0, 20, "Newfoundland", 16],
        [0, 2, "Adak", 9],
        [0, 2, "Atka", 9],
        [0, 2, "Nome", 9],
        [0, 2, "Midway", 21],
        [0, 2, "Pago_Pago", 21],
        [0, 2, "Samoa", 21],
        [0, 2, "Aleutian"],
        [0, 2, "Samoa"],
        [1, 36, "Amsterdam", 18]
      ],
      [
        [0, 2, "Niue", 21],
        [0, 1, "Niue", 21]
      ],
      [
        [1, 24, "St_Johns", 9],
        [1, 4, "Adak", 9],
        [1, 4, "Atka", 9],
        [1, 4, "Nome", 9],
        [1, 4, "Aleutian"],
        [1, 24, "Goose_Bay", 9],
        [1, 24, "Newfoundland", 16]
      ],
      [
        [1, 79, "Auckland", 21],
        [1, 79, "McMurdo", 10],
        [1, 79, "South_Pole", 10],
        [1, 79, "NZ"]
      ],
      [
        [0, 75, "Auckland", 21],
        [0, 75, "NZ"]
      ],
      [
        [0, 76, "Auckland", 21],
        [1, 76, "Auckland", 21],
        [1, 77, "Auckland", 21],
        [0, 76, "McMurdo", 10],
        [0, 76, "South_Pole", 10],
        [0, 76, "NZ"],
        [1, 76, "NZ"],
        [1, 77, "NZ"]
      ],
      [
        [1, 57, "Omsk", 12],
        [1, 59, "Omsk", 12]
      ],
      [
        [0, 54, "Omsk", 12],
        [0, 57, "Omsk", 12]
      ],
      [
        [1, 54, "Oral", 12]
      ],
      [
        [0, 51, "Oral", 12],
        [0, 54, "Oral", 12]
      ],
      [
        [1, 9, "Inuvik", 9]
      ],
      [
        [1, 8, "Los_Angeles", 9],
        [1, 8, "Boise", 9],
        [1, 8, "Dawson", 9],
        [1, 8, "Dawson_Creek", 9],
        [1, 8, "Ensenada", 9],
        [1, 8, "Inuvik", 9],
        [1, 8, "Juneau", 9],
        [1, 8, "Tijuana", 9],
        [1, 8, "Vancouver", 9],
        [1, 8, "Whitehorse", 9],
        [1, 8, "Pacific", 16],
        [1, 8, "Yukon", 16],
        [1, 8, "BajaNorte", 20],
        [1, 8, "PST8PDT"],
        [1, 8, "Pacific"],
        [1, 8, "Pacific-New"]
      ],
      [
        [1, 14, "Lima", 9]
      ],
      [
        [1, 76, "Kamchatka", 12],
        [1, 79, "Kamchatka", 12]
      ],
      [
        [0, 74, "Kamchatka", 12],
        [0, 76, "Kamchatka", 12]
      ],
      [
        [0, 11, "Lima", 9]
      ],
      [
        [0, 2, "Enderbury", 21],
        [0, 79, "Enderbury", 21]
      ],
      [
        [1, 69, "Manila", 12]
      ],
      [
        [0, 65, "Manila", 12]
      ],
      [
        [1, 57, "Karachi", 12]
      ],
      [
        [0, 54, "Karachi", 12]
      ],
      [
        [1, 25, "Miquelon", 9]
      ],
      [
        [0, 22, "Miquelon", 9]
      ],
      [
        [0, 18, "Paramaribo", 9],
        [0, 17, "Paramaribo", 9],
        [0, 61, "Pontianak", 12],
        [0, 72, "DumontDUrville", 10]
      ],
      [
        [1, 8, "Los_Angeles", 9],
        [1, 8, "Dawson_Creek", 9],
        [1, 8, "Ensenada", 9],
        [1, 8, "Inuvik", 9],
        [1, 8, "Juneau", 9],
        [1, 8, "Tijuana", 9],
        [1, 8, "Vancouver", 9],
        [1, 8, "Pacific", 16],
        [1, 8, "BajaNorte", 20],
        [1, 8, "PST8PDT"],
        [1, 8, "Pacific"],
        [1, 8, "Pacific-New"]
      ],
      [
        [0, 7, "Los_Angeles", 9],
        [0, 7, "Boise", 9],
        [0, 7, "Dawson", 9],
        [0, 7, "Dawson_Creek", 9],
        [0, 7, "Ensenada", 9],
        [0, 7, "Hermosillo", 9],
        [0, 7, "Inuvik", 9],
        [0, 7, "Juneau", 9],
        [0, 7, "Mazatlan", 9],
        [0, 7, "Tijuana", 9],
        [0, 7, "Vancouver", 9],
        [0, 7, "Whitehorse", 9],
        [0, 7, "Pacific", 16],
        [0, 7, "Yukon", 16],
        [0, 7, "BajaNorte", 20],
        [0, 7, "BajaSur", 20],
        [0, 7, "Pitcairn", 21],
        [0, 7, "PST8PDT"],
        [0, 7, "Pacific"],
        [0, 7, "Pacific-New"]
      ],
      [
        [1, 8, "Los_Angeles", 9],
        [1, 8, "Dawson_Creek", 9],
        [1, 8, "Ensenada", 9],
        [1, 8, "Inuvik", 9],
        [1, 8, "Juneau", 9],
        [1, 8, "Tijuana", 9],
        [1, 8, "Vancouver", 9],
        [1, 8, "Pacific", 16],
        [1, 8, "BajaNorte", 20],
        [1, 8, "PST8PDT"],
        [1, 8, "Pacific"],
        [1, 8, "Pacific-New"]
      ],
      [
        [1, 22, "Asuncion", 9]
      ],
      [
        [0, 22, "Asuncion", 9],
        [0, 14, "Asuncion", 9]
      ],
      [
        [1, 59, "Qyzylorda", 12]
      ],
      [
        [0, 54, "Qyzylorda", 12],
        [0, 57, "Qyzylorda", 12]
      ],
      [
        [0, 51, "Reunion", 19]
      ],
      [
        [0, 39, "Riga", 18]
      ],
      [
        [0, 22, "Rothera", 10]
      ],
      [
        [1, 74, "Sakhalin", 12],
        [1, 76, "Sakhalin", 12]
      ],
      [
        [0, 72, "Sakhalin", 12],
        [0, 74, "Sakhalin", 12]
      ],
      [
        [1, 57, "Samarkand", 12],
        [1, 54, "Samara", 18]
      ],
      [
        [0, 51, "Samarkand", 12],
        [0, 54, "Samarkand", 12],
        [0, 1, "Apia", 21],
        [0, 1, "Pago_Pago", 21],
        [0, 1, "Samoa", 21],
        [0, 1, "Samoa"],
        [0, 47, "Samara", 18],
        [0, 51, "Samara", 18]
      ],
      [
        [1, 47, "Johannesburg"],
        [0, 42, "Johannesburg"],
        [1, 47, "Maseru"],
        [1, 47, "Windhoek"],
        [0, 42, "Maseru"],
        [0, 42, "Mbabane"],
        [0, 42, "Windhoek"]
      ],
      [
        [0, 74, "Guadalcanal", 21]
      ],
      [
        [0, 51, "Mahe", 19]
      ],
      [
        [0, 63, "Singapore", 12],
        [0, 65, "Singapore", 12],
        [0, 63, "Singapore"],
        [0, 65, "Singapore"]
      ],
      [
        [1, 57, "Aqtau", 12]
      ],
      [
        [0, 54, "Aqtau", 12],
        [0, 57, "Aqtau", 12]
      ],
      [
        [1, 30, "Freetown"],
        [1, 35, "Freetown"]
      ],
      [
        [0, 60, "Saigon", 12],
        [0, 12, "Santiago", 9],
        [0, 12, "Continental", 17],
        [0, 60, "Phnom_Penh", 12],
        [0, 60, "Vientiane", 12]
      ],
      [
        [0, 22, "Paramaribo", 9],
        [0, 21, "Paramaribo", 9]
      ],
      [
        [0, 2, "Samoa", 21],
        [0, 2, "Midway", 21],
        [0, 2, "Pago_Pago", 21],
        [0, 2, "Samoa"]
      ],
      [
        [0, 47, "Volgograd", 18],
        [0, 51, "Volgograd", 18]
      ],
      [
        [1, 54, "Yekaterinburg", 12],
        [1, 57, "Yekaterinburg", 12]
      ],
      [
        [0, 51, "Yekaterinburg", 12],
        [0, 54, "Yekaterinburg", 12]
      ],
      [
        [0, 47, "Syowa", 10]
      ],
      [
        [0, 4, "Tahiti", 21]
      ],
      [
        [1, 59, "Samarkand", 12],
        [1, 57, "Tashkent", 12],
        [1, 59, "Tashkent", 12]
      ],
      [
        [0, 57, "Samarkand", 12],
        [0, 54, "Tashkent", 12],
        [0, 57, "Tashkent", 12]
      ],
      [
        [1, 51, "Tbilisi", 12],
        [1, 54, "Tbilisi", 12]
      ],
      [
        [0, 47, "Tbilisi", 12],
        [0, 51, "Tbilisi", 12]
      ],
      [
        [0, 54, "Kerguelen", 19]
      ],
      [
        [0, 54, "Dushanbe", 12]
      ],
      [
        [0, 65, "Dili", 12],
        [0, 69, "Dili", 12]
      ],
      [
        [0, 48, "Tehran", 12],
        [0, 48, "Iran"],
        [0, 51, "Ashgabat", 12],
        [0, 51, "Ashkhabad", 12],
        [0, 54, "Ashgabat", 12],
        [0, 54, "Ashkhabad", 12],
        [0, 40, "Tallinn", 18]
      ],
      [
        [1, 81, "Tongatapu", 21]
      ],
      [
        [0, 79, "Tongatapu", 21]
      ],
      [
        [1, 51, "Istanbul", 18],
        [1, 51, "Istanbul", 12],
        [1, 51, "Turkey"]
      ],
      [
        [0, 47, "Istanbul", 18],
        [0, 47, "Istanbul", 12],
        [0, 47, "Turkey"]
      ],
      [
        [0, 47, "Volgograd", 18]
      ],
      [
        [1, 69, "Ulaanbaatar", 12],
        [1, 69, "Ulan_Bator", 12]
      ],
      [
        [0, 59, "Ulaanbaatar", 12],
        [0, 65, "Ulaanbaatar", 12],
        [0, 59, "Choibalsan", 12],
        [0, 59, "Ulan_Bator", 12],
        [0, 65, "Choibalsan", 12],
        [0, 65, "Ulan_Bator", 12]
      ],
      [
        [1, 54, "Oral", 12],
        [1, 57, "Oral", 12]
      ],
      [
        [0, 51, "Oral", 12],
        [0, 54, "Oral", 12],
        [0, 57, "Oral", 12]
      ],
      [
        [0, 57, "Urumqi", 12]
      ],
      [
        [1, 22, "Montevideo", 9],
        [1, 24, "Montevideo", 9]
      ],
      [
        [1, 25, "Montevideo", 9]
      ],
      [
        [0, 22, "Montevideo", 9],
        [0, 21, "Montevideo", 9]
      ],
      [
        [1, 57, "Samarkand", 12],
        [1, 57, "Tashkent", 12]
      ],
      [
        [0, 54, "Samarkand", 12],
        [0, 54, "Tashkent", 12]
      ],
      [
        [0, 14, "Caracas", 9],
        [0, 13, "Caracas", 9]
      ],
      [
        [1, 72, "Vladivostok", 12]
      ],
      [
        [0, 69, "Vladivostok", 12],
        [1, 74, "Vladivostok", 12]
      ],
      [
        [0, 69, "Vladivostok", 12],
        [0, 72, "Vladivostok", 12]
      ],
      [
        [1, 51, "Volgograd", 18],
        [1, 54, "Volgograd", 18]
      ],
      [
        [0, 47, "Volgograd", 18],
        [0, 51, "Volgograd", 18]
      ],
      [
        [0, 57, "Vostok", 10]
      ],
      [
        [1, 76, "Efate", 21]
      ],
      [
        [0, 74, "Efate", 21]
      ],
      [
        [1, 22, "Mendoza", 9],
        [1, 22, "Jujuy", 2],
        [1, 22, "Mendoza", 2],
        [1, 22, "Jujuy", 9]
      ],
      [
        [0, 14, "Mendoza", 9],
        [0, 14, "Catamarca", 2],
        [0, 14, "ComodRivadavia", 2],
        [0, 14, "Cordoba", 2],
        [0, 14, "Jujuy", 2],
        [0, 14, "La_Rioja", 2],
        [0, 14, "Mendoza", 2],
        [0, 14, "Rio_Gallegos", 2],
        [0, 14, "San_Juan", 2],
        [0, 14, "Tucuman", 2],
        [0, 14, "Ushuaia", 2],
        [0, 14, "Catamarca", 9],
        [0, 14, "Cordoba", 9],
        [0, 14, "Jujuy", 9],
        [0, 14, "Rosario", 9]
      ],
      [
        [1, 42, "Windhoek"],
        [1, 42, "Ndjamena"]
      ],
      [
        [0, 28, "Dakar"],
        [0, 28, "Bamako"],
        [0, 28, "Banjul"],
        [0, 28, "Bissau"],
        [0, 28, "Conakry"],
        [0, 28, "El_Aaiun"],
        [0, 28, "Freetown"],
        [0, 28, "Niamey"],
        [0, 28, "Nouakchott"],
        [0, 28, "Timbuktu"],
        [0, 31, "Freetown"],
        [0, 35, "Brazzaville"],
        [0, 35, "Bangui"],
        [0, 35, "Douala"],
        [0, 35, "Lagos"],
        [0, 35, "Libreville"],
        [0, 35, "Luanda"],
        [0, 35, "Malabo"],
        [0, 35, "Ndjamena"],
        [0, 35, "Niamey"],
        [0, 35, "Porto-Novo"],
        [0, 35, "Windhoek"]
      ],
      [
        [1, 42, "Lisbon", 18],
        [1, 42, "Madrid", 18],
        [1, 42, "Monaco", 18],
        [1, 42, "Paris", 18],
        [1, 42, "Portugal"],
        [1, 42, "WET"]
      ],
      [
        [1, 35, "Paris", 18],
        [1, 35, "Algiers"],
        [1, 35, "Casablanca"],
        [1, 35, "Ceuta"],
        [1, 35, "Canary", 13],
        [1, 35, "Faeroe", 13],
        [1, 35, "Faroe", 13],
        [1, 35, "Madeira", 13],
        [1, 35, "Brussels", 18],
        [1, 35, "Lisbon", 18],
        [1, 35, "Luxembourg", 18],
        [1, 35, "Madrid", 18],
        [1, 35, "Monaco", 18],
        [1, 35, "Portugal"],
        [1, 35, "WET"],
        [1, 42, "Luxembourg", 18]
      ],
      [
        [0, 31, "Paris", 18],
        [0, 31, "Algiers"],
        [0, 31, "Casablanca"],
        [0, 31, "Ceuta"],
        [0, 31, "El_Aaiun"],
        [0, 31, "Azores", 13],
        [0, 31, "Canary", 13],
        [0, 31, "Faeroe", 13],
        [0, 31, "Faroe", 13],
        [0, 31, "Madeira", 13],
        [0, 31, "Brussels", 18],
        [0, 31, "Lisbon", 18],
        [0, 31, "Luxembourg", 18],
        [0, 31, "Madrid", 18],
        [0, 31, "Monaco", 18],
        [0, 31, "Portugal"],
        [0, 31, "WET"],
        [0, 35, "Luxembourg", 18]
      ],
      [
        [1, 25, "Godthab", 9],
        [1, 25, "Danmarkshavn", 9]
      ],
      [
        [0, 22, "Godthab", 9],
        [0, 22, "Danmarkshavn", 9]
      ],
      [
        [0, 59, "Jakarta", 12],
        [0, 63, "Jakarta", 12],
        [0, 65, "Jakarta", 12],
        [0, 59, "Pontianak", 12],
        [0, 63, "Pontianak", 12],
        [0, 65, "Pontianak", 12]
      ],
      [
        [0, 65, "Perth", 14],
        [1, 69, "Perth", 14],
        [0, 2, "Apia", 21],
        [0, 65, "Casey", 10],
        [0, 65, "West", 14],
        [1, 69, "West", 14]
      ],
      [
        [1, 69, "Yakutsk", 12],
        [1, 72, "Yakutsk", 12]
      ],
      [
        [0, 65, "Yakutsk", 12],
        [0, 69, "Yakutsk", 12]
      ],
      [
        [1, 8, "Dawson", 9],
        [1, 8, "Whitehorse", 9],
        [1, 8, "Yukon", 16]
      ],
      [
        [1, 7, "Dawson", 9],
        [1, 7, "Whitehorse", 9],
        [1, 7, "Yakutat", 9],
        [1, 7, "Yukon", 16]
      ],
      [
        [1, 57, "Yekaterinburg", 12]
      ],
      [
        [0, 54, "Yekaterinburg", 12]
      ],
      [
        [1, 51, "Yerevan", 12],
        [1, 54, "Yerevan", 12]
      ],
      [
        [0, 47, "Yerevan", 12],
        [0, 51, "Yerevan", 12]
      ],
      [
        [1, 7, "Dawson", 9],
        [1, 7, "Whitehorse", 9],
        [1, 7, "Yakutat", 9],
        [1, 7, "Yukon", 16]
      ],
      [
        [0, 6, "Anchorage", 9],
        [0, 6, "Dawson", 9],
        [0, 6, "Juneau", 9],
        [0, 6, "Nome", 9],
        [0, 6, "Whitehorse", 9],
        [0, 6, "Yakutat", 9],
        [0, 6, "Yukon", 16],
        [0, 6, "Alaska"]
      ],
      [
        [1, 7, "Dawson", 9],
        [1, 7, "Whitehorse", 9],
        [1, 7, "Yakutat", 9],
        [1, 7, "Yukon", 16]
      ],
      [
        [0, 35]
      ],
      [
        [0, 42]
      ],
      [
        [0, 47]
      ],
      [
        [0, 51]
      ],
      [
        [0, 54]
      ],
      [
        [0, 57]
      ],
      [
        [0, 59]
      ],
      [
        [0, 65]
      ],
      [
        [0, 69]
      ],
      [
        [0, 72]
      ],
      [
        [0, 74]
      ],
      [
        [0, 76]
      ],
      [
        [0, 28]
      ],
      [
        [0, 25]
      ],
      [
        [0, 22]
      ],
      [
        [0, 14]
      ],
      [
        [0, 11]
      ],
      [
        [0, 9]
      ],
      [
        [0, 8]
      ],
      [
        [0, 31, "UTC"]
      ],
      [
        [0, 7]
      ],
      [
        [0, 6]
      ],
      [
        [0, 4]
      ],
      [
        [0, 2]
      ],
      [
        [0, 0]
      ],
      [
        [0, 31, "Davis", 10],
        [0, 31, "DumontDUrville", 10]
      ],
      [
        [0, 31]
      ]
    ];
  }

  if (!php_js_shared.tz_abbreviations) {
    php_js_shared.tz_abbreviations = ["acst", "act", "addt", "adt", "aft", "ahdt", "ahst", "akdt", "akst", "aktst", "aktt", "almst", "almt", "amst", "amt", "anast", "anat", "ant", "apt", "aqtst", "aqtt", "arst", "art", "ashst", "asht", "ast", "awt", "azomt", "azost", "azot", "azst", "azt", "bakst", "bakt", "bdst", "bdt", "beat", "beaut", "bmt", "bnt", "bortst", "bort", "bost", "bot", "brst", "brt", "bst", "btt", "burt", "cant", "capt", "cast", "cat", "cawt", "cddt", "cdt", "cemt", "cest", "cet", "cgst", "cgt", "chadt", "chast", "chat", "chdt", "chost", "chot", "cit", "cjt", "ckhst", "ckt", "clst", "clt", "cost", "cot", "cpt", "cst", "cvst", "cvt", "cwst", "cwt", "chst", "dact", "davt", "ddut", "dusst", "dust", "easst", "east", "eat", "ect", "eddt", "edt", "eest", "eet", "egst", "egt", "ehdt", "eit", "ept", "est", "ewt", "fjst", "fjt", "fkst", "fkt", "fnst", "fnt", "fort", "frust", "frut", "galt", "gamt", "gbgt", "gest", "get", "gft", "ghst", "gmt", "gst", "gyt", "hadt", "hast", "hdt", "hkst", "hkt", "hovst", "hovt", "hpt", "hst", "hwt", "ict", "iddt", "idt", "ihst", "iot", "irdt", "irkst", "irkt", "irst", "isst", "ist", "javt", "jdt", "jst", "kart", "kast", "kdt", "kgst", "kgt", "kizst", "kizt", "kmt", "kost", "krast", "krat", "kst", "kuyst", "kuyt", "kwat", "lhst", "lint", "lkt", "lont", "lrt", "lst", "madmt", "madst", "madt", "magst", "magt", "malst", "malt", "mart", "mawt", "mddt", "mdst", "mdt", "mest", "met", "mht", "mmt", "most", "mot", "mpt", "msd", "msk", "mst", "mut", "mvt", "mwt", "myt", "ncst", "nct", "nddt", "ndt", "negt", "nest", "net", "nft", "novst", "novt", "npt", "nrt", "nst", "nut", "nwt", "nzdt", "nzmt", "nzst", "omsst", "omst", "orast", "orat", "pddt", "pdt", "pest", "petst", "pett", "pet", "phot", "phst", "pht", "pkst", "pkt", "pmdt", "pmst", "pmt", "ppt", "pst", "pwt", "pyst", "pyt", "qyzst", "qyzt", "ret", "rmt", "rott", "sakst", "sakt", "samst", "samt", "sast", "sbt", "sct", "sgt", "shest", "shet", "slst", "smt", "srt", "sst", "stat", "svest", "svet", "syot", "taht", "tasst", "tast", "tbist", "tbit", "tft", "tjt", "tlt", "tmt", "tost", "tot", "trst", "trt", "tsat", "ulast", "ulat", "urast", "urat", "urut", "uyhst", "uyst", "uyt", "uzst", "uzt", "vet", "vlasst", "vlast", "vlat", "volst", "volt", "vost", "vust", "vut", "warst", "wart", "wast", "wat", "wemt", "west", "wet", "wgst", "wgt", "wit", "wst", "yakst", "yakt", "yddt", "ydt", "yekst", "yekt", "yerst", "yert", "ypt", "yst", "ywt", "a", "b", "c", "d", "e", "f", "g", "h", "i", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "utc", "u", "v", "w", "x", "y", "zzz", "z"];
  }

  if (!php_js_shared.tz_offsets) {
    php_js_shared.tz_offsets = [-43200, -41400, -39600, -37800, -36000, -34200, -32400, -28800, -25200, -21600, -19800, -18000, -16966, -16200, -14400, -14308, -13500, -13252, -13236, -12756, -12652, -12600, -10800, -9052, -9000, -7200, -5400, -3996, -3600, -2670, -1200, 0, 1172, 1200, 2079, 3600, 4772, 4800, 5736, 5784, 5940, 6264, 7200, 9000, 9048, 9384, 9885, 10800, 12344, 12600, 12648, 14400, 16200, 16248, 18000, 19800, 20700, 21600, 23400, 25200, 25580, 26240, 26400, 27000, 28656, 28800, 30000, 30600, 31500, 32400, 34200, 35100, 36000, 37800, 39600, 41400, 43200, 45000, 45900, 46800, 49500, 50400];
  }

  if (!php_js_shared.tz_prefixes) {
    php_js_shared.tz_prefixes = ['Africa', 'America', 'America/Argentina', 'America', 'America/Indiana', 'America', 'America/Kentucky', 'America', 'America/North_Dakota', 'America', 'Antarctica', 'Arctic', 'Asia', 'Atlantic', 'Australia', 'Brazil', 'Canada', 'Chile', 'Europe', 'Indian', 'Mexico', 'Pacific'];
  }
  // END STATIC

  //var dtz = this.date_default_timezone_get();
  for (i = 0, len = php_js_shared.tz_abbrs.length; i < len; i++) {
    indice = php_js_shared.tz_abbreviations[i];
    curr = php_js_shared.tz_abbrs[i];
    list[indice] = [];
    for (j = 0, jlen = curr.length; j < jlen; j++) {
      currSub = curr[j];
      currSubPrefix = (currSub[3] ? php_js_shared.tz_prefixes[currSub[3]] + '/' : '');
      timezone_id = currSub[2] ? (currSubPrefix + currSub[2]) : null;
      tzo = php_js_shared.tz_offsets[currSub[1]];
      dst = !! currSub[0];
      list[indice].push({
        'dst': dst,
        'offset': tzo,
        'timezone_id': timezone_id
      });
      // if (dtz === timezone_id) { // Apply this within date functions
      //     this.php_js.currentTimezoneOffset = tzo;
      //     this.php_js.currentTimezoneDST = dst;
      // }
    }
  }

  return list;
}
function timezone_identifiers_list (what, country) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Object argument shown in one place, but not in another
  // %        note 1: (not implemented in PHP yet?)
  // %        note 2: For countries, see
  // %        note 2: http://www.iso.org/iso/english_country_names_and_code_elements
  // *     example 1: timezone_identifiers_list('Hello World');
  // *     returns 1: 1
  var i = 0,
    new_what = '',
    returnArr = [],
    continents = [],
    codes = [],
    indexOf = function (value) {
      for (var i = 0, length = this.length; i < length; i++) {
        if (this[i] === value) {
          return i;
        }
      }
      return -1;
    },
    identifiers = ['Africa/Abidjan', 'Africa/Accra', 'Africa/Addis_Ababa', 'Africa/Algiers', 'Africa/Asmara', 'Africa/Asmera', 'Africa/Bamako', 'Africa/Bangui', 'Africa/Banjul', 'Africa/Bissau', 'Africa/Blantyre', 'Africa/Brazzaville', 'Africa/Bujumbura', 'Africa/Cairo', 'Africa/Casablanca', 'Africa/Ceuta', 'Africa/Conakry', 'Africa/Dakar', 'Africa/Dar_es_Salaam', 'Africa/Djibouti', 'Africa/Douala', 'Africa/El_Aaiun', 'Africa/Freetown', 'Africa/Gaborone', 'Africa/Harare', 'Africa/Johannesburg', 'Africa/Kampala', 'Africa/Khartoum', 'Africa/Kigali', 'Africa/Kinshasa', 'Africa/Lagos', 'Africa/Libreville', 'Africa/Lome', 'Africa/Luanda', 'Africa/Lubumbashi', 'Africa/Lusaka', 'Africa/Malabo', 'Africa/Maputo', 'Africa/Maseru', 'Africa/Mbabane', 'Africa/Mogadishu', 'Africa/Monrovia', 'Africa/Nairobi', 'Africa/Ndjamena', 'Africa/Niamey', 'Africa/Nouakchott', 'Africa/Ouagadougou', 'Africa/Porto-Novo', 'Africa/Sao_Tome', 'Africa/Timbuktu', 'Africa/Tripoli', 'Africa/Tunis', 'Africa/Windhoek', 'America/Adak', 'America/Anchorage', 'America/Anguilla', 'America/Antigua', 'America/Araguaina', 'America/Argentina/Buenos_Aires', 'America/Argentina/Catamarca', 'America/Argentina/ComodRivadavia', 'America/Argentina/Cordoba', 'America/Argentina/Jujuy', 'America/Argentina/La_Rioja', 'America/Argentina/Mendoza', 'America/Argentina/Rio_Gallegos', 'America/Argentina/San_Juan', 'America/Argentina/San_Luis', 'America/Argentina/Tucuman', 'America/Argentina/Ushuaia', 'America/Aruba', 'America/Asuncion', 'America/Atikokan', 'America/Atka', 'America/Bahia', 'America/Barbados', 'America/Belem', 'America/Belize', 'America/Blanc-Sablon', 'America/Boa_Vista', 'America/Bogota', 'America/Boise', 'America/Buenos_Aires', 'America/Cambridge_Bay', 'America/Campo_Grande', 'America/Cancun', 'America/Caracas', 'America/Catamarca', 'America/Cayenne', 'America/Cayman', 'America/Chicago', 'America/Chihuahua', 'America/Coral_Harbour', 'America/Cordoba', 'America/Costa_Rica', 'America/Cuiaba', 'America/Curacao', 'America/Danmarkshavn', 'America/Dawson', 'America/Dawson_Creek', 'America/Denver', 'America/Detroit', 'America/Dominica', 'America/Edmonton', 'America/Eirunepe', 'America/El_Salvador', 'America/Ensenada', 'America/Fort_Wayne', 'America/Fortaleza', 'America/Glace_Bay', 'America/Godthab', 'America/Goose_Bay', 'America/Grand_Turk', 'America/Grenada', 'America/Guadeloupe', 'America/Guatemala', 'America/Guayaquil', 'America/Guyana', 'America/Halifax', 'America/Havana', 'America/Hermosillo', 'America/Indiana/Indianapolis', 'America/Indiana/Knox', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Tell_City', 'America/Indiana/Vevay', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indianapolis', 'America/Inuvik', 'America/Iqaluit', 'America/Jamaica', 'America/Jujuy', 'America/Juneau', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Knox_IN', 'America/La_Paz', 'America/Lima', 'America/Los_Angeles', 'America/Louisville', 'America/Maceio', 'America/Managua', 'America/Manaus', 'America/Marigot', 'America/Martinique', 'America/Mazatlan', 'America/Mendoza', 'America/Menominee', 'America/Merida', 'America/Mexico_City', 'America/Miquelon', 'America/Moncton', 'America/Monterrey', 'America/Montevideo', 'America/Montreal', 'America/Montserrat', 'America/Nassau', 'America/New_York', 'America/Nipigon', 'America/Nome', 'America/Noronha', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/Panama', 'America/Pangnirtung', 'America/Paramaribo', 'America/Phoenix', 'America/Port-au-Prince', 'America/Port_of_Spain', 'America/Porto_Acre', 'America/Porto_Velho', 'America/Puerto_Rico', 'America/Rainy_River', 'America/Rankin_Inlet', 'America/Recife', 'America/Regina', 'America/Resolute', 'America/Rio_Branco', 'America/Rosario', 'America/Santiago', 'America/Santo_Domingo', 'America/Sao_Paulo', 'America/Scoresbysund', 'America/Shiprock', 'America/St_Barthelemy', 'America/St_Johns', 'America/St_Kitts', 'America/St_Lucia', 'America/St_Thomas', 'America/St_Vincent', 'America/Swift_Current', 'America/Tegucigalpa', 'America/Thule', 'America/Thunder_Bay', 'America/Tijuana', 'America/Toronto', 'America/Tortola', 'America/Vancouver', 'America/Virgin', 'America/Whitehorse', 'America/Winnipeg', 'America/Yakutat', 'America/Yellowknife', 'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/DumontDUrville', 'Antarctica/Mawson', 'Antarctica/McMurdo', 'Antarctica/Palmer', 'Antarctica/Rothera', 'Antarctica/South_Pole', 'Antarctica/Syowa', 'Antarctica/Vostok', 'Arctic/Longyearbyen', 'Asia/Aden', 'Asia/Almaty', 'Asia/Amman', 'Asia/Anadyr', 'Asia/Aqtau', 'Asia/Aqtobe', 'Asia/Ashgabat', 'Asia/Ashkhabad', 'Asia/Baghdad', 'Asia/Bahrain', 'Asia/Baku', 'Asia/Bangkok', 'Asia/Beirut', 'Asia/Bishkek', 'Asia/Brunei', 'Asia/Calcutta', 'Asia/Choibalsan', 'Asia/Chongqing', 'Asia/Chungking', 'Asia/Colombo', 'Asia/Dacca', 'Asia/Damascus', 'Asia/Dhaka', 'Asia/Dili', 'Asia/Dubai', 'Asia/Dushanbe', 'Asia/Gaza', 'Asia/Harbin', 'Asia/Ho_Chi_Minh', 'Asia/Hong_Kong', 'Asia/Hovd', 'Asia/Irkutsk', 'Asia/Istanbul', 'Asia/Jakarta', 'Asia/Jayapura', 'Asia/Jerusalem', 'Asia/Kabul', 'Asia/Kamchatka', 'Asia/Karachi', 'Asia/Kashgar', 'Asia/Katmandu', 'Asia/Kolkata', 'Asia/Krasnoyarsk', 'Asia/Kuala_Lumpur', 'Asia/Kuching', 'Asia/Kuwait', 'Asia/Macao', 'Asia/Macau', 'Asia/Magadan', 'Asia/Makassar', 'Asia/Manila', 'Asia/Muscat', 'Asia/Nicosia', 'Asia/Novosibirsk', 'Asia/Omsk', 'Asia/Oral', 'Asia/Phnom_Penh', 'Asia/Pontianak', 'Asia/Pyongyang', 'Asia/Qatar', 'Asia/Qyzylorda', 'Asia/Rangoon', 'Asia/Riyadh', 'Asia/Saigon', 'Asia/Sakhalin', 'Asia/Samarkand', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Taipei', 'Asia/Tashkent', 'Asia/Tbilisi', 'Asia/Tehran', 'Asia/Tel_Aviv', 'Asia/Thimbu', 'Asia/Thimphu', 'Asia/Tokyo', 'Asia/Ujung_Pandang', 'Asia/Ulaanbaatar', 'Asia/Ulan_Bator', 'Asia/Urumqi', 'Asia/Vientiane', 'Asia/Vladivostok', 'Asia/Yakutsk', 'Asia/Yekaterinburg', 'Asia/Yerevan', 'Atlantic/Azores', 'Atlantic/Bermuda', 'Atlantic/Canary', 'Atlantic/Cape_Verde', 'Atlantic/Faeroe', 'Atlantic/Faroe', 'Atlantic/Jan_Mayen', 'Atlantic/Madeira', 'Atlantic/Reykjavik', 'Atlantic/South_Georgia', 'Atlantic/St_Helena', 'Atlantic/Stanley', 'Australia/ACT', 'Australia/Adelaide', 'Australia/Brisbane', 'Australia/Broken_Hill', 'Australia/Canberra', 'Australia/Currie', 'Australia/Darwin', 'Australia/Eucla', 'Australia/Hobart', 'Australia/LHI', 'Australia/Lindeman', 'Australia/Lord_Howe', 'Australia/Melbourne', 'Australia/North', 'Australia/NSW', 'Australia/Perth', 'Australia/Queensland', 'Australia/South', 'Australia/Sydney', 'Australia/Tasmania', 'Australia/Victoria', 'Australia/West', 'Australia/Yancowinna', 'Brazil/Acre', 'Brazil/DeNoronha', 'Brazil/East', 'Brazil/West', 'Canada/Atlantic', 'Canada/Central', 'Canada/East-Saskatchewan', 'Canada/Eastern', 'Canada/Mountain', 'Canada/Newfoundland', 'Canada/Pacific', 'Canada/Saskatchewan', 'Canada/Yukon', 'CET', 'Chile/Continental', 'Chile/EasterIsland', 'CST6CDT', 'Cuba', 'EET', 'Egypt', 'Eire', 'EST', 'EST5EDT', 'Etc/GMT', 'Etc/GMT+0', 'Etc/GMT+1', 'Etc/GMT+10', 'Etc/GMT+11', 'Etc/GMT+12', 'Etc/GMT+2', 'Etc/GMT+3', 'Etc/GMT+4', 'Etc/GMT+5', 'Etc/GMT+6', 'Etc/GMT+7', 'Etc/GMT+8', 'Etc/GMT+9', 'Etc/GMT-0', 'Etc/GMT-1', 'Etc/GMT-10', 'Etc/GMT-11', 'Etc/GMT-12', 'Etc/GMT-13', 'Etc/GMT-14', 'Etc/GMT-2', 'Etc/GMT-3', 'Etc/GMT-4', 'Etc/GMT-5', 'Etc/GMT-6', 'Etc/GMT-7', 'Etc/GMT-8', 'Etc/GMT-9', 'Etc/GMT0', 'Etc/Greenwich', 'Etc/UCT', 'Etc/Universal', 'Etc/UTC', 'Etc/Zulu', 'Europe/Amsterdam', 'Europe/Andorra', 'Europe/Athens', 'Europe/Belfast', 'Europe/Belgrade', 'Europe/Berlin', 'Europe/Bratislava', 'Europe/Brussels', 'Europe/Bucharest', 'Europe/Budapest', 'Europe/Chisinau', 'Europe/Copenhagen', 'Europe/Dublin', 'Europe/Gibraltar', 'Europe/Guernsey', 'Europe/Helsinki', 'Europe/Isle_of_Man', 'Europe/Istanbul', 'Europe/Jersey', 'Europe/Kaliningrad', 'Europe/Kiev', 'Europe/Lisbon', 'Europe/Ljubljana', 'Europe/London', 'Europe/Luxembourg', 'Europe/Madrid', 'Europe/Malta', 'Europe/Mariehamn', 'Europe/Minsk', 'Europe/Monaco', 'Europe/Moscow', 'Europe/Nicosia', 'Europe/Oslo', 'Europe/Paris', 'Europe/Podgorica', 'Europe/Prague', 'Europe/Riga', 'Europe/Rome', 'Europe/Samara', 'Europe/San_Marino', 'Europe/Sarajevo', 'Europe/Simferopol', 'Europe/Skopje', 'Europe/Sofia', 'Europe/Stockholm', 'Europe/Tallinn', 'Europe/Tirane', 'Europe/Tiraspol', 'Europe/Uzhgorod', 'Europe/Vaduz', 'Europe/Vatican', 'Europe/Vienna', 'Europe/Vilnius', 'Europe/Volgograd', 'Europe/Warsaw', 'Europe/Zagreb', 'Europe/Zaporozhye', 'Europe/Zurich', 'Factory', 'GB', 'GB-Eire', 'GMT', 'GMT+0', 'GMT-0', 'GMT0', 'Greenwich', 'Hongkong', 'HST', 'Iceland', 'Indian/Antananarivo', 'Indian/Chagos', 'Indian/Christmas', 'Indian/Cocos', 'Indian/Comoro', 'Indian/Kerguelen', 'Indian/Mahe', 'Indian/Maldives', 'Indian/Mauritius', 'Indian/Mayotte', 'Indian/Reunion', 'Iran', 'Israel', 'Jamaica', 'Japan', 'Kwajalein', 'Libya', 'MET', 'Mexico/BajaNorte', 'Mexico/BajaSur', 'Mexico/General', 'MST', 'MST7MDT', 'Navajo', 'NZ', 'NZ-CHAT', 'Pacific/Apia', 'Pacific/Auckland', 'Pacific/Chatham', 'Pacific/Easter', 'Pacific/Efate', 'Pacific/Enderbury', 'Pacific/Fakaofo', 'Pacific/Fiji', 'Pacific/Funafuti', 'Pacific/Galapagos', 'Pacific/Gambier', 'Pacific/Guadalcanal', 'Pacific/Guam', 'Pacific/Honolulu', 'Pacific/Johnston', 'Pacific/Kiritimati', 'Pacific/Kosrae', 'Pacific/Kwajalein', 'Pacific/Majuro', 'Pacific/Marquesas', 'Pacific/Midway', 'Pacific/Nauru', 'Pacific/Niue', 'Pacific/Norfolk', 'Pacific/Noumea', 'Pacific/Pago_Pago', 'Pacific/Palau', 'Pacific/Pitcairn', 'Pacific/Ponape', 'Pacific/Port_Moresby', 'Pacific/Rarotonga', 'Pacific/Saipan', 'Pacific/Samoa', 'Pacific/Tahiti', 'Pacific/Tarawa', 'Pacific/Tongatapu', 'Pacific/Truk', 'Pacific/Wake', 'Pacific/Wallis', 'Pacific/Yap', 'Poland', 'Portugal', 'PRC', 'PST8PDT', 'ROC', 'ROK', 'Singapore', 'Turkey', 'UCT', 'Universal', 'US/Alaska', 'US/Aleutian', 'US/Arizona', 'US/Central', 'US/East-Indiana', 'US/Eastern', 'US/Hawaii', 'US/Indiana-Starke', 'US/Michigan', 'US/Mountain', 'US/Pacific', 'US/Pacific-New', 'US/Samoa', 'UTC', 'W-SU', 'WET', 'Zulu'];

  continents = ['AFRICA', 'AMERICA', 'ANTARCTICA', 'ARCTIC', 'ASIA', 'ATLANTIC', 'AUSTRALIA', 'EUROPE', 'INDIAN', 'PACIFIC'];
  codes = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
  if (!codes.indexOf) {
    codes.indexOf = indexOf;
  }
  if (!continents.indexOf) {
    continents.indexOf = indexOf;
  }

  if (what) {
    if (codes.indexOf(what) !== -1 || continents.indexOf(what) !== -1) {
      if (what && what === parseInt(what, 10) + '') {
        // what is an integer
        new_what = continents[codes.indexOf(what)];
      }
      if (what) {
        new_what = what[0] + what.slice(1).toLowerCase();
      }

      for (i = 0; i < identifiers.length; i++) {
        if (identifiers[i].indexOf(new_what + '/') !== -1) {
          returnArr.push(identifiers[i]);
        }
      }
      // Assumed implementation
      return returnArr;
    } else if (what === 'UTC' || what === 1024) {
      throw 'Unknown implementation';
    } else if (what === 'ALL_WITH_BC' || what === 4095) {
      // All with backwards-compatibility
      throw 'Unknown implementation';
    } else if (what === 'PER_COUNTRY' || what === 4096) {
      // Presumably use 'country' argument to limit choices, but where is the country list?
      throw 'Unknown implementation';
    } else if (what === 'ALL' || what === 2047) {
      return identifiers;
    }
  }

  return identifiers;
}
function error_get_last () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: error_get_last();
  // *     returns 1: null
  // *     example 2: error_get_last();
  // *     returns 2: {type: 256, message: 'My user error', file: 'C:\WWW\index.php', line: 2}

  return this.php_js && this.php_js.last_error ? this.php_js.last_error : null; // Only set if error triggered within at() or trigger_error()
}
function error_reporting (level) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: ini_set
  // %        note 1: This will not set a global_value or access level for the ini item
  // %        note 2: If you wish the default value to be as in PHP, you must manually set it
  // %        note 3: This function depends on functions implementing error handling
  // %        note 4: See also our at() error suppressor function (@ operator in PHP) in experimental/language/
  // *     example 1: error_reporting(1);
  // *     returns 1: 6135
  return this.ini_set('error_reporting', level);
}
function trigger_error (error_msg, error_type) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Although this function should only allow the E_USER_ types, we'll allow the
  // %        note 1: others here in order to be able to simulate more types (though should not trigger
  // %        note 1: aggregates like E_STRICT or E_ALL).
  // %        note 1: See also our experimental at() function (to mimic the @ error suppressor)
  // -    depends on: echo
  // *     example 1: trigger_error('This will just be a notice');
  // *     returns 1: true

  // Fix: get to work with set_error_handler()'s handler when that is added

  var type = 0,
    i = 0,
    that = this,
    prepend = '',
    append = '';
  if (!error_type) {
    error_type = 'E_USER_NOTICE';
  }
  var ini_on = function (ini) {
    return that.php_js.ini[ini] && that.php_js.ini[ini].local_value && ((that.php_js.ini[ini].local_value.toString && that.php_js.ini[ini].local_value.toString().toLowerCase && (that.php_js.ini[ini].local_value.toString().toLowerCase() === 'on' || that.php_js.ini[ini].local_value.toString().toLowerCase() === 'true')) || parseInt(that.php_js.ini[ini].local_value, 10) === 1);
  };
  var display_errors = function (type) {
    return that.php_js.ini.error_reporting && (type & that.php_js.ini.error_reporting.local_value) && ini_on('display_errors');
  };
  var TYPES = { // Including all types for completeness, but should not trigger aggregates like E_STRICT or E_ALL
    E_ERROR: 1,
    // Fatal run-time errors. These indicate errors that can not be recovered from, such as a memory allocation problem. Execution of the script is halted.
    E_WARNING: 2,
    // Run-time warnings (non-fatal errors). Execution of the script is not halted.
    E_PARSE: 4,
    // Compile-time parse errors. Parse errors should only be generated by the parser.
    E_NOTICE: 8,
    // Run-time notices. Indicate that the script encountered something that could indicate an error, but could also happen in the normal course of running a script.
    E_CORE_ERROR: 16,
    // Fatal errors that occur during PHP's initial startup. This is like an E_ERROR, except it is generated by the core of PHP.
    E_CORE_WARNING: 32,
    // Warnings (non-fatal errors) that occur during PHP's initial startup. This is like an E_WARNING, except it is generated by the core of PHP.
    E_COMPILE_ERROR: 64,
    // Fatal compile-time errors. This is like an E_ERROR, except it is generated by the Zend Scripting Engine.
    E_COMPILE_WARNING: 128,
    // Compile-time warnings (non-fatal errors). This is like an E_WARNING, except it is generated by the Zend Scripting Engine.
    E_USER_ERROR: 256,
    // User-generated error message. This is like an E_ERROR, except it is generated in PHP code by using the PHP function trigger_error().
    E_USER_WARNING: 512,
    // User-generated warning message. This is like an E_WARNING, except it is generated in PHP code by using the PHP function trigger_error().
    E_USER_NOTICE: 1024,
    // User-generated notice message. This is like an E_NOTICE, except it is generated in PHP code by using the PHP function trigger_error().
    E_STRICT: 2048,
    // Enable to have PHP suggest changes to your code which will ensure the best interoperability and forward compatibility of your code.
    E_RECOVERABLE_ERROR: 4096,
    // Catchable fatal error. It indicates that a probably dangerous error occured, but did not leave the Engine in an unstable state. If the error is not caught by a user defined handle (see also set_error_handler()), the application aborts as it was an E_ERROR.
    E_DEPRECATED: 8192,
    // Run-time notices. Enable this to receive warnings about code that will not work in future versions.
    E_USER_DEPRECATED: 16384,
    // User-generated warning message. This is like an E_DEPRECATED, except it is generated in PHP code by using the PHP function trigger_error().
    E_ALL: 30719 // All errors and warnings, as supported, except of level E_STRICT in PHP < 6.     in:32767, // PHP 6, in:30719, // PHP 5.3.x, in:6143, // PHP 5.2.x, previously:2047, //
  };
  if (typeof error_type === 'number') {
    type = error_type;
  } else { // Allow for a single string or an array of string flags
    error_type = [].concat(error_type);
    for (i = 0; i < error_type.length; i++) {
      // Resolve string input to bitwise
      if (TYPES[error_type[i]]) {
        type = type | TYPES[error_type[i]];
      }
    }
  }
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  if (type & TYPES.E_USER_ERROR || type & TYPES.E_ERROR || type & TYPES.E_CORE_ERROR || type & TYPES.E_COMPILE_ERROR || type & TYPES.E_RECOVERABLE_ERROR || type & TYPES.E_PARSE) {
    if (ini_on('track_errors')) {
      this.$php_errormsg = error_msg; // Can assign to this global, as in PHP (see http://php.net/manual/en/reserved.variables.phperrormsg.php )
    }
    if (display_errors(type)) {
      prepend = this.php_js.ini.error_prepend_string ? this.php_js.ini.error_prepend_string : '';
      append = this.php_js.ini.error_append_string ? this.php_js.ini.error_append_string : '';
      this.echo(prepend + 'Error: ' + error_msg + ' ' + append);
    }
    var e = new Error(error_msg); // Might, for Mozilla, allow to somehow pass in a fileName and lineNumber (2nd and 3rd arguments to Error)
    e.type = type;
    this.php_js.last_error = {
      message: e.message,
      file: e.fileName,
      line: e.lineNumber,
      type: e.type
    }; // fileName and lineNumber presently not working (see note just above)
    throw e;
  }

  if (display_errors(type)) {
    switch (type) {
    case TYPES.E_USER_WARNING:
    case TYPES.E_WARNING:
    case TYPES.E_CORE_WARNING:
    case TYPES.E_COMPILE_WARNING:
      this.echo('Warning: ' + error_msg);
      break;
    case TYPES.E_USER_NOTICE:
    case TYPES.E_NOTICE:
      this.echo('Notice: ' + error_msg);
      break;
    case TYPES.E_DEPRECATED:
    case TYPES.E_USER_DEPRECATED:
      this.echo('Deprecated: ' + error_msg);
      break;
    default:
      throw 'Unrecognized error type';
    }
  }

  return true;
}
function user_error (error_msg, error_type) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: trigger_error
  // *     example 1: user_error('Cannot divide by zero', 256);
  // *     returns 1: true
  return this.trigger_error(error_msg, error_type);
}
function escapeshellarg (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Felix Geisendoerfer (http://www.debuggable.com/felix)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: escapeshellarg("kevin's birthday");
  // *     returns 1: "'kevin\'s birthday'"
  var ret = '';

  ret = arg.replace(/[^\\]'/g, function (m, i, s) {
    return m.slice(0, 1) + '\\\'';
  });

  return "'" + ret + "'";
}
function basename (path, suffix) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Ash Searle (http://hexmen.com/blog/)
  // +   improved by: Lincoln Ramsay
  // +   improved by: djmix
  // *     example 1: basename('/www/site/home.htm', '.htm');
  // *     returns 1: 'home'
  // *     example 2: basename('ecra.php?p=1');
  // *     returns 2: 'ecra.php?p=1'
  var b = path.replace(/^.*[\/\\]/g, '');

  if (typeof(suffix) == 'string' && b.substr(b.length - suffix.length) == suffix) {
    b = b.substr(0, b.length - suffix.length);
  }

  return b;
}
function dirname (path) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ozh
  // +   improved by: XoraX (http://www.xorax.info)
  // *     example 1: dirname('/etc/passwd');
  // *     returns 1: '/etc'
  // *     example 2: dirname('c:/Temp/x');
  // *     returns 2: 'c:/Temp'
  // *     example 3: dirname('/dir/test/');
  // *     returns 3: '/dir'
  return path.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');
}
function fclose (handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var handle = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fclose(handle);
  // *     returns 1: true
  if (!handle || handle.opener !== 'fopen') {
    return false;
  }

  try {
    delete this.php_js.resourceDataPointer[handle.id];
    delete this.php_js.resourceData[handle.id]; // Free up memory
  } catch (e) {
    return false;
  }
  return true;
}
function feof (handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var handle = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fread(handle, 1);
  // *     example 1: feof(handle);
  // *     returns 1: false

  if (!handle || !this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer) {
    return true;
  }

  return !this.php_js.resourceData[handle.id][this.php_js.resourceDataPointer[handle.id]];

}
function fgetc (handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fgetc(handle);
  // *     returns 1: '1'

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer) {
    return false;
  }

  var start = this.php_js.resourceDataPointer[handle.id];

  if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
    return false; // Resource was already closed or already reached the end of the file
  }

  var length = 1; // 2 byte-character (or surrogate)
  this.php_js.resourceDataPointer[handle.id] += length;
  var chr = this.php_js.resourceData[handle.id].substr(start, length);

  // If don't want to treat surrogate pairs as single characters, can delete from here until the last line (return chr;)
  var nextChr = this.php_js.resourceData[handle.id].substr(start + 1, 1);
  var prevChr = start === 0 ? false : this.php_js.resourceData[handle.id].substr(start - 1, 1);
  var code = chr.charCodeAt(0);
  if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
    if (!nextChr) {
      throw 'High surrogate without following low surrogate (fgetc)';
    }
    var next = nextChr.charCodeAt(0);
    if (0xDC00 > next || next > 0xDFFF) {
      throw 'High surrogate without following low surrogate (fgetc)';
    }
    this.php_js.resourceDataPointer[handle.id] += length; // Need to increment counter again since grabbing next item
    return chr + nextChr;
  } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
    if (prevChr === false) {
      throw 'Low surrogate without preceding high surrogate (fgetc)';
    }
    var prev = prevChr.charCodeAt(0);
    if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
      throw 'Low surrogate without preceding high surrogate (fgetc)';
    }
    return prevChr + chr; // Probably shouldn't have reached here, at least if traversing by fgetc()
  }

  return chr;
}
function fgetcsv (handle, length, delimiter, enclosure, escape) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: str_getcsv
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fgetcsv(handle, 1);
  // *     returns 1: '<'

  var start = 0,
    fullline = '';

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
    return false;
  }

  start = this.php_js.resourceDataPointer[handle.id];

  if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
    return false; // Resource was already closed or already reached the end of the file
  }

  fullline = this.php_js.resourceData[handle.id].slice(start, this.php_js.resourceData[handle.id].indexOf('\n', start) + 1);
  if (fullline === '') {
    fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
  }

  length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length / 2) || 1; // two bytes per character (or surrogate), but ensure at least one

  this.php_js.resourceDataPointer[handle.id] += length; // Leaves the pointer one higher apparently than in fgets/fgetss
  return this.str_getcsv(this.php_js.resourceData[handle.id].substr(start, length), delimiter, enclosure, escape);
}
function fgets (handle, length) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fgets(handle, 1);
  // *     returns 1: '<'

  var start = 0,
    fullline = '',
    endlinePos = -1,
    content = '';

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
    return false;
  }

  start = this.php_js.resourceDataPointer[handle.id];

  if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
    return false; // Resource was already closed or already reached the end of the file
  }

  content = this.php_js.resourceData[handle.id].slice(start);

  endlinePos = content.search(/\r\n?|\n/) + start + 1;
  fullline = this.php_js.resourceData[handle.id].slice(start, endlinePos + 1);
  if (fullline === '') {
    fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
  }

  length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length / 2) || 1; // two bytes per character (or surrogate), but ensure at least one

  this.php_js.resourceDataPointer[handle.id] += length;
  return this.php_js.resourceData[handle.id].substr(start, length);
}
function fgetss (handle, length, allowable_tags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: strip_tags
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fgetss(handle, 4096, 'a');
  // *     returns 1: ''

  var start = 0,
    fullline = '';

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
    return false;
  }

  start = this.php_js.resourceDataPointer[handle.id];

  if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
    return false; // Resource was already closed or already reached the end of the file
  }

  fullline = this.php_js.resourceData[handle.id].slice(start, this.php_js.resourceData[handle.id].indexOf('\n', start) + 1);
  if (fullline === '') {
    fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
  }

  length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length / 2) || 1; // two bytes per character (or surrogate), but ensure at least one

  this.php_js.resourceDataPointer[handle.id] += length - 1;
  return this.strip_tags(this.php_js.resourceData[handle.id].substr(start, length), allowable_tags);
}
function file (url) {
  // http://kevin.vanzonneveld.net
  // +   original by: Legaev Andrey
  // +      input by: Jani Hartikainen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
  // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
  // %        note 1: To avoid browser blocking issues's consider using jQuery's: $('#divId').load('http://url') instead.
  // *     example 1: file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: {0: '123'}
  var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
  if (!req) {
    throw new Error('XMLHttpRequest not supported');
  }

  req.open("GET", url, false);
  req.send(null);

  return req.responseText.split('\n');
}
function file_exists (url) {
  // http://kevin.vanzonneveld.net
  // +   original by: Enrique Gonzalez
  // +      input by: Jani Hartikainen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
  // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
  // *     example 1: file_exists('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: '123'
  var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
  if (!req) {
    throw new Error('XMLHttpRequest not supported');
  }

  // HEAD Results are usually shorter (faster) than GET
  req.open('HEAD', url, false);
  req.send(null);
  if (req.status == 200) {
    return true;
  }

  return false;
}
function file_get_contents (url, flags, context, offset, maxLen) {
  // Read the entire file into a string
  //
  // version: 906.111
  // discuss at: http://phpjs.org/functions/file_get_contents
  // +   original by: Legaev Andrey
  // +      input by: Jani Hartikainen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Raphael (Ao) RUDLER
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain without modifications.
  // %        note 2: Synchronous by default (as in PHP) so may lock up browser. Can
  // %        note 2: get async by setting a custom "phpjs.async" property to true and "notification" for an
  // %        note 2: optional callback (both as context params, with responseText, and other JS-specific
  // %        note 2: request properties available via 'this'). Note that file_get_contents() will not return the text
  // %        note 2: in such a case (use this.responseText within the callback). Or, consider using
  // %        note 2: jQuery's: $('#divId').load('http://url') instead.
  // %        note 3: The context argument is only implemented for http, and only partially (see below for
  // %        note 3: "Presently unimplemented HTTP context options"); also the arguments passed to
  // %        note 3: notification are incomplete
  // *     example 1: file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: '123'
  // Note: could also be made to optionally add to global $http_response_header as per http://php.net/manual/en/reserved.variables.httpresponseheader.php
  var tmp, headers = [],
    newTmp = [],
    k = 0,
    i = 0,
    href = '',
    pathPos = -1,
    flagNames = 0,
    content = null,
    http_stream = false;
  var func = function (value) {
    return value.substring(1) !== '';
  };

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  var ini = this.php_js.ini;
  context = context || this.php_js.default_streams_context || null;

  if (!flags) {
    flags = 0;
  }
  var OPTS = {
    FILE_USE_INCLUDE_PATH: 1,
    FILE_TEXT: 32,
    FILE_BINARY: 64
  };
  if (typeof flags === 'number') { // Allow for a single string or an array of string flags
    flagNames = flags;
  } else {
    flags = [].concat(flags);
    for (i = 0; i < flags.length; i++) {
      if (OPTS[flags[i]]) {
        flagNames = flagNames | OPTS[flags[i]];
      }
    }
  }

  if (flagNames & OPTS.FILE_BINARY && (flagNames & OPTS.FILE_TEXT)) { // These flags shouldn't be together
    throw 'You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()';
  }

  if ((flagNames & OPTS.FILE_USE_INCLUDE_PATH) && ini.include_path && ini.include_path.local_value) {
    var slash = ini.include_path.local_value.indexOf('/') !== -1 ? '/' : '\\';
    url = ini.include_path.local_value + slash + url;
  } else if (!/^(https?|file):/.test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
    href = this.window.location.href;
    pathPos = url.indexOf('/') === 0 ? href.indexOf('/', 8) - 1 : href.lastIndexOf('/');
    url = href.slice(0, pathPos + 1) + url;
  }

  if (context) {
    var http_options = context.stream_options && context.stream_options.http;
    http_stream = !! http_options;
  }

  if (!context || http_stream) {
    var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
    if (!req) {
      throw new Error('XMLHttpRequest not supported');
    }

    var method = http_stream ? http_options.method : 'GET';
    var async = !! (context && context.stream_params && context.stream_params['phpjs.async']);

    if (ini['phpjs.ajaxBypassCache'] && ini['phpjs.ajaxBypassCache'].local_value) {
      url += (url.match(/\?/) == null ? "?" : "&") + (new Date()).getTime(); // Give optional means of forcing bypass of cache
    }

    req.open(method, url, async);
    if (async) {
      var notification = context.stream_params.notification;
      if (typeof notification === 'function') {
        // Fix: make work with req.addEventListener if available: https://developer.mozilla.org/En/Using_XMLHttpRequest
        if (0 && req.addEventListener) { // Unimplemented so don't allow to get here
/*
          req.addEventListener('progress', updateProgress, false);
          req.addEventListener('load', transferComplete, false);
          req.addEventListener('error', transferFailed, false);
          req.addEventListener('abort', transferCanceled, false);
          */
        } else {
          req.onreadystatechange = function (aEvt) { // aEvt has stopPropagation(), preventDefault(); see https://developer.mozilla.org/en/NsIDOMEvent
            // Other XMLHttpRequest properties: multipart, responseXML, status, statusText, upload, withCredentials
/*
  PHP Constants:
  STREAM_NOTIFY_RESOLVE   1       A remote address required for this stream has been resolved, or the resolution failed. See severity  for an indication of which happened.
  STREAM_NOTIFY_CONNECT   2     A connection with an external resource has been established.
  STREAM_NOTIFY_AUTH_REQUIRED 3     Additional authorization is required to access the specified resource. Typical issued with severity level of STREAM_NOTIFY_SEVERITY_ERR.
  STREAM_NOTIFY_MIME_TYPE_IS  4     The mime-type of resource has been identified, refer to message for a description of the discovered type.
  STREAM_NOTIFY_FILE_SIZE_IS  5     The size of the resource has been discovered.
  STREAM_NOTIFY_REDIRECTED    6     The external resource has redirected the stream to an alternate location. Refer to message .
  STREAM_NOTIFY_PROGRESS  7     Indicates current progress of the stream transfer in bytes_transferred and possibly bytes_max as well.
  STREAM_NOTIFY_COMPLETED 8     There is no more data available on the stream.
  STREAM_NOTIFY_FAILURE   9     A generic error occurred on the stream, consult message and message_code for details.
  STREAM_NOTIFY_AUTH_RESULT   10     Authorization has been completed (with or without success).

  STREAM_NOTIFY_SEVERITY_INFO 0     Normal, non-error related, notification.
  STREAM_NOTIFY_SEVERITY_WARN 1     Non critical error condition. Processing may continue.
  STREAM_NOTIFY_SEVERITY_ERR  2     A critical error occurred. Processing cannot continue.
  */
            var objContext = {
              responseText: req.responseText,
              responseXML: req.responseXML,
              status: req.status,
              statusText: req.statusText,
              readyState: req.readyState,
              evt: aEvt
            }; // properties are not available in PHP, but offered on notification via 'this' for convenience
            // notification args: notification_code, severity, message, message_code, bytes_transferred, bytes_max (all int's except string 'message')
            // Need to add message, etc.
            var bytes_transferred;
            switch (req.readyState) {
            case 0:
              //     UNINITIALIZED     open() has not been called yet.
              notification.call(objContext, 0, 0, '', 0, 0, 0);
              break;
            case 1:
              //     LOADING     send() has not been called yet.
              notification.call(objContext, 0, 0, '', 0, 0, 0);
              break;
            case 2:
              //     LOADED     send() has been called, and headers and status are available.
              notification.call(objContext, 0, 0, '', 0, 0, 0);
              break;
            case 3:
              //     INTERACTIVE     Downloading; responseText holds partial data.
              bytes_transferred = req.responseText.length * 2; // One character is two bytes
              notification.call(objContext, 7, 0, '', 0, bytes_transferred, 0);
              break;
            case 4:
              //     COMPLETED     The operation is complete.
              if (req.status >= 200 && req.status < 400) {
                bytes_transferred = req.responseText.length * 2; // One character is two bytes
                notification.call(objContext, 8, 0, '', req.status, bytes_transferred, 0);
              } else if (req.status === 403) { // Fix: These two are finished except for message
                notification.call(objContext, 10, 2, '', req.status, 0, 0);
              } else { // Errors
                notification.call(objContext, 9, 2, '', req.status, 0, 0);
              }
              break;
            default:
              throw 'Unrecognized ready state for file_get_contents()';
            }
          }
        }
      }
    }

    if (http_stream) {
      var sendHeaders = http_options.header && http_options.header.split(/\r?\n/);
      var userAgentSent = false;
      for (i = 0; i < sendHeaders.length; i++) {
        var sendHeader = sendHeaders[i];
        var breakPos = sendHeader.search(/:\s*/);
        var sendHeaderName = sendHeader.substring(0, breakPos);
        req.setRequestHeader(sendHeaderName, sendHeader.substring(breakPos + 1));
        if (sendHeaderName === 'User-Agent') {
          userAgentSent = true;
        }
      }
      if (!userAgentSent) {
        var user_agent = http_options.user_agent || (ini.user_agent && ini.user_agent.local_value);
        if (user_agent) {
          req.setRequestHeader('User-Agent', user_agent);
        }
      }
      content = http_options.content || null;
/*
      // Presently unimplemented HTTP context options
      var request_fulluri = http_options.request_fulluri || false; // When set to TRUE, the entire URI will be used when constructing the request. (i.e. GET http://www.example.com/path/to/file.html HTTP/1.0). While this is a non-standard request format, some proxy servers require it.
      var max_redirects = http_options.max_redirects || 20; // The max number of redirects to follow. Value 1 or less means that no redirects are followed.
      var protocol_version = http_options.protocol_version || 1.0; // HTTP protocol version
      var timeout = http_options.timeout || (ini.default_socket_timeout && ini.default_socket_timeout.local_value); // Read timeout in seconds, specified by a float
      var ignore_errors = http_options.ignore_errors || false; // Fetch the content even on failure status codes.
      */
    }

    if (flagNames & OPTS.FILE_TEXT) { // Overrides how encoding is treated (regardless of what is returned from the server)
      var content_type = 'text/html';
      if (http_options && http_options['phpjs.override']) { // Fix: Could allow for non-HTTP as well
        content_type = http_options['phpjs.override']; // We use this, e.g., in gettext-related functions if character set
        //   overridden earlier by bind_textdomain_codeset()
      } else {
        var encoding = (ini['unicode.stream_encoding'] && ini['unicode.stream_encoding'].local_value) || 'UTF-8';
        if (http_options && http_options.header && (/^content-type:/im).test(http_options.header)) { // We'll assume a content-type expects its own specified encoding if present
          content_type = http_options.header.match(/^content-type:\s*(.*)$/im)[1]; // We let any header encoding stand
        }
        if (!(/;\s*charset=/).test(content_type)) { // If no encoding
          content_type += '; charset=' + encoding;
        }
      }
      req.overrideMimeType(content_type);
    }
    // Default is FILE_BINARY, but for binary, we apparently deviate from PHP in requiring the flag, since many if not
    //     most people will also want a way to have it be auto-converted into native JavaScript text instead
    else if (flagNames & OPTS.FILE_BINARY) { // Trick at https://developer.mozilla.org/En/Using_XMLHttpRequest to get binary
      req.overrideMimeType('text/plain; charset=x-user-defined');
      // Getting an individual byte then requires:
      // responseText.charCodeAt(x) & 0xFF; // throw away high-order byte (f7) where x is 0 to responseText.length-1 (see notes in our substr())
    }

    try {
      if (http_options && http_options['phpjs.sendAsBinary']) { // For content sent in a POST or PUT request (use with file_put_contents()?)
        req.sendAsBinary(content); // In Firefox, only available FF3+
      } else {
        req.send(content);
      }
    } catch (e) {
      // catches exception reported in issue #66
      return false;
    }

    tmp = req.getAllResponseHeaders();
    if (tmp) {
      tmp = tmp.split('\n');
      for (k = 0; k < tmp.length; k++) {
        if (func(tmp[k])) {
          newTmp.push(tmp[k]);
        }
      }
      tmp = newTmp;
      for (i = 0; i < tmp.length; i++) {
        headers[i] = tmp[i];
      }
      this.$http_response_header = headers; // see http://php.net/manual/en/reserved.variables.httpresponseheader.php
    }

    if (offset || maxLen) {
      if (maxLen) {
        return req.responseText.substr(offset || 0, maxLen);
      }
      return req.responseText.substr(offset);
    }
    return req.responseText;
  }
  return false;
}
function filemtime (file) {
  // +   original by: Ole Vrijenhoek (http://www.nervous.nl/)
  // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: get_headers
  // %        note 1:  Looks for Last-Modified in response header.
  // *     example 1: filemtime('http://www.un.org');
  // *     returns 1: 1241532483

  var headers = {};
  headers = this.get_headers(file, 1);
  return (headers && headers['Last-Modified'] && Date.parse(headers['Last-Modified']) / 1000) || false;
}
function filesize (url) {
  // http://kevin.vanzonneveld.net
  // +   original by: Enrique Gonzalez
  // +      input by: Jani Hartikainen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: T. Wild
  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
  // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
  // *     example 1: filesize('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: '3'
  var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
  if (!req) {
    throw new Error('XMLHttpRequest not supported');
  }

  req.open('HEAD', url, false);
  req.send(null);

  if (!req.getResponseHeader) {
    try {
      throw new Error('No getResponseHeader!');
    } catch (e) {
      return false;
    }
  } else if (!req.getResponseHeader('Content-Length')) {
    try {
      throw new Error('No Content-Length!');
    } catch (e2) {
      return false;
    }
  } else {
    return req.getResponseHeader('Content-Length');
  }
}
function fopen (filename, mode, use_include_path, context) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Paul Smith
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: file_get_contents
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     returns 1: 'Resource id #1'

  var resource = {},
    i = 0,
    that = this;
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  // BEGIN file inclusion: file_get_contents
  var file_get_contents = function (url) {
    var req = that.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) {
      throw new Error('XMLHttpRequest not supported');
    }
    if (!(/^http/).test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
      url = that.window.location.href + '/' + url;
    }
    req.open("GET", url, false);
    req.send(null);
    return req.responseText;
  };
  // END file inclusion

  if (use_include_path === 1 || use_include_path === '1' || use_include_path === true) {
    // Not implemented yet: Search for file in include path too
  }
  if (context) {
    // Not implemented yet, but could be useful to modify nature of HTTP request, etc.
  }

  for (i = 0; i < mode.length; i++) { // Have to deal with other flags if ever allow
    if (mode.charAt(i) === 'r' && (!mode.charAt(i + 1) || mode.charAt(i + 1) !== '+')) {
      continue;
    }
    switch (mode.charAt(i)) {
    case 'r':
      // must have '+' now
    case 'w':
      // or 'w+'
    case 'a':
      // or 'a+'
    case 'x':
      // or 'x+'
      throw 'Writing is not implemented';
    case 'b':
    case 't':
      throw 'Windows-only modes are not supported';
    default:
      throw 'Unrecognized file mode passed to ' + getFuncName(arguments.caller) + '()';
    }
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.resourceData = this.php_js.resourceData || {};
  this.php_js.resourceDataPointer = this.php_js.resourceDataPointer || {};
  this.php_js.resourceIdCounter = this.php_js.resourceIdCounter || 0;
  // END REDUNDANT

  // BEGIN STATIC

  function PHPJS_Resource(type, id, opener) { // Can reuse the following for other resources, just changing the instantiation
    // See http://php.net/manual/en/resource.php for types
    this.type = type;
    this.id = id;
    this.opener = opener;
  }
  PHPJS_Resource.prototype.toString = function () {
    return 'Resource id #' + this.id;
  };
  PHPJS_Resource.prototype.get_resource_type = function () {
    return this.type;
  };
  PHPJS_Resource.prototype.var_dump = function () {
    return 'resource(' + this.id + ') of type (' + this.type + ')';
  };
  // END STATIC

  this.php_js.resourceIdCounter++;
  this.php_js.resourceData[this.php_js.resourceIdCounter] = this.file_get_contents(filename);
  this.php_js.resourceDataPointer[this.php_js.resourceIdCounter] = 0;

  resource = new PHPJS_Resource('stream', this.php_js.resourceIdCounter, 'fopen');
  resource.mode = mode; // Add file-specific attributes

  return resource; // may be 'file' instead of 'stream' type on some systems
}
function fpassthru (handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fpassthru(handle);
  // *     returns 1: 3

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.id) {
    return false;
  }

  var chrs = this.php_js.resourceData[handle.id].slice(this.php_js.resourceDataPointer[handle.id]);
  this.echo(chrs);
  this.php_js.resourceDataPointer[handle.id] = this.php_js.resourceData[handle.id].length; // Place pointer at end
  return chrs;
}
function fread (handle, length) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fread(handle, 10);
  // *     returns 1: '123'

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer) {
    return false;
  }

  length = length < 8192 ? (Math.floor(length / 2) || 1) : 4096; // 2 bytes per character (or surrogate) means limit of 8192 bytes = 4096 characters; ensure at least one

  var start = this.php_js.resourceDataPointer[handle.id];

  if (start === undefined) {
    return false; // Resource was already closed
  }

  if (!this.php_js.resourceData[handle.id][start]) {
    return ''; // already reached the end of the file (but pointer not closed)
  }

  this.php_js.resourceDataPointer[handle.id] += length;

  return this.php_js.resourceData[handle.id].substr(start, length); // Extra length won't be a problem here
}
function fscanf (handle, format) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: fgets
  // -    depends on: sscanf
  // *     example 1: var handle = fopen('http://example.com/names_and_professions.html', 'r');
  // *     example 1: fscanf(handle, '%s\t%s\t%s\n');
  // *     returns 1: ['robert', 'slacker', 'us']

  var mixed; // Could be an array or an integer

  mixed = this.sscanf.apply(this, [fgets(handle), format].concat(Array.prototype.slice.call(arguments, 2)));

  return mixed;
}
function fseek (handle, offset, whence) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fseek(h, 100);
  // *     returns 1: 0

  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
    return -1;
  }

  switch (whence) {
  case undefined:
    // fall-through
  case 'SEEK_SET':
    this.php_js.resourceDataPointer[handle.id] = offset / 2 + 1;
    break;
  case 'SEEK_CUR':
    this.php_js.resourceDataPointer[handle.id] += offset / 2 + 1;
    break;
  case 'SEEK_END':
    this.php_js.resourceDataPointer[handle.id] = this.php_js.resourceData[handle.id].length + offset / 2 + 1;
    break;
  default:
    throw 'Unrecognized whence value for fseek()';
  }
  return 0;
}
function ftell (handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fread(h, 100);
  // *     example 1: ftell(h);
  // *     returns 1: 99

  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
    return false;
  }
  return this.php_js.resourceDataPointer[handle.id] * 2 - 1; // We're currently storing by character, so need to multiply by two; subtract one to appear like array pointer
}
function pathinfo (path, options) {
  // http://kevin.vanzonneveld.net
  // +   original by: Nate
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    improved by: Brett Zamir (http://brett-zamir.me)
  // +    input by: Timo
  // %        note 1: Inspired by actual PHP source: php5-5.2.6/ext/standard/string.c line #1559
  // %        note 1: The way the bitwise arguments are handled allows for greater flexibility
  // %        note 1: & compatability. We might even standardize this code and use a similar approach for
  // %        note 1: other bitwise PHP functions
  // %        note 2: php.js tries very hard to stay away from a core.js file with global dependencies, because we like
  // %        note 2: that you can just take a couple of functions and be on your way.
  // %        note 2: But by way we implemented this function, if you want you can still declare the PATHINFO_*
  // %        note 2: yourself, and then you can use: pathinfo('/www/index.html', PATHINFO_BASENAME | PATHINFO_EXTENSION);
  // %        note 2: which makes it fully compliant with PHP syntax.
  // -    depends on: dirname
  // -    depends on: basename
  // *     example 1: pathinfo('/www/htdocs/index.html', 1);
  // *     returns 1: '/www/htdocs'
  // *     example 2: pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME');
  // *     returns 2: 'index.html'
  // *     example 3: pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION');
  // *     returns 3: 'html'
  // *     example 4: pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME');
  // *     returns 4: 'index'
  // *     example 5: pathinfo('/www/htdocs/index.html', 2 | 4);
  // *     returns 5: {basename: 'index.html', extension: 'html'}
  // *     example 6: pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL');
  // *     returns 6: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
  // *     example 7: pathinfo('/www/htdocs/index.html');
  // *     returns 7: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
  // Working vars
  var opt = '',
    optName = '',
    optTemp = 0,
    tmp_arr = {},
    cnt = 0,
    i = 0;
  var have_basename = false,
    have_extension = false,
    have_filename = false;

  // Input defaulting & sanitation
  if (!path) {
    return false;
  }
  if (!options) {
    options = 'PATHINFO_ALL';
  }

  // Initialize binary arguments. Both the string & integer (constant) input is
  // allowed
  var OPTS = {
    'PATHINFO_DIRNAME': 1,
    'PATHINFO_BASENAME': 2,
    'PATHINFO_EXTENSION': 4,
    'PATHINFO_FILENAME': 8,
    'PATHINFO_ALL': 0
  };
  // PATHINFO_ALL sums up all previously defined PATHINFOs (could just pre-calculate)
  for (optName in OPTS) {
    OPTS.PATHINFO_ALL = OPTS.PATHINFO_ALL | OPTS[optName];
  }
  if (typeof options !== 'number') { // Allow for a single string or an array of string flags
    options = [].concat(options);
    for (i = 0; i < options.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[options[i]]) {
        optTemp = optTemp | OPTS[options[i]];
      }
    }
    options = optTemp;
  }

  // Internal Functions
  var __getExt = function (path) {
    var str = path + '';
    var dotP = str.lastIndexOf('.') + 1;
    return !dotP ? false : dotP !== str.length ? str.substr(dotP) : '';
  };


  // Gather path infos
  if (options & OPTS.PATHINFO_DIRNAME) {
    var dirname = this.dirname(path);
    tmp_arr.dirname = dirname === path ? '.' : dirname;
  }

  if (options & OPTS.PATHINFO_BASENAME) {
    if (false === have_basename) {
      have_basename = this.basename(path);
    }
    tmp_arr.basename = have_basename;
  }

  if (options & OPTS.PATHINFO_EXTENSION) {
    if (false === have_basename) {
      have_basename = this.basename(path);
    }
    if (false === have_extension) {
      have_extension = __getExt(have_basename);
    }
    if (false !== have_extension) {
      tmp_arr.extension = have_extension;
    }
  }

  if (options & OPTS.PATHINFO_FILENAME) {
    if (false === have_basename) {
      have_basename = this.basename(path);
    }
    if (false === have_extension) {
      have_extension = __getExt(have_basename);
    }
    if (false === have_filename) {
      have_filename = have_basename.slice(0, have_basename.length - (have_extension ? have_extension.length + 1 : have_extension === false ? 0 : 1));
    }

    tmp_arr.filename = have_filename;
  }


  // If array contains only 1 element: return string
  cnt = 0;
  for (opt in tmp_arr) {
    cnt++;
  }
  if (cnt == 1) {
    return tmp_arr[opt];
  }

  // Return full-blown array
  return tmp_arr;
}
function pclose (handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var handle = popen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: pclose(handle);
  // *     returns 1: true
  if (!handle || handle.opener !== 'popen') {
    return false;
  }

  try {
    delete this.php_js.resourceDataPointer[handle.id];
    delete this.php_js.resourceData[handle.id]; // Free up memory
  } catch (e) {
    return false;
  }
  return true;
}
function popen (filename, mode, use_include_path, context) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Paul Smith
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: file_get_contents
  // *     example 1: popen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     returns 1: 'Resource id #1'

  var resource = {},
    i = 0,
    that = this;
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  // BEGIN file inclusion: file_get_contents
  var file_get_contents = function (url) {
    var req = that.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) {
      throw new Error('XMLHttpRequest not supported');
    }
    if (!(/^http/).test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
      url = that.window.location.href + '/' + url;
    }
    req.open("GET", url, false);
    req.send(null);
    return req.responseText;
  };
  // END file inclusion

  if (use_include_path === 1 || use_include_path === '1' || use_include_path === true) {
    // Not implemented yet: Search for file in include path too
  }
  if (context) {
    // Not implemented yet, but could be useful to modify nature of HTTP request, etc.
  }

  for (i = 0; i < mode.length; i++) { // Have to deal with other flags if ever allow
    switch (mode.charAt(i)) {
    case 'r':
      if (!mode.charAt(i + 1) || mode.charAt(i + 1) !== '+') {
        break;
      }
    case 'w':
      // or 'w+'
    case 'a':
      // or 'a+'
    case 'x':
      // or 'x+'
      throw 'Writing is not implemented';
    case 'b':
    case 't':
      throw 'Windows-only modes are not supported';
    default:
      throw 'Unrecognized file mode passed to ' + getFuncName(arguments.caller) + '()';
    }
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.resourceData = this.php_js.resourceData || {};
  this.php_js.resourceDataPointer = this.php_js.resourceDataPointer || {};
  this.php_js.resourceIdCounter = this.php_js.resourceIdCounter || 0;
  // END REDUNDANT

  // BEGIN STATIC

  function PHPJS_Resource(type, id, opener) { // Can reuse the following for other resources, just changing the instantiation
    // See http://php.net/manual/en/resource.php for types
    this.type = type;
    this.id = id;
    this.opener = opener;
  }
  PHPJS_Resource.prototype.toString = function () {
    return 'Resource id #' + this.id;
  };
  PHPJS_Resource.prototype.get_resource_type = function () {
    return this.type;
  };
  PHPJS_Resource.prototype.var_dump = function () {
    return 'resource(' + this.id + ') of type (' + this.type + ')';
  };
  // END STATIC

  this.php_js.resourceIdCounter++;

  this.php_js.resourceData[this.php_js.resourceIdCounter] = this.file_get_contents(filename);
  this.php_js.resourceDataPointer[this.php_js.resourceIdCounter] = 0;

  resource = new PHPJS_Resource('stream', this.php_js.resourceIdCounter, 'popen');
  resource.mode = mode; // Add file-specific attributes

  return resource; // may be 'file' instead of 'stream' type on some systems
}
function readfile (filename, use_include_path, context) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: echo
  // *     example 1: readfile('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: '123'

  var read_data = this.file_get_contents(filename, use_include_path, context); // bitwise-or use_include_path?
  this.echo(read_data);
  return read_data;
}
function realpath (path) {
  // http://kevin.vanzonneveld.net
  // +   original by: mk.keck
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // %        note 1: Returned path is an url like e.g. 'http://yourhost.tld/path/'
  // *     example 1: realpath('../.././_supporters/pj_test_supportfile_1.htm');
  // *     returns 1: 'file:/home/kevin/workspace/_supporters/pj_test_supportfile_1.htm'
  var p = 0,
    arr = []; /* Save the root, if not given */
  var r = this.window.location.href; /* Avoid input failures */
  path = (path + '').replace('\\', '/'); /* Check if there's a port in path (like 'http://') */
  if (path.indexOf('://') !== -1) {
    p = 1;
  } /* Ok, there's not a port in path, so let's take the root */
  if (!p) {
    path = r.substring(0, r.lastIndexOf('/') + 1) + path;
  } /* Explode the given path into it's parts */
  arr = path.split('/'); /* The path is an array now */
  path = []; /* Foreach part make a check */
  for (var k in arr) { /* This is'nt really interesting */
    if (arr[k] == '.') {
      continue;
    } /* This reduces the realpath */
    if (arr[k] == '..') {
/* But only if there more than 3 parts in the path-array.
       * The first three parts are for the uri */
      if (path.length > 3) {
        path.pop();
      }
    } /* This adds parts to the realpath */
    else {
/* But only if the part is not empty or the uri
       * (the first three parts ar needed) was not
       * saved */
      if ((path.length < 2) || (arr[k] !== '')) {
        path.push(arr[k]);
      }
    }
  } /* Returns the absloute path as a string */
  return path.join('/');
}
function rewind (handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: fread(h, 100);
  // *     example 1: rewind(h);
  // *     returns 1: true

  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
    return false;
  }
  this.php_js.resourceDataPointer[handle.id] = 0;
  return true;
}
function call_user_func (cb) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Diplom@t (http://difane.com/)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: call_user_func('isNaN', 'a');
  // *     returns 1: true
  var func;

  if (typeof cb === 'string') {
    func = (typeof this[cb] === 'function') ? this[cb] : func = (new Function(null, 'return ' + cb))();
  }
  else if (Object.prototype.toString.call(cb) === '[object Array]') {
    func = (typeof cb[0] == 'string') ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]];
  }
  else if (typeof cb === 'function') {
    func = cb;
  }

  if (typeof func !== 'function') {
    throw new Error(func + ' is not a valid function');
  }

  var parameters = Array.prototype.slice.call(arguments, 1);
  return (typeof cb[0] === 'string') ? func.apply(eval(cb[0]), parameters) : (typeof cb[0] !== 'object') ? func.apply(null, parameters) : func.apply(cb[0], parameters);
}
function call_user_func_array (cb, parameters) {
  // http://kevin.vanzonneveld.net
  // +   original by: Thiago Mata (http://thiagomata.blog.com)
  // +   revised  by: Jon Hohle
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Diplom@t (http://difane.com/)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: call_user_func_array('isNaN', ['a']);
  // *     returns 1: true
  // *     example 2: call_user_func_array('isNaN', [1]);
  // *     returns 2: false
  var func;

  if (typeof cb === 'string') {
    func = (typeof this[cb] === 'function') ? this[cb] : func = (new Function(null, 'return ' + cb))();
  }
  else if (Object.prototype.toString.call(cb) === '[object Array]') {
    func = (typeof cb[0] == 'string') ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]];
  }
  else if (typeof cb === 'function') {
    func = cb;
  }

  if (typeof func !== 'function') {
    throw new Error(func + ' is not a valid function');
  }

  return (typeof cb[0] === 'string') ? func.apply(eval(cb[0]), parameters) : (typeof cb[0] !== 'object') ? func.apply(null, parameters) : func.apply(cb[0], parameters);
}
function create_function (args, code) {
  // http://kevin.vanzonneveld.net
  // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
  // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: f = create_function('a, b', "return (a + b);");
  // *     example 1: f(1, 2);
  // *     returns 1: 3
  try {
    return Function.apply(null, args.split(',').concat(code));
  } catch (e) {
    return false;
  }
}
function forward_static_call (cb, parameters) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: No real relevance to late static binding here; might also use call_user_func()
  // *     example 1: forward_static_call('isNaN', 'a');
  // *     returns 1: true

  var func;

  if (typeof cb === 'string') {
    if (typeof this[cb] == 'function') {
      func = this[cb];
    } else {
      func = (new Function(null, 'return ' + cb))();
    }
  }
  else if (Object.prototype.toString.call(cb) === '[object Array]') {
    func = eval(cb[0] + "['" + cb[1] + "']");
  }

  if (typeof func !== 'function') {
    throw new Error(func + ' is not a valid function');
  }

  return func.apply(null, Array.prototype.slice.call(arguments, 1));
}
function forward_static_call_array (cb, parameters) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: No real relevance to late static binding here; might also use call_user_func_array()
  // *     example 1: forward_static_call_array('isNaN', ['a']);
  // *     returns 1: true
  // *     example 2: forward_static_call_array('isNaN', [1]);
  // *     returns 2: false

  var func;

  if (typeof cb === 'string') {
    if (typeof this[cb] == 'function') {
      func = this[cb];
    } else {
      func = (new Function(null, 'return ' + cb))();
    }
  }
  else if (Object.prototype.toString.call(cb) === '[object Array]') {
    func = eval(cb[0] + "['" + cb[1] + "']");
  }

  if (typeof func !== 'function') {
    throw new Error(func + ' is not a valid function');
  }

  return func.apply(null, parameters);
}
function func_get_arg (num) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: May not work in all JS implementations
  // *     example 1: function tmp_a() {return func_get_arg(1);}
  // *     example 1: tmp_a('a', 'b');
  // *     returns 1: 'a'
  if (!arguments.callee.caller) {
    try {
      throw new Error('Either you are using this in a browser which does not support the "caller" property or you are calling this from a global context');
      //return false;
    } catch (e) {
      return false;
    }
  }

  if (num > arguments.callee.caller.arguments.length - 1) {
    try {
      throw new Error('Argument number is greater than the number of arguments actually passed');
      //return false;
    } catch (e2) {
      return false;
    }
  }

  return arguments.callee.caller.arguments[num];
}
function func_get_args () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: May not work in all JS implementations
  // *     example 1: function tmp_a () {return func_get_args();}
  // *     example 1: tmp_a('a', 'b');
  // *     returns 1: ['a', 'b']
  if (!arguments.callee.caller) {
    try {
      throw new Error('Either you are using this in a browser which does not support the "caller" property or you are calling this from a global context');
      // return false;
    } catch (e) {
      return false;
    }
  }

  return Array.prototype.slice.call(arguments.callee.caller.arguments);
}
function func_num_args () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: May not work in all JS implementations
  // *     example 1: function tmp_a () {return func_num_args();}
  // *     example 1: tmp_a('a', 'b');
  // *     returns 1: 2
  if (!arguments.callee.caller) {
    try {
      throw new Error('Either you are using this in a browser which does not support the "caller" property or you are calling this from a global context');
      //return false;
    } catch (e) {
      return false;
    }
  }

  return arguments.callee.caller.arguments.length;
}
function function_exists (func_name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Steve Clay
  // +   improved by: Legaev Andrey
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: function_exists('isFinite');
  // *     returns 1: true

  if (typeof func_name === 'string') {
    func_name = this.window[func_name];
  }
  return typeof func_name === 'function';
}
function get_defined_functions () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Test case 1: If get_defined_functions can find itself in the defined functions, it worked :)
  // *     example 1: function test_in_array (array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] == p_val) return true;} return false;}
  // *     example 1: funcs = get_defined_functions();
  // *     example 1: found = test_in_array(funcs, 'get_defined_functions');
  // *     results 1: found == true
  var i = '',
    arr = [],
    already = {};

  for (i in this.window) {
    try {
      if (typeof this.window[i] === 'function') {
        if (!already[i]) {
          already[i] = 1;
          arr.push(i);
        }
      } else if (typeof this.window[i] === 'object') {
        for (var j in this.window[i]) {
          if (typeof this.window[j] === 'function' && this.window[j] && !already[j]) {
            already[j] = 1;
            arr.push(j);
          }
        }
      }
    } catch (e) {
      // Some objects in Firefox throw exceptions when their properties are accessed (e.g., sessionStorage)
    }
  }

  return arr;
}
function register_shutdown_function (cb) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: register_shutdown_function(function(first, middle, last) {alert('Goodbye '+first+' '+middle+' '+last+'!');}, 'Kevin', 'van', 'Zonneveld');
  // *     returns 1: 'Goodbye Kevin van Zonneveld!'
  var args = [],
    _addEvent = function (el, type, handler, capturing) {
      if (el.addEventListener) { /* W3C */
        el.addEventListener(type, handler, !! capturing);
      } else if (el.attachEvent) { /* IE */
        el.attachEvent('on' + type, handler);
      } else { /* OLDER BROWSERS (DOM0) */
        el['on' + type] = handler;
      }
    };

  args = Array.prototype.slice.call(arguments, 1);
  _addEvent(this.window, 'unload', function () {
    cb.apply(null, args);
  }, false);
}
function i18n_loc_get_default () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Renamed in PHP6 from locale_get_default(). Not listed yet at php.net
  // %          note 2: List of locales at http://demo.icu-project.org/icu-bin/locexp
  // %          note 3: To be usable with sort() if it is passed the SORT_LOCALE_STRING sorting flag: http://php.net/manual/en/function.sort.php
  // -    depends on: i18n_loc_set_default
  // *     example 1: i18n_loc_get_default();
  // *     returns 1: 'en_US_POSIX'

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT
  return this.php_js.i18nLocale || (i18n_loc_set_default('en_US_POSIX'), 'en_US_POSIX'); // Ensure defaults are set up
}
function i18n_loc_set_default (name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Renamed in PHP6 from locale_set_default(). Not listed yet at php.net
  // %          note 2: List of locales at http://demo.icu-project.org/icu-bin/locexp (use for implementing other locales here)
  // %          note 3: To be usable with sort() if it is passed the SORT_LOCALE_STRING sorting flag: http://php.net/manual/en/function.sort.php
  // *     example 1: i18n_loc_set_default('pt_PT');
  // *     returns 1: true

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT

  this.php_js.i18nLocales = {
    en_US_POSIX: {
      sorting: function (str1, str2) { // Fix: This one taken from strcmp, but need for other locales; we don't use localeCompare since its locale is not settable
        return (str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1);
      }
    }
  };

  this.php_js.i18nLocale = name;
  return true;
}
function assert (assertion) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Do not pass untrusted user input to assert() in string form (you can test it beforehand though)
  // %          note 2: Does not provide perfect arguments to the assertion callback, as far as file location or line number
  // *     example 1: assert('false === true');
  // *     returns 1: false

  var result = false,
    callback, retVal, err = undefined;

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  this.php_js.assert_values = this.php_js.assert_values || {};
  // END REDUNDANT

  var getOption = function (value) {
    if (this.php_js.assert_values[value]) {
      return this.php_js.assert_values[value];
    }
    if (this.php_js.ini[value]) {
      return this.php_js.ini[value].local_value;
    }
    switch (value) {
    case 'assert.active':
      return 1;
    case 'assert.warning':
      // Don't need this now
      //return 1;
      throw 'We have not yet implemented warnings in JavaScript (assert())';
    case 'assert.bail':
      return 0;
    case 'assert.quiet_eval':
      return 0;
    case 'assert.callback':
      return null;
    default:
      throw 'There was some problem';
    }
  };

  if (!getOption('assert.active')) {
    return false; // is this correct? should callbacks still execute? Should still bail if on?
  }

  try { // Less overhead to use string when assertion checking is off, allows message of exact code to callback
    result = typeof assertion === 'string' ? eval(assertion) : assertion;
  } catch (e) {
    if (!getOption('assert.quiet_eval')) {
      throw e;
    }
    err = e;
    result = false;
  }
  retVal = result !== false; // return false if false, otherwise, return true
  if (retVal === false) {
    if (getOption('assert.bail')) { // Todo: Will the function bail before a callback or after?
      throw 'Assertion bailed'; // No way to bail without throwing an exception (and there are no "warnings" in JavaScript for us to throw)
    }
    callback = getOption('assert.callback');
    if (typeof callback === 'string') {
      callback = this.window[callback];
    }
    // Not perfect for file location (might also use __FILE__()) or line number
    callback(this.window.location.href, err && err.lineNumber, (typeof assertion === 'string' ? assertion : '')); // From the docs, what does this mean?: "the third argument will contain the expression that failed (if any - literal values such as 1 or "two" will not be passed via this argument)"
  }
  return retVal;
}
function assert_options (what, value) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: assert_options('ASSERT_CALLBACK');
  // *     returns 1: null

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  this.php_js.assert_values = this.php_js.assert_values || {};
  // END REDUNDANT

  var ini, dflt;
  switch (what) {
  case 'ASSERT_ACTIVE':
    ini = 'assert.active';
    dflt = 1;
    break;
  case 'ASSERT_WARNING':
    ini = 'assert.warning';
    dflt = 1;
    throw 'We have not yet implemented warnings for us to throw in JavaScript (assert_options())';
  case 'ASSERT_BAIL':
    ini = 'assert.bail';
    dflt = 0;
    break;
  case 'ASSERT_QUIET_EVAL':
    ini = 'assert.quiet_eval';
    dflt = 0;
    break;
  case 'ASSERT_CALLBACK':
    ini = 'assert.callback';
    dflt = null;
    break;
  default:
    throw 'Improper type for assert_options()';
  }
  // I presume this is to be the most recent value, instead of the default value
  var originalValue = this.php_js.assert_values[ini] || (this.php_js.ini[ini] && this.php_js.ini[ini].local_value) || dflt;

  if (value) {
    this.php_js.assert_values[ini] = value; // We use 'ini' instead of 'what' as key to be more convenient for assert() to test for current value
  }
  return originalValue;
}
function get_cfg_var (varname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: The ini values must be set within an ini file
  // *     example 1: get_cfg_var('date.timezone');
  // *     returns 1: 'Asia/Hong_Kong'
  if (this.php_js && this.php_js.ini && this.php_js.ini[varname].global_value !== undefined) {
    if (this.php_js.ini[varname].global_value === null) {
      return '';
    }
    return this.php_js.ini[varname].global_value;
  }
  return '';
}
function get_defined_constants (categorize) {
  // +    original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Could possibly substitute some others like M_PI with JavaScript's Math.PI, etc., but here
  // %        note 1: sticking to PHP, except for changing: NULL to null, NAN to NaN, and INF to Number.POSITIVE_INFINITY
  // %        note 2: TRUE, FALSE, and NULL capitalized constants (as in PHP) could work ok in some
  // %        note 2: implementations, but not all, so they are commented out
  // %        note 3: We used a PHP script to auto-convert these, so we can simply reuse it to add more below if we
  // %        note 3: implement more extensions needing constants, assuming we have a PHP set-up which
  // %        note 3: uses the extensions!
  // %        note 4: If you do ini_set('phpjs.get_defined_constants.setConstants', 'this') then call this function,
  // %        note 4: it will set the PHP constants as globals for you on the "this" object. In the namespaced version, this
  // %        note 4: means the "constants" will be attached directly to the $P object: e.g., $P.PREG_OFFSET_CAPTURE
  // %        note 4: In the non-namespaced version, this will act like the setting mentioned in note 6
  // %        note 4: If you do ini_set('phpjs.get_defined_constants.setConstants', 'thisExt') then call this function,
  // %        note 4: it will set the PHP constants for you, but will first create a namespace on your object
  // %        note 4: for each extension to which the "constants" will be added. For example, $P.pcre.PREG_OFFSET_CAPTURE
  // %        note 4: For the non-namespaced version, this will be created on window: alert(pcre.PREG_OFFSET_CAPTURE);
  // %        note 4: If you do ini_set('phpjs.get_defined_constants.setConstants', true) then call this function,
  // %        note 4: it will set the PHP constants as window globals for you, even if you are using the php.js namespaced
  // %        note 4: version. For example, you can just do: alert(PREG_OFFSET_CAPTURE); . Only the constants set directly
  // %        note 4: at the level of window globals, will actually be immutable constants.
  // %        note 5: Note that our functions might not have been designed yet to handle PHP-style constants if at all, as
  // %        note 5: some of our extensions rely simply on the constant name being passed in to the function as a
  // %        note 5:  string to work as a flag
  // -    depends on: define
  // *     example 1: var cnsts = get_defined_constants();
  // *     example 1: cnsts.E_NOTICE;
  // *     returns 1: 8
  // *     example 2: var cnsts = get_defined_constants(true); // passing false will produce the same value! (in PHP as well as here)
  // *     example 2: cnsts.internal.E_NOTICE;
  // *     returns 2: 8

  var ext = '',
    cnst = '',
    constObj = {},
    flatConstObj = {},
    win, thisExt = false;

  constObj = {
    'internal': {
      'E_ERROR': 1,
      'E_RECOVERABLE_ERROR': 4096,
      'E_WARNING': 2,
      'E_PARSE': 4,
      'E_NOTICE': 8,
      'E_STRICT': 2048,
      'E_CORE_ERROR': 16,
      'E_CORE_WARNING': 32,
      'E_COMPILE_ERROR': 64,
      'E_COMPILE_WARNING': 128,
      'E_USER_ERROR': 256,
      'E_USER_WARNING': 512,
      'E_USER_NOTICE': 1024,
      'E_ALL': 6143,
/* // Could work ok in some implementations, but not all, so commenting out
    'TRUE' : true,
    'FALSE' : false,
    'NULL' : null,
    */
      'ZEND_THREAD_SAFE': true,
      'PHP_VERSION': '5.2.6',
      'PHP_OS': 'WINNT',
      'PHP_SAPI': 'apache2handler',
      'DEFAULT_INCLUDE_PATH': '.;C:\\php5\\pear',
      'PEAR_INSTALL_DIR': 'C:\\php5\\pear',
      'PEAR_EXTENSION_DIR': 'C:\\php5',
      'PHP_EXTENSION_DIR': 'C:\\php5',
      'PHP_PREFIX': 'C:\\php5',
      'PHP_BINDIR': 'C:\\php5',
      'PHP_LIBDIR': 'C:\\php5',
      'PHP_DATADIR': 'C:\\php5',
      'PHP_SYSCONFDIR': 'C:\\php5',
      'PHP_LOCALSTATEDIR': 'C:\\php5',
      'PHP_CONFIG_FILE_PATH': 'C:\\Windows',
      'PHP_CONFIG_FILE_SCAN_DIR': '',
      'PHP_SHLIB_SUFFIX': 'dll',
      'PHP_EOL': '\n',
      'PHP_INT_MAX': 2147483647,
      'PHP_INT_SIZE': 4,
      'PHP_OUTPUT_HANDLER_START': 1,
      'PHP_OUTPUT_HANDLER_CONT': 2,
      'PHP_OUTPUT_HANDLER_END': 4,
      'UPLOAD_ERR_OK': 0,
      'UPLOAD_ERR_INI_SIZE': 1,
      'UPLOAD_ERR_FORM_SIZE': 2,
      'UPLOAD_ERR_PARTIAL': 3,
      'UPLOAD_ERR_NO_FILE': 4,
      'UPLOAD_ERR_NO_TMP_DIR': 6,
      'UPLOAD_ERR_CANT_WRITE': 7,
      'UPLOAD_ERR_EXTENSION': 8
    },
    'pcre': {
      'PREG_PATTERN_ORDER': 1,
      'PREG_SET_ORDER': 2,
      'PREG_OFFSET_CAPTURE': 256,
      'PREG_SPLIT_NO_EMPTY': 1,
      'PREG_SPLIT_DELIM_CAPTURE': 2,
      'PREG_SPLIT_OFFSET_CAPTURE': 4,
      'PREG_GREP_INVERT': 1,
      'PREG_NO_ERROR': 0,
      'PREG_INTERNAL_ERROR': 1,
      'PREG_BACKTRACK_LIMIT_ERROR': 2,
      'PREG_RECURSION_LIMIT_ERROR': 3,
      'PREG_BAD_UTF8_ERROR': 4,
      'PCRE_VERSION': '7.6 2008-01-28'
    },
    'session': {
      'DATE_ATOM': 'Y-m-d\\TH:i:sP',
      'DATE_COOKIE': 'l, d-M-y H:i:s T',
      'DATE_ISO8601': 'Y-m-d\\TH:i:sO',
      'DATE_RFC822': 'D, d M y H:i:s O',
      'DATE_RFC850': 'l, d-M-y H:i:s T',
      'DATE_RFC1036': 'D, d M y H:i:s O',
      'DATE_RFC1123': 'D, d M Y H:i:s O',
      'DATE_RFC2822': 'D, d M Y H:i:s O',
      'DATE_RFC3339': 'Y-m-d\\TH:i:sP',
      'DATE_RSS': 'D, d M Y H:i:s O',
      'DATE_W3C': 'Y-m-d\\TH:i:sP',
      'SUNFUNCS_RET_TIMESTAMP': 0,
      'SUNFUNCS_RET_STRING': 1,
      'SUNFUNCS_RET_DOUBLE': 2
    },
    'standard': {
      'CONNECTION_ABORTED': 1,
      'CONNECTION_NORMAL': 0,
      'CONNECTION_TIMEOUT': 2,
      'INI_USER': 1,
      'INI_PERDIR': 2,
      'INI_SYSTEM': 4,
      'INI_ALL': 7,
      'PHP_URL_SCHEME': 0,
      'PHP_URL_HOST': 1,
      'PHP_URL_PORT': 2,
      'PHP_URL_USER': 3,
      'PHP_URL_PASS': 4,
      'PHP_URL_PATH': 5,
      'PHP_URL_QUERY': 6,
      'PHP_URL_FRAGMENT': 7,
      'M_E': 2.718281828459,
      'M_LOG2E': 1.442695040889,
      'M_LOG10E': 0.43429448190325,
      'M_LN2': 0.69314718055995,
      'M_LN10': 2.302585092994,
      'M_PI': 3.1415926535898,
      'M_PI_2': 1.5707963267949,
      'M_PI_4': 0.78539816339745,
      'M_1_PI': 0.31830988618379,
      'M_2_PI': 0.63661977236758,
      'M_SQRTPI': 1.7724538509055,
      'M_2_SQRTPI': 1.1283791670955,
      'M_LNPI': 1.1447298858494,
      'M_EULER': 0.57721566490153,
      'M_SQRT2': 1.4142135623731,
      'M_SQRT1_2': 0.70710678118655,
      'M_SQRT3': 1.7320508075689,
      'INF': Number.POSITIVE_INFINITY,
      'NAN': 0,
      'INFO_GENERAL': 1,
      'INFO_CREDITS': 2,
      'INFO_CONFIGURATION': 4,
      'INFO_MODULES': 8,
      'INFO_ENVIRONMENT': 16,
      'INFO_VARIABLES': 32,
      'INFO_LICENSE': 64,
      'INFO_ALL': -1,
      'CREDITS_GROUP': 1,
      'CREDITS_GENERAL': 2,
      'CREDITS_SAPI': 4,
      'CREDITS_MODULES': 8,
      'CREDITS_DOCS': 16,
      'CREDITS_FULLPAGE': 32,
      'CREDITS_QA': 64,
      'CREDITS_ALL': -1,
      'HTML_SPECIALCHARS': 0,
      'HTML_ENTITIES': 1,
      'ENT_COMPAT': 2,
      'ENT_QUOTES': 3,
      'ENT_NOQUOTES': 0,
      'STR_PAD_LEFT': 0,
      'STR_PAD_RIGHT': 1,
      'STR_PAD_BOTH': 2,
      'PATHINFO_DIRNAME': 1,
      'PATHINFO_BASENAME': 2,
      'PATHINFO_EXTENSION': 4,
      'PATHINFO_FILENAME': 8,
      'CHAR_MAX': 127,
      'LC_CTYPE': 2,
      'LC_NUMERIC': 4,
      'LC_TIME': 5,
      'LC_COLLATE': 1,
      'LC_MONETARY': 3,
      'LC_ALL': 0,
      'SEEK_SET': 0,
      'SEEK_CUR': 1,
      'SEEK_END': 2,
      'LOCK_SH': 1,
      'LOCK_EX': 2,
      'LOCK_UN': 3,
      'LOCK_NB': 4,
      'STREAM_NOTIFY_CONNECT': 2,
      'STREAM_NOTIFY_AUTH_REQUIRED': 3,
      'STREAM_NOTIFY_AUTH_RESULT': 10,
      'STREAM_NOTIFY_MIME_TYPE_IS': 4,
      'STREAM_NOTIFY_FILE_SIZE_IS': 5,
      'STREAM_NOTIFY_REDIRECTED': 6,
      'STREAM_NOTIFY_PROGRESS': 7,
      'STREAM_NOTIFY_FAILURE': 9,
      'STREAM_NOTIFY_COMPLETED': 8,
      'STREAM_NOTIFY_RESOLVE': 1,
      'STREAM_NOTIFY_SEVERITY_INFO': 0,
      'STREAM_NOTIFY_SEVERITY_WARN': 1,
      'STREAM_NOTIFY_SEVERITY_ERR': 2,
      'STREAM_FILTER_READ': 1,
      'STREAM_FILTER_WRITE': 2,
      'STREAM_FILTER_ALL': 3,
      'STREAM_CLIENT_PERSISTENT': 1,
      'STREAM_CLIENT_ASYNC_CONNECT': 2,
      'STREAM_CLIENT_CONNECT': 4,
      'STREAM_CRYPTO_METHOD_SSLv2_CLIENT': 0,
      'STREAM_CRYPTO_METHOD_SSLv3_CLIENT': 1,
      'STREAM_CRYPTO_METHOD_SSLv23_CLIENT': 2,
      'STREAM_CRYPTO_METHOD_TLS_CLIENT': 3,
      'STREAM_CRYPTO_METHOD_SSLv2_SERVER': 4,
      'STREAM_CRYPTO_METHOD_SSLv3_SERVER': 5,
      'STREAM_CRYPTO_METHOD_SSLv23_SERVER': 6,
      'STREAM_CRYPTO_METHOD_TLS_SERVER': 7,
      'STREAM_SHUT_RD': 0,
      'STREAM_SHUT_WR': 1,
      'STREAM_SHUT_RDWR': 2,
      'STREAM_PF_INET': 2,
      'STREAM_PF_INET6': 23,
      'STREAM_PF_UNIX': 1,
      'STREAM_IPPROTO_IP': 0,
      'STREAM_IPPROTO_TCP': 6,
      'STREAM_IPPROTO_UDP': 17,
      'STREAM_IPPROTO_ICMP': 1,
      'STREAM_IPPROTO_RAW': 255,
      'STREAM_SOCK_STREAM': 1,
      'STREAM_SOCK_DGRAM': 2,
      'STREAM_SOCK_RAW': 3,
      'STREAM_SOCK_SEQPACKET': 5,
      'STREAM_SOCK_RDM': 4,
      'STREAM_PEEK': 2,
      'STREAM_OOB': 1,
      'STREAM_SERVER_BIND': 4,
      'STREAM_SERVER_LISTEN': 8,
      'FILE_USE_INCLUDE_PATH': 1,
      'FILE_IGNORE_NEW_LINES': 2,
      'FILE_SKIP_EMPTY_LINES': 4,
      'FILE_APPEND': 8,
      'FILE_NO_DEFAULT_CONTEXT': 16,
      'PSFS_PASS_ON': 2,
      'PSFS_FEED_ME': 1,
      'PSFS_ERR_FATAL': 0,
      'PSFS_FLAG_NORMAL': 0,
      'PSFS_FLAG_FLUSH_INC': 1,
      'PSFS_FLAG_FLUSH_CLOSE': 2,
      'CRYPT_SALT_LENGTH': 12,
      'CRYPT_STD_DES': 1,
      'CRYPT_EXT_DES': 0,
      'CRYPT_MD5': 1,
      'CRYPT_BLOWFISH': 0,
      'DIRECTORY_SEPARATOR': '\\',
      'PATH_SEPARATOR': ';',
      'GLOB_BRACE': 128,
      'GLOB_MARK': 8,
      'GLOB_NOSORT': 32,
      'GLOB_NOCHECK': 16,
      'GLOB_NOESCAPE': 4096,
      'GLOB_ERR': 4,
      'GLOB_ONLYDIR': 1073741824,
      'GLOB_AVAILABLE_FLAGS': 1073746108,
      'LOG_EMERG': 1,
      'LOG_ALERT': 1,
      'LOG_CRIT': 1,
      'LOG_ERR': 4,
      'LOG_WARNING': 5,
      'LOG_NOTICE': 6,
      'LOG_INFO': 6,
      'LOG_DEBUG': 6,
      'LOG_KERN': 0,
      'LOG_USER': 8,
      'LOG_MAIL': 16,
      'LOG_DAEMON': 24,
      'LOG_AUTH': 32,
      'LOG_SYSLOG': 40,
      'LOG_LPR': 48,
      'LOG_NEWS': 56,
      'LOG_UUCP': 64,
      'LOG_CRON': 72,
      'LOG_AUTHPRIV': 80,
      'LOG_PID': 1,
      'LOG_CONS': 2,
      'LOG_ODELAY': 4,
      'LOG_NDELAY': 8,
      'LOG_NOWAIT': 16,
      'LOG_PERROR': 32,
      'EXTR_OVERWRITE': 0,
      'EXTR_SKIP': 1,
      'EXTR_PREFIX_SAME': 2,
      'EXTR_PREFIX_ALL': 3,
      'EXTR_PREFIX_INVALID': 4,
      'EXTR_PREFIX_IF_EXISTS': 5,
      'EXTR_IF_EXISTS': 6,
      'EXTR_REFS': 256,
      'SORT_ASC': 4,
      'SORT_DESC': 3,
      'SORT_REGULAR': 0,
      'SORT_NUMERIC': 1,
      'SORT_STRING': 2,
      'SORT_LOCALE_STRING': 5,
      'CASE_LOWER': 0,
      'CASE_UPPER': 1,
      'COUNT_NORMAL': 0,
      'COUNT_RECURSIVE': 1,
      'ASSERT_ACTIVE': 1,
      'ASSERT_CALLBACK': 2,
      'ASSERT_BAIL': 3,
      'ASSERT_WARNING': 4,
      'ASSERT_QUIET_EVAL': 5,
      'STREAM_USE_PATH': 1,
      'STREAM_IGNORE_URL': 2,
      'STREAM_ENFORCE_SAFE_MODE': 4,
      'STREAM_REPORT_ERRORS': 8,
      'STREAM_MUST_SEEK': 16,
      'STREAM_URL_STAT_LINK': 1,
      'STREAM_URL_STAT_QUIET': 2,
      'STREAM_MKDIR_RECURSIVE': 1,
      'STREAM_IS_URL': 1,
      'IMAGETYPE_GIF': 1,
      'IMAGETYPE_JPEG': 2,
      'IMAGETYPE_PNG': 3,
      'IMAGETYPE_SWF': 4,
      'IMAGETYPE_PSD': 5,
      'IMAGETYPE_BMP': 6,
      'IMAGETYPE_TIFF_II': 7,
      'IMAGETYPE_TIFF_MM': 8,
      'IMAGETYPE_JPC': 9,
      'IMAGETYPE_JP2': 10,
      'IMAGETYPE_JPX': 11,
      'IMAGETYPE_JB2': 12,
      'IMAGETYPE_SWC': 13,
      'IMAGETYPE_IFF': 14,
      'IMAGETYPE_WBMP': 15,
      'IMAGETYPE_JPEG2000': 9,
      'IMAGETYPE_XBM': 16
    }
  };

  if (this.php_js && this.php_js.ini && this.php_js.ini['phpjs.get_defined_constants.setConstants'] && this.php_js.ini['phpjs.get_defined_constants.setConstants'].local_value) {
    // Allow us to set a configuration to let this function set global constants
    if (this.php_js.ini['phpjs.get_defined_constants.setConstants'].local_value === 'this') {
      win = this;
    } else if (this.php_js.ini['phpjs.get_defined_constants.setConstants'].local_value === 'thisExt') {
      win = this;
      thisExt = true;
    } else {
      win = this.window;
    }

    for (ext in constObj) {
      if (thisExt) { // Allows namespacing constants (e.g,. this.pcre.PREG_OFFSET_CAPTURE)
        for (cnst in constObj[ext]) {
          if (!win[ext]) {
            win[ext] = {};
          }
          // These will not be real constants!
          win[ext][cnst] = constObj[ext][cnst];
        }
      } else {
        for (cnst in constObj[ext]) {
          if (this === this.window) { // Take advantage of fact, in this case we can make real constants
            this.define(cnst, constObj[ext][cnst]);
          } else {
            // These will not be real constants!
            win[cnst] = constObj[ext][cnst];
          }
        }
      }
    }
  }

  if (typeof categorize !== 'undefined') { // PHP will return if any argument is set, even false
    return constObj;
  }

  for (ext in constObj) {
    for (cnst in constObj[ext]) {
      flatConstObj[cnst] = constObj[ext][cnst];
    }
  }
  return flatConstObj;
}
function get_extension_funcs (module_name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: get_extension_funcs('json');
  // *     returns 1: ['json_decode', 'json_encode', 'json_last_error']

  this.php_js = this.php_js || {};
  // We put this on the global in order to avoid rebuilding and reuse this object by itself
  this.php_js.exts = this.php_js.exts || { // This only includes those extensions for which we have or are working on at least some functions
    array: ['array_change_key_case', 'array_chunk', 'array_combine', 'array_count_values', 'array_diff_assoc', 'array_diff_key', 'array_diff_uassoc', 'array_diff_ukey', 'array_diff', 'array_fill_keys', 'array_fill', 'array_filter', 'array_flip', 'array_intersect_assoc', 'array_intersect_key', 'array_intersect_uassoc', 'array_intersect_ukey', 'array_intersect', 'array_key_exists', 'array_keys', 'array_map', 'array_merge_recursive', 'array_merge', 'array_multisort', 'array_pad', 'array_pop', 'array_product', 'array_push', 'array_rand', 'array_reduce', 'array_replace_recursive', 'array_replace', 'array_reverse', 'array_search', 'array_shift', 'array_slice', 'array_splice', 'array_sum', 'array_udiff_assoc', 'array_udiff_uassoc', 'array_udiff', 'array_uintersect_assoc', 'array_uintersect_uassoc', 'array_uintersect', 'array_unique', 'array_unshift', 'array_values', 'array_walk_recursive', 'array_walk', 'array', 'arsort', 'asort', 'compact', 'count', 'current', 'each', 'end', 'extract', 'in_array', 'key', 'krsort', 'ksort', 'list', 'natcasesort', 'natsort', 'next', 'pos', 'prev', 'range', 'reset', 'rsort', 'shuffle', 'sizeof', 'sort', 'uasort', 'uksort', 'usort'],
    bc: ['bcadd', 'bccomp', 'bcdiv', 'bcmod', 'bcmul', 'bcpow', 'bcpowmod', 'bcscale', 'bcsqrt', 'bcsub'],
    classkit: ['classkit_import', 'classkit_method_add', 'classkit_method_copy', 'classkit_method_redefine', 'classkit_method_remove', 'classkit_method_rename'],
    classobj: ['call_user_method_array', 'call_user_method', 'class_alias', 'class_exists', 'get_called_class', 'get_class_methods', 'get_class_vars', 'get_class', 'get_declared_classes', 'get_declared_interfaces', 'get_object_vars', 'get_parent_class', 'interface_exists', 'is_a', 'is_subclass_of', 'method_exists', 'property_exists'],
    ctype: ['ctype_alnum', 'ctype_alpha', 'ctype_cntrl', 'ctype_digit', 'ctype_graph', 'ctype_lower', 'ctype_print', 'ctype_punct', 'ctype_space', 'ctype_upper', 'ctype_xdigit'],
    datetime: ['checkdate', 'date_add', 'date_create_from_format', 'date_create', 'date_date_set', 'date_default_timezone_get', 'date_default_timezone_set', 'date_diff', 'date_format', 'date_get_last_errors', 'date_interval_create_from_date_string', 'date_interval_format', 'date_isodate_set', 'date_modify', 'date_offset_get', 'date_parse_from_format', 'date_parse', 'date_sub', 'date_sun_info', 'date_sunrise', 'date_sunset', 'date_time_set', 'date_timestamp_get', 'date_timestamp_set', 'date_timezone_get', 'date_timezone_set', 'date', 'getdate', 'gettimeofday', 'gmdate', 'gmmktime', 'gmstrftime', 'idate', 'localtime', 'microtime', 'mktime', 'strftime', 'strptime', 'strtotime', 'time', 'timezone_abbreviations_list', 'timezone_identifiers_list', 'timezone_location_get', 'timezone_name_from_abbr', 'timezone_name_get', 'timezone_offset_get', 'timezone_open', 'timezone_transitions_get', 'timezone_version_get'],
    dir: ['chdir', 'chroot', 'dir', 'closedir', 'getcwd', 'opendir', 'readdir', 'rewinddir', 'scandir'],
    errorfunc: ['debug_backtrace', 'debug_print_backtrace', 'error_get_last', 'error_log', 'error_reporting', 'restore_error_handler', 'restore_exception_handler', 'set_error_handler', 'set_exception_handler', 'trigger_error', 'user_error'],
    exec: ['escapeshellarg', 'escapeshellcmd', 'exec', 'passthru', 'proc_close', 'proc_get_status', 'proc_nice', 'proc_open', 'proc_terminate', 'shell_exec', 'system'],
    filesystem: ['basename', 'chgrp', 'chmod', 'chown', 'clearstatcache', 'copy', 'delete', 'dirname', 'disk_free_space', 'disk_total_space', 'diskfreespace', 'fclose', 'feof', 'fflush', 'fgetc', 'fgetcsv', 'fgets', 'fgetss', 'file_exists', 'file_get_contents', 'file_put_contents', 'file', 'fileatime', 'filectime', 'filegroup', 'fileinode', 'filemtime', 'fileowner', 'fileperms', 'filesize', 'filetype', 'flock', 'fnmatch', 'fopen', 'fpassthru', 'fputcsv', 'fputs', 'fread', 'fscanf', 'fseek', 'fstat', 'ftell', 'ftruncate', 'fwrite', 'glob', 'is_dir', 'is_executable', 'is_file', 'is_link', 'is_readable', 'is_uploaded_file', 'is_writable', 'is_writeable', 'lchgrp', 'lchown', 'link', 'linkinfo', 'lstat', 'mkdir', 'move_uploaded_file', 'parse_ini_file', 'parse_ini_string', 'pathinfo', 'pclose', 'popen', 'readfile', 'readlink', 'realpath', 'rename', 'rewind', 'rmdir', 'set_file_buffer', 'stat', 'symlink', 'tempnam', 'tmpfile', 'touch', 'umask', 'unlink'],
    funchand: ['call_user_func_array', 'call_user_func', 'create_function', 'forward_static_call_array', 'forward_static_call', 'func_get_arg', 'func_get_args', 'func_num_args', 'function_exists', 'get_defined_functions', 'register_shutdown_function', 'register_tick_function', 'unregister_tick_function'],
    // Moving to http://us.php.net/manual/en/class.locale.php ?
    i18n: ['locale_get_default', 'locale_set_default'],
    inclued: ['inclued_get_data'],
    info: ['assert_options', 'assert', 'dl', 'extension_loaded', 'gc_collect_cycles', 'gc_disable', 'gc_enable', 'gc_enabled', 'get_cfg_var', 'get_current_user', 'get_defined_constants', 'get_extension_funcs', 'get_include_path', 'get_included_files', 'get_loaded_extensions', 'get_magic_quotes_gpc', 'get_magic_quotes_runtime', 'get_required_files', 'getenv', 'getlastmod', 'getmygid', 'getmyinode', 'getmypid', 'getmyuid', 'getopt', 'getrusage', 'ini_alter', 'ini_get_all', 'ini_get', 'ini_restore', 'ini_set', 'magic_quotes_runtime', 'main', 'memory_get_peak_usage', 'memory_get_usage', 'php_ini_loaded_file', 'php_ini_scanned_files', 'php_logo_guid', 'php_sapi_name', 'php_uname', 'phpcredits', 'phpinfo', 'phpversion', 'putenv', 'restore_include_path', 'set_include_path', 'set_magic_quotes_runtime', 'set_time_limit', 'sys_get_temp_dir', 'version_compare', 'zend_logo_guid', 'zend_thread_id', 'zend_version'],
    json: ['json_decode', 'json_encode', 'json_last_error'],
    // Note that "language" is not a real extension, but part of the PHP language which we implement as JavaScript functions
    language: ['at', 'clone', 'declare', 'foreach', 'goto', 'include', 'include_once', 'php_user_filter', 'require', 'require_once', 'stdClass', 'ErrorException', 'Exception', 'HEREDOC', '$_SESSION', '__CLASS__', '__DIR__', '__FILE__', '__FUNCTION__', '__LINE__', '__METHOD__'],
    math: ['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan2', 'atan', 'atanh', 'base_convert', 'bindec', 'ceil', 'cos', 'cosh', 'decbin', 'dechex', 'decoct', 'deg2rad', 'exp', 'expm1', 'floor', 'fmod', 'getrandmax', 'hexdec', 'hypot', 'is_finite', 'is_infinite', 'is_nan', 'lcg_value', 'log10', 'log1p', 'log', 'max', 'min', 'mt_getrandmax', 'mt_rand', 'mt_srand', 'octdec', 'pi', 'pow', 'rad2deg', 'rand', 'round', 'sin', 'sinh', 'sqrt', 'srand', 'tan', 'tanh'],
    misc: ['connection_aborted', 'connection_status', 'connection_timeout', 'constant', 'define', 'defined', 'die', 'eval', 'exit', 'get_browser', '__halt_compiler', 'highlight_file', 'highlight_string', 'ignore_user_abort', 'pack', 'php_check_syntax', 'php_strip_whitespace', 'show_source', 'sleep', 'sys_getloadavg', 'time_nanosleep', 'time_sleep_until', 'uniqid', 'unpack', 'usleep'],
    'net-gopher': ['gopher_parsedir'],
    network: ['checkdnsrr', 'closelog', 'define_syslog_variables', 'dns_check_record', 'dns_get_mx', 'dns_get_record', 'fsockopen', 'gethostbyaddr', 'gethostbyname', 'gethostbynamel', 'gethostname', 'getmxrr', 'getprotobyname', 'getprotobynumber', 'getservbyname', 'getservbyport', 'header_remove', 'header', 'headers_list', 'headers_sent', 'inet_ntop', 'inet_pton', 'ip2long', 'long2ip', 'openlog', 'pfsockopen', 'setcookie', 'setrawcookie', 'socket_get_status', 'socket_set_blocking', 'socket_set_timeout', 'syslog'],
    objaggregation: ['aggregate_info', 'aggregate_methods_by_list', 'aggregate_methods_by_regexp', 'aggregate_methods', 'aggregate_properties_by_list', 'aggregate_properties_by_regexp', 'aggregate_properties', 'aggregate', 'aggregation_info', 'deaggregate'],
    outcontrol: ['flush', 'ob_clean', 'ob_end_clean', 'ob_end_flush', 'ob_flush', 'ob_get_clean', 'ob_get_contents', 'ob_get_flush', 'ob_get_length', 'ob_get_level', 'ob_get_status', 'ob_gzhandler', 'ob_implicit_flush', 'ob_list_handlers', 'ob_start', 'output_add_rewrite_var', 'output_reset_rewrite_vars'],
    overload: ['overload'],
    pcre: ['preg_filter', 'preg_grep', 'preg_last_error', 'preg_match_all', 'preg_match', 'preg_quote', 'preg_replace_callback', 'preg_replace', 'preg_split'],
    runkit: ['Runkit_Sandbox', 'Runkit_Sandbox_Parent', 'runkit_class_adopt', 'runkit_class_emancipate', 'runkit_constant_add', 'runkit_constant_redefine', 'runkit_constant_remove', 'runkit_function_add', 'runkit_function_copy', 'runkit_function_redefine', 'runkit_function_remove', 'runkit_function_rename', 'runkit_import', 'runkit_lint_file', 'runkit_lint', 'runkit_method_add', 'runkit_method_copy', 'runkit_method_redefine', 'runkit_method_remove', 'runkit_method_rename', 'runkit_return_value_used', 'runkit_sandbox_output_handler', 'runkit_superglobals'],
    session: ['session_cache_expire', 'session_cache_limiter', 'session_commit', 'session_decode', 'session_destroy', 'session_encode', 'session_get_cookie_params', 'session_id', 'session_is_registered', 'session_module_name', 'session_name', 'session_regenerate_id', 'session_register', 'session_save_path', 'session_set_cookie_params', 'session_set_save_handler', 'session_start', 'session_unregister', 'session_unset', 'session_write_close'],
    stream: ['set_socket_blocking', 'stream_bucket_append', 'stream_bucket_make_writeable', 'stream_bucket_new', 'stream_bucket_prepend', 'stream_context_create', 'stream_context_get_default', 'stream_context_get_options', 'stream_context_get_params', 'stream_context_set_default', 'stream_context_set_option', 'stream_context_set_params', 'stream_copy_to_stream', 'stream_encoding', 'stream_filter_append', 'stream_filter_prepend', 'stream_filter_register', 'stream_filter_remove', 'stream_get_contents', 'stream_get_filters', 'stream_get_line', 'stream_get_meta_data', 'stream_get_transports', 'stream_get_wrappers', 'stream_is_local', 'stream_notification_callback', 'stream_register_wrapper', 'stream_resolve_include_path', 'stream_select', 'stream_set_blocking', 'stream_set_timeout', 'stream_set_write_buffer', 'stream_socket_accept', 'stream_socket_client', 'stream_socket_enable_crypto', 'stream_socket_get_name', 'stream_socket_pair', 'stream_socket_recvfrom', 'stream_socket_sendto', 'stream_socket_server', 'stream_socket_shutdown', 'stream_supports_lock', 'stream_wrapper_register', 'stream_wrapper_restore', 'stream_wrapper_unregister'],
    strings: ['addcslashes', 'addslashes', 'bin2hex', 'chop', 'chr', 'chunk_split', 'convert_cyr_string', 'convert_uudecode', 'convert_uuencode', 'count_chars', 'crc32', 'crypt', 'echo', 'explode', 'fprintf', 'get_html_translation_table', 'hebrev', 'hebrevc', 'html_entity_decode', 'htmlentities', 'htmlspecialchars_decode', 'htmlspecialchars', 'implode', 'join', 'lcfirst', 'levenshtein', 'localeconv', 'ltrim', 'md5_file', 'md5', 'metaphone', 'money_format', 'nl_langinfo', 'nl2br', 'number_format', 'ord', 'parse_str', 'print', 'printf', 'quoted_printable_decode', 'quoted_printable_encode', 'quotemeta', 'rtrim', 'setlocale', 'sha1_file', 'sha1', 'similar_text', 'soundex', 'sprintf', 'sscanf', 'str_getcsv', 'str_ireplace', 'str_pad', 'str_repeat', 'str_replace', 'str_rot13', 'str_shuffle', 'str_split', 'str_word_count', 'strcasecmp', 'strchr', 'strcmp', 'strcoll', 'strcspn', 'strip_tags', 'stripcslashes', 'stripos', 'stripslashes', 'stristr', 'strlen', 'strnatcasecmp', 'strnatcmp', 'strncasecmp', 'strncmp', 'strpbrk', 'strpos', 'strrchr', 'strrev', 'strripos', 'strrpos', 'strspn', 'strstr', 'strtok', 'strtolower', 'strtoupper', 'strtr', 'substr_compare', 'substr_count', 'substr_replace', 'substr', 'trim', 'ucfirst', 'ucwords', 'vfprintf', 'vprintf', 'vsprintf', 'wordwrap'],
    tokenizer: ['token_get_all', 'token_name'],
    url: ['base64_decode', 'base64_encode', 'get_headers', 'get_meta_tags', 'http_build_query', 'parse_url', 'rawurldecode', 'rawurlencode', 'urldecode', 'urlencode'],
    'var': ['debug_zval_dump', 'doubleval', 'empty', 'floatval', 'get_defined_vars', 'get_resource_type', 'gettype', 'import_request_variables', 'intval', 'is_array', 'is_binary', 'is_bool', 'is_buffer', 'is_callable', 'is_double', 'is_float', 'is_int', 'is_integer', 'is_long', 'is_null', 'is_numeric', 'is_object', 'is_real', 'is_resource', 'is_scalar', 'is_string', 'is_unicode', 'isset', 'print_r', 'serialize', 'settype', 'strval', 'unserialize', 'unset', 'var_dump', 'var_export'],
    xml: ['utf8_decode', 'utf8_encode', 'xml_error_string', 'xml_get_current_byte_index', 'xml_get_current_column_number', 'xml_get_current_line_number', 'xml_get_error_code', 'xml_parse_into_struct', 'xml_parse', 'xml_parser_create_ns', 'xml_parser_create', 'xml_parser_free', 'xml_parser_get_option', 'xml_parser_set_option', 'xml_set_character_data_handler', 'xml_set_default_handler', 'xml_set_element_handler', 'xml_set_end_namespace_decl_handler', 'xml_set_external_entity_ref_handler', 'xml_set_notation_decl_handler', 'xml_set_object', 'xml_set_processing_instruction_handler', 'xml_set_start_namespace_decl_handler', 'xml_set_unparsed_entity_decl_handler'],
    xmlreader: ['XMLReader'],
    // only in class form
    xmlwriter: ['xmlwriter_end_attribute', 'xmlwriter_end_cdata', 'xmlwriter_end_comment', 'xmlwriter_end_document', 'xmlwriter_end_dtd_attlist', 'xmlwriter_end_dtd_element', 'xmlwriter_end_dtd_entity', 'xmlwriter_end_dtd', 'xmlwriter_end_element', 'xmlwriter_end_pi', 'xmlwriter_flush', 'xmlwriter_full_end_element', 'xmlwriter_open_memory', 'xmlwriter_open_uri', 'xmlwriter_output_memory', 'xmlwriter_set_indent_string', 'xmlwriter_set_indent', 'xmlwriter_start_attribute_ns', 'xmlwriter_start_attribute', 'xmlwriter_start_cdata', 'xmlwriter_start_comment', 'xmlwriter_start_document', 'xmlwriter_start_dtd_attlist', 'xmlwriter_start_dtd_element', 'xmlwriter_start_dtd_entity', 'xmlwriter_start_dtd', 'xmlwriter_start_element_ns', 'xmlwriter_start_element', 'xmlwriter_start_pi', 'xmlwriter_text', 'xmlwriter_write_attribute_ns', 'xmlwriter_write_attribute', 'xmlwriter_write_cdata', 'xmlwriter_write_comment', 'xmlwriter_write_dtd_attlist', 'xmlwriter_write_dtd_element', 'xmlwriter_write_dtd_entity', 'xmlwriter_write_dtd', 'xmlwriter_write_element_ns', 'xmlwriter_write_element', 'xmlwriter_write_pi', 'xmlwriter_write_raw']
  };
  return this.php_js.exts[module_name] || false;
}
function get_include_path () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: get_include_path();
  // *     returns 1: '/phpjs'

  if (this.php_js && this.php_js.ini && this.php_js.ini.include_path && this.php_js.ini.include_path.local_value) {
    return this.php_js.ini.include_path.local_value;
  }
  return '';
}
function get_included_files () {
  // http://kevin.vanzonneveld.net
  // +   original by: Michael White (http://getsprink.com)
  // %        note 1: Uses global: php_js to keep track of included files
  // *     example 1: get_included_files();
  // *     returns 1: ['http://kevin.vanzonneveld.net/pj_tester.php']
  var cur_file = {};
  cur_file[this.window.location.href] = 1;
  if (!this.php_js) {
    this.php_js = {};
  }
  if (!this.php_js.includes) {
    this.php_js.includes = cur_file;
  }

  var includes = [];
  var i = 0;
  for (var key in this.php_js.includes) {
    includes[i] = key;
    i++;
  }

  return includes;
}
function get_required_files () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: get_included_files
  // *     example 1: get_required_files();
  // *     returns 1: ['http://kevin.vanzonneveld.net/pj_tester.php']
  return this.get_included_files();
}
function getenv (varname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: We are not using $_ENV as in PHP, you could define
  // %        note 1: "$_ENV = this.php_js.ENV;" and get/set accordingly
  // %        note 2: Returns e.g. 'en-US' when set global this.php_js.ENV is set
  // %        note 3: Uses global: php_js to store environment info
  // *     example 1: getenv('LC_ALL');
  // *     returns 1: false
  if (!this.php_js || !this.php_js.ENV || !this.php_js.ENV[varname]) {
    return false;
  }

  return this.php_js.ENV[varname];
}
function getlastmod () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Will not work on browsers which don't support document.lastModified
  // *     example 1: getlastmod();
  // *     returns 1: 1237610043
  return new Date(this.window.document.lastModified).getTime() / 1000;
}
function ini_alter (varname, newvalue) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: ini_set
  // *     example 1: ini_alter('date.timezone', 'America/Chicago');
  // *     returns 1: 'Asia/Hong_Kong'
  return this.ini_set(varname, newvalue);
}
function ini_get (varname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: The ini values must be set by ini_set or manually within an ini file
  // *     example 1: ini_get('date.timezone');
  // *     returns 1: 'Asia/Hong_Kong'
  if (this.php_js && this.php_js.ini && this.php_js.ini[varname] && this.php_js.ini[varname].local_value !== undefined) {
    if (this.php_js.ini[varname].local_value === null) {
      return '';
    }
    return this.php_js.ini[varname].local_value;
  }
  return '';
}
function ini_get_all (extension, details) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: The ini values must be set by ini_set or manually within an ini file
  // %        note 1: Store each ini with PHP name and with the values global_value, local_value, and access; be sure to set the same value at the beginning for global and local value
  // %        note 1: If you define an ini file, which sets this.php_js.ini values (window.php_js.ini if you are using the non-namespaced version), be sure to also set php_js.ini_loaded_file
  // %        note 1: equal to its path, for the sake of php_ini_loaded_file() and also set php_js.ini_scanned_files (a comma-separated string of a set of paths, all in the
  // %        note 1: same directory) for the sake of php_ini_scanned_files().
  // *     example 1: ini_get_all('date', false);
  // *     returns 1: {'date.default_latitude':"31.7667", 'date.default_longitude':"35.2333", 'date.sunrise_zenith':"90.583333", 'date.sunset_zenith':"90.583333", date.timezone:""}

  var key = '',
    ini = {},
    noDetails = {},
    extPattern;
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT

  if (extension) {
    extPattern = new RegExp('^' + extension + '\\.');
    for (key in this.php_js.ini) {
      extPattern.lastIndex = 0;
      if (extPattern.test(key)) {
        ini[key] = this.php_js.ini[key];
      }
    }
  } else {
    for (key in this.php_js.ini) {
      ini[key] = this.php_js.ini[key];
    }
  }

  if (details !== false) { // default is true
    return ini; // {global_value: '', local_value: '', access: ''};
  }

  for (key in ini) {
    noDetails[key] = ini[key].local_value;
  }
  return noDetails;
}
function ini_restore (varname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ini_restore('date.timezone');
  // *     returns 1: 'America/Chicago'
  if (this.php_js && this.php_js.ini && this.php_js.ini[varname]) {
    this.php_js.ini[varname].local_value = this.php_js.ini[varname].global_value;
  }
}
function ini_set (varname, newvalue) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: This will not set a global_value or access level for the ini item
  // *     example 1: ini_set('date.timezone', 'America/Chicago');
  // *     returns 1: 'Asia/Hong_Kong'

  var oldval = '',
    that = this;
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  this.php_js.ini[varname] = this.php_js.ini[varname] || {};
  oldval = this.php_js.ini[varname].local_value;

  var _setArr = function (oldval) { // Although these are set individually, they are all accumulated
    if (typeof oldval === 'undefined') {
      that.php_js.ini[varname].local_value = [];
    }
    that.php_js.ini[varname].local_value.push(newvalue);
  };

  switch (varname) {
  case 'extension':
    if (typeof this.dl === 'function') {
      this.dl(newvalue); // This function is only experimental in php.js
    }
    _setArr(oldval, newvalue);
    break;
  default:
    this.php_js.ini[varname].local_value = newvalue;
    break;
  }
  return oldval;
}
function php_ini_loaded_file () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: This string representing the path of the main ini file must be manually set by the script to this.php_js.ini_loaded_file
  // *     example 1: php_ini_loaded_file();
  // *     returns 1: 'myini.js'
  if (!this.php_js || !this.php_js.ini_loaded_file) {
    return false;
  }
  return this.php_js.ini_loaded_file;
}
function php_ini_scanned_files () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: This comma-separated string of files contained in one directory must be manually set by the script to this.php_js.ini_scanned_files
  // *     example 1: php_ini_scanned_files();
  // *     returns 1: 'myini.js,myini2.js'
  if (!this.php_js || !this.php_js.ini_scanned_files) {
    return false;
  }
  return this.php_js.ini_scanned_files;
}
function phpversion () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: We are using this to get the JavaScript version (since this is JavaScript and we can't get the PHP version anyways)
  // %        note 2: The return value will depend on your client's JavaScript version
  // %        note 3: Uses global: php_js to store environment info
  // *     example 1: phpversion();
  // *     returns 1: '1.8'

  var xhtml = true,
    s = {},
    firstScript = {},
    d = this.window.document,
    c = 'createElement',
    cn = 'createElementNS',
    xn = 'http://www.w3.org/1999/xhtml',
    g = 'getElementsByTagName',
    gn = 'getElementsByTagNameNS';

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT

  var getVersion = function (app) {
    var att = '',
      minVers = 0,
      versionString = '',
      temp_jsversion = undefined;
    if (this.php_js.jsversion !== undefined) {
      return this.php_js.jsversion;
    }
    while (this.php_js.jsversion === temp_jsversion && minVers < 10) {
      temp_jsversion = '1.' + minVers;
      if (gn) {
        firstScript = d[gn](xn, 'script')[0];
      }
      if (!firstScript) {
        firstScript = d[g]('script')[0];
        xhtml = false;
      }
      if (d[cn] && xhtml) {
        s = d[cn](xn, 'script');
      } else {
        s = d[c]('script');
      }

      if (app) { // Check with standard attribute (but not cross-browser standardized value?) as per Mozilla
        att = 'type';
        versionString = 'application/javascript;version=1.';
      } else {
        att = 'language'; // non-standard
        versionString = 'JavaScript1.';
      }

      s.setAttribute(att, versionString + minVers);
      s.appendChild(d.createTextNode("this.php_js.jsversion=" + "'1." + minVers + "'"));
      firstScript.parentNode.insertBefore(s, firstScript);
      s.parentNode.removeChild(s);
      minVers++;
    }
    return this.php_js.jsversion;
  };
  getVersion(true);
  getVersion(false);

  return this.php_js.jsversion;
}
function putenv (setting) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: We are not using $_ENV as in PHP, you could define
  // %        note 1: "$_ENV = this.php_js.ENV;" and get/set accordingly
  // %        note 2: Uses global: php_js to store environment info
  // *     example 1: putenv('LC_ALL=en-US');
  // *     results 1: true
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ENV = this.php_js.ENV || {};
  // END REDUNDANT
  var pos = setting.indexOf('=');
  this.php_js.ENV[setting.slice(0, pos)] = setting.slice(pos + 1);
  return true;
}
function restore_include_path () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: restore_include_path();
  // *     returns 1: undefined

  if (this.php_js && this.php_js.ini && this.php_js.ini.include_path) {
    this.php_js.ini.include_path.local_value = this.php_js.ini.include_path.global_value;
  }
}
function set_include_path (new_include_path) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Should influence require(), include(), fopen(), file(), readfile() and file_get_contents()
  // %          note 1: Paths could conceivably allow multiple paths (separated by semicolon and allowing ".", etc.), by
  // %          note 1: checking first for valid HTTP header at targeted address
  // *     example 1: set_include_path('/php_js');
  // *     returns 1: '/old_incl_path'

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  var old_path = this.php_js.ini.include_path && this.php_js.ini.include_path.local_value;
  if (!old_path) {
    this.php_js.ini.include_path = {
      global_value: new_include_path,
      local_value: new_include_path
    };
  } else {
    this.php_js.ini.include_path.global_value = new_include_path;
    this.php_js.ini.include_path.local_value = new_include_path;
  }
  return old_path;
}
function set_time_limit (seconds) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: set_time_limit(4);
  // *     returns 1: undefined

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT

  this.window.setTimeout(function () {
    if (!this.php_js.timeoutStatus) {
      this.php_js.timeoutStatus = true;
    }
    throw 'Maximum execution time exceeded';
  }, seconds * 1000);
}
function version_compare (v1, v2, operator) {
  // http://kevin.vanzonneveld.net
  // +      original by: Philippe Jausions (http://pear.php.net/user/jausions)
  // +      original by: Aidan Lister (http://aidanlister.com/)
  // + reimplemented by: Kankrelune (http://www.webfaktory.info/)
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // +      improved by: Scott Baker
  // +      improved by: Theriault
  // *        example 1: version_compare('8.2.5rc', '8.2.5a');
  // *        returns 1: 1
  // *        example 2: version_compare('8.2.50', '8.2.52', '<');
  // *        returns 2: true
  // *        example 3: version_compare('5.3.0-dev', '5.3.0');
  // *        returns 3: -1
  // *        example 4: version_compare('4.1.0.52','4.01.0.51');
  // *        returns 4: 1
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ENV = this.php_js.ENV || {};
  // END REDUNDANT
  // Important: compare must be initialized at 0.
  var i = 0,
    x = 0,
    compare = 0,
    // vm maps textual PHP versions to negatives so they're less than 0.
    // PHP currently defines these as CASE-SENSITIVE. It is important to
    // leave these as negatives so that they can come before numerical versions
    // and as if no letters were there to begin with.
    // (1alpha is < 1 and < 1.1 but > 1dev1)
    // If a non-numerical value can't be mapped to this table, it receives
    // -7 as its value.
    vm = {
      'dev': -6,
      'alpha': -5,
      'a': -5,
      'beta': -4,
      'b': -4,
      'RC': -3,
      'rc': -3,
      '#': -2,
      'p': 1,
      'pl': 1
    },
    // This function will be called to prepare each version argument.
    // It replaces every _, -, and + with a dot.
    // It surrounds any nonsequence of numbers/dots with dots.
    // It replaces sequences of dots with a single dot.
    //    version_compare('4..0', '4.0') == 0
    // Important: A string of 0 length needs to be converted into a value
    // even less than an unexisting value in vm (-7), hence [-8].
    // It's also important to not strip spaces because of this.
    //   version_compare('', ' ') == 1
    prepVersion = function (v) {
      v = ('' + v).replace(/[_\-+]/g, '.');
      v = v.replace(/([^.\d]+)/g, '.$1.').replace(/\.{2,}/g, '.');
      return (!v.length ? [-8] : v.split('.'));
    },
    // This converts a version component to a number.
    // Empty component becomes 0.
    // Non-numerical component becomes a negative number.
    // Numerical component becomes itself as an integer.
    numVersion = function (v) {
      return !v ? 0 : (isNaN(v) ? vm[v] || -7 : parseInt(v, 10));
    };
  v1 = prepVersion(v1);
  v2 = prepVersion(v2);
  x = Math.max(v1.length, v2.length);
  for (i = 0; i < x; i++) {
    if (v1[i] == v2[i]) {
      continue;
    }
    v1[i] = numVersion(v1[i]);
    v2[i] = numVersion(v2[i]);
    if (v1[i] < v2[i]) {
      compare = -1;
      break;
    } else if (v1[i] > v2[i]) {
      compare = 1;
      break;
    }
  }
  if (!operator) {
    return compare;
  }

  // Important: operator is CASE-SENSITIVE.
  // "No operator" seems to be treated as "<."
  // Any other values seem to make the function return null.
  switch (operator) {
  case '>':
  case 'gt':
    return (compare > 0);
  case '>=':
  case 'ge':
    return (compare >= 0);
  case '<=':
  case 'le':
    return (compare <= 0);
  case '==':
  case '=':
  case 'eq':
    return (compare === 0);
  case '<>':
  case '!=':
  case 'ne':
    return (compare !== 0);
  case '':
  case '<':
  case 'lt':
    return (compare < 0);
  default:
    return null;
  }
}
function json_decode (str_json) {
  // http://kevin.vanzonneveld.net
  // +      original by: Public Domain (http://www.json.org/json2.js)
  // + reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      improved by: T.J. Leahy
  // +      improved by: Michael White
  // *        example 1: json_decode('[\n    "e",\n    {\n    "pluribus": "unum"\n}\n]');
  // *        returns 1: ['e', {pluribus: 'unum'}]
/*
    http://www.JSON.org/json2.js
    2008-11-19
    Public Domain.
    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    See http://www.JSON.org/js.html
  */

  var json = this.window.JSON;
  if (typeof json === 'object' && typeof json.parse === 'function') {
    try {
      return json.parse(str_json);
    } catch (err) {
      if (!(err instanceof SyntaxError)) {
        throw new Error('Unexpected error type in json_decode()');
      }
      this.php_js = this.php_js || {};
      this.php_js.last_error_json = 4; // usable by json_last_error()
      return null;
    }
  }

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var j;
  var text = str_json;

  // Parsing happens in four stages. In the first stage, we replace certain
  // Unicode characters with escape sequences. JavaScript handles many characters
  // incorrectly, either silently deleting them, or treating them as line endings.
  cx.lastIndex = 0;
  if (cx.test(text)) {
    text = text.replace(cx, function (a) {
      return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    });
  }

  // In the second stage, we run the text against regular expressions that look
  // for non-JSON patterns. We are especially concerned with '()' and 'new'
  // because they can cause invocation, and '=' because it can cause mutation.
  // But just to be safe, we want to reject all unexpected forms.
  // We split the second stage into 4 regexp operations in order to work around
  // crippling inefficiencies in IE's and Safari's regexp engines. First we
  // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
  // replace all simple value tokens with ']' characters. Third, we delete all
  // open brackets that follow a colon or comma or that begin the text. Finally,
  // we look to see that the remaining characters are only whitespace or ']' or
  // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
  if ((/^[\],:{}\s]*$/).
  test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
  replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
  replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

    // In the third stage we use the eval function to compile the text into a
    // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
    // in JavaScript: it can begin a block or an object literal. We wrap the text
    // in parens to eliminate the ambiguity.
    j = eval('(' + text + ')');

    return j;
  }

  this.php_js = this.php_js || {};
  this.php_js.last_error_json = 4; // usable by json_last_error()
  return null;
}
function json_encode (mixed_val) {
  // http://kevin.vanzonneveld.net
  // +      original by: Public Domain (http://www.json.org/json2.js)
  // + reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      improved by: Michael White
  // +      input by: felix
  // +      bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *        example 1: json_encode(['e', {pluribus: 'unum'}]);
  // *        returns 1: '[\n    "e",\n    {\n    "pluribus": "unum"\n}\n]'
/*
    http://www.JSON.org/json2.js
    2008-11-19
    Public Domain.
    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    See http://www.JSON.org/js.html
  */
  var retVal, json = this.window.JSON;
  try {
    if (typeof json === 'object' && typeof json.stringify === 'function') {
      retVal = json.stringify(mixed_val); // Errors will not be caught here if our own equivalent to resource
      //  (an instance of PHPJS_Resource) is used
      if (retVal === undefined) {
        throw new SyntaxError('json_encode');
      }
      return retVal;
    }

    var value = mixed_val;

    var quote = function (string) {
      var escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      var meta = { // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
      };

      escapable.lastIndex = 0;
      return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + string + '"';
    };

    var str = function (key, holder) {
      var gap = '';
      var indent = '    ';
      var i = 0; // The loop counter.
      var k = ''; // The member key.
      var v = ''; // The member value.
      var length = 0;
      var mind = gap;
      var partial = [];
      var value = holder[key];

      // If the value has a toJSON method, call it to obtain a replacement value.
      if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
        value = value.toJSON(key);
      }

      // What happens next depends on the value's type.
      switch (typeof value) {
      case 'string':
        return quote(value);

      case 'number':
        // JSON numbers must be finite. Encode non-finite numbers as null.
        return isFinite(value) ? String(value) : 'null';

      case 'boolean':
      case 'null':
        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce 'null'. The case is included here in
        // the remote chance that this gets fixed someday.
        return String(value);

      case 'object':
        // If the type is 'object', we might be dealing with an object or an array or
        // null.
        // Due to a specification blunder in ECMAScript, typeof null is 'object',
        // so watch out for that case.
        if (!value) {
          return 'null';
        }
        if ((this.PHPJS_Resource && value instanceof this.PHPJS_Resource) || (window.PHPJS_Resource && value instanceof window.PHPJS_Resource)) {
          throw new SyntaxError('json_encode');
        }

        // Make an array to hold the partial results of stringifying this object value.
        gap += indent;
        partial = [];

        // Is the value an array?
        if (Object.prototype.toString.apply(value) === '[object Array]') {
          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.
          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || 'null';
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.
          v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
          gap = mind;
          return v;
        }

        // Iterate through all of the keys in the object.
        for (k in value) {
          if (Object.hasOwnProperty.call(value, k)) {
            v = str(k, value);
            if (v) {
              partial.push(quote(k) + (gap ? ': ' : ':') + v);
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.
        v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
        gap = mind;
        return v;
      case 'undefined':
        // Fall-through
      case 'function':
        // Fall-through
      default:
        throw new SyntaxError('json_encode');
      }
    };

    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    return str('', {
      '': value
    });

  } catch (err) { // Todo: ensure error handling above throws a SyntaxError in all cases where it could
    // (i.e., when the JSON global is not available and there is an error)
    if (!(err instanceof SyntaxError)) {
      throw new Error('Unexpected error type in json_encode()');
    }
    this.php_js = this.php_js || {};
    this.php_js.last_error_json = 4; // usable by json_last_error()
    return null;
  }
}
function json_last_error () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: json_last_error();
  // *     returns 1: 0
/*
  JSON_ERROR_NONE = 0
  JSON_ERROR_DEPTH = 1 // max depth limit to be removed per PHP comments in json.c (not possible in JS?)
  JSON_ERROR_STATE_MISMATCH = 2 // internal use? also not documented
  JSON_ERROR_CTRL_CHAR = 3 // [\u0000-\u0008\u000B-\u000C\u000E-\u001F] if used directly within json_decode(),
                                  // but JSON functions auto-escape these, so error not possible in JavaScript
  JSON_ERROR_SYNTAX = 4
  */
  return this.php_js && this.php_js.last_error_json ? this.php_js.last_error_json : 0;
}
function include (filename) {
  // http://kevin.vanzonneveld.net
  // +   original by: mdsjack (http://www.mdsjack.bo.it)
  // +   improved by: Legaev Andrey
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Michael White (http://getsprink.com)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
  // %        note 2: The included file does not come available until a second script block, so typically use this in the header.
  // %        note 3: Uses global: php_js to keep track of included files
  // *     example 1: include('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
  // *     returns 1: 1
  var d = this.window.document;
  var isXML = d.documentElement.nodeName !== 'HTML' || !d.write; // Latter is for silly comprehensiveness
  var js = d.createElementNS && isXML ? d.createElementNS('http://www.w3.org/1999/xhtml', 'script') : d.createElement('script');
  js.setAttribute('type', 'text/javascript');
  js.setAttribute('src', filename);
  js.setAttribute('defer', 'defer');
  d.getElementsByTagNameNS && isXML ? (d.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'head')[0] ? d.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'head')[0].appendChild(js) : d.documentElement.insertBefore(js, d.documentElement.firstChild) // in case of XUL
  ) : d.getElementsByTagName('head')[0].appendChild(js);
  // save include state for reference by include_once
  var cur_file = {};
  cur_file[this.window.location.href] = 1;

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT
  if (!this.php_js.includes) {
    this.php_js.includes = cur_file;
  }
  if (!this.php_js.includes[filename]) {
    this.php_js.includes[filename] = 1;
  } else {
    this.php_js.includes[filename]++;
  }

  return this.php_js.includes[filename];
}
function include_once (filename) {
  // http://kevin.vanzonneveld.net
  // +   original by: Legaev Andrey
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Michael White (http://getsprink.com)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: include
  // %        note 1: Uses global: php_js to keep track of included files (though private static variable in namespaced version)
  // *     example 1: include_once('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
  // *     returns 1: true
  var cur_file = {};
  cur_file[this.window.location.href] = 1;

  // BEGIN STATIC
  try { // We can't try to access on window, since it might not exist in some environments, and if we use "this.window"
    //    we risk adding another copy if different window objects are associated with the namespaced object
    php_js_shared; // Will be private static variable in namespaced version or global in non-namespaced
    //   version since we wish to share this across all instances
  } catch (e) {
    php_js_shared = {};
  }
  // END STATIC
  if (!php_js_shared.includes) {
    php_js_shared.includes = cur_file;
  }
  if (!php_js_shared.includes[filename]) {
    if (this.include(filename)) {
      return true;
    }
  } else {
    return true;
  }
  return false;
}
function require (filename) {
  // http://kevin.vanzonneveld.net
  // +   original by: Michael White (http://getsprink.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   input by: Yen-Wei Liu
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
  // %        note 2: Uses global: php_js to keep track of included files
  // -    depends on: file_get_contents
  // *     example 1: require('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
  // *     returns 1: 2
  var d = this.window.document;
  var isXML = d.documentElement.nodeName !== 'HTML' || !d.write; // Latter is for silly comprehensiveness
  var js_code = this.file_get_contents(filename);
  var script_block = d.createElementNS && isXML ? d.createElementNS('http://www.w3.org/1999/xhtml', 'script') : d.createElement('script');
  script_block.type = 'text/javascript';
  var client_pc = navigator.userAgent.toLowerCase();
  if ((client_pc.indexOf('msie') !== -1) && (client_pc.indexOf('opera') === -1)) {
    script_block.text = js_code;
  } else {
    script_block.appendChild(d.createTextNode(js_code));
  }

  if (typeof(script_block) !== 'undefined') {
    d.getElementsByTagNameNS && isXML ? (d.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'head')[0] ? d.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'head')[0].appendChild(script_block) : d.documentElement.insertBefore(script_block, d.documentElement.firstChild) // in case of XUL
    ) : d.getElementsByTagName('head')[0].appendChild(script_block);

    // save include state for reference by include_once and require_once()
    var cur_file = {};
    cur_file[this.window.location.href] = 1;

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT
    if (!this.php_js.includes) {
      this.php_js.includes = cur_file;
    }

    if (!this.php_js.includes[filename]) {
      this.php_js.includes[filename] = 1;
      return 1;
    } else {
      return ++this.php_js.includes[filename];
    }
  }
  return 0;
}
function require_once (filename) {
  // http://kevin.vanzonneveld.net
  // +   original by: Michael White (http://getsprink.com)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to keep track of included files (though private static variable in namespaced version)
  // -    depends on: require
  // *     example 1: require_once('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
  // *     returns 1: true
  var cur_file = {};
  cur_file[this.window.location.href] = 1;

  // save include state for reference by include_once and require_once()
  // BEGIN STATIC
  try { // We can't try to access on window, since it might not exist in some environments, and if we use "this.window"
    //    we risk adding another copy if different window objects are associated with the namespaced object
    php_js_shared; // Will be private static variable in namespaced version or global in non-namespaced
    //   version since we wish to share this across all instances
  } catch (e) {
    php_js_shared = {};
  }
  // END STATIC
  if (!php_js_shared.includes) {
    php_js_shared.includes = cur_file;
  }
  if (!php_js_shared.includes[filename]) {
    if (this.require(filename)) {
      return true;
    }
  } else {
    return true;
  }
  return false;
}
function mail (to, subject, message, additional_headers, additional_parameters) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Currently only works if the SSJS SendMail method is available
  // %          note 1: and also depends on the ini having been set for 'sendmail_from';
  // %          note 1: There currently is no CommonJS email API: http://wiki.commonjs.org/wiki/Email
  // %          note 2: 'additional_parameters' argument is not supported
  // *     example 1: mail('you@example.com', 'Hi!', "What's been going on lately?");
  // *     returns 1: true
  // *     example 2: mail("jack@example.com, barry@example.net", 'ok subj', 'my message',
  // *     example 2:           'From: jack@example.com\r\n'+'Organization : Example Corp\r\n'+
  // *     example 2:           'Content-type: text/html;charset=utf8');
  // *     returns 2: true
  var _append = function (sm, prop, value) {
    if (!sm[prop]) { // Ok?
      sm[prop] = '';
      sm[prop] += value;
    } else {
      sm[prop] += ',' + value;
    }
  };

  if (this.window.SendMail) { // See http://web.archive.org/web/20070219200401/http://research.nihonsoft.org/javascript/ServerReferenceJS12/sendmail.htm
    var sm = new this.window.SendMail();
    var from = this.php_js && this.php_js.ini && this.php_js.ini.sendmail_from && this.php_js.ini.sendmail_from.local_value;
    sm.To = to;
    sm.Subject = subject;
    sm.Body = message;
    sm.From = from;
    if (additional_headers) {
      var headers = additional_headers.trim().split(/\r?\n/);
      for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        var colonPos = header.indexOf(':');
        if (colonPos === -1) {
          throw new Error('Malformed headers');
        }
        var prop = header.slice(0, colonPos).trim();
        var value = header.slice(colonPos + 1).trim();
        switch (prop) {
          // Todo: Add any others to this top fall-through which can allow multiple headers
          //                via commas; will otherwise be overwritten (Errorsto, Replyto?)
        case 'Bcc':
          // Fall-through
        case 'Cc':
          // Fall-through
        case 'To':
          // Apparently appendable with additional headers per PHP examples
          _append(sm, prop, value);
          break;
        case 'Subject':
          // Overridable in additional headers?
          break;
        case 'Body':
          // Overridable in additional headers?
          break;
        case 'From':
          // Default, though can be overridden
          /* Fall-through */
        default:
          //  Errorsto, Organization, Replyto, Smtpserver
          sm[prop] = value;
          break;
        }
      }
    }
    if (!sm.From) {
      throw new Error('Warning: mail(): "sendmail_from" not set in php.ini');
    }
    return sm.send();
  }
  return false;
}
function abs (mixed_number) {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // +   improved by: Karol Kowalski
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // *     example 1: abs(4.2);
  // *     returns 1: 4.2
  // *     example 2: abs(-4.2);
  // *     returns 2: 4.2
  // *     example 3: abs(-5);
  // *     returns 3: 5
  // *     example 4: abs('_argos');
  // *     returns 4: 0
  return Math.abs(mixed_number) || 0;
}
function acos (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: acos(0.3);
  // *     returns 1: 1.2661036727794992
  return Math.acos(arg);
}
function acosh (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: acosh(8723321.4);
  // *     returns 1: 16.674657798418625
  return Math.log(arg + Math.sqrt(arg * arg - 1));
}
function asin (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: asin(0.3);
  // *     returns 1: 0.3046926540153975
  return Math.asin(arg);
}
function asinh (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: asinh(8723321.4);
  // *     returns 1: 16.67465779841863
  return Math.log(arg + Math.sqrt(arg * arg + 1));
}
function atan (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: atan(8723321.4);
  // *     returns 1: 1.5707962121596615
  return Math.atan(arg);
}
function atan2 (y, x) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: atan2(1, 1);
  // *     returns 1: 0.7853981633974483
  return Math.atan2(y, x);
}
function atanh (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: atanh(0.3);
  // *     returns 1: 0.3095196042031118
  return 0.5 * Math.log((1 + arg) / (1 - arg));
}
function base_convert (number, frombase, tobase) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philippe Baumann
  // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // *     example 1: base_convert('A37334', 16, 2);
  // *     returns 1: '101000110111001100110100'
  return parseInt(number + '', frombase | 0).toString(tobase | 0);
}
function bindec (binary_string) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philippe Baumann
  // *     example 1: bindec('110011');
  // *     returns 1: 51
  // *     example 2: bindec('000110011');
  // *     returns 2: 51
  // *     example 3: bindec('111');
  // *     returns 3: 7
  binary_string = (binary_string + '').replace(/[^01]/gi, '');
  return parseInt(binary_string, 2);
}
function ceil (value) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: ceil(8723321.4);
  // *     returns 1: 8723322
  return Math.ceil(value);
}
function cos (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: cos(8723321.4);
  // *     returns 1: -0.18127180117607017
  return Math.cos(arg);
}
function cosh (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: cosh(-0.18127180117607017);
  // *     returns 1: 1.0164747716114113
  return (Math.exp(arg) + Math.exp(-arg)) / 2;
}
function decbin (number) {
  // http://kevin.vanzonneveld.net
  // +   original by: Enrique Gonzalez
  // +   bugfixed by: Onno Marsman
  // +   improved by: http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  // +   input by: pilus
  // +   input by: nord_ua
  // *     example 1: decbin(12);
  // *     returns 1: '1100'
  // *     example 2: decbin(26);
  // *     returns 2: '11010'
  // *     example 3: decbin('26');
  // *     returns 3: '11010'
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }
  return parseInt(number, 10).toString(2);
}
function dechex (number) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philippe Baumann
  // +   bugfixed by: Onno Marsman
  // +   improved by: http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  // +   input by: pilus
  // *     example 1: dechex(10);
  // *     returns 1: 'a'
  // *     example 2: dechex(47);
  // *     returns 2: '2f'
  // *     example 3: dechex(-1415723993);
  // *     returns 3: 'ab9dc427'
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }
  return parseInt(number, 10).toString(16);
}
function decoct (number) {
  // http://kevin.vanzonneveld.net
  // +   original by: Enrique Gonzalez
  // +   bugfixed by: Onno Marsman
  // +   improved by: http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  // +   input by: pilus
  // *     example 1: decoct(15);
  // *     returns 1: '17'
  // *     example 2: decoct(264);
  // *     returns 2: '410'
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }
  return parseInt(number, 10).toString(8);
}
function deg2rad (angle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Enrique Gonzalez
  // +     improved by: Thomas Grainger (http://graingert.co.uk)
  // *     example 1: deg2rad(45);
  // *     returns 1: 0.7853981633974483
  return angle * .017453292519943295; // (angle / 180) * Math.PI;
}
function exp (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: exp(0.3);
  // *     returns 1: 1.3498588075760032
  return Math.exp(arg);
}
function expm1 (x) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Precision 'n' can be adjusted as desired
  // *     example 1: expm1(1e-15);
  // *     returns 1: 1.0000000000000007e-15
  var ret = 0,
    n = 50; // degree of precision
  var factorial = function factorial(n) {
    if ((n === 0) || (n === 1)) {
      return 1;
    } else {
      var result = (n * factorial(n - 1));
      return result;
    }
  };
  for (var i = 1; i < n; i++) {
    ret += Math.pow(x, i) / factorial(i);
  }
  return ret;
}
function floor (value) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: floor(8723321.4);
  // *     returns 1: 8723321
  return Math.floor(value);
}
function fmod (x, y) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: fmod(5.7, 1.3);
  // *     returns 1: 0.5
  var tmp, tmp2, p = 0,
    pY = 0,
    l = 0.0,
    l2 = 0.0;

  tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/);
  p = parseInt(tmp[2], 10) - (tmp[1] + '').length;
  tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/);
  pY = parseInt(tmp[2], 10) - (tmp[1] + '').length;

  if (pY > p) {
    p = pY;
  }

  tmp2 = (x % y);

  if (p < -100 || p > 20) {
    // toFixed will give an out of bound error so we fix it like this:
    l = Math.round(Math.log(tmp2) / Math.log(10));
    l2 = Math.pow(10, l);

    return (tmp2 / l2).toFixed(l - p) * l2;
  } else {
    return parseFloat(tmp2.toFixed(-p));
  }
}
function getrandmax () {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: getrandmax();
  // *     returns 1: 2147483647
  return 2147483647;
}
function hexdec (hex_string) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philippe Baumann
  // *     example 1: hexdec('that');
  // *     returns 1: 10
  // *     example 2: hexdec('a0');
  // *     returns 2: 160
  hex_string = (hex_string + '').replace(/[^a-f0-9]/gi, '');
  return parseInt(hex_string, 16);
}
function hypot (x, y) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: hypot(3, 4);
  // *     returns 1: 5
  // *     example 2: hypot([], 'a');
  // *     returns 2: 0
  return Math.sqrt(x * x + y * y) || 0;
}
function is_finite (val) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: is_finite(Infinity);
  // *     returns 1: false
  // *     example 2: is_finite(-Infinity);
  // *     returns 2: false
  // *     example 3: is_finite(0);
  // *     returns 3: true
  var warningType = '';

  if (val === Infinity || val === -Infinity) {
    return false;
  }

  //Some warnings for maximum PHP compatibility
  if (typeof val === 'object') {
    warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
  } else if (typeof val === 'string' && !val.match(/^[\+\-]?\d/)) {
    //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
    warningType = 'string';
  }
  if (warningType) {
    throw new Error('Warning: is_finite() expects parameter 1 to be double, ' + warningType + ' given');
  }

  return true;
}
function is_infinite (val) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: is_infinite(Infinity);
  // *     returns 1: true
  // *     example 2: is_infinite(-Infinity);
  // *     returns 2: true
  // *     example 3: is_infinite(0);
  // *     returns 3: false
  var warningType = '';

  if (val === Infinity || val === -Infinity) {
    return true;
  }

  //Some warnings for maximum PHP compatibility
  if (typeof val === 'object') {
    warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
  } else if (typeof val === 'string' && !val.match(/^[\+\-]?\d/)) {
    //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
    warningType = 'string';
  }
  if (warningType) {
    throw new Error('Warning: is_infinite() expects parameter 1 to be double, ' + warningType + ' given');
  }

  return false;
}
function is_nan (val) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // +      input by: Robin
  // *     example 1: is_nan(NaN);
  // *     returns 1: true
  // *     example 2: is_nan(0);
  // *     returns 2: false
  var warningType = '';

  if (typeof val === 'number' && isNaN(val)) {
    return true;
  }

  //Some errors for maximum PHP compatibility
  if (typeof val === 'object') {
    warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
  }
  else if (typeof val === 'string' && !val.match(/^[\+\-]?\d/)) {
    //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
    warningType = 'string';
  }
  if (warningType) {
    throw new Error('Warning: is_nan() expects parameter 1 to be double, ' + warningType + ' given');
  }

  return false;
}
function lcg_value () {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  return Math.random();
}
function log (arg, base) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: log(8723321.4, 7);
  // *     returns 1: 8.212871815082147
  return (typeof base === 'undefined') ?
    Math.log(arg) :
    Math.log(arg) / Math.log(base);
}
function log10 (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +   improved by: Onno Marsman
  // +   improved by: Tod Gentille
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: log10(10);
  // *     returns 1: 1
  // *     example 2: log10(1);
  // *     returns 2: 0
  return Math.log(arg) / 2.302585092994046; // Math.LN10
}
function log1p (x) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Precision 'n' can be adjusted as desired
  // *     example 1: log1p(1e-15);
  // *     returns 1: 9.999999999999995e-16

  var ret = 0,
    n = 50; // degree of precision
  if (x <= -1) {
    return '-INF'; // JavaScript style would be to return Number.NEGATIVE_INFINITY
  }
  if (x < 0 || x > 1) {
    return Math.log(1 + x);
  }
  for (var i = 1; i < n; i++) {
    if ((i % 2) === 0) {
      ret -= Math.pow(x, i) / i;
    } else {
      ret += Math.pow(x, i) / i;
    }
  }
  return ret;
}
function max () {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // +    revised by: Onno Marsman
  // +    tweaked by: Jack
  // %          note: Long code cause we're aiming for maximum PHP compatibility
  // *     example 1: max(1, 3, 5, 6, 7);
  // *     returns 1: 7
  // *     example 2: max([2, 4, 5]);
  // *     returns 2: 5
  // *     example 3: max(0, 'hello');
  // *     returns 3: 0
  // *     example 4: max('hello', 0);
  // *     returns 4: 'hello'
  // *     example 5: max(-1, 'hello');
  // *     returns 5: 'hello'
  // *     example 6: max([2, 4, 8], [2, 5, 7]);
  // *     returns 6: [2, 5, 7]
  var ar, retVal, i = 0,
    n = 0,
    argv = arguments,
    argc = argv.length,
    _obj2Array = function (obj) {
      if (Object.prototype.toString.call(obj) === '[object Array]') {
        return obj;
      }
      else {
        var ar = [];
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            ar.push(obj[i]);
          }
        }
        return ar;
      }
    }, //function _obj2Array
    _compare = function (current, next) {
      var i = 0,
        n = 0,
        tmp = 0,
        nl = 0,
        cl = 0;

      if (current === next) {
        return 0;
      }
      else if (typeof current === 'object') {
        if (typeof next === 'object') {
          current = _obj2Array(current);
          next = _obj2Array(next);
          cl = current.length;
          nl = next.length;
          if (nl > cl) {
            return 1;
          }
          else if (nl < cl) {
            return -1;
          }
          for (i = 0, n = cl; i < n; ++i) {
            tmp = _compare(current[i], next[i]);
            if (tmp == 1) {
              return 1;
            }
            else if (tmp == -1) {
              return -1;
            }
          }
          return 0;
        }
        return -1;
      }
      else if (typeof next === 'object') {
        return 1;
      }
      else if (isNaN(next) && !isNaN(current)) {
        if (current == 0) {
          return 0;
        }
        return (current < 0 ? 1 : -1);
      }
      else if (isNaN(current) && !isNaN(next)) {
        if (next == 0) {
          return 0;
        }
        return (next > 0 ? 1 : -1);
      }

      if (next == current) {
        return 0;
      }
      return (next > current ? 1 : -1);
    }; //function _compare
  if (argc === 0) {
    throw new Error('At least one value should be passed to max()');
  }
  else if (argc === 1) {
    if (typeof argv[0] === 'object') {
      ar = _obj2Array(argv[0]);
    }
    else {
      throw new Error('Wrong parameter count for max()');
    }
    if (ar.length === 0) {
      throw new Error('Array must contain at least one element for max()');
    }
  }
  else {
    ar = argv;
  }

  retVal = ar[0];
  for (i = 1, n = ar.length; i < n; ++i) {
    if (_compare(retVal, ar[i]) == 1) {
      retVal = ar[i];
    }
  }

  return retVal;
}
function min () {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // +    revised by: Onno Marsman
  // +    tweaked by: Jack
  // %          note: Long code cause we're aiming for maximum PHP compatibility
  // *     example 1: min(1, 3, 5, 6, 7);
  // *     returns 1: 1
  // *     example 2: min([2, 4, 5]);
  // *     returns 2: 2
  // *     example 3: min(0, 'hello');
  // *     returns 3: 0
  // *     example 4: min('hello', 0);
  // *     returns 4: 'hello'
  // *     example 5: min(-1, 'hello');
  // *     returns 5: -1
  // *     example 6: min([2, 4, 8], [2, 5, 7]);
  // *     returns 6: [2, 4, 8]
  var ar, retVal, i = 0,
    n = 0,
    argv = arguments,
    argc = argv.length,
    _obj2Array = function (obj) {
      if (Object.prototype.toString.call(obj) === '[object Array]') {
        return obj;
      }
      var ar = [];
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          ar.push(obj[i]);
        }
      }
      return ar;
    }, //function _obj2Array
    _compare = function (current, next) {
      var i = 0,
        n = 0,
        tmp = 0,
        nl = 0,
        cl = 0;

      if (current === next) {
        return 0;
      }
      else if (typeof current === 'object') {
        if (typeof next === 'object') {
          current = _obj2Array(current);
          next = _obj2Array(next);
          cl = current.length;
          nl = next.length;
          if (nl > cl) {
            return 1;
          }
          else if (nl < cl) {
            return -1;
          }
          for (i = 0, n = cl; i < n; ++i) {
            tmp = _compare(current[i], next[i]);
            if (tmp == 1) {
              return 1;
            }
            else if (tmp == -1) {
              return -1;
            }
          }
          return 0;
        }
        return -1;
      }
      else if (typeof next === 'object') {
        return 1;
      }
      else if (isNaN(next) && !isNaN(current)) {
        if (current == 0) {
          return 0;
        }
        return (current < 0 ? 1 : -1);
      }
      else if (isNaN(current) && !isNaN(next)) {
        if (next == 0) {
          return 0;
        }
        return (next > 0 ? 1 : -1);
      }

      if (next == current) {
        return 0;
      }
      return (next > current ? 1 : -1);
    }; //function _compare
  if (argc === 0) {
    throw new Error('At least one value should be passed to min()');
  }
  else if (argc === 1) {
    if (typeof argv[0] === 'object') {
      ar = _obj2Array(argv[0]);
    }
    else {
      throw new Error('Wrong parameter count for min()');
    }
    if (ar.length === 0) {
      throw new Error('Array must contain at least one element for min()');
    }
  }
  else {
    ar = argv;
  }

  retVal = ar[0];
  for (i = 1, n = ar.length; i < n; ++i) {
    if (_compare(retVal, ar[i]) == -1) {
      retVal = ar[i];
    }
  }

  return retVal;
}
function mt_getrandmax () {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: mt_getrandmax();
  // *     returns 1: 2147483647
  return 2147483647;
}
function mt_rand (min, max) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Kongo
  // *     example 1: mt_rand(1, 1);
  // *     returns 1: 1
  var argc = arguments.length;
  if (argc === 0) {
    min = 0;
    max = 2147483647;
  }
  else if (argc === 1) {
    throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
  }
  else {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function octdec (oct_string) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philippe Baumann
  // *     example 1: octdec('77');
  // *     returns 1: 63
  oct_string = (oct_string + '').replace(/[^0-7]/gi, '');
  return parseInt(oct_string, 8);
}
function pi () {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // +   improved by: dude
  // *     example 1: pi(8723321.4);
  // *     returns 1: 3.141592653589793
  return 3.141592653589793; // Math.PI
}
function pow (base, exp) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: pow(8723321.4, 7);
  // *     returns 1: 3.843909168077899e+48
  return Math.pow(base, exp);
}
function rad2deg (angle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Enrique Gonzalez
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: rad2deg(3.141592653589793);
  // *     returns 1: 180
  return angle * 57.29577951308232; // angle / Math.PI * 180
}
function rand (min, max) {
  // http://kevin.vanzonneveld.net
  // +   original by: Leslie Hoare
  // +   bugfixed by: Onno Marsman
  // %          note 1: See the commented out code below for a version which will work with our experimental (though probably unnecessary) srand() function)
  // *     example 1: rand(1, 1);
  // *     returns 1: 1
  var argc = arguments.length;
  if (argc === 0) {
    min = 0;
    max = 2147483647;
  } else if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;

/*
  // See note above for an explanation of the following alternative code

  // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: srand
  // %          note 1: This is a very possibly imperfect adaptation from the PHP source code
  var rand_seed, ctx, PHP_RAND_MAX=2147483647; // 0x7fffffff

  if (!this.php_js || this.php_js.rand_seed === undefined) {
    this.srand();
  }
  rand_seed = this.php_js.rand_seed;

  var argc = arguments.length;
  if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
  }

  var do_rand = function (ctx) {
    return ((ctx * 1103515245 + 12345) % (PHP_RAND_MAX + 1));
  };

  var php_rand = function (ctxArg) { // php_rand_r
    this.php_js.rand_seed = do_rand(ctxArg);
    return parseInt(this.php_js.rand_seed, 10);
  };

  var number = php_rand(rand_seed);

  if (argc === 2) {
    number = min + parseInt(parseFloat(parseFloat(max) - min + 1.0) * (number/(PHP_RAND_MAX + 1.0)), 10);
  }
  return number;
  */
}
function round (value, precision, mode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +    revised by: Onno Marsman
  // +      input by: Greenseed
  // +    revised by: T.Wild
  // +      input by: meo
  // +      input by: William
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Josep Sanz (http://www.ws3.es/)
  // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
  // %        note 1: Great work. Ideas for improvement:
  // %        note 1:  - code more compliant with developer guidelines
  // %        note 1:  - for implementing PHP constant arguments look at
  // %        note 1:  the pathinfo() function, it offers the greatest
  // %        note 1:  flexibility & compatibility possible
  // *     example 1: round(1241757, -3);
  // *     returns 1: 1242000
  // *     example 2: round(3.6);
  // *     returns 2: 4
  // *     example 3: round(2.835, 2);
  // *     returns 3: 2.84
  // *     example 4: round(1.1749999999999, 2);
  // *     returns 4: 1.17
  // *     example 5: round(58551.799999999996, 2);
  // *     returns 5: 58551.8
  var m, f, isHalf, sgn; // helper variables
  precision |= 0; // making sure precision is integer
  m = Math.pow(10, precision);
  value *= m;
  sgn = (value > 0) | -(value < 0); // sign of the number
  isHalf = value % 1 === 0.5 * sgn;
  f = Math.floor(value);

  if (isHalf) {
    switch (mode) {
    case 'PHP_ROUND_HALF_DOWN':
      value = f + (sgn < 0); // rounds .5 toward zero
      break;
    case 'PHP_ROUND_HALF_EVEN':
      value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
      break;
    case 'PHP_ROUND_HALF_ODD':
      value = f + !(f % 2); // rounds .5 towards the next odd integer
      break;
    default:
      value = f + (sgn > 0); // rounds .5 away from zero
    }
  }

  return (isHalf ? value : Math.round(value)) / m;
}
function sin (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: sin(8723321.4);
  // *     returns 1: -0.9834330348825909
  return Math.sin(arg);
}
function sinh (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: sinh(-0.9834330348825909);
  // *     returns 1: -1.1497971402636502
  return (Math.exp(arg) - Math.exp(-arg)) / 2;
}
function sqrt (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: sqrt(8723321.4);
  // *     returns 1: 2953.5269424875746
  return Math.sqrt(arg);
}
function tan (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: tan(8723321.4);
  // *     returns 1: 5.4251848798444815
  return Math.tan(arg);
}
function tanh (arg) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // *     example 1: tanh(5.4251848798444815);
  // *     returns 1: 0.9999612058841574
  return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
}
function constant (name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: constant('IMAGINARY_CONSTANT1');
  // *     returns 1: null
  var clssPos = 0,
    clssCnst = null;
  if ((clssPos = name.indexOf('::')) !== -1) {
    clssCnst = name.slice(clssPos + 2);
    name = name.slice(0, clssPos);
  }

  if (this.window[name] === undefined) {
    return null;
  }
  if (clssCnst) {
    return this.window[name][clssCnst];
  }
  return this.window[name];
}
function define (name, value) {
  // Define a new constant
  //
  // version: 903.3016
  // discuss at: http://phpjs.org/functions/define
  // +      original by: Paulo Freitas
  // +       revised by: Andrea Giammarchi (http://webreflection.blogspot.com)
  // + reimplemented by: Brett Zamir (http://brett-zamir.me)
  // *        example 1: define('IMAGINARY_CONSTANT1', 'imaginary_value1');
  // *        results 1: IMAGINARY_CONSTANT1 === 'imaginary_value1'
  var defn, replace, script, that = this,
    d = this.window.document;
  var toString = function (name, value) {
    return 'const ' + name + '=' + (/^(null|true|false|(\+|\-)?\d+(\.\d+)?)$/.test(value = String(value)) ? value : '"' + replace(value) + '"');
  };
  try {
    eval('const e=1');
    replace = function (value) {
      var replace = {
        "\x08": "b",
        "\x0A": "\\n",
        "\x0B": "v",
        "\x0C": "f",
        "\x0D": "\\r",
        '"': '"',
        "\\": "\\"
      };
      return value.replace(/\x08|[\x0A-\x0D]|"|\\/g, function (value) {
        return "\\" + replace[value];
      });
    };
    defn = function (name, value) {
      if (d.createElementNS) {
        script = d.createElementNS('http://www.w3.org/1999/xhtml', 'script');
      } else {
        script = d.createElement('script');
      }
      script.type = 'text/javascript';
      script.appendChild(d.createTextNode(toString(name, value)));
      d.documentElement.appendChild(script);
      d.documentElement.removeChild(script);
    };
  } catch (e) {
    replace = function (value) {
      var replace = {
        "\x0A": "\\n",
        "\x0D": "\\r"
      };
      return value.replace(/"/g, '""').replace(/\n|\r/g, function (value) {
        return replace[value];
      });
    };
    defn = (this.execScript ?
    function (name, value) {
      that.execScript(toString(name, value), 'VBScript');
    } : function (name, value) {
      eval(toString(name, value).substring(6));
    });
  }
  defn(name, value);
}
function defined (constant_name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Because this function can (albeit only temporarily) overwrite a global variable,
  // %          note 1: it is not thread-safe (normally not a concern for JavaScript, but would be if used
  // %          note 1: in a threaded environment, e.g., DOM worker threads)
  // *     example 1: defined('IMAGINARY_CONSTANT1');
  // *     returns 1: false
  var tmp = this.window[constant_name];

  this.window[constant_name] = this.window[constant_name] ? 'changed' + this.window[constant_name].toString() : 'changed';
  var returnval = this.window[constant_name] === tmp;
  if (!returnval) { // Reset
    this.window[constant_name] = tmp;
  }

  return returnval;
}
function pack (format) {
  // http://kevin.vanzonneveld.net
  // +   original by: Tim de Koning (http://www.kingsquare.nl)
  // +      parts by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   bugfixed by: Tim de Koning (http://www.kingsquare.nl)
  // %        note 1: Float encoding by: Jonas Raoni Soares Silva
  // %        note 2: Home: http://www.kingsquare.nl/blog/12-12-2009/13507444
  // %        note 3: Feedback: phpjs-pack@kingsquare.nl
  // %        note 4: 'machine dependent byte order and size' aren't
  // %        note 4: applicable for JavaScript; pack works as on a 32bit,
  // %        note 4: little endian machine
  // *     example 1: pack('nvc*', 0x1234, 0x5678, 65, 66);
  // *     returns 1: '4xVAB'
  var formatPointer = 0,
    argumentPointer = 1,
    result = '',
    argument = '',
    i = 0,
    r = [],
    instruction, quantifier, word, precisionBits, exponentBits, extraNullCount;

  // vars used by float encoding
  var bias, minExp, maxExp, minUnnormExp, status, exp, len, bin, signal, n, intPart, floatPart, lastBit, rounded, j, k, tmpResult;

  while (formatPointer < format.length) {
    instruction = format.charAt(formatPointer);
    quantifier = '';
    formatPointer++;
    while ((formatPointer < format.length) && (format.charAt(formatPointer).match(/[\d\*]/) !== null)) {
      quantifier += format.charAt(formatPointer);
      formatPointer++;
    }
    if (quantifier === '') {
      quantifier = '1';
    }

    // Now pack variables: 'quantifier' times 'instruction'
    switch (instruction) {
    case 'a':
      // NUL-padded string
    case 'A':
      // SPACE-padded string
      if (typeof arguments[argumentPointer] === 'undefined') {
        throw new Error('Warning:  pack() Type ' + instruction + ': not enough arguments');
      } else {
        argument = String(arguments[argumentPointer]);
      }
      if (quantifier === '*') {
        quantifier = argument.length;
      }
      for (i = 0; i < quantifier; i++) {
        if (typeof argument[i] === 'undefined') {
          if (instruction === 'a') {
            result += String.fromCharCode(0);
          } else {
            result += ' ';
          }
        } else {
          result += argument[i];
        }
      }
      argumentPointer++;
      break;
    case 'h':
      // Hex string, low nibble first
    case 'H':
      // Hex string, high nibble first
      if (typeof arguments[argumentPointer] === 'undefined') {
        throw new Error('Warning: pack() Type ' + instruction + ': not enough arguments');
      } else {
        argument = arguments[argumentPointer];
      }
      if (quantifier === '*') {
        quantifier = argument.length;
      }
      if (quantifier > argument.length) {
        throw new Error('Warning: pack() Type ' + instruction + ': not enough characters in string');
      }
      for (i = 0; i < quantifier; i += 2) {
        // Always get per 2 bytes...
        word = argument[i];
        if (((i + 1) >= quantifier) || typeof(argument[i + 1]) === 'undefined') {
          word += '0';
        } else {
          word += argument[i + 1];
        }
        // The fastest way to reverse?
        if (instruction === 'h') {
          word = word[1] + word[0];
        }
        result += String.fromCharCode(parseInt(word, 16));
      }
      argumentPointer++;
      break;

    case 'c':
      // signed char
    case 'C':
      // unsigned char
      // c and C is the same in pack
      if (quantifier === '*') {
        quantifier = arguments.length - argumentPointer;
      }
      if (quantifier > (arguments.length - argumentPointer)) {
        throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
      }

      for (i = 0; i < quantifier; i++) {
        result += String.fromCharCode(arguments[argumentPointer]);
        argumentPointer++;
      }
      break;

    case 's':
      // signed short (always 16 bit, machine byte order)
    case 'S':
      // unsigned short (always 16 bit, machine byte order)
    case 'v':
      // s and S is the same in pack
      if (quantifier === '*') {
        quantifier = arguments.length - argumentPointer;
      }
      if (quantifier > (arguments.length - argumentPointer)) {
        throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
      }

      for (i = 0; i < quantifier; i++) {
        result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
        result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
        argumentPointer++;
      }
      break;

    case 'n':
      // unsigned short (always 16 bit, big endian byte order)
      if (quantifier === '*') {
        quantifier = arguments.length - argumentPointer;
      }
      if (quantifier > (arguments.length - argumentPointer)) {
        throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
      }

      for (i = 0; i < quantifier; i++) {
        result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
        result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
        argumentPointer++;
      }
      break;

    case 'i':
      // signed integer (machine dependent size and byte order)
    case 'I':
      // unsigned integer (machine dependent size and byte order)
    case 'l':
      // signed long (always 32 bit, machine byte order)
    case 'L':
      // unsigned long (always 32 bit, machine byte order)
    case 'V':
      // unsigned long (always 32 bit, little endian byte order)
      if (quantifier === '*') {
        quantifier = arguments.length - argumentPointer;
      }
      if (quantifier > (arguments.length - argumentPointer)) {
        throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
      }

      for (i = 0; i < quantifier; i++) {
        result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
        result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
        result += String.fromCharCode(arguments[argumentPointer] >> 16 & 0xFF);
        result += String.fromCharCode(arguments[argumentPointer] >> 24 & 0xFF);
        argumentPointer++;
      }

      break;
    case 'N':
      // unsigned long (always 32 bit, big endian byte order)
      if (quantifier === '*') {
        quantifier = arguments.length - argumentPointer;
      }
      if (quantifier > (arguments.length - argumentPointer)) {
        throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
      }

      for (i = 0; i < quantifier; i++) {
        result += String.fromCharCode(arguments[argumentPointer] >> 24 & 0xFF);
        result += String.fromCharCode(arguments[argumentPointer] >> 16 & 0xFF);
        result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
        result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
        argumentPointer++;
      }
      break;

    case 'f':
      // float (machine dependent size and representation)
    case 'd':
      // double (machine dependent size and representation)
      // version based on IEEE754
      precisionBits = 23;
      exponentBits = 8;
      if (instruction === 'd') {
        precisionBits = 52;
        exponentBits = 11;
      }

      if (quantifier === '*') {
        quantifier = arguments.length - argumentPointer;
      }
      if (quantifier > (arguments.length - argumentPointer)) {
        throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
      }
      for (i = 0; i < quantifier; i++) {
        argument = arguments[argumentPointer];
        bias = Math.pow(2, exponentBits - 1) - 1;
        minExp = -bias + 1;
        maxExp = bias;
        minUnnormExp = minExp - precisionBits;
        status = isNaN(n = parseFloat(argument)) || n === -Infinity || n === +Infinity ? n : 0;
        exp = 0;
        len = 2 * bias + 1 + precisionBits + 3;
        bin = new Array(len);
        signal = (n = status !== 0 ? 0 : n) < 0;
        n = Math.abs(n);
        intPart = Math.floor(n);
        floatPart = n - intPart;

        for (k = len; k;) {
          bin[--k] = 0;
        }
        for (k = bias + 2; intPart && k;) {
          bin[--k] = intPart % 2;
          intPart = Math.floor(intPart / 2);
        }
        for (k = bias + 1; floatPart > 0 && k; --floatPart) {
          (bin[++k] = ((floatPart *= 2) >= 1) - 0);
        }
        for (k = -1; ++k < len && !bin[k];) {}

        if (bin[(lastBit = precisionBits - 1 + (k = (exp = bias + 1 - k) >= minExp && exp <= maxExp ? k + 1 : bias + 1 - (exp = minExp - 1))) + 1]) {
          if (!(rounded = bin[lastBit])) {
            for (j = lastBit + 2; !rounded && j < len; rounded = bin[j++]) {}
          }
          for (j = lastBit + 1; rounded && --j >= 0;
          (bin[j] = !bin[j] - 0) && (rounded = 0)) {}
        }

        for (k = k - 2 < 0 ? -1 : k - 3; ++k < len && !bin[k];) {}

        if ((exp = bias + 1 - k) >= minExp && exp <= maxExp) {
          ++k;
        } else {
          if (exp < minExp) {
            if (exp !== bias + 1 - len && exp < minUnnormExp) { /*"encodeFloat::float underflow" */
            }
            k = bias + 1 - (exp = minExp - 1);
          }
        }

        if (intPart || status !== 0) {
          exp = maxExp + 1;
          k = bias + 2;
          if (status === -Infinity) {
            signal = 1;
          } else if (isNaN(status)) {
            bin[k] = 1;
          }
        }

        n = Math.abs(exp + bias);
        tmpResult = '';

        for (j = exponentBits + 1; --j;) {
          tmpResult = (n % 2) + tmpResult;
          n = n >>= 1;
        }

        n = 0;
        j = 0;
        k = (tmpResult = (signal ? '1' : '0') + tmpResult + bin.slice(k, k + precisionBits).join('')).length;
        r = [];

        for (; k;) {
          n += (1 << j) * tmpResult.charAt(--k);
          if (j === 7) {
            r[r.length] = String.fromCharCode(n);
            n = 0;
          }
          j = (j + 1) % 8;
        }

        r[r.length] = n ? String.fromCharCode(n) : '';
        result += r.join('');
        argumentPointer++;
      }
      break;

    case 'x':
      // NUL byte
      if (quantifier === '*') {
        throw new Error('Warning: pack(): Type x: \'*\' ignored');
      }
      for (i = 0; i < quantifier; i++) {
        result += String.fromCharCode(0);
      }
      break;

    case 'X':
      // Back up one byte
      if (quantifier === '*') {
        throw new Error('Warning: pack(): Type X: \'*\' ignored');
      }
      for (i = 0; i < quantifier; i++) {
        if (result.length === 0) {
          throw new Error('Warning: pack(): Type X:' + ' outside of string');
        } else {
          result = result.substring(0, result.length - 1);
        }
      }
      break;

    case '@':
      // NUL-fill to absolute position
      if (quantifier === '*') {
        throw new Error('Warning: pack(): Type X: \'*\' ignored');
      }
      if (quantifier > result.length) {
        extraNullCount = quantifier - result.length;
        for (i = 0; i < extraNullCount; i++) {
          result += String.fromCharCode(0);
        }
      }
      if (quantifier < result.length) {
        result = result.substring(0, quantifier);
      }
      break;

    default:
      throw new Error('Warning:  pack() Type ' + instruction + ': unknown format code');
    }
  }
  if (argumentPointer < arguments.length) {
    throw new Error('Warning: pack(): ' + (arguments.length - argumentPointer) + ' arguments unused');
  }

  return result;
}
function php_strip_whitespace (file) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
  // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
  // %        note 1: To avoid browser blocking issues's consider using jQuery's: $('#divId').load('http://url') instead.
  // -    depends on: file_get_contents
  // *     example 1: php_strip_whitespace('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: '123'
  try {
    var str = this.file_get_contents(file);
  } catch (e) {
    return '';
  }
  // Strip comments (both styles), reduce non-newline whitespace to one, reduce multiple
  // newlines (preceded by any whitespace) to a newline, remove WS at beginning of line,
  // and at end of line
  return str.replace(/\/\/.*?\n/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/[ \f\r\t\v\u00A0\u2028\u2029]+/g, ' ').replace(/\s*\n+/g, '\n').replace(/^\s+/gm, '').replace(/\s*$/gm, '');
}
function time_sleep_until (timestamp) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note: For study purposes. Current implementation could lock up the user's browser.
  // %          note: Expects a timestamp in seconds, so DO NOT pass in a JavaScript timestamp which are in milliseconds (e.g., new Date()) or otherwise the function will lock up the browser 1000 times longer than probably intended.
  // %          note: Consider using setTimeout() instead.
  // *     example 1: time_sleep_until(1233146501) // delays until the time indicated by the given timestamp is reached
  // *     returns 1: true
  while (new Date() < timestamp * 1000) {}
  return true;
}
function uniqid (prefix, more_entropy) {
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Kankrelune (http://www.webfaktory.info/)
  // %        note 1: Uses an internal counter (in php_js global) to avoid collision
  // *     example 1: uniqid();
  // *     returns 1: 'a30285b160c14'
  // *     example 2: uniqid('foo');
  // *     returns 2: 'fooa30285b1cd361'
  // *     example 3: uniqid('bar', true);
  // *     returns 3: 'bara20285b23dfd1.31879087'
  if (typeof prefix === 'undefined') {
    prefix = "";
  }

  var retId;
  var formatSeed = function (seed, reqWidth) {
    seed = parseInt(seed, 10).toString(16); // to hex str
    if (reqWidth < seed.length) { // so long we split
      return seed.slice(seed.length - reqWidth);
    }
    if (reqWidth > seed.length) { // so short we pad
      return Array(1 + (reqWidth - seed.length)).join('0') + seed;
    }
    return seed;
  };

  // BEGIN REDUNDANT
  if (!this.php_js) {
    this.php_js = {};
  }
  // END REDUNDANT
  if (!this.php_js.uniqidSeed) { // init seed with big random int
    this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
  }
  this.php_js.uniqidSeed++;

  retId = prefix; // start with prefix, add current milliseconds hex string
  retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
  retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
  if (more_entropy) {
    // for more entropy we add a float lower to 10
    retId += (Math.random() * 10).toFixed(8).toString();
  }

  return retId;
}
function gopher_parsedir (dirent) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var entry = gopher_parsedir('0All about my gopher site.\t/allabout.txt\tgopher.example.com\t70\u000d\u000a');
  // *     example 1: entry.title;
  // *     returns 1: 'All about my gopher site.'

/* Types
  * 0 = plain text file
  * 1 = directory menu listing
  * 2 = CSO search query
  * 3 = error message
  * 4 = BinHex encoded text file
  * 5 = binary archive file
  * 6 = UUEncoded text file
  * 7 = search engine query
  * 8 = telnet session pointer
  * 9 = binary file
  * g = Graphics file format, primarily a GIF file
  * h = HTML file
  * i = informational message
  * s = Audio file format, primarily a WAV file
  */

  var entryPattern = /^(.)(.*?)\t(.*?)\t(.*?)\t(.*?)\u000d\u000a$/;
  var entry = dirent.match(entryPattern);

  if (entry === null) {
    throw 'Could not parse the directory entry';
    // return false;
  }

  var type = entry[1];
  switch (type) {
  case 'i':
    type = 255; // GOPHER_INFO
    break;
  case '1':
    type = 1; // GOPHER_DIRECTORY
    break;
  case '0':
    type = 0; // GOPHER_DOCUMENT
    break;
  case '4':
    type = 4; // GOPHER_BINHEX
    break;
  case '5':
    type = 5; // GOPHER_DOSBINARY
    break;
  case '6':
    type = 6; // GOPHER_UUENCODED
    break;
  case '9':
    type = 9; // GOPHER_BINARY
    break;
  case 'h':
    type = 254; // GOPHER_HTTP
    break;
  default:
    return {
      type: -1,
      data: dirent
    }; // GOPHER_UNKNOWN
  }
  return {
    type: type,
    title: entry[2],
    path: entry[3],
    host: entry[4],
    port: entry[5]
  };
}
function inet_ntop (a) {
  // http://kevin.vanzonneveld.net
  // +   original by: Theriault
  // *     example 1: inet_ntop('\x7F\x00\x00\x01');
  // *     returns 1: '127.0.0.1'
  // *     example 2: inet_ntop('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\1');
  // *     returns 2: '::1'
  var i = 0,
    m = '',
    c = [];
  a += '';
  if (a.length === 4) { // IPv4
    return [
    a.charCodeAt(0), a.charCodeAt(1), a.charCodeAt(2), a.charCodeAt(3)].join('.');
  } else if (a.length === 16) { // IPv6
    for (i = 0; i < 16; i++) {
      c.push(((a.charCodeAt(i++) << 8) + a.charCodeAt(i)).toString(16));
    }
    return c.join(':').replace(/((^|:)0(?=:|$))+:?/g, function (t) {
      m = (t.length > m.length) ? t : m;
      return t;
    }).replace(m || ' ', '::');
  } else { // Invalid length
    return false;
  }
}
function inet_pton (a) {
  // http://kevin.vanzonneveld.net
  // +   original by: Theriault
  // *     example 1: inet_pton('::');
  // *     returns 1: '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0' (binary)
  // *     example 2: inet_pton('127.0.0.1');
  // *     returns 2: '\x7F\x00\x00\x01' (binary)
  var r, m, x, i, j, f = String.fromCharCode;
  m = a.match(/^(?:\d{1,3}(?:\.|$)){4}/); // IPv4
  if (m) {
    m = m[0].split('.');
    m = f(m[0]) + f(m[1]) + f(m[2]) + f(m[3]);
    // Return if 4 bytes, otherwise false.
    return m.length === 4 ? m : false;
  }
  r = /^((?:[\da-f]{1,4}(?::|)){0,8})(::)?((?:[\da-f]{1,4}(?::|)){0,8})$/;
  m = a.match(r); // IPv6
  if (m) {
    // Translate each hexadecimal value.
    for (j = 1; j < 4; j++) {
      // Indice 2 is :: and if no length, continue.
      if (j === 2 || m[j].length === 0) {
        continue;
      }
      m[j] = m[j].split(':');
      for (i = 0; i < m[j].length; i++) {
        m[j][i] = parseInt(m[j][i], 16);
        // Would be NaN if it was blank, return false.
        if (isNaN(m[j][i])) {
          return false; // Invalid IP.
        }
        m[j][i] = f(m[j][i] >> 8) + f(m[j][i] & 0xFF);
      }
      m[j] = m[j].join('');
    }
    x = m[1].length + m[3].length;
    if (x === 16) {
      return m[1] + m[3];
    } else if (x < 16 && m[2].length > 0) {
      return m[1] + (new Array(16 - x + 1)).join('\x00') + m[3];
    }
  }
  return false; // Invalid IP.
}
function ip2long (IP) {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // +   improved by: Victor
  // +    revised by: fearphage (http://http/my.opera.com/fearphage/)
  // +    revised by: Theriault
  // *     example 1: ip2long('192.0.34.166');
  // *     returns 1: 3221234342
  // *     example 2: ip2long('0.0xABCDEF');
  // *     returns 2: 11259375
  // *     example 3: ip2long('255.255.255.256');
  // *     returns 3: false
  var i = 0;
  // PHP allows decimal, octal, and hexadecimal IP components.
  // PHP allows between 1 (e.g. 127) to 4 (e.g 127.0.0.1) components.
  IP = IP.match(/^([1-9]\d*|0[0-7]*|0x[\da-f]+)(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?$/i); // Verify IP format.
  if (!IP) {
    return false; // Invalid format.
  }
  // Reuse IP variable for component counter.
  IP[0] = 0;
  for (i = 1; i < 5; i += 1) {
    IP[0] += !! ((IP[i] || '').length);
    IP[i] = parseInt(IP[i]) || 0;
  }
  // Continue to use IP for overflow values.
  // PHP does not allow any component to overflow.
  IP.push(256, 256, 256, 256);
  // Recalculate overflow of last component supplied to make up for missing components.
  IP[4 + IP[0]] *= Math.pow(256, 4 - IP[0]);
  if (IP[1] >= IP[5] || IP[2] >= IP[6] || IP[3] >= IP[7] || IP[4] >= IP[8]) {
    return false;
  }
  return IP[1] * (IP[0] === 1 || 16777216) + IP[2] * (IP[0] <= 2 || 65536) + IP[3] * (IP[0] <= 3 || 256) + IP[4] * 1;
}
function long2ip (ip) {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // *     example 1: long2ip( 3221234342 );
  // *     returns 1: '192.0.34.166'
  if (!isFinite(ip))
    return false;

  return [ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.');
}
function setcookie (name, value, expires, path, domain, secure) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   bugfixed by: Andreas
  // +   bugfixed by: Onno Marsman
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: setrawcookie
  // *     example 1: setcookie('author_name', 'Kevin van Zonneveld');
  // *     returns 1: true
  return this.setrawcookie(name, encodeURIComponent(value), expires, path, domain, secure);
}
function setrawcookie (name, value, expires, path, domain, secure) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   derived from: setcookie
  // +   input by: Michael
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: setcookie('author_name', 'Kevin van Zonneveld');
  // *     returns 1: true
  if (typeof expires === 'string' && (/^\d+$/).test(expires)) {
    expires = parseInt(expires, 10);
  }

  if (expires instanceof Date) {
    expires = expires.toGMTString();
  } else if (typeof(expires) === 'number') {
    expires = (new Date(expires * 1e3)).toGMTString();
  }

  var r = [name + '=' + value],
    s = {},
    i = '';
  s = {
    expires: expires,
    path: path,
    domain: domain
  };
  for (i in s) {
    if (s.hasOwnProperty(i)) { // Exclude items on Object.prototype
      s[i] && r.push(i + '=' + s[i]);
    }
  }

  return secure && r.push('secure'), this.window.document.cookie = r.join(";"), true;
}
function aggregate (obj, class_name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: We can't copy privileged functions or instance properties, as those require instantiation (with potential side-effects when called)
  // %          note 1: We've chosen not to assign to or create a prototype object on the destination object even if the original object had the methods on its prototype
  // *     example 1: var A = function () {};
  // *     example 1: A.prototype.method = function () {};
  // *     example 1: var b = {};
  // *     example 1: aggregate(b, 'A');
  // *     returns 1: undefined

  var p = '',
    record = {},
    pos = -1;
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (typeof class_name === 'string') { // PHP behavior
    class_name = this.window[class_name];
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.aggregateKeys = this.php_js.aggregateKeys || [];
  this.php_js.aggregateRecords = this.php_js.aggregateRecords || []; // Needed to allow deaggregate() and aggregate_info()
  this.php_js.aggregateClasses = this.php_js.aggregateClasses || [];
  // END REDUNDANT
  this.php_js.aggregateClasses.push(getFuncName(class_name));

  for (p in class_name) {
    if (!(p in obj) && p !== 'prototype' && p[0] !== '_') { // Static (non-private) class methods and properties
      obj[p] = class_name[p];
      record[p] = class_name[p];
    }
  }
  for (p in class_name.prototype) {
    if (!(p in obj) && p[0] !== '_') { // Prototype (non-private) instance methods and prototype default properties
      obj[p] = class_name.prototype[p];
      record[p] = class_name.prototype[p];
    }
  }
  if (!this.php_js.aggregateKeys.indexOf) {
    this.php_js.aggregateKeys.indexOf = indexOf;
  }
  pos = this.php_js.aggregateKeys.indexOf(obj);
  if (pos !== -1) {
    this.php_js.aggregateRecords[pos].push(record);
    this.php_js.aggregateClasses[pos].push(getFuncName(class_name));
  } else {
    this.php_js.aggregateKeys.push(obj);
    this.php_js.aggregateRecords.push([record]);
    this.php_js.aggregateClasses[0] = [];
    this.php_js.aggregateClasses[0].push(getFuncName(class_name));
  }
}
function aggregate_info (obj) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: aggregate_info
  // *     example 1: var A = function () {};
  // *     example 1: A.prop = 5;
  // *     example 1: A.prototype.someMethod = function () {};
  // *     example 1: var b = {};
  // *     example 1: aggregate(b, 'A');
  // *     example 1: aggregate_info(b);
  // *     returns 1: {'A':{methods:['someMethod'], properties:['prop']}}

  var idx = -1,
    p = '',
    infoObj = {},
    retObj = {},
    i = 0,
    name = '';
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!this.php_js || !this.php_js.aggregateRecords || !this.php_js.aggregateKeys || !this.php_js.aggregateClasses) {
    return false; // Is this what is returned?
  }

  if (!this.php_js.aggregateKeys.indexOf) {
    this.php_js.aggregateKeys.indexOf = indexOf;
  }
  idx = this.php_js.aggregateKeys.indexOf(obj);
  if (idx === -1) {
    return false;
  }

  for (i = 0; i < this.php_js.aggregateClasses[idx].length; i++) {
    name = this.php_js.aggregateClasses[idx][i];
    infoObj = {
      methods: [],
      properties: []
    };
    for (p in this.php_js.aggregateRecords[idx][i]) {
      if (typeof this.php_js.aggregateRecords[idx][i][p] === 'function') {
        infoObj.methods.push(p);
      } else {
        infoObj.properties.push(p);
      }
    }
    retObj[name] = infoObj;
  }

  return retObj;
}
function aggregate_methods (obj, class_name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: We can't copy privileged functions, as those require instantiation (with potential side-effects when called)
  // %          note 1: We've chosen not to assign to or create a prototype object on the destination object even if the original object had the methods on its prototype
  // *     example 1: var A = function () {};
  // *     example 1: A.prototype.method = function () {};
  // *     example 1: var b = {};
  // *     example 1: aggregate_methods(b, 'A');
  // *     returns 1: undefined

  var p = '',
    record = {},
    pos = -1;
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (typeof class_name === 'string') { // PHP behavior
    class_name = this.window[class_name];
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.aggregateKeys = this.php_js.aggregateKeys || [];
  this.php_js.aggregateRecords = this.php_js.aggregateRecords || []; // Needed to allow deaggregate() and aggregate_info()
  this.php_js.aggregateClasses = this.php_js.aggregateClasses || [];
  // END REDUNDANT
  this.php_js.aggregateClasses.push(getFuncName(class_name));

  for (p in class_name) {
    if (!(p in obj) && typeof class_name[p] === 'function' && p[0] !== '_') { // Static (non-private) class methods
      obj[p] = class_name[p];
      record[p] = class_name[p];
    }
  }
  for (p in class_name.prototype) {
    if (!(p in obj) && typeof class_name.prototype[p] === 'function' && p[0] !== '_') { // Prototype (non-private) instance methods
      obj[p] = class_name.prototype[p];
      record[p] = class_name.prototype[p];
    }
  }
  if (!this.php_js.aggregateKeys.indexOf) {
    this.php_js.aggregateKeys.indexOf = indexOf;
  }
  pos = this.php_js.aggregateKeys.indexOf(obj);
  if (pos !== -1) {
    this.php_js.aggregateRecords[pos].push(record);
    this.php_js.aggregateClasses[pos].push(getFuncName(class_name));
  } else {
    this.php_js.aggregateKeys.push(obj);
    this.php_js.aggregateRecords.push([record]);
    this.php_js.aggregateClasses[0] = [];
    this.php_js.aggregateClasses[0].push(getFuncName(class_name));
  }
}
function aggregate_methods_by_list (obj, class_name, properties_list, exclude) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: We can't copy privileged methods, as those require instantiation (with potential side-effects when called)
  // %          note 1: We've chosen not to assign to or create a prototype object on the destination object even if the original object had the methods on its prototype
  // *     example 1: var A = function () {};
  // *     example 1: A.prototype.method = function () {};
  // *     example 1: var b = {};
  // *     example 1: aggregate_methods_by_list(b, 'A', ['method'], false);
  // *     returns 1: undefined

  var p = '',
    i = 0,
    record = {},
    pos = -1;
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (typeof class_name === 'string') { // PHP behavior
    class_name = this.window[class_name];
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.aggregateKeys = this.php_js.aggregateKeys || [];
  this.php_js.aggregateRecords = this.php_js.aggregateRecords || []; // Needed to allow deaggregate() and aggregate_info()
  this.php_js.aggregateClasses = this.php_js.aggregateClasses || [];
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  // END REDUNDANT
  this.php_js.aggregateClasses.push(getFuncName(class_name));

  if (!properties_list.indexOf) {
    properties_list.indexOf = indexOf;
  }

  if (exclude) {
    for (p in class_name) {
      if (!(p in obj) && typeof class_name[p] === 'function' && p[0] !== '_' && properties_list.indexOf(p) === -1) { // Static (non-private) class methods
        obj[p] = class_name[p];
        record[p] = class_name[p];
      }
    }
    for (p in class_name.prototype) {
      if (!(p in obj) && typeof class_name.prototype[p] === 'function' && p[0] !== '_' && properties_list.indexOf(p) === -1) { // Prototype (non-private) instance methods
        obj[p] = class_name.prototype[p];
        record[p] = class_name.prototype[p];
      }
    }
  } else {
    for (i = 0; i < properties_list.length; i++) {
      p = properties_list[i];
      if (!(p in obj) && p in class_name && p[0] !== '_' && typeof class_name.prototype[p] === 'function') { // Static (non-private) class methods
        obj[p] = class_name[p];
        record[p] = class_name[p];
      } else if (!(p in obj) && p in class_name.prototype && p[0] !== '_' && typeof class_name.prototype[p] === 'function') { // Prototype (non-private) instance methods
        obj[p] = class_name.prototype[p];
        record[p] = class_name.prototype[p];
      }
    }
  }
  if (!this.php_js.aggregateKeys.indexOf) {
    this.php_js.aggregateKeys.indexOf = indexOf;
  }
  pos = this.php_js.aggregateKeys.indexOf(obj);
  if (pos !== -1) {
    this.php_js.aggregateRecords[pos].push(record);
    this.php_js.aggregateClasses[pos].push(getFuncName(class_name));
  } else {
    this.php_js.aggregateKeys.push(obj);
    this.php_js.aggregateRecords.push([record]);
    this.php_js.aggregateClasses[0] = [];
    this.php_js.aggregateClasses[0].push(getFuncName(class_name));
  }
}
function aggregate_methods_by_regexp (obj, class_name, regexp, exclude) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: We can't copy privileged methods, as those require instantiation (with potential side-effects when called)
  // %          note 1: We've chosen not to assign to or create a prototype object on the destination object even if the original object had the methods on its prototype
  // *     example 1: var A = function () {};
  // *     example 1: A.prototype.method = function () {};
  // *     example 1: var b = {};
  // *     example 1: aggregate_methods_by_regexp(b, 'A', /^meth/, false);
  // *     returns 1: undefined

  var p = '',
    test = false,
    record = {},
    pos = -1,
    indexOf = function (value) {
      for (var i = 0, length = this.length; i < length; i++) {
        if (this[i] === value) {
          return i;
        }
      }
      return -1;
    };

  if (typeof regexp === 'string') { // If passing the regular expression as a string, note that this behavior may change in the future as we seek to implement PHP-style regexp (e.g., delimiteres and modifier flags within the string)
    regexp = eval(regexp);
  }

  if (typeof class_name === 'string') { // PHP behavior
    class_name = this.window[class_name];
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.aggregateKeys = this.php_js.aggregateKeys || [];
  this.php_js.aggregateRecords = this.php_js.aggregateRecords || []; // Needed to allow deaggregate() and aggregate_info()
  this.php_js.aggregateClasses = this.php_js.aggregateClasses || [];
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  // END REDUNDANT
  this.php_js.aggregateClasses.push(getFuncName(class_name));

  for (p in class_name) {
    test = exclude ? p.search(regexp) === -1 : p.search(regexp) !== -1;
    if (!(p in obj) && typeof class_name[p] === 'function' && p[0] !== '_' && test) { // Static (non-private) class methods
      obj[p] = class_name[p];
      record[p] = class_name[p];
    }
  }
  for (p in class_name.prototype) {
    test = exclude ? p.search(regexp) === -1 : p.search(regexp) !== -1;
    if (!(p in obj) && typeof class_name.prototype[p] === 'function' && p[0] !== '_' && test) { // Prototype (non-private) instance methods
      obj[p] = class_name.prototype[p];
      record[p] = class_name.prototype[p];
    }
  }
  if (!this.php_js.aggregateKeys.indexOf) {
    this.php_js.aggregateKeys.indexOf = indexOf;
  }
  pos = this.php_js.aggregateKeys.indexOf(obj);
  if (pos !== -1) {
    this.php_js.aggregateRecords[pos].push(record);
    this.php_js.aggregateClasses[pos].push(getFuncName(class_name));
  } else {
    this.php_js.aggregateKeys.push(obj);
    this.php_js.aggregateRecords.push([record]);
    this.php_js.aggregateClasses[0] = [];
    this.php_js.aggregateClasses[0].push(getFuncName(class_name));
  }
}
function aggregate_properties (obj, class_name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: We can't copy instance properties, as those require instantiation (with potential side-effects when called)
  // %          note 1: We've chosen not to assign to or create a prototype object on the destination object even if the original object had the properties on its prototype
  // *     example 1: var A = function () {};
  // *     example 1: A.prototype.prop = 10;
  // *     example 1: var b = {};
  // *     example 1: aggregate_properties(b, 'A');
  // *     returns 1: undefined

  var p = '',
    record = {},
    pos = -1,
    indexOf = function (value) {
      for (var i = 0, length = this.length; i < length; i++) {
        if (this[i] === value) {
          return i;
        }
      }
      return -1;
    };

  if (typeof class_name === 'string') { // PHP behavior
    class_name = this.window[class_name];
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.aggregateKeys = this.php_js.aggregateKeys || [];
  this.php_js.aggregateRecords = this.php_js.aggregateRecords || []; // Needed to allow deaggregate() and aggregate_info()
  this.php_js.aggregateClasses = this.php_js.aggregateClasses || [];
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  // END REDUNDANT
  this.php_js.aggregateClasses.push(getFuncName(class_name));

  for (p in class_name) {
    if (!(p in obj) && typeof class_name[p] !== 'function' && p[0] !== '_') { // Static (non-private) class properties
      obj[p] = class_name[p];
      record[p] = class_name[p];
    }
  }
  for (p in class_name.prototype) {
    if (!(p in obj) && typeof class_name.prototype[p] !== 'function' && p[0] !== '_') { // Prototype (non-private) default properties
      obj[p] = class_name.prototype[p];
      record[p] = class_name.prototype[p];
    }
  }
  if (!this.php_js.aggregateKeys.indexOf) {
    this.php_js.aggregateKeys.indexOf = indexOf;
  }
  pos = this.php_js.aggregateKeys.indexOf(obj);
  if (pos !== -1) {
    this.php_js.aggregateRecords[pos].push(record);
    this.php_js.aggregateClasses[pos].push(getFuncName(class_name));
  } else {
    this.php_js.aggregateKeys.push(obj);
    this.php_js.aggregateRecords.push([record]);
    this.php_js.aggregateClasses[0] = [];
    this.php_js.aggregateClasses[0].push(getFuncName(class_name));
  }
}
function aggregate_properties_by_list (obj, class_name, properties_list, exclude) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: We can't copy instance properties, as those require instantiation (with potential side-effects when called)
  // %          note 1: We've chosen not to assign to or create a prototype object on the destination object even if the original object had the properties on its prototype
  // *     example 1: var A = function () {};
  // *     example 1: A.prototype.prop = 10;
  // *     example 1: var b = {};
  // *     example 1: aggregate_properties_by_list(b, 'A', ['prop'], false);
  // *     returns 1: undefined

  var p = '',
    i = 0,
    record = {},
    pos = -1,
    indexOf = function (value) {
      for (var i = 0, length = this.length; i < length; i++) {
        if (this[i] === value) {
          return i;
        }
      }
      return -1;
    };

  if (!properties_list.indexOf) {
    properties_list.indexOf = indexOf;
  }

  if (typeof class_name === 'string') { // PHP behavior
    class_name = this.window[class_name];
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.aggregateKeys = this.php_js.aggregateKeys || [];
  this.php_js.aggregateRecords = this.php_js.aggregateRecords || []; // Needed to allow deaggregate() and aggregate_info()
  this.php_js.aggregateClasses = this.php_js.aggregateClasses || [];
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  // END REDUNDANT
  this.php_js.aggregateClasses.push(getFuncName(class_name));

  if (exclude) {
    for (p in class_name) {
      if (!(p in obj) && typeof class_name[p] !== 'function' && p[0] !== '_' && properties_list.indexOf(p) === -1) { // Static (non-private) class properties
        obj[p] = class_name[p];
        record[p] = class_name[p];
      }
    }
    for (p in class_name.prototype) {
      if (!(p in obj) && typeof class_name.prototype[p] !== 'function' && p[0] !== '_' && properties_list.indexOf(p) === -1) { // Prototype (non-private) default properties
        obj[p] = class_name.prototype[p];
        record[p] = class_name.prototype[p];
      }
    }
  } else {
    for (i = 0; i < properties_list.length; i++) {
      p = properties_list[i];
      if (!(p in obj) && p in class_name && p[0] !== '_' && typeof class_name.prototype[p] !== 'function') { // Static (non-private) class properties
        obj[p] = class_name[p];
        record[p] = class_name[p];
      } else if (!(p in obj) && p in class_name.prototype && p[0] !== '_' && typeof class_name.prototype[p] !== 'function') { // Prototype (non-private) default properties
        obj[p] = class_name.prototype[p];
        record[p] = class_name.prototype[p];
      }
    }
  }
  if (!this.php_js.aggregateKeys.indexOf) {
    this.php_js.aggregateKeys.indexOf = indexOf;
  }
  pos = this.php_js.aggregateKeys.indexOf(obj);
  if (pos !== -1) {
    this.php_js.aggregateRecords[pos].push(record);
    this.php_js.aggregateClasses[pos].push(getFuncName(class_name));
  } else {
    this.php_js.aggregateKeys.push(obj);
    this.php_js.aggregateRecords.push([record]);
    this.php_js.aggregateClasses[0] = [];
    this.php_js.aggregateClasses[0].push(getFuncName(class_name));
  }
}
function aggregate_properties_by_regexp (obj, class_name, regexp, exclude) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: We can't copy instance properties, as those require instantiation (with potential side-effects when called)
  // %          note 1: We've chosen not to assign to or create a prototype object on the destination object even if the original object had the properties on its prototype
  // *     example 1: var A = function () {};
  // *     example 1: A.prototype.prop = 10;
  // *     example 1: var b = {};
  // *     example 1: aggregate_properties_by_regexp(b, 'A', /^pr/, false);
  // *     returns 1: undefined

  var p = '',
    test = false,
    record = {},
    pos = -1,
    indexOf = function (value) {
      for (var i = 0, length = this.length; i < length; i++) {
        if (this[i] === value) {
          return i;
        }
      }
      return -1;
    };

  if (typeof regexp === 'string') { // If passing the regular expression as a string, note that this behavior may change in the future as we seek to implement PHP-style regexp (e.g., delimiteres and modifier flags within the string)
    regexp = eval(regexp);
  }

  if (typeof class_name === 'string') { // PHP behavior
    class_name = this.window[class_name];
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.aggregateKeys = this.php_js.aggregateKeys || [];
  this.php_js.aggregateRecords = this.php_js.aggregateRecords || []; // Needed to allow deaggregate() and aggregate_info()
  this.php_js.aggregateClasses = this.php_js.aggregateClasses || [];
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  // END REDUNDANT

  for (p in class_name) {
    test = exclude ? p.search(regexp) === -1 : p.search(regexp) !== -1;
    if (!(p in obj) && typeof class_name[p] !== 'function' && p[0] !== '_' && test) { // Static (non-private) class properties
      obj[p] = class_name[p];
      record[p] = class_name[p];
    }
  }
  for (p in class_name.prototype) {
    test = exclude ? p.search(regexp) === -1 : p.search(regexp) !== -1;
    if (!(p in obj) && typeof class_name.prototype[p] !== 'function' && p[0] !== '_' && test) { // Prototype (non-private) default properties
      obj[p] = class_name.prototype[p];
      record[p] = class_name.prototype[p];
    }
  }
  if (!this.php_js.aggregateKeys.indexOf) {
    this.php_js.aggregateKeys.indexOf = indexOf;
  }
  pos = this.php_js.aggregateKeys.indexOf(obj);
  if (pos !== -1) {
    this.php_js.aggregateRecords[pos].push(record);
    this.php_js.aggregateClasses[pos].push(getFuncName(class_name));
  } else {
    this.php_js.aggregateKeys.push(obj);
    this.php_js.aggregateRecords.push([record]);
    this.php_js.aggregateClasses[0] = [];
    this.php_js.aggregateClasses[0].push(getFuncName(class_name));
  }
}
function aggregation_info (obj) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: aggregate_info
  // *     example 1: var A = function () {};
  // *     example 1: A.prop = 5;
  // *     example 1: A.prototype.someMethod = function () {};
  // *     example 1: var b = {};
  // *     example 1: aggregate(b, 'A');
  // *     example 1: aggregation_info(b);
  // *     returns 1: {'A':{methods:['someMethod'], properties:['prop']}}

  return this.aggregate_info(obj);
}
function deaggregate (obj, class_name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var A = function () {};
  // *     example 1: A.prop = 5;
  // *     example 1: A.prototype.someMethod = function () {};
  // *     example 1: var b = {};
  // *     example 1: aggregate(b, 'A');
  // *     example 1: deaggregate(b, 'A');
  // *     returns 1: undefined

  var p = '',
    idx = -1,
    pos = -1,
    i = 0,
    indexOf = function (value) {
      for (var i = 0, length = this.length; i < length; i++) {
        if (this[i] === value) {
          return i;
        }
      }
      return -1;
    },
    getFuncName = function (fn) {
      var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
      if (!name) {
        return '(Anonymous)';
      }
      return name[1];
    };

  if (!this.php_js || !this.php_js.aggregateRecords || !this.php_js.aggregateKeys || !this.php_js.aggregateClasses) {
    return;
  }

  if (!this.php_js.aggregateKeys.indexOf) {
    this.php_js.aggregateKeys.indexOf = indexOf;
  }
  idx = this.php_js.aggregateKeys.indexOf(obj);
  if (idx === -1) {
    return;
  }

  if (class_name) {
    if (typeof class_name === 'string') { // PHP behavior
      class_name = this.window[class_name];
    }
    if (!this.php_js.aggregateClasses[idx].indexOf) {
      this.php_js.aggregateClasses[idx].indexOf = indexOf;
    }
    pos = this.php_js.aggregateClasses[idx].indexOf(getFuncName(class_name));
    if (pos !== -1) {
      for (p in this.php_js.aggregateRecords[idx][pos]) {
        delete obj[p];
      }
      this.php_js.aggregateClasses[idx].splice(pos, 1);
      this.php_js.aggregateRecords[idx].splice(pos, 1);
    }
  } else {
    for (i = 0; i < this.php_js.aggregateClasses[idx].length; i++) {
      for (p in this.php_js.aggregateRecords[idx][i]) {
        delete obj[p];
      }
    }
    this.php_js.aggregateClasses.splice(idx, 1);
    this.php_js.aggregateRecords.splice(idx, 1);
  }
}
function ob_clean () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_clean();
  // *     returns 1: undefined

  var PHP_OUTPUT_HANDLER_START = 1,
    PHP_OUTPUT_HANDLER_CONT = 2;
  this.php_js = this.php_js || {};
  var phpjs = this.php_js,
    obs = phpjs.obs;

  if (!obs || !obs.length) {
    return;
  }
  var flags = 0,
    ob = obs[obs.length - 1],
    buffer = ob.buffer;
  if (ob.callback) {
    if (!ob.status) {
      flags |= PHP_OUTPUT_HANDLER_START;
    }
    flags |= PHP_OUTPUT_HANDLER_CONT;
    ob.status = 1;
    buffer = ob.callback(buffer, flags);
  }
  ob.buffer = '';
}
function ob_end_clean () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_end_clean();
  // *     returns 1: true

  var PHP_OUTPUT_HANDLER_START = 1,
    PHP_OUTPUT_HANDLER_END = 4;
  this.php_js = this.php_js || {};
  var phpjs = this.php_js,
    obs = phpjs.obs;

  if (!obs || !obs.length) {
    return false;
  }
  var flags = 0,
    ob = obs[obs.length - 1],
    buffer = ob.buffer;
  if (ob.callback) {
    if (!ob.status) {
      flags |= PHP_OUTPUT_HANDLER_START;
    }
    flags |= PHP_OUTPUT_HANDLER_END;
    ob.status = 2;
    buffer = ob.callback(buffer, flags);
  }
  obs.pop();
  return true;
}
function ob_end_flush () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_end_flush();
  // *     returns 1: true

  var PHP_OUTPUT_HANDLER_START = 1,
    PHP_OUTPUT_HANDLER_END = 4;

  this.php_js = this.php_js || {};
  var obs = this.php_js.obs;

  if (!obs || !obs.length) {
    return false;
  }
  var flags = 0,
    ob = obs[obs.length - 1],
    buffer = ob.buffer;
  if (ob.callback) {
    if (!ob.status) {
      flags |= PHP_OUTPUT_HANDLER_START;
    }
    flags |= PHP_OUTPUT_HANDLER_END;
    ob.status = 2;
    buffer = ob.callback(buffer, flags);
  }
  obs.pop();
  if (obs.length) {
    ob = obs[obs.length - 1];
    ob.buffer += buffer;
  } else {
    this.echo(buffer);
  }

  return true;
}
function ob_flush () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_flush();
  // *     returns 1: undefined

  var PHP_OUTPUT_HANDLER_START = 1,
    PHP_OUTPUT_HANDLER_CONT = 2;
  this.php_js = this.php_js || {};
  var phpjs = this.php_js,
    obs = phpjs.obs;

  if (!obs || !obs.length) {
    return;
  }
  var flags = 0,
    ob = obs[obs.length - 1],
    buffer = ob.buffer;
  if (ob.callback) {
    if (!ob.status) {
      flags |= PHP_OUTPUT_HANDLER_START;
    }
    flags |= PHP_OUTPUT_HANDLER_CONT;
    ob.status = 1;
    buffer = ob.callback(buffer, flags);
  }
  if (obs.length > 1) {
    obs[obs.length - 2].buffer += buffer;
  } else {
    var flushing = this.php_js.flushing;
    this.php_js.flushing = true;
    this.echo(buffer);
    this.php_js.flushing = flushing;
  }
  ob.buffer = '';
}
function ob_get_clean () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_get_clean();
  // *     returns 1: 'some buffer contents'

  var PHP_OUTPUT_HANDLER_START = 1,
    PHP_OUTPUT_HANDLER_END = 4;

  this.php_js = this.php_js || {};
  var phpjs = this.php_js,
    obs = phpjs.obs;
  if (!obs || !obs.length) {
    return false;
  }
  var flags = 0,
    ob = obs[obs.length - 1],
    buffer = ob.buffer;
  if (ob.callback) {
    if (!ob.status) {
      flags |= PHP_OUTPUT_HANDLER_START;
    }
    flags |= PHP_OUTPUT_HANDLER_END;
    ob.status = 2;
    buffer = ob.callback(buffer, flags);
  }
  obs.pop();
  return buffer;
}
function ob_get_contents () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_get_contents();
  // *     returns 1: 'some buffer contents'

  this.php_js = this.php_js || {};
  var phpjs = this.php_js,
    ini = phpjs.ini,
    obs = phpjs.obs;
  if (!obs || !obs.length) {
    return (ini && ini.output_buffering && (typeof ini.output_buffering.local_value !== 'string' || ini.output_buffering.local_value.toLowerCase() !== 'off')) ? '' : false; // If output was already buffered, it would be available in obs
  }
  return obs[obs.length - 1].buffer; // Retrieve most recently added buffer contents
}
function ob_get_flush () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_get_flush();
  // *     returns 1: 'some buffer contents'

  var PHP_OUTPUT_HANDLER_START = 1,
    PHP_OUTPUT_HANDLER_END = 4;
  this.php_js = this.php_js || {};
  var phpjs = this.php_js,
    obs = phpjs.obs;
  if (!obs || !obs.length) {
    return false;
  }
  var flags = 0,
    ob = obs[obs.length - 1],
    buffer = ob.buffer;
  if (ob.callback) {
    if (!ob.status) {
      flags |= PHP_OUTPUT_HANDLER_START;
    }
    flags |= PHP_OUTPUT_HANDLER_END;
    ob.status = 2;
    buffer = ob.callback(buffer, flags);
  }
  obs.pop();
  if (obs.length) {
    ob = obs[obs.length - 1];
    ob.buffer += buffer;
  } else {
    this.echo(buffer);
  }
  return buffer;
}
function ob_get_length () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_get_length();
  // *     returns 1: 155

  this.php_js = this.php_js || {};
  var phpjs = this.php_js,
    ini = phpjs.ini,
    obs = phpjs.obs;

  if (!obs || !obs.length) {
    return (ini && ini['output_buffering'] && (typeof ini['output_buffering'].local_value !== 'string' || ini['output_buffering'].local_value.toLowerCase() !== 'off')) ? 0 : false; // If output was already buffered, it would be available in obs
  }
  // Fix: WIll probably need to change depending on Unicode semantics
  return obs[obs.length - 1].buffer.length; // Retrieve length of most recently added buffer contents
}
function ob_get_level () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_get_level();
  // *     returns 1: 1

  this.php_js = this.php_js || {};
  var phpjs = this.php_js,
    ini = phpjs.ini,
    obs = phpjs.obs;

  if (!obs || !obs.length) {
    return (ini && ini['output_buffering'] && (typeof ini['output_buffering'].local_value !== 'string' || ini['output_buffering'].local_value.toLowerCase() !== 'off')) ? 1 : 0;
  }
  return obs.length;
}
function ob_get_status (full_status) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_get_status(true);
  // *     returns 1: [{chunk_size:4096, name:myCallback, del:true, type:1,status:0}]

  var i = 0,
    retObj = {},
    ob = {},
    retArr = [],
    name = '';
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  this.php_js = this.php_js || {};
  var phpjs = this.php_js,
    ini = phpjs.ini,
    obs = phpjs.obs;

  if (!obs || !obs.length) {
    if (ini && ini.output_buffering && (typeof ini.output_buffering.local_value !== 'string' || ini.output_buffering.local_value.toLowerCase() !== 'off')) { // handler itself is stored in 'output_handler' ini
      retObj = {
        type: 1,
        status: 0,
        name: 'default output handler',
        del: true
      };
      if (full_status) {
        retObj.chunk_size = 4096;
        return [retObj];
      } else {
        retObj.level = 1;
        return retObj;
      }
    }
    return retArr;
  }
  if (full_status) {
    for (i = 0; i < obs.length; i++) {
      ob = obs[i];
      name = ob.callback && getFuncName(ob.callback) ? (getFuncName(ob.callback) === 'URLRewriter' ? 'URL-Rewriter' : getFuncName(ob.callback)) : undefined;
      retObj = {
        chunk_size: ob.chunk_size,
        name: name,
        del: ob.erase,
        type: ob.type,
        status: ob.status
      };
      if (ob.size) {
        retObj.size = ob.size;
      }
      if (ob.block_size) {
        retObj.block_size = ob.block_size;
      }
      retArr.push(retObj);
    }
    return retArr;
  }
  ob = obs[phpjs.obs.length - 1];
  name = getFuncName(ob.callback);
  return {
    level: phpjs.obs.length,
    name: name,
    del: ob.erase,
    type: ob.type,
    status: ob.status
  };
}
function ob_list_handlers () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ob_list_handlers();
  // *     returns 1: ['default output handler', 'myOwnHandler']

  var i = 0,
    arr = [],
    name = '',
    cbname = '';
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  this.php_js = this.php_js || {};
  var phpjs = this.php_js,
    ini = phpjs.ini;

  if (!phpjs.obs || !phpjs.obs.length) {
    if (ini && ini['output_buffering'] && (typeof ini['output_buffering'].local_value !== 'string' || ini['output_buffering'].local_value.toLowerCase() !== 'off')) {
      return ['default output handler']; // PHP doesn't return output_handler ini, even if it is set
    }
    return arr;
  }
  for (i = 0; i < phpjs.obs.length; i++) {
    cbname = getFuncName(phpjs.obs[i].callback);
    name = cbname === '' ? 'default output handler' : cbname === 'URLRewriter' ? 'URL-Rewriter' : cbname;
    arr.push(name);
  }
  return arr;
}
function ob_start (output_callback, chunk_size, erase) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: chunk_size and erase arguments are not presently supported
  // *     example 1: ob_start('someCallback', 4096, true);
  // *     returns 1: true

  var bufferObj = {},
    internalType = false,
    extra = false;
  erase = !(erase === false); // true is default
  chunk_size = chunk_size === 1 ? 4096 : (chunk_size || 0);

  this.php_js = this.php_js || {};
  this.php_js.obs = this.php_js.obs || []; // Array for nestable buffers
  var phpjs = this.php_js,
    ini = phpjs.ini,
    obs = phpjs.obs;

  if (!obs && (ini && ini.output_buffering && (typeof ini.output_buffering.local_value !== 'string' || ini.output_buffering.local_value.toLowerCase() !== 'off'))) {
    extra = true; // We'll run another ob_start() below (recursion prevented)
  }

  if (typeof output_callback === 'string') {
    if (output_callback === 'URL-Rewriter') { // Any others?
      internalType = true;
      output_callback = function URLRewriter() {}; // No callbacks?
    }
    if (typeof this.window[output_callback] === 'function') {
      output_callback = this.window[output_callback]; // callback expressed as a string (PHP-style)
    } else {
      return false;
    }
  }
  bufferObj = {
    erase: erase,
    chunk_size: chunk_size,
    callback: output_callback,
    type: 1,
    status: 0,
    buffer: ''
  };

  // Fix: When else do type and status vary (see also below for non-full-status)
  // type: PHP_OUTPUT_HANDLER_INTERNAL (0) or PHP_OUTPUT_HANDLER_USER (1)
  // status: PHP_OUTPUT_HANDLER_START (0), PHP_OUTPUT_HANDLER_CONT (1) or PHP_OUTPUT_HANDLER_END (2)
  // Fix: Need to add the following (for ob_get_status)?:   size: 40960, block_size:10240; how to set size/block_size?
  if (internalType) {
    bufferObj.type = 0;
  }

  obs.push(bufferObj);

  if (extra) {
    return this.ob_start(); // We have to start buffering ourselves if the preference is set (and no buffering on yet)
  }

  return true;
}
function preg_grep (pattern, input, flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: If pass pattern as string, must escape backslashes, even for single quotes
  // %          note 2: The regular expression itself must be expressed JavaScript style
  // %          note 3: It is not recommended to submit the pattern as a string, as we may implement
  // %          note 3:   parsing of PHP-style expressions (flags, etc.) in the future
  // *     example 1: var arr = [1, 4, 4.5, 3, 'a', 4.4];
  // *     example 1: preg_grep("/^(\\d+)?\\.\\d+$/", arr);
  // *     returns 1: {2: 4.5, 5: 4.4}

  var p = '',
    retObj = {};
  var invert = (flags === 1 || flags === 'PREG_GREP_INVERT'); // Todo: put flags as number and do bitwise checks (at least if other flags allowable); see pathinfo()

  if (typeof pattern === 'string') {
    pattern = eval(pattern);
  }

  if (invert) {
    for (p in input) {
      if (input[p].search(pattern) === -1) {
        retObj[p] = input[p];
      }
    }
  } else {
    for (p in input) {
      if (input[p].search(pattern) !== -1) {
        retObj[p] = input[p];
      }
    }
  }

  return retObj;
}
function preg_quote (str, delimiter) {
  // http://kevin.vanzonneveld.net
  // +   original by: booeyOH
  // +   improved by: Ates Goral (http://magnetiq.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: preg_quote("$40");
  // *     returns 1: '\$40'
  // *     example 2: preg_quote("*RRRING* Hello?");
  // *     returns 2: '\*RRRING\* Hello\?'
  // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
  // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
  return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}
function sql_regcase (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: sql_regcase('Foo - bar.');
  // *     returns 1: '[Ff][Oo][Oo] - [Bb][Aa][Rr].'
  this.setlocale('LC_ALL', 0);
  var i = 0,
    upper = '',
    lower = '',
    pos = 0,
    retStr = '';

  upper = this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.upper;
  lower = this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.lower;

  for (i = 0; i < str.length; i++) {
    if (((pos = upper.indexOf(str.charAt(i))) !== -1) || ((pos = lower.indexOf(str.charAt(i))) !== -1)) {
      retStr += '[' + upper.charAt(pos) + lower.charAt(pos) + ']';
    } else {
      retStr += str.charAt(i);
    }
  }
  return retStr;
}
function runkit_class_adopt (classname, parentname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Function can only obtain and set classes from the global context
  // *     example 1: function A () {}
  // *     example 1: A.prototype.methodA = function () {};
  // *     example 1: function B () {}
  // *     example 1: runkit_class_adopt('B', 'A');
  // *     returns 1: true

  if (typeof this.window[classname] !== 'function' || typeof this.window[parentname] !== 'function') {
    return false;
  }

  // Classical style of inheritance
  this.window[classname].prototype = new this.window[parentname](); // Has side effects by calling the constructor!

/*
  // Prototypal completely by reference
  this.window[classname].prototype = parentname.prototype; // By mutual reference!
*/

/*
  // Mixin (deep copy, not by reference)
  var _copy = function (child, parent) {
    var p = '';
    for (p in parent) {
      if (typeof parent[p] === 'object') {
        child[p] = _copy(child[p], parent[p]);
      }
      else {
        child[p] = parent[p];
      }
    }
  };
  _copy(this.window[classname].prototype, this.window[parentname].prototype);
*/

  // Put original constructor property back
  this.window[classname].constructor = this.window[classname];
  return true;
}
function runkit_class_emancipate (classname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Function can only obtain classes from the global context
  // %          note 2: We have to delete all items on the prototype
  // *     example 1: function A () {}
  // *     example 1: A.prototype.methodA = function () {};
  // *     example 1: function B () {}
  // *     example 1: runkit_class_adopt('B', 'A');
  // *     example 1: runkit_class_emancipate('B');
  // *     returns 1: true

  if (typeof this.window[classname] !== 'function') {
    return false;
  }

  for (var p in this.window[classname].prototype) {
    delete this.window[classname].prototype[p];
  }
  return true;
}
function runkit_function_add (funcname, arglist, code) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Function can only be added to the global context; use create_function() for an anonymous function
  // *     example 1: runkit_function_add('add', 'a, b', "return (a + b);");
  // *     returns 1: true
  if (this.window[funcname] !== undefined) { // Presumably disallows adding where exists, since there is also redefine function
    return false;
  }

  try {
    this.window[funcname] = Function.apply(null, arglist.split(',').concat(code));
  } catch (e) {
    return false;
  }
  return true;
}
function runkit_function_copy (funcname, targetname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Function can only be copied to and from the global context
  // *     example 1: function plus (a, b) { return (a + b); }
  // *     example 1: runkit_function_copy('plus', 'add');
  // *     returns 1: true
  if (typeof this.window[funcname] !== 'function' || this.window[targetname] !== undefined) { //  (presumably disallow overwriting existing variables)
    return false;
  }
  this.window[targetname] = this.window[funcname];
  return true;
}
function runkit_function_redefine (funcname, arglist, code) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Function can only be added to the global context; use create_function() for an anonymous function
  // *     example 1: function add (a, b, c) {return a+b+c;}
  // *     example 1: runkit_function_redefine('add', 'a, b', "return (a + b);");
  // *     returns 1: true
  if (this.window[funcname] === undefined) { // Requires existing function?
    return false;
  }

  try {
    this.window[funcname] = Function.apply(null, arglist.split(',').concat(code));
  } catch (e) {
    return false;
  }
  return true;
}
function runkit_function_remove (funcname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Function can only remove from the global context
  // *     example 1: function add (a, b, c) {return a+b+c;}
  // *     example 1: runkit_function_remove('add');
  // *     returns 1: true
  if (this.window[funcname] === undefined) { // Requires existing function?
    return false;
  }

  try {
    this.window[funcname] = undefined;
  } catch (e) {
    return false;
  }
  return true;
}
function runkit_function_rename (funcname, newname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Function can only be copied to and from the global context
  // *     example 1: function plus (a, b) { return (a + b); }
  // *     example 1: runkit_function_rename('plus', 'add');
  // *     returns 1: true
  if (typeof this.window[newname] !== 'function' || this.window[funcname] !== undefined) { //  (presumably disallow overwriting existing variables)
    return false;
  }
  this.window[newname] = this.window[funcname];
  this.window[funcname] = undefined;
  return true;
}
function runkit_import (file, flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: file_get_contents
  // %        note 1: does not return an associative array as in PHP and will evaluate all variables, not only those in a function or class
  // %        note 2: Implement instead with include?
  // *     example 1: runkit_import('http://example.com/somefile.js');
  // *     returns 1: undefined
  if (flags) {
    // RUNKIT_IMPORT_FUNCTIONS, RUNKIT_IMPORT_CLASS_METHODS, RUNKIT_IMPORT_CLASS_CONSTS,
    // RUNKIT_IMPORT_CLASS_PROPS, RUNKIT_IMPORT_CLASSES, RUNKIT_IMPORT_OVERRIDE
    // CLASSKIT_AGGREGATE_OVERRIDE ?
    throw 'Flags not supported for runkit_import';
  }

  eval(this.file_get_contents(file));
}
function runkit_method_add (classname, methodname, args, code, flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: function a (){}
  // *     example 1: runkit_method_add ('a', 'b', 'a,b', 'return a+b');
  // *     returns 1: true
  var func, argmnts = [];

  switch (flags) {
  case 'RUNKIT_ACC_PROTECTED':
    throw 'Protected not supported';
  case 'RUNKIT_ACC_PRIVATE':
    throw 'Private not supported';
  case 'RUNKIT_ACC_PUBLIC':
  default:
    break;
  }

  argmnts = args.split(/,\s*/);

  if (typeof classname === 'string') {
    classname = this.window[classname];
  }

  // Could use the following to add as a static method to the class
  //        func = Function.apply(null, argmnts.concat(code));
  //            classname[methodname] = func;
  func = Function.apply(null, argmnts.concat(code));
  classname.prototype[methodname] = func;
  return true;
}
function runkit_method_copy (dClass, dMethod, sClass, sMethod) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: runkit_method_copy('newClass', 'newMethod', 'someClass', 'someMethod');
  // *     returns 1: true
/*
  function A(){}
  function C(){}
  C.d = function () {alert('inside d');}
  runkit_method_copy('A', 'b', 'C', 'd');
  A.b(); // 'inside d'
  */
  sMethod = sMethod || dMethod;

  if (typeof dClass === 'string') {
    dClass = this.window[dClass];
  }
  if (typeof sClass === 'string') {
    sClass = this.window[sClass];
  }

  //dClass[dMethod] = sClass[sMethod]; // Copy from static to static method (as per PHP example)
  dClass.prototype[dMethod] = sClass.prototype[sMethod]; // To copy from instance to instance
  return true;
}
function runkit_method_redefine (classname, methodname, args, code, flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: runkit_method_redefine('someClass', 'someMethod', 'a,b', 'return a+b');
  // *     returns 1: true
  // In JavaScript, this is identical to runkit_method_add
  var argmnts = [],
    func;
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  switch (flags) {
  case 'RUNKIT_ACC_PROTECTED':
    throw 'Protected not supported';
  case 'RUNKIT_ACC_PRIVATE':
    throw 'Private not supported';
  case 'RUNKIT_ACC_PUBLIC':
  default:
    break;
  }

  argmnts = args.split(/,\s*/);

  if (typeof classname === 'string') {
    classname = this.window[classname];
  }

  if (getFuncName(classname) !== 'PHP_JS' || // By default, don't allow overriding of PHP functions
  (this.php_js && this.php_js.ini && this.php_js.ini['runkit.internal_override'] && (this.php_js.ini['runkit.internal_override'].local_value === true || this.php_js.ini['runkit.internal_override'].local_value === 1 || this.php_js.ini['runkit.internal_override'].local_value === '1' || this.php_js.ini['runkit.internal_override'].local_value === 'true'))) {
    // Could use the following to add as a static method to the class
    //        func = Function.apply(null, argmnts.concat(code));
    //            classname[methodname] = func;
    func = Function.apply(null, argmnts.concat(code));
    classname.prototype[methodname] = func;
    return true;
  }
  return false;
}
function runkit_method_remove (classname, methodname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: runkit_method_remove('someClass', 'someMethod');
  // *     returns 1: true
  if (typeof classname === 'string') {
    classname = this.window[classname];
  }
  if (getFuncName(classname) !== 'PHP_JS' || // By default, don't allow overriding of PHP functions
  (this.php_js && this.php_js.ini && this.php_js.ini['runkit.internal_override'] && (this.php_js.ini['runkit.internal_override'].local_value === true || this.php_js.ini['runkit.internal_override'].local_value === 1 || this.php_js.ini['runkit.internal_override'].local_value === '1' || this.php_js.ini['runkit.internal_override'].local_value === 'true'))) {
    delete classname.prototype[methodname]; // Delete any on prototype
    return true;
  }
  // delete classname[methodname]; // Delete any as static class method
  return false;
}
function runkit_method_rename (classname, methodname, newname) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: runkit_method_rename('someClass', 'someMethod', 'newMethod');
  // *     returns 1: true
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  if (typeof classname === 'string') {
    classname = this.window[classname];
  }

/*
  var method = classname[methodname]; // Static
  classname[newname] = method;
  delete classname[methodname];
  */

  if (getFuncName(classname) !== 'PHP_JS' || // By default, don't allow overriding of PHP functions
  (this.php_js && this.php_js.ini && this.php_js.ini['runkit.internal_override'] && (this.php_js.ini['runkit.internal_override'].local_value === true || this.php_js.ini['runkit.internal_override'].local_value === 1 || this.php_js.ini['runkit.internal_override'].local_value === '1' || this.php_js.ini['runkit.internal_override'].local_value === 'true'))) {
    var method = classname.prototype[methodname];
    classname.prototype[newname] = method;
    delete classname.prototype[methodname];
    return true;
  }
  return false;
}
function runkit_superglobals () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: You must manually define the superglobals to be able to use them.
  // %          note 2: Another alternative (though you can't reflect on them with this function) is to use import_request_variables()
  // *     example 1: runkit_superglobals();
  // *     returns 1: []
  var superglobal = {},
    p = '',
    arr = [];
  var superglobals = ['$_GET', '$_POST', '$_REQUEST', '$_COOKIE', '$_SESSION', '$_SERVER', '$_ENV', '$_FILES'];
  for (var i = 0; i < superglobals.length; i++) {
    superglobal = this.window[superglobals[i]];
    for (p in superglobal) {
      arr.push(superglobal[p]);
    }
  }
  return arr;
}
function stream_context_create (options, params) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Can be made to work as a wrapper for proprietary contexts as well
  // *     example 1: var opts = {http:{ method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n' } };
  // *     example 1: var context = stream_context_create(opts);
  // *     example 1: get_resource_type(context);
  // *     returns 1: 'stream-context'
  var resource = {};
  options = options || {};
  // params.notification is only property currently in PHP for params
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.resourceIdCounter = this.php_js.resourceIdCounter || 0;

  function PHPJS_Resource(type, id, opener) { // Can reuse the following for other resources, just changing the instantiation
    // See http://php.net/manual/en/resource.php for types
    this.type = type;
    this.id = id;
    this.opener = opener;
  }
  PHPJS_Resource.prototype.toString = function () {
    return 'Resource id #' + this.id;
  };
  PHPJS_Resource.prototype.get_resource_type = function () {
    return this.type;
  };
  PHPJS_Resource.prototype.var_dump = function () {
    return 'resource(' + this.id + ') of type (' + this.type + ')';
    // return 'resource('+this.id+'), '+this.type+')'; another format
  };
  // END REDUNDANT
  this.php_js.resourceIdCounter++;

  resource = new PHPJS_Resource('stream-context', this.php_js.resourceIdCounter, 'stream_context_create');
  resource.stream_options = options;
  resource.stream_params = params;

  return resource;
}
function stream_context_get_default (options) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: stream_context_create
  // %          note 1: Although for historical reasons in PHP, this function can be used with
  // %          note 1: its options argument to set the default, it is no doubt best to use
  // %          note 1: stream_context_set_default() to do so
  // *     example 1: var context = stream_context_get_default();
  // *     example 1: get_resource_type(context);
  // *     returns 1: 'stream-context'
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT
  if (!this.php_js.default_streams_context) {
    this.php_js.default_streams_context = this.stream_context_create(options);
  }
  if (options) {
    this.php_js.default_streams_context.stream_options = options;
  }

  return this.php_js.default_streams_context;
}
function stream_context_get_options (stream_or_context) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var opts = {http:{method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n'}};
  // *     example 1: var context = stream_context_create(opts);
  // *     example 1: stream_context_get_options(context);
  // *     returns 1: {http:{ method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n' }}
  return stream_or_context.stream_options;
}
function stream_context_get_params (stream_or_context) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var params = {notification:function (notification_code, severity, message, message_code, bytes_transferred, bytes_max) {}};
  // *     example 1: var context = stream_context_create({}, params);
  // *     example 1: stream_context_get_params(context);
  // *     returns 1: {notification:function (notification_code, severity, message, message_code, bytes_transferred, bytes_max) {}, options:{}}
  return stream_or_context.stream_params;
}
function stream_context_set_default (options) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: stream_context_create
  // *     example 1: var opts = {http:{ method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n' } };
  // *     example 1: var context = stream_context_set_default(opts);
  // *     example 1: get_resource_type(context);
  // *     returns 1: 'stream-context'
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT
  if (!this.php_js.default_streams_context) {
    this.php_js.default_streams_context = this.stream_context_create(options);
  }
  this.php_js.default_streams_context.stream_options = options;

  return this.php_js.default_streams_context;
}
function stream_context_set_option (stream_or_context, optionsOrWrapper, option, value) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var opts = {http:{ method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n' } };
  // *     example 1: var context = stream_context_create(opts);
  // *     example 1: stream_context_set_option(context, opts);
  // *     returns 1: true
  if (option) {
    if (!stream_or_context.stream_options[optionsOrWrapper]) { // Don't overwrite all?
      stream_or_context.stream_options[optionsOrWrapper] = {};
    }
    stream_or_context.stream_options[optionsOrWrapper][option] = value;
  } else {
    stream_or_context.stream_options = optionsOrWrapper;
  }
  return true;
}
function stream_context_set_params (stream_or_context, params) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var context = stream_context_create();
  // *     example 1: stream_context_set_params({notification:function (notification_code, severity, message, message_code, bytes_transferred, bytes_max) {}});
  // *     returns 1: true
  var param = '';

  // Docs also allow for "options" as a parameter here (i.e., setting options instead of parameters) and source seems to allow encoding, input_encoding, output_encoding, and default_mode
  for (param in params) { // Overwrites all, or just supplied? Seems like just supplied
    if (param === 'options') {
      stream_or_context.stream_options = params[param]; // Overwrite all?
    } else {
      stream_or_context.stream_params[param] = params[param];
    }
  }
  return true;
}
function stream_get_contents (handle, maxLength, offset) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var stream = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: stream_get_contents(stream, 7, 2);
  // *     returns 1: 'DOCTYPE'
  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.id) {
    return false;
  }
  offset = offset || 0;
  this.php_js.resourceDataPointer[handle.id] += offset;

  var chrs = this.php_js.resourceData[handle.id].slice(this.php_js.resourceDataPointer[handle.id]);
  chrs = maxLength >= 0 ? chrs.substr(0, maxLength) : chrs;

  this.echo(chrs);
  this.php_js.resourceDataPointer[handle.id] += chrs.length;

  return chrs;
}
function stream_get_line (handle, length, ending) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
  // *     example 1: stream_get_line(handle, 2);
  // *     returns 1: '<'
  var start = 0,
    fullline = '';

  if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
    return false;
  }

  start = this.php_js.resourceDataPointer[handle.id];

  if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
    return false; // Resource was already closed or already reached the end of the file
  }

  // Fix: Should we also test for /\r\n?|\n/?
  fullline = this.php_js.resourceData[handle.id].slice(start, this.php_js.resourceData[handle.id].indexOf(ending, start) + 1);
  if (fullline === '') {
    fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
  }

  length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length / 2) || 1; // two bytes per character (or surrogate), but ensure at least one
  this.php_js.resourceDataPointer[handle.id] += length;
  return this.php_js.resourceData[handle.id].substr(start, length - (fullline && ending && ending.length ? ending.length : 0));
}
function stream_is_local (stream_or_url) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: stream_is_local('/etc');
  // *     returns 1: true

  if (typeof stream_or_url === 'string') {
    return ((/^(https?|ftps?|ssl|tls):/).test(stream_or_url)) ? false : true; // Need a better check than this
  }
  return stream_or_url.is_local ? true : false;
}
function addcslashes (str, charlist) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %  note 1: We show double backslashes in the return value example code below because a JavaScript string will not
  // %  note 1: render them as backslashes otherwise
  // *     example 1: addcslashes('foo[ ]', 'A..z'); // Escape all ASCII within capital A to lower z range, including square brackets
  // *     returns 1: "\\f\\o\\o\\[ \\]"
  // *     example 2: addcslashes("zoo['.']", 'z..A'); // Only escape z, period, and A here since not a lower-to-higher range
  // *     returns 2: "\\zoo['\\.']"
  // *     example 3: addcslashes("@a\u0000\u0010\u00A9", "\0..\37!@\177..\377") == '\\@a\\000\\020\\302\\251'); // Escape as octals those specified and less than 32 (0x20) or greater than 126 (0x7E), but not otherwise
  // *     returns 3: true
  // *     example 4: addcslashes("\u0020\u007E", "\40..\175") == '\\ ~'); // Those between 32 (0x20 or 040) and 126 (0x7E or 0176) decimal value will be backslashed if specified (not octalized)
  // *     returns 4: true
  // *     example 5: addcslashes("\r\u0007\n", '\0..\37'); // Recognize C escape sequences if specified
  // *     returns 5: "\\r\\a\\n"
  // *     example 6: addcslashes("\r\u0007\n", '\0'); // Do not recognize C escape sequences if not specified
  // *     returns 7: "\r\u0007\n"
  var target = '',
    chrs = [],
    i = 0,
    j = 0,
    c = '',
    next = '',
    rangeBegin = '',
    rangeEnd = '',
    chr = '',
    begin = 0,
    end = 0,
    octalLength = 0,
    postOctalPos = 0,
    cca = 0,
    escHexGrp = [],
    encoded = '',
    percentHex = /%([\dA-Fa-f]+)/g;
  var _pad = function (n, c) {
    if ((n = n + '').length < c) {
      return new Array(++c - n.length).join('0') + n;
    }
    return n;
  };

  for (i = 0; i < charlist.length; i++) {
    c = charlist.charAt(i);
    next = charlist.charAt(i + 1);
    if (c === '\\' && next && (/\d/).test(next)) { // Octal
      rangeBegin = charlist.slice(i + 1).match(/^\d+/)[0];
      octalLength = rangeBegin.length;
      postOctalPos = i + octalLength + 1;
      if (charlist.charAt(postOctalPos) + charlist.charAt(postOctalPos + 1) === '..') { // Octal begins range
        begin = rangeBegin.charCodeAt(0);
        if ((/\\\d/).test(charlist.charAt(postOctalPos + 2) + charlist.charAt(postOctalPos + 3))) { // Range ends with octal
          rangeEnd = charlist.slice(postOctalPos + 3).match(/^\d+/)[0];
          i += 1; // Skip range end backslash
        } else if (charlist.charAt(postOctalPos + 2)) { // Range ends with character
          rangeEnd = charlist.charAt(postOctalPos + 2);
        } else {
          throw 'Range with no end point';
        }
        end = rangeEnd.charCodeAt(0);
        if (end > begin) { // Treat as a range
          for (j = begin; j <= end; j++) {
            chrs.push(String.fromCharCode(j));
          }
        } else { // Supposed to treat period, begin and end as individual characters only, not a range
          chrs.push('.', rangeBegin, rangeEnd);
        }
        i += rangeEnd.length + 2; // Skip dots and range end (already skipped range end backslash if present)
      } else { // Octal is by itself
        chr = String.fromCharCode(parseInt(rangeBegin, 8));
        chrs.push(chr);
      }
      i += octalLength; // Skip range begin
    } else if (next + charlist.charAt(i + 2) === '..') { // Character begins range
      rangeBegin = c;
      begin = rangeBegin.charCodeAt(0);
      if ((/\\\d/).test(charlist.charAt(i + 3) + charlist.charAt(i + 4))) { // Range ends with octal
        rangeEnd = charlist.slice(i + 4).match(/^\d+/)[0];
        i += 1; // Skip range end backslash
      } else if (charlist.charAt(i + 3)) { // Range ends with character
        rangeEnd = charlist.charAt(i + 3);
      } else {
        throw 'Range with no end point';
      }
      end = rangeEnd.charCodeAt(0);
      if (end > begin) { // Treat as a range
        for (j = begin; j <= end; j++) {
          chrs.push(String.fromCharCode(j));
        }
      } else { // Supposed to treat period, begin and end as individual characters only, not a range
        chrs.push('.', rangeBegin, rangeEnd);
      }
      i += rangeEnd.length + 2; // Skip dots and range end (already skipped range end backslash if present)
    } else { // Character is by itself
      chrs.push(c);
    }
  }

  for (i = 0; i < str.length; i++) {
    c = str.charAt(i);
    if (chrs.indexOf(c) !== -1) {
      target += '\\';
      cca = c.charCodeAt(0);
      if (cca < 32 || cca > 126) { // Needs special escaping
        switch (c) {
        case '\n':
          target += 'n';
          break;
        case '\t':
          target += 't';
          break;
        case '\u000D':
          target += 'r';
          break;
        case '\u0007':
          target += 'a';
          break;
        case '\v':
          target += 'v';
          break;
        case '\b':
          target += 'b';
          break;
        case '\f':
          target += 'f';
          break;
        default:
          //target += _pad(cca.toString(8), 3);break; // Sufficient for UTF-16
          encoded = encodeURIComponent(c);

          // 3-length-padded UTF-8 octets
          if ((escHexGrp = percentHex.exec(encoded)) !== null) {
            target += _pad(parseInt(escHexGrp[1], 16).toString(8), 3); // already added a slash above
          }
          while ((escHexGrp = percentHex.exec(encoded)) !== null) {
            target += '\\' + _pad(parseInt(escHexGrp[1], 16).toString(8), 3);
          }
          break;
        }
      } else { // Perform regular backslashed escaping
        target += c;
      }
    } else { // Just add the character unescaped
      target += c;
    }
  }
  return target;
}
function addslashes (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Ates Goral (http://magnetiq.com)
  // +   improved by: marrtins
  // +   improved by: Nate
  // +   improved by: Onno Marsman
  // +   input by: Denny Wardhana
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Oskar Larsson Högfeldt (http://oskar-lh.name/)
  // *     example 1: addslashes("kevin's birthday");
  // *     returns 1: 'kevin\'s birthday'
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
function bin2hex (s) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   bugfixed by: Linuxworld
  // +   improved by: ntoniazzi (http://phpjs.org/functions/bin2hex:361#comment_177616)
  // *     example 1: bin2hex('Kev');
  // *     returns 1: '4b6576'
  // *     example 2: bin2hex(String.fromCharCode(0x00));
  // *     returns 2: '00'

  var i, l, o = "", n;

  s += "";

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16)
    o += n.length < 2 ? "0" + n : n;
  }

  return o;
}
function chop (str, charlist) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  // -    depends on: rtrim
  // *     example 1: rtrim('    Kevin van Zonneveld    ');
  // *     returns 1: '    Kevin van Zonneveld'
  return this.rtrim(str, charlist);
}
function chr (codePt) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: chr(75);
  // *     returns 1: 'K'
  // *     example 1: chr(65536) === '\uD800\uDC00';
  // *     returns 1: true
  if (codePt > 0xFFFF) { // Create a four-byte string (length 2) since this code point is high
    //   enough for the UTF-16 encoding (JavaScript internal use), to
    //   require representation with two surrogates (reserved non-characters
    //   used for building other characters; the first is "high" and the next "low")
    codePt -= 0x10000;
    return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
  }
  return String.fromCharCode(codePt);
}
function chunk_split (body, chunklen, end) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Theriault
  // *     example 1: chunk_split('Hello world!', 1, '*');
  // *     returns 1: 'H*e*l*l*o* *w*o*r*l*d*!*'
  // *     example 2: chunk_split('Hello world!', 10, '*');
  // *     returns 2: 'Hello worl*d!*'
  chunklen = parseInt(chunklen, 10) || 76;
  end = end || '\r\n';

  if (chunklen < 1) {
    return false;
  }

  return body.match(new RegExp(".{0," + chunklen + "}", "g")).join(end);

}
function convert_cyr_string (str, from, to) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: Assumes and converts to Unicode strings with character
  // %          note 1: code equivalents of the same numbers as in the from or
  // %          note 1: target character set; Note that neither the input or output
  // %          note 1: should be treated as actual Unicode, since the PHP function
  // %          note 1: this is based on does not either
  // %          note 2: One could easily represent (or convert the results) of a
  // %          note 2: string form as arrays of code points instead but since JavaScript
  // %          note 2: currently has no clear binary data type, we chose to use strings
  // %          note 2: as in PHP
  // *     example 1: convert_cyr_string(String.fromCharCode(214), 'k', 'w').charCodeAt(0) === 230; // Char. 214 of KOI8-R gives equivalent number value 230 in win1251
  // *     returns 1: true
  var _cyr_win1251 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 154, 174, 190, 46, 159, 189, 46, 46, 179, 191, 180, 157, 46, 46, 156, 183, 46, 46, 182, 166, 173, 46, 46, 158, 163, 152, 164, 155, 46, 46, 46, 167, 225, 226, 247, 231, 228, 229, 246, 250, 233, 234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 230, 232, 227, 254, 251, 253, 255, 249, 248, 252, 224, 241, 193, 194, 215, 199, 196, 197, 214, 218, 201, 202, 203, 204, 205, 206, 207, 208, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217, 216, 220, 192, 209, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 184, 186, 32, 179, 191, 32, 32, 32, 32, 32, 180, 162, 32, 32, 32, 32, 168, 170, 32, 178, 175, 32, 32, 32, 32, 32, 165, 161, 169, 254, 224, 225, 246, 228, 229, 244, 227, 245, 232, 233, 234, 235, 236, 237, 238, 239, 255, 240, 241, 242, 243, 230, 226, 252, 251, 231, 248, 253, 249, 247, 250, 222, 192, 193, 214, 196, 197, 212, 195, 213, 200, 201, 202, 203, 204, 205, 206, 207, 223, 208, 209, 210, 211, 198, 194, 220, 219, 199, 216, 221, 217, 215, 218],
    _cyr_cp866 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 225, 226, 247, 231, 228, 229, 246, 250, 233, 234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 230, 232, 227, 254, 251, 253, 255, 249, 248, 252, 224, 241, 193, 194, 215, 199, 196, 197, 214, 218, 201, 202, 203, 204, 205, 206, 207, 208, 35, 35, 35, 124, 124, 124, 124, 43, 43, 124, 124, 43, 43, 43, 43, 43, 43, 45, 45, 124, 45, 43, 124, 124, 43, 43, 45, 45, 124, 45, 43, 45, 45, 45, 45, 43, 43, 43, 43, 43, 43, 43, 43, 35, 35, 124, 124, 35, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217, 216, 220, 192, 209, 179, 163, 180, 164, 183, 167, 190, 174, 32, 149, 158, 32, 152, 159, 148, 154, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 205, 186, 213, 241, 243, 201, 32, 245, 187, 212, 211, 200, 190, 32, 247, 198, 199, 204, 181, 240, 242, 185, 32, 244, 203, 207, 208, 202, 216, 32, 246, 32, 238, 160, 161, 230, 164, 165, 228, 163, 229, 168, 169, 170, 171, 172, 173, 174, 175, 239, 224, 225, 226, 227, 166, 162, 236, 235, 167, 232, 237, 233, 231, 234, 158, 128, 129, 150, 132, 133, 148, 131, 149, 136, 137, 138, 139, 140, 141, 142, 143, 159, 144, 145, 146, 147, 134, 130, 156, 155, 135, 152, 157, 153, 151, 154],
    _cyr_iso88595 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 179, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 225, 226, 247, 231, 228, 229, 246, 250, 233, 234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 230, 232, 227, 254, 251, 253, 255, 249, 248, 252, 224, 241, 193, 194, 215, 199, 196, 197, 214, 218, 201, 202, 203, 204, 205, 206, 207, 208, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217, 216, 220, 192, 209, 32, 163, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 241, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 161, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 238, 208, 209, 230, 212, 213, 228, 211, 229, 216, 217, 218, 219, 220, 221, 222, 223, 239, 224, 225, 226, 227, 214, 210, 236, 235, 215, 232, 237, 233, 231, 234, 206, 176, 177, 198, 180, 181, 196, 179, 197, 184, 185, 186, 187, 188, 189, 190, 191, 207, 192, 193, 194, 195, 182, 178, 204, 203, 183, 200, 205, 201, 199, 202],
    _cyr_mac = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 225, 226, 247, 231, 228, 229, 246, 250, 233, 234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 230, 232, 227, 254, 251, 253, 255, 249, 248, 252, 224, 241, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 179, 163, 209, 193, 194, 215, 199, 196, 197, 214, 218, 201, 202, 203, 204, 205, 206, 207, 208, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217, 216, 220, 192, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 160, 161, 162, 222, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 221, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 254, 224, 225, 246, 228, 229, 244, 227, 245, 232, 233, 234, 235, 236, 237, 238, 239, 223, 240, 241, 242, 243, 230, 226, 252, 251, 231, 248, 253, 249, 247, 250, 158, 128, 129, 150, 132, 133, 148, 131, 149, 136, 137, 138, 139, 140, 141, 142, 143, 159, 144, 145, 146, 147, 134, 130, 156, 155, 135, 152, 157, 153, 151, 154];

  var from_table = null,
    to_table = null,
    tmp, i = 0,
    retStr = '';

  switch (from.toUpperCase()) {
    case 'W':
      from_table = _cyr_win1251;
      break;
    case 'A':
    case 'D':
      from_table = _cyr_cp866;
      break;
    case 'I':
      from_table = _cyr_iso88595;
      break;
    case 'M':
      from_table = _cyr_mac;
      break;
    case 'K':
      break;
    default:
      throw 'Unknown source charset: ' + from; // warning
  }

  switch (to.toUpperCase()) {
    case 'W':
      to_table = _cyr_win1251;
      break;
    case 'A':
    case 'D':
      to_table = _cyr_cp866;
      break;
    case 'I':
      to_table = _cyr_iso88595;
      break;
    case 'M':
      to_table = _cyr_mac;
      break;
    case 'K':
      break;
    default:
      throw 'Unknown destination charset: ' + to; // fix: make a warning
  }

  if (!str) {
    return str;
  }

  for (i = 0; i < str.length; i++) {
    tmp = (from_table === null) ? str.charAt(i) : String.fromCharCode(from_table[str.charAt(i).charCodeAt(0)]);
    retStr += (to_table === null) ? tmp : String.fromCharCode(to_table[tmp.charCodeAt(0) + 256]);
  }
  return retStr;
}
function convert_uuencode (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ole Vrijenhoek
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   reimplemented by: Ole Vrijenhoek
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: is_scalar
  // *     example 1: convert_uuencode("test\ntext text\r\n");
  // *     returns 1: '0=&5S=`IT97AT('1E>'0-"@``'
  // shortcut
  var chr = function (c) {
    return String.fromCharCode(c);
  };

  if (!str || str === "") {
    return chr(0);
  } else if (!this.is_scalar(str)) {
    return false;
  }

  var c = 0,
    u = 0,
    i = 0,
    a = 0;
  var encoded = "",
    tmp1 = "",
    tmp2 = "",
    bytes = {};

  // divide string into chunks of 45 characters
  var chunk = function () {
    bytes = str.substr(u, 45);
    for (i in bytes) {
      bytes[i] = bytes[i].charCodeAt(0);
    }
    if (bytes.length != 0) {
      return bytes.length;
    } else {
      return 0;
    }
  };

  while (chunk() !== 0) {
    c = chunk();
    u += 45;

    // New line encoded data starts with number of bytes encoded.
    encoded += chr(c + 32);

    // Convert each char in bytes[] to a byte
    for (i in bytes) {
      tmp1 = bytes[i].charCodeAt(0).toString(2);
      while (tmp1.length < 8) {
        tmp1 = "0" + tmp1;
      }
      tmp2 += tmp1;
    }

    while (tmp2.length % 6) {
      tmp2 = tmp2 + "0";
    }

    for (i = 0; i <= (tmp2.length / 6) - 1; i++) {
      tmp1 = tmp2.substr(a, 6);
      if (tmp1 == "000000") {
        encoded += chr(96);
      } else {
        encoded += chr(parseInt(tmp1, 2) + 32);
      }
      a += 6;
    }
    a = 0;
    tmp2 = "";
    encoded += "\n";
  }

  // Add termination characters
  encoded += chr(96) + "\n";

  return encoded;
}
function count_chars (str, mode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ates Goral (http://magnetiq.com)
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Theriault
  // *     example 1: count_chars("Hello World!", 3);
  // *     returns 1: "!HWdelor"
  // *     example 2: count_chars("Hello World!", 1);
  // *     returns 2: {32:1,33:1,72:1,87:1,100:1,101:1,108:3,111:2,114:1}
  var result = {},
    resultArr = [],
    i;

  str = ('' + str).split('').sort().join('').match(/(.)\1*/g);

  if ((mode & 1) == 0) {
    for (i = 0; i != 256; i++) {
      result[i] = 0;
    }
  }

  if (mode === 2 || mode === 4) {

    for (i = 0; i != str.length; i += 1) {
      delete result[str[i].charCodeAt(0)];
    }
    for (i in result) {
      result[i] = (mode === 4) ? String.fromCharCode(i) : 0;
    }

  } else if (mode === 3) {

    for (i = 0; i != str.length; i += 1) {
      result[i] = str[i].slice(0, 1);
    }

  } else {

    for (i = 0; i != str.length; i += 1) {
      result[str[i].charCodeAt(0)] = str[i].length;
    }

  }
  if (mode < 3) {
    return result;
  }

  for (i in result) {
    resultArr.push(result[i]);
  }
  return resultArr.join('');
}
function crc32 (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // +   improved by: T0bsn
  // -    depends on: utf8_encode
  // *     example 1: crc32('Kevin van Zonneveld');
  // *     returns 1: 1249991249
  str = this.utf8_encode(str);
  var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

  var crc = 0;
  var x = 0;
  var y = 0;

  crc = crc ^ (-1);
  for (var i = 0, iTop = str.length; i < iTop; i++) {
    y = (crc ^ str.charCodeAt(i)) & 0xFF;
    x = "0x" + table.substr(y * 9, 8);
    crc = (crc >>> 8) ^ x;
  }

  return crc ^ (-1);
}
function echo () {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +   improved by: echo is bad
  // +   improved by: Nate
  // +    revised by: Der Simon (http://innerdom.sourceforge.net/)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Eugene Bulkin (http://doubleaw.com/)
  // +   input by: JB
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: EdorFaus
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: If browsers start to support DOM Level 3 Load and Save (parsing/serializing),
  // %        note 1: we wouldn't need any such long code (even most of the code below). See
  // %        note 1: link below for a cross-browser implementation in JavaScript. HTML5 might
  // %        note 1: possibly support DOMParser, but that is not presently a standard.
  // %        note 2: Although innerHTML is widely used and may become standard as of HTML5, it is also not ideal for
  // %        note 2: use with a temporary holder before appending to the DOM (as is our last resort below),
  // %        note 2: since it may not work in an XML context
  // %        note 3: Using innerHTML to directly add to the BODY is very dangerous because it will
  // %        note 3: break all pre-existing references to HTMLElements.
  // *     example 1: echo('<div><p>abc</p><p>abc</p></div>');
  // *     returns 1: undefined
  // Fix: This function really needs to allow non-XHTML input (unless in true XHTML mode) as in jQuery
  var arg = '',
    argc = arguments.length,
    argv = arguments,
    i = 0,
    holder, win = this.window,
    d = win.document,
    ns_xhtml = 'http://www.w3.org/1999/xhtml',
    ns_xul = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'; // If we're in a XUL context
  var stringToDOM = function (str, parent, ns, container) {
    var extraNSs = '';
    if (ns === ns_xul) {
      extraNSs = ' xmlns:html="' + ns_xhtml + '"';
    }
    var stringContainer = '<' + container + ' xmlns="' + ns + '"' + extraNSs + '>' + str + '</' + container + '>';
    var dils = win.DOMImplementationLS,
      dp = win.DOMParser,
      ax = win.ActiveXObject;
    if (dils && dils.createLSInput && dils.createLSParser) {
      // Follows the DOM 3 Load and Save standard, but not
      // implemented in browsers at present; HTML5 is to standardize on innerHTML, but not for XML (though
      // possibly will also standardize with DOMParser); in the meantime, to ensure fullest browser support, could
      // attach http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.js (see http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.xhtml for a simple test file)
      var lsInput = dils.createLSInput();
      // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
      lsInput.stringData = stringContainer;
      var lsParser = dils.createLSParser(1, null); // synchronous, no schema type
      return lsParser.parse(lsInput).firstChild;
    } else if (dp) {
      // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
      try {
        var fc = new dp().parseFromString(stringContainer, 'text/xml');
        if (fc && fc.documentElement && fc.documentElement.localName !== 'parsererror' && fc.documentElement.namespaceURI !== 'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
          return fc.documentElement.firstChild;
        }
        // If there's a parsing error, we just continue on
      } catch (e) {
        // If there's a parsing error, we just continue on
      }
    } else if (ax) { // We don't bother with a holder in Explorer as it doesn't support namespaces
      var axo = new ax('MSXML2.DOMDocument');
      axo.loadXML(str);
      return axo.documentElement;
    }
/*else if (win.XMLHttpRequest) { // Supposed to work in older Safari
      var req = new win.XMLHttpRequest;
      req.open('GET', 'data:application/xml;charset=utf-8,'+encodeURIComponent(str), false);
      if (req.overrideMimeType) {
        req.overrideMimeType('application/xml');
      }
      req.send(null);
      return req.responseXML;
    }*/
    // Document fragment did not work with innerHTML, so we create a temporary element holder
    // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
    //if (d.createElementNS && (d.contentType && d.contentType !== 'text/html')) { // Don't create namespaced elements if we're being served as HTML (currently only Mozilla supports this detection in true XHTML-supporting browsers, but Safari and Opera should work with the above DOMParser anyways, and IE doesn't support createElementNS anyways)
    if (d.createElementNS && // Browser supports the method
    (d.documentElement.namespaceURI || // We can use if the document is using a namespace
    d.documentElement.nodeName.toLowerCase() !== 'html' || // We know it's not HTML4 or less, if the tag is not HTML (even if the root namespace is null)
    (d.contentType && d.contentType !== 'text/html') // We know it's not regular HTML4 or less if this is Mozilla (only browser supporting the attribute) and the content type is something other than text/html; other HTML5 roots (like svg) still have a namespace
    )) { // Don't create namespaced elements if we're being served as HTML (currently only Mozilla supports this detection in true XHTML-supporting browsers, but Safari and Opera should work with the above DOMParser anyways, and IE doesn't support createElementNS anyways); last test is for the sake of being in a pure XML document
      holder = d.createElementNS(ns, container);
    } else {
      holder = d.createElement(container); // Document fragment did not work with innerHTML
    }
    holder.innerHTML = str;
    while (holder.firstChild) {
      parent.appendChild(holder.firstChild);
    }
    return false;
    // throw 'Your browser does not support DOM parsing as required by echo()';
  };


  var ieFix = function (node) {
    if (node.nodeType === 1) {
      var newNode = d.createElement(node.nodeName);
      var i, len;
      if (node.attributes && node.attributes.length > 0) {
        for (i = 0, len = node.attributes.length; i < len; i++) {
          newNode.setAttribute(node.attributes[i].nodeName, node.getAttribute(node.attributes[i].nodeName));
        }
      }
      if (node.childNodes && node.childNodes.length > 0) {
        for (i = 0, len = node.childNodes.length; i < len; i++) {
          newNode.appendChild(ieFix(node.childNodes[i]));
        }
      }
      return newNode;
    } else {
      return d.createTextNode(node.nodeValue);
    }
  };

  var replacer = function (s, m1, m2) {
    // We assume for now that embedded variables do not have dollar sign; to add a dollar sign, you currently must use {$$var} (We might change this, however.)
    // Doesn't cover all cases yet: see http://php.net/manual/en/language.types.string.php#language.types.string.syntax.double
    if (m1 !== '\\') {
      return m1 + eval(m2);
    } else {
      return s;
    }
  };

  this.php_js = this.php_js || {};
  var phpjs = this.php_js,
    ini = phpjs.ini,
    obs = phpjs.obs;
  for (i = 0; i < argc; i++) {
    arg = argv[i];
    if (ini && ini['phpjs.echo_embedded_vars']) {
      arg = arg.replace(/(.?)\{?\$(\w*?\}|\w*)/g, replacer);
    }

    if (!phpjs.flushing && obs && obs.length) { // If flushing we output, but otherwise presence of a buffer means caching output
      obs[obs.length - 1].buffer += arg;
      continue;
    }

    if (d.appendChild) {
      if (d.body) {
        if (win.navigator.appName === 'Microsoft Internet Explorer') { // We unfortunately cannot use feature detection, since this is an IE bug with cloneNode nodes being appended
          d.body.appendChild(stringToDOM(ieFix(arg)));
        } else {
          var unappendedLeft = stringToDOM(arg, d.body, ns_xhtml, 'div').cloneNode(true); // We will not actually append the div tag (just using for providing XHTML namespace by default)
          if (unappendedLeft) {
            d.body.appendChild(unappendedLeft);
          }
        }
      } else {
        d.documentElement.appendChild(stringToDOM(arg, d.documentElement, ns_xul, 'description')); // We will not actually append the description tag (just using for providing XUL namespace by default)
      }
    } else if (d.write) {
      d.write(arg);
    }
/* else { // This could recurse if we ever add print!
      print(arg);
    }*/
  }
}
function explode (delimiter, string, limit) {

  if ( arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined' ) return null;
  if ( delimiter === '' || delimiter === false || delimiter === null) return false;
  if ( typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string === 'object'){
    return { 0: '' };
  }
  if ( delimiter === true ) delimiter = '1';

  // Here we go...
  delimiter += '';
  string += '';

  var s = string.split( delimiter );


  if ( typeof limit === 'undefined' ) return s;

  // Support for limit
  if ( limit === 0 ) limit = 1;

  // Positive limit
  if ( limit > 0 ){
    if ( limit >= s.length ) return s;
    return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
  }

  // Negative limit
  if ( -limit >= s.length ) return [];

  s.splice( s.length + limit );
  return s;
}
function get_html_translation_table (table, quote_style) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: noname
  // +   bugfixed by: Alex
  // +   bugfixed by: Marco
  // +   bugfixed by: madipta
  // +   improved by: KELAN
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Frank Forte
  // +   bugfixed by: T.Wild
  // +      input by: Ratheous
  // %          note: It has been decided that we're not going to add global
  // %          note: dependencies to php.js, meaning the constants are not
  // %          note: real constants, but strings instead. Integers are also supported if someone
  // %          note: chooses to create the constants themselves.
  // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
  // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
  var entities = {},
    hash_map = {},
    decimal;
  var constMappingTable = {},
    constMappingQuoteStyle = {};
  var useTable = {},
    useQuoteStyle = {};

  // Translate arguments
  constMappingTable[0] = 'HTML_SPECIALCHARS';
  constMappingTable[1] = 'HTML_ENTITIES';
  constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
  constMappingQuoteStyle[2] = 'ENT_COMPAT';
  constMappingQuoteStyle[3] = 'ENT_QUOTES';

  useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
  useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

  if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
    throw new Error("Table: " + useTable + ' not supported');
    // return false;
  }

  entities['38'] = '&amp;';
  if (useTable === 'HTML_ENTITIES') {
    entities['160'] = '&nbsp;';
    entities['161'] = '&iexcl;';
    entities['162'] = '&cent;';
    entities['163'] = '&pound;';
    entities['164'] = '&curren;';
    entities['165'] = '&yen;';
    entities['166'] = '&brvbar;';
    entities['167'] = '&sect;';
    entities['168'] = '&uml;';
    entities['169'] = '&copy;';
    entities['170'] = '&ordf;';
    entities['171'] = '&laquo;';
    entities['172'] = '&not;';
    entities['173'] = '&shy;';
    entities['174'] = '&reg;';
    entities['175'] = '&macr;';
    entities['176'] = '&deg;';
    entities['177'] = '&plusmn;';
    entities['178'] = '&sup2;';
    entities['179'] = '&sup3;';
    entities['180'] = '&acute;';
    entities['181'] = '&micro;';
    entities['182'] = '&para;';
    entities['183'] = '&middot;';
    entities['184'] = '&cedil;';
    entities['185'] = '&sup1;';
    entities['186'] = '&ordm;';
    entities['187'] = '&raquo;';
    entities['188'] = '&frac14;';
    entities['189'] = '&frac12;';
    entities['190'] = '&frac34;';
    entities['191'] = '&iquest;';
    entities['192'] = '&Agrave;';
    entities['193'] = '&Aacute;';
    entities['194'] = '&Acirc;';
    entities['195'] = '&Atilde;';
    entities['196'] = '&Auml;';
    entities['197'] = '&Aring;';
    entities['198'] = '&AElig;';
    entities['199'] = '&Ccedil;';
    entities['200'] = '&Egrave;';
    entities['201'] = '&Eacute;';
    entities['202'] = '&Ecirc;';
    entities['203'] = '&Euml;';
    entities['204'] = '&Igrave;';
    entities['205'] = '&Iacute;';
    entities['206'] = '&Icirc;';
    entities['207'] = '&Iuml;';
    entities['208'] = '&ETH;';
    entities['209'] = '&Ntilde;';
    entities['210'] = '&Ograve;';
    entities['211'] = '&Oacute;';
    entities['212'] = '&Ocirc;';
    entities['213'] = '&Otilde;';
    entities['214'] = '&Ouml;';
    entities['215'] = '&times;';
    entities['216'] = '&Oslash;';
    entities['217'] = '&Ugrave;';
    entities['218'] = '&Uacute;';
    entities['219'] = '&Ucirc;';
    entities['220'] = '&Uuml;';
    entities['221'] = '&Yacute;';
    entities['222'] = '&THORN;';
    entities['223'] = '&szlig;';
    entities['224'] = '&agrave;';
    entities['225'] = '&aacute;';
    entities['226'] = '&acirc;';
    entities['227'] = '&atilde;';
    entities['228'] = '&auml;';
    entities['229'] = '&aring;';
    entities['230'] = '&aelig;';
    entities['231'] = '&ccedil;';
    entities['232'] = '&egrave;';
    entities['233'] = '&eacute;';
    entities['234'] = '&ecirc;';
    entities['235'] = '&euml;';
    entities['236'] = '&igrave;';
    entities['237'] = '&iacute;';
    entities['238'] = '&icirc;';
    entities['239'] = '&iuml;';
    entities['240'] = '&eth;';
    entities['241'] = '&ntilde;';
    entities['242'] = '&ograve;';
    entities['243'] = '&oacute;';
    entities['244'] = '&ocirc;';
    entities['245'] = '&otilde;';
    entities['246'] = '&ouml;';
    entities['247'] = '&divide;';
    entities['248'] = '&oslash;';
    entities['249'] = '&ugrave;';
    entities['250'] = '&uacute;';
    entities['251'] = '&ucirc;';
    entities['252'] = '&uuml;';
    entities['253'] = '&yacute;';
    entities['254'] = '&thorn;';
    entities['255'] = '&yuml;';
  }

  if (useQuoteStyle !== 'ENT_NOQUOTES') {
    entities['34'] = '&quot;';
  }
  if (useQuoteStyle === 'ENT_QUOTES') {
    entities['39'] = '&#39;';
  }
  entities['60'] = '&lt;';
  entities['62'] = '&gt;';


  // ascii decimals to real symbols
  for (decimal in entities) {
    if (entities.hasOwnProperty(decimal)) {
      hash_map[String.fromCharCode(decimal)] = entities[decimal];
    }
  }

  return hash_map;
}
function html_entity_decode (string, quote_style) {
  // http://kevin.vanzonneveld.net
  // +   original by: john (http://www.jd-tech.net)
  // +      input by: ger
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: marc andreu
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Ratheous
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Nick Kolosov (http://sammy.ru)
  // +   bugfixed by: Fox
  // -    depends on: get_html_translation_table
  // *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
  // *     returns 1: 'Kevin & van Zonneveld'
  // *     example 2: html_entity_decode('&amp;lt;');
  // *     returns 2: '&lt;'
  var hash_map = {},
    symbol = '',
    tmp_str = '',
    entity = '';
  tmp_str = string.toString();

  if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
    return false;
  }

  // fix &amp; problem
  // http://phpjs.org/functions/get_html_translation_table:416#comment_97660
  delete(hash_map['&']);
  hash_map['&'] = '&amp;';

  for (symbol in hash_map) {
    entity = hash_map[symbol];
    tmp_str = tmp_str.split(entity).join(symbol);
  }
  tmp_str = tmp_str.split('&#039;').join("'");

  return tmp_str;
}
function htmlentities (string, quote_style, charset, double_encode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: nobbler
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Ratheous
  // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // +   improved by: Dj (http://phpjs.org/functions/htmlentities:425#comment_134018)
  // -    depends on: get_html_translation_table
  // *     example 1: htmlentities('Kevin & van Zonneveld');
  // *     returns 1: 'Kevin &amp; van Zonneveld'
  // *     example 2: htmlentities("foo'bar","ENT_QUOTES");
  // *     returns 2: 'foo&#039;bar'
  var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),
    symbol = '';
  string = string == null ? '' : string + '';

  if (!hash_map) {
    return false;
  }

  if (quote_style && quote_style === 'ENT_QUOTES') {
    hash_map["'"] = '&#039;';
  }

  if (!!double_encode || double_encode == null) {
    for (symbol in hash_map) {
      if (hash_map.hasOwnProperty(symbol)) {
        string = string.split(symbol).join(hash_map[symbol]);
      }
    }
  } else {
    string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function (ignore, text, entity) {
      for (symbol in hash_map) {
        if (hash_map.hasOwnProperty(symbol)) {
          text = text.split(symbol).join(hash_map[symbol]);
        }
      }

      return text + entity;
    });
  }

  return string;
}
function htmlspecialchars (string, quote_style, charset, double_encode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Mirek Slugen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Nathan
  // +   bugfixed by: Arno
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Ratheous
  // +      input by: Mailfaker (http://www.weedem.fr/)
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +      input by: felix
  // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: charset argument not supported
  // *     example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
  // *     returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
  // *     example 2: htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES']);
  // *     returns 2: 'ab"c&#039;d'
  // *     example 3: htmlspecialchars("my "&entity;" is still here", null, null, false);
  // *     returns 3: 'my &quot;&entity;&quot; is still here'
  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined' || quote_style === null) {
    quote_style = 2;
  }
  string = string.toString();
  if (double_encode !== false) { // Put this first to avoid double-encoding
    string = string.replace(/&/g, '&amp;');
  }
  string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      }
      else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/'/g, '&#039;');
  }
  if (!noquotes) {
    string = string.replace(/"/g, '&quot;');
  }

  return string;
}
function htmlspecialchars_decode (string, quote_style) {
  // http://kevin.vanzonneveld.net
  // +   original by: Mirek Slugen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Mateusz "loonquawl" Zalega
  // +      input by: ReverseSyntax
  // +      input by: Slawomir Kaniecki
  // +      input by: Scott Cariss
  // +      input by: Francois
  // +   bugfixed by: Onno Marsman
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Ratheous
  // +      input by: Mailfaker (http://www.weedem.fr/)
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
  // *     returns 1: '<p>this -> &quot;</p>'
  // *     example 2: htmlspecialchars_decode("&amp;quot;");
  // *     returns 2: '&quot;'
  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}
function implode (glue, pieces) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Waldo Malqui Silva
  // +   improved by: Itsacon (http://www.itsacon.net/)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: 'Kevin van Zonneveld'
  // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
  // *     returns 2: 'Kevin van Zonneveld'
  var i = '',
    retVal = '',
    tGlue = '';
  if (arguments.length === 1) {
    pieces = glue;
    glue = '';
  }
  if (typeof(pieces) === 'object') {
    if (Object.prototype.toString.call(pieces) === '[object Array]') {
      return pieces.join(glue);
    }
    for (i in pieces) {
      retVal += tGlue + pieces[i];
      tGlue = glue;
    }
    return retVal;
  }
  return pieces;
}
function join (glue, pieces) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: implode
  // *     example 1: join(' ', ['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: 'Kevin van Zonneveld'
  return this.implode(glue, pieces);
}
function lcfirst (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: lcfirst('Kevin Van Zonneveld');
  // *     returns 1: 'kevin Van Zonneveld'
  str += '';
  var f = str.charAt(0).toLowerCase();
  return f + str.substr(1);
}
function levenshtein (s1, s2) {
  // http://kevin.vanzonneveld.net
  // +            original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  // +            bugfixed by: Onno Marsman
  // +             revised by: Andrea Giammarchi (http://webreflection.blogspot.com)
  // + reimplemented by: Brett Zamir (http://brett-zamir.me)
  // + reimplemented by: Alexander M Beedie
  // *                example 1: levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
  // *                returns 1: 3
  if (s1 == s2) {
    return 0;
  }

  var s1_len = s1.length;
  var s2_len = s2.length;
  if (s1_len === 0) {
    return s2_len;
  }
  if (s2_len === 0) {
    return s1_len;
  }

  // BEGIN STATIC
  var split = false;
  try {
    split = !('0')[0];
  } catch (e) {
    split = true; // Earlier IE may not support access by string index
  }
  // END STATIC
  if (split) {
    s1 = s1.split('');
    s2 = s2.split('');
  }

  var v0 = new Array(s1_len + 1);
  var v1 = new Array(s1_len + 1);

  var s1_idx = 0,
    s2_idx = 0,
    cost = 0;
  for (s1_idx = 0; s1_idx < s1_len + 1; s1_idx++) {
    v0[s1_idx] = s1_idx;
  }
  var char_s1 = '',
    char_s2 = '';
  for (s2_idx = 1; s2_idx <= s2_len; s2_idx++) {
    v1[0] = s2_idx;
    char_s2 = s2[s2_idx - 1];

    for (s1_idx = 0; s1_idx < s1_len; s1_idx++) {
      char_s1 = s1[s1_idx];
      cost = (char_s1 == char_s2) ? 0 : 1;
      var m_min = v0[s1_idx + 1] + 1;
      var b = v1[s1_idx] + 1;
      var c = v0[s1_idx] + cost;
      if (b < m_min) {
        m_min = b;
      }
      if (c < m_min) {
        m_min = c;
      }
      v1[s1_idx + 1] = m_min;
    }
    var v_tmp = v0;
    v0 = v1;
    v1 = v_tmp;
  }
  return v0[s1_len];
}
function localeconv () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: localeconv();
  // *     returns 1: {decimal_point: '.', thousands_sep: ',', positive_sign: '', negative_sign: '-', int_frac_digits: 2, frac_digits: 2, p_cs_precedes: 1, p_sep_by_space: 0, n_cs_precedes: 1, n_sep_by_space: 0, p_sign_posn: 3, n_sign_posn: 0, grouping: 3, int_curr_symbol: 'USD', currency_symbol: '$', mon_decimal_point: '.', mon_thousands_sep: ',', mon_grouping: 3}
  var arr = {},
    prop = '';

  // BEGIN REDUNDANT
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place, if not already
  // END REDUNDANT
  // Make copies
  for (prop in this.php_js.locales[this.php_js.localeCategories.LC_NUMERIC].LC_NUMERIC) {
    arr[prop] = this.php_js.locales[this.php_js.localeCategories.LC_NUMERIC].LC_NUMERIC[prop];
  }
  for (prop in this.php_js.locales[this.php_js.localeCategories.LC_MONETARY].LC_MONETARY) {
    arr[prop] = this.php_js.locales[this.php_js.localeCategories.LC_MONETARY].LC_MONETARY[prop];
  }

  return arr;
}
function ltrim (str, charlist) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Erkekjetter
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // *     example 1: ltrim('    Kevin van Zonneveld    ');
  // *     returns 1: 'Kevin van Zonneveld    '
  charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
  var re = new RegExp('^[' + charlist + ']+', 'g');
  return (str + '').replace(re, '');
}
function md5 (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // + namespaced by: Michael White (http://getsprink.com)
  // +    tweaked by: Jack
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: utf8_encode
  // *     example 1: md5('Kevin van Zonneveld');
  // *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
  var xl;

  var rotateLeft = function (lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  };

  var addUnsigned = function (lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  };

  var _F = function (x, y, z) {
    return (x & y) | ((~x) & z);
  };
  var _G = function (x, y, z) {
    return (x & z) | (y & (~z));
  };
  var _H = function (x, y, z) {
    return (x ^ y ^ z);
  };
  var _I = function (x, y, z) {
    return (y ^ (x | (~z)));
  };

  var _FF = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _GG = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _HH = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _II = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var convertToWordArray = function (str) {
    var lWordCount;
    var lMessageLength = str.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = new Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };

  var wordToHex = function (lValue) {
    var wordToHexValue = "",
      wordToHexValue_temp = "",
      lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue_temp = "0" + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
    }
    return wordToHexValue;
  };

  var x = [],
    k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22,
    S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20,
    S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23,
    S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;

  str = this.utf8_encode(str);
  x = convertToWordArray(str);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;

  xl = x.length;
  for (k = 0; k < xl; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

  return temp.toLowerCase();
}
function md5_file (str_filename) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: file_get_contents
  // -    depends on: md5
  // *     example 1: md5_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: '202cb962ac59075b964b07152d234b70'
  var buf = '';

  buf = this.file_get_contents(str_filename);

  if (!buf) {
    return false;
  }

  return this.md5(buf);
}
function metaphone (word, phones) {
  // +   original by: Greg Frazier
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Rafał Kukawski (http://kukawski.pl)
  // *     example 1: metaphone('Gnu');
  // *     returns 1: 'N'

  word = (word == null ? '' : word + '').toUpperCase();

  function isVowel (a) {
    return 'AEIOU'.indexOf(a) !== -1;
  }

  function removeDuplicates (word) {
    var wordlength = word.length,
      char1 = word.charAt(0),
      char2,
      rebuilt = char1;

    for (var i = 1; i < wordlength; i++) {
      char2 = word.charAt(i);

      if (char2 !== char1 || char2 === 'C' || char2 === 'G') { // 'c' and 'g' are exceptions
        rebuilt += char2;
      }
      char1 = char2;
    }

    return rebuilt;
  }

  word = removeDuplicates(word);

  var wordlength = word.length,
    x = 0,
    metaword = '';

  //Special wh- case
  if (word.substr(0, 2) === 'WH') {
    // Remove "h" and rebuild the string
    word = 'W' + word.substr(2);
  }

  var cc = word.charAt(0); // current char. Short name cause it's used all over the function
  var pc = ''; // previous char. There is none when x === 0
  var nc = word.charAt(1); // next char
  var nnc = ''; // 2 characters ahead. Needed later

  if (1 <= wordlength) {
    switch (cc) {
    case 'A':
      if (nc === 'E') {
        metaword += 'E';
      } else {
        metaword += 'A';
      }
      x += 1;
      break;
    case 'E': case 'I': case 'O': case 'U':
      metaword += cc;
      x += 1;
      break;
    case 'G': case 'K': case 'P':
      if (nc === 'N') {
        x += 1;
      }
      break;
    case 'W':
      if (nc === 'R') {
        x += 1;
      }
      break;
    }
  }

  for (; x < wordlength; x++) {
    cc = word.charAt(x);
    pc = word.charAt(x - 1);
    nc = word.charAt(x + 1);
    nnc = word.charAt(x + 2);

    if (!isVowel(cc)) {
      switch (cc) {
      case 'B':
        if (pc !== 'M') {
          metaword += 'B';
        }
        break;
      case 'C':
        if (x + 1 <= wordlength) {
          if (word.substr(x - 1, 3) !== 'SCH') {
            if (x === 0 && (x + 2 <= wordlength) && isVowel(nnc)) {
              metaword += 'K';
            } else {
              metaword += 'X';
            }
          } else if (word.substr(x + 1, 2) === 'IA') {
            metaword += 'X';
          } else if ('IEY'.indexOf(nc) !== -1) {
            if (x > 0) {
              if (pc !== 'S') {
                metaword += 'S';
              }
            } else {
              metaword += 'S';
            }
          } else {
            metaword += 'K';
          }
        } else {
          metaword += 'K';
        }
        break;
      case 'D':
        if (x + 2 <= wordlength && nc === 'G' && 'EIY'.indexOf(nnc) !== -1) {
          metaword += 'J';
          x += 2;
        } else {
          metaword += 'T';
        }
        break;
      case 'F':
        metaword += 'F';
        break;
      case 'G':
        if (x < wordlength) {
          if ((nc === 'N' && x + 1 === wordlength - 1) || (nc === 'N' && nnc === 'S' && x + 2 === wordlength - 1)) {
            break;
          }
          if (word.substr(x + 1, 3) === 'NED' && x + 3 === wordlength - 1) {
            break;
          }
          if (word.substr(x - 2, 3) === 'ING' && x === wordlength - 1) {
            break;
          }

          if (x + 1 <= wordlength - 1 && word.substr(x - 2, 4) === 'OUGH') {
            metaword += 'F';
            break;
          }
          if (nc === 'H' && x + 2 <= wordlength) {
            if (isVowel(nnc)) {
              metaword += 'K';
            }
          } else if (x + 1 === wordlength) {
            if (nc !== 'N') {
              metaword += 'K';
            }
          } else if (x + 3 === wordlength) {
            if (word.substr(x + 1, 3) !== 'NED') {
              metaword += 'K';
            }
          } else if (x + 1 <= wordlength) {
            if ('EIY'.indexOf(nc) !== -1) {
              if (pc !== 'G') {
                metaword += 'J';
              }
            } else if (x === 0 || pc !== 'D' || 'EIY'.indexOf(nc) === -1) {
              metaword += 'K';
            }
          } else {
            metaword += 'K';
          }
        } else {
          metaword += 'K';
        }
        break;
      case 'M': case 'J': case 'N': case 'R': case 'L':
        metaword += cc;
        break;
      case 'Q':
        metaword += 'K';
        break;
      case 'V':
        metaword += 'F';
        break;
      case 'Z':
        metaword += 'S';
        break;
      case 'X':
        metaword += (x === 0) ? 'S' : 'KS';
        break;
      case 'K':
        if (x === 0 || pc !== 'C') {
          metaword += 'K';
        }
        break;
      case 'P':
        if (x + 1 <= wordlength && nc === 'H') {
          metaword += 'F';
        } else {
          metaword += 'P';
        }
        break;
      case 'Y':
        if (x + 1 > wordlength || isVowel(nc)) {
          metaword += 'Y';
        }
        break;
      case 'H':
        if (x === 0 || 'CSPTG'.indexOf(pc) === -1) {
          if (isVowel(nc) === true) {
            metaword += 'H';
          }
        }
        break;
      case 'S':
        if (x + 1 <= wordlength) {
          if (nc === 'H') {
            metaword += 'X';
          } else if (x + 2 <= wordlength && nc === 'I' && 'AO'.indexOf(nnc) !== -1) {
            metaword += 'X';
          } else {
            metaword += 'S';
          }
        } else {
          metaword += 'S';
        }
        break;
      case 'T':
        if (x + 1 <= wordlength) {
          if (nc === 'H') {
            metaword += '0';
          } else if (x + 2 <= wordlength && nc === 'I' && 'AO'.indexOf(nnc) !== -1) {
            metaword += 'X';
          } else {
            metaword += 'T';
          }
        } else {
          metaword += 'T';
        }
        break;
      case 'W':
        if (x + 1 <= wordlength && isVowel(nc)) {
          metaword += 'W';
        }
        break;
      }
    }
  }

  phones = parseInt(phones, 10);
  if (metaword.length > phones) {
    return metaword.substr(0, phones);
  }
  return metaword;
}
function money_format (format, number) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: daniel airton wermann (http://wermann.com.br)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // %          note 1: This depends on setlocale having the appropriate locale (these examples use 'en_US')
  // *     example 1: money_format('%i', 1234.56);
  // *     returns 1: 'USD 1,234.56'
  // *     example 2: money_format('%14#8.2n', 1234.5678);
  // *     returns 2: ' $     1,234.57'
  // *     example 3: money_format('%14#8.2n', -1234.5678);
  // *     returns 3: '-$     1,234.57'
  // *     example 4: money_format('%(14#8.2n', 1234.5678);
  // *     returns 4: ' $     1,234.57 '
  // *     example 5: money_format('%(14#8.2n', -1234.5678);
  // *     returns 5: '($     1,234.57)'
  // *     example 6: money_format('%=014#8.2n', 1234.5678);
  // *     returns 6: ' $000001,234.57'
  // *     example 7: money_format('%=014#8.2n', -1234.5678);
  // *     returns 7: '-$000001,234.57'
  // *     example 8: money_format('%=*14#8.2n', 1234.5678);
  // *     returns 8: ' $*****1,234.57'
  // *     example 9: money_format('%=*14#8.2n', -1234.5678);
  // *     returns 9: '-$*****1,234.57'
  // *     example 10: money_format('%=*^14#8.2n', 1234.5678);
  // *     returns 10: '  $****1234.57'
  // *     example 11: money_format('%=*^14#8.2n', -1234.5678);
  // *     returns 11: ' -$****1234.57'
  // *     example 12: money_format('%=*!14#8.2n', 1234.5678);
  // *     returns 12: ' *****1,234.57'
  // *     example 13: money_format('%=*!14#8.2n', -1234.5678);
  // *     returns 13: '-*****1,234.57'
  // *     example 14: money_format('%i', 3590);
  // *     returns 14: ' USD 3,590.00'

  // Per PHP behavior, there seems to be no extra padding for sign when there is a positive number, though my
  // understanding of the description is that there should be padding; need to revisit examples

  // Helpful info at http://ftp.gnu.org/pub/pub/old-gnu/Manuals/glibc-2.2.3/html_chapter/libc_7.html and http://publib.boulder.ibm.com/infocenter/zos/v1r10/index.jsp?topic=/com.ibm.zos.r10.bpxbd00/strfmp.htm

  if (typeof number !== 'number') {
    return null;
  }
  var regex = /%((=.|[+^(!-])*?)(\d*?)(#(\d+))?(\.(\d+))?([in%])/g; // 1: flags, 3: width, 5: left, 7: right, 8: conversion

  this.setlocale('LC_ALL', 0); // Ensure the locale data we need is set up
  var monetary = this.php_js.locales[this.php_js.localeCategories['LC_MONETARY']]['LC_MONETARY'];

  var doReplace = function (n0, flags, n2, width, n4, left, n6, right, conversion) {
    var value = '',
      repl = '';
    if (conversion === '%') { // Percent does not seem to be allowed with intervening content
      return '%';
    }
    var fill = flags && (/=./).test(flags) ? flags.match(/=(.)/)[1] : ' '; // flag: =f (numeric fill)
    var showCurrSymbol = !flags || flags.indexOf('!') === -1; // flag: ! (suppress currency symbol)
    width = parseInt(width, 10) || 0; // field width: w (minimum field width)

    var neg = number < 0;
    number = number + ''; // Convert to string
    number = neg ? number.slice(1) : number; // We don't want negative symbol represented here yet

    var decpos = number.indexOf('.');
    var integer = decpos !== -1 ? number.slice(0, decpos) : number; // Get integer portion
    var fraction = decpos !== -1 ? number.slice(decpos + 1) : ''; // Get decimal portion

    var _str_splice = function (integerStr, idx, thous_sep) {
      var integerArr = integerStr.split('');
      integerArr.splice(idx, 0, thous_sep);
      return integerArr.join('');
    };

    var init_lgth = integer.length;
    left = parseInt(left, 10);
    var filler = init_lgth < left;
    if (filler) {
      var fillnum = left - init_lgth;
      integer = new Array(fillnum + 1).join(fill) + integer;
    }
    if (flags.indexOf('^') === -1) { // flag: ^ (disable grouping characters (of locale))
      // use grouping characters
      var thous_sep = monetary.mon_thousands_sep; // ','
      var mon_grouping = monetary.mon_grouping; // [3] (every 3 digits in U.S.A. locale)

      if (mon_grouping[0] < integer.length) {
        for (var i = 0, idx = integer.length; i < mon_grouping.length; i++) {
          idx -= mon_grouping[i]; // e.g., 3
          if (idx <= 0) {
            break;
          }
          if (filler && idx < fillnum) {
            thous_sep = fill;
          }
          integer = _str_splice(integer, idx, thous_sep);
        }
      }
      if (mon_grouping[i - 1] > 0) { // Repeating last grouping (may only be one) until highest portion of integer reached
        while (idx > mon_grouping[i - 1]) {
          idx -= mon_grouping[i - 1];
          if (filler && idx < fillnum) {
            thous_sep = fill;
          }
          integer = _str_splice(integer, idx, thous_sep);
        }
      }
    }

    // left, right
    if (right === '0') { // No decimal or fractional digits
      value = integer;
    } else {
      var dec_pt = monetary.mon_decimal_point; // '.'
      if (right === '' || right === undefined) {
        right = conversion === 'i' ? monetary.int_frac_digits : monetary.frac_digits;
      }
      right = parseInt(right, 10);

      if (right === 0) { // Only remove fractional portion if explicitly set to zero digits
        fraction = '';
        dec_pt = '';
      } else if (right < fraction.length) {
        fraction = Math.round(parseFloat(fraction.slice(0, right) + '.' + fraction.substr(right, 1))) + '';
        if (right > fraction.length) {
          fraction = new Array(right - fraction.length + 1).join('0') + fraction; // prepend with 0's
        }
      } else if (right > fraction.length) {
        fraction += new Array(right - fraction.length + 1).join('0'); // pad with 0's
      }
      value = integer + dec_pt + fraction;
    }

    var symbol = '';
    if (showCurrSymbol) {
      symbol = conversion === 'i' ? monetary.int_curr_symbol : monetary.currency_symbol; // 'i' vs. 'n' ('USD' vs. '$')
    }
    var sign_posn = neg ? monetary.n_sign_posn : monetary.p_sign_posn;

    // 0: no space between curr. symbol and value
    // 1: space sep. them unless symb. and sign are adjacent then space sep. them from value
    // 2: space sep. sign and value unless symb. and sign are adjacent then space separates
    var sep_by_space = neg ? monetary.n_sep_by_space : monetary.p_sep_by_space;

    // p_cs_precedes, n_cs_precedes // positive currency symbol follows value = 0; precedes value = 1
    var cs_precedes = neg ? monetary.n_cs_precedes : monetary.p_cs_precedes;

    // Assemble symbol/value/sign and possible space as appropriate
    if (flags.indexOf('(') !== -1) { // flag: parenth. for negative
      // Fix: unclear on whether and how sep_by_space, sign_posn, or cs_precedes have
      // an impact here (as they do below), but assuming for now behaves as sign_posn 0 as
      // far as localized sep_by_space and sign_posn behavior
      repl = (cs_precedes ? symbol + (sep_by_space === 1 ? ' ' : '') : '') + value + (!cs_precedes ? (sep_by_space === 1 ? ' ' : '') + symbol : '');
      if (neg) {
        repl = '(' + repl + ')';
      } else {
        repl = ' ' + repl + ' ';
      }
    } else { // '+' is default
      var pos_sign = monetary.positive_sign; // ''
      var neg_sign = monetary.negative_sign; // '-'
      var sign = neg ? (neg_sign) : (pos_sign);
      var otherSign = neg ? (pos_sign) : (neg_sign);
      var signPadding = '';
      if (sign_posn) { // has a sign
        signPadding = new Array(otherSign.length - sign.length + 1).join(' ');
      }

      var valueAndCS = '';
      switch (sign_posn) {
        // 0: parentheses surround value and curr. symbol;
        // 1: sign precedes them;
        // 2: sign follows them;
        // 3: sign immed. precedes curr. symbol; (but may be space between)
        // 4: sign immed. succeeds curr. symbol; (but may be space between)
      case 0:
        valueAndCS = cs_precedes ? symbol + (sep_by_space === 1 ? ' ' : '') + value : value + (sep_by_space === 1 ? ' ' : '') + symbol;
        repl = '(' + valueAndCS + ')';
        break;
      case 1:
        valueAndCS = cs_precedes ? symbol + (sep_by_space === 1 ? ' ' : '') + value : value + (sep_by_space === 1 ? ' ' : '') + symbol;
        repl = signPadding + sign + (sep_by_space === 2 ? ' ' : '') + valueAndCS;
        break;
      case 2:
        valueAndCS = cs_precedes ? symbol + (sep_by_space === 1 ? ' ' : '') + value : value + (sep_by_space === 1 ? ' ' : '') + symbol;
        repl = valueAndCS + (sep_by_space === 2 ? ' ' : '') + sign + signPadding;
        break;
      case 3:
        repl = cs_precedes ? signPadding + sign + (sep_by_space === 2 ? ' ' : '') + symbol + (sep_by_space === 1 ? ' ' : '') + value : value + (sep_by_space === 1 ? ' ' : '') + sign + signPadding + (sep_by_space === 2 ? ' ' : '') + symbol;
        break;
      case 4:
        repl = cs_precedes ? symbol + (sep_by_space === 2 ? ' ' : '') + signPadding + sign + (sep_by_space === 1 ? ' ' : '') + value : value + (sep_by_space === 1 ? ' ' : '') + symbol + (sep_by_space === 2 ? ' ' : '') + sign + signPadding;
        break;
      }
    }

    var padding = width - repl.length;
    if (padding > 0) {
      padding = new Array(padding + 1).join(' ');
      // Fix: How does p_sep_by_space affect the count if there is a space? Included in count presumably?
      if (flags.indexOf('-') !== -1) { // left-justified (pad to right)
        repl += padding;
      } else { // right-justified (pad to left)
        repl = padding + repl;
      }
    }
    return repl;
  };

  return format.replace(regex, doReplace);
}
function nl2br (str, is_xhtml) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Philip Peterson
  // +   improved by: Onno Marsman
  // +   improved by: Atli Þór
  // +   bugfixed by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Maximusya
  // *     example 1: nl2br('Kevin\nvan\nZonneveld');
  // *     returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
  // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
  // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
  // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
  // *     returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
function nl_langinfo (item) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: nl_langinfo('DAY_1');
  // *     returns 1: 'Sunday'
  this.setlocale('LC_ALL', 0); // Ensure locale data is available
  var loc = this.php_js.locales[this.php_js.localeCategories.LC_TIME];
  if (item.indexOf('ABDAY_') === 0) {
    return loc.LC_TIME.a[parseInt(item.replace(/^ABDAY_/, ''), 10) - 1];
  } else if (item.indexOf('DAY_') === 0) {
    return loc.LC_TIME.A[parseInt(item.replace(/^DAY_/, ''), 10) - 1];
  } else if (item.indexOf('ABMON_') === 0) {
    return loc.LC_TIME.b[parseInt(item.replace(/^ABMON_/, ''), 10) - 1];
  } else if (item.indexOf('MON_') === 0) {
    return loc.LC_TIME.B[parseInt(item.replace(/^MON_/, ''), 10) - 1];
  } else {
    switch (item) {
      // More LC_TIME
    case 'AM_STR':
      return loc.LC_TIME.p[0];
    case 'PM_STR':
      return loc.LC_TIME.p[1];
    case 'D_T_FMT':
      return loc.LC_TIME.c;
    case 'D_FMT':
      return loc.LC_TIME.x;
    case 'T_FMT':
      return loc.LC_TIME.X;
    case 'T_FMT_AMPM':
      return loc.LC_TIME.r;
    case 'ERA':
      // all fall-throughs
    case 'ERA_YEAR':
    case 'ERA_D_T_FMT':
    case 'ERA_D_FMT':
    case 'ERA_T_FMT':
      return loc.LC_TIME[item];
    }
    loc = this.php_js.locales[this.php_js.localeCategories.LC_MONETARY];
    if (item === 'CRNCYSTR') {
      item = 'CURRENCY_SYMBOL'; // alias
    }
    switch (item) {
    case 'INT_CURR_SYMBOL':
      // all fall-throughs
    case 'CURRENCY_SYMBOL':
    case 'MON_DECIMAL_POINT':
    case 'MON_THOUSANDS_SEP':
    case 'POSITIVE_SIGN':
    case 'NEGATIVE_SIGN':
    case 'INT_FRAC_DIGITS':
    case 'FRAC_DIGITS':
    case 'P_CS_PRECEDES':
    case 'P_SEP_BY_SPACE':
    case 'N_CS_PRECEDES':
    case 'N_SEP_BY_SPACE':
    case 'P_SIGN_POSN':
    case 'N_SIGN_POSN':
      return loc.LC_MONETARY[item.toLowerCase()];
    case 'MON_GROUPING':
      // Same as above, or return something different since this returns an array?
      return loc.LC_MONETARY[item.toLowerCase()];
    }
    loc = this.php_js.locales[this.php_js.localeCategories.LC_NUMERIC];
    switch (item) {
    case 'RADIXCHAR':
      // Fall-through
    case 'DECIMAL_POINT':
      return loc.LC_NUMERIC[item.toLowerCase()];
    case 'THOUSEP':
      // Fall-through
    case 'THOUSANDS_SEP':
      return loc.LC_NUMERIC[item.toLowerCase()];
    case 'GROUPING':
      // Same as above, or return something different since this returns an array?
      return loc.LC_NUMERIC[item.toLowerCase()];
    }
    loc = this.php_js.locales[this.php_js.localeCategories.LC_MESSAGES];
    switch (item) {
    case 'YESEXPR':
      // all fall-throughs
    case 'NOEXPR':
    case 'YESSTR':
    case 'NOSTR':
      return loc.LC_MESSAGES[item];
    }
    loc = this.php_js.locales[this.php_js.localeCategories.LC_CTYPE];
    if (item === 'CODESET') {
      return loc.LC_CTYPE[item];
    }
    return false;
  }
}
function number_format (number, decimals, dec_point, thousands_sep) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     bugfix by: Michael White (http://getsprink.com)
  // +     bugfix by: Benjamin Lupton
  // +     bugfix by: Allan Jensen (http://www.winternet.no)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +     bugfix by: Howard Yeend
  // +    revised by: Luke Smith (http://lucassmith.name)
  // +     bugfix by: Diogo Resende
  // +     bugfix by: Rival
  // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
  // +   improved by: davook
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Jay Klehr
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Amir Habibi (http://www.residence-mixte.com/)
  // +     bugfix by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +      input by: Amirouche
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: number_format(1234.56);
  // *     returns 1: '1,235'
  // *     example 2: number_format(1234.56, 2, ',', ' ');
  // *     returns 2: '1 234,56'
  // *     example 3: number_format(1234.5678, 2, '.', '');
  // *     returns 3: '1234.57'
  // *     example 4: number_format(67, 2, ',', '.');
  // *     returns 4: '67,00'
  // *     example 5: number_format(1000);
  // *     returns 5: '1,000'
  // *     example 6: number_format(67.311, 2);
  // *     returns 6: '67.31'
  // *     example 7: number_format(1000.55, 1);
  // *     returns 7: '1,000.6'
  // *     example 8: number_format(67000, 5, ',', '.');
  // *     returns 8: '67.000,00000'
  // *     example 9: number_format(0.9, 0);
  // *     returns 9: '1'
  // *    example 10: number_format('1.20', 2);
  // *    returns 10: '1.20'
  // *    example 11: number_format('1.20', 4);
  // *    returns 11: '1.2000'
  // *    example 12: number_format('1.2000', 3);
  // *    returns 12: '1.200'
  // *    example 13: number_format('1 000,50', 2, '.', ' ');
  // *    returns 13: '100 050.00'
  // Strip all characters but numerical ones.
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
function ord (string) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   input by: incidence
  // *     example 1: ord('K');
  // *     returns 1: 75
  // *     example 2: ord('\uD800\uDC00'); // surrogate pair to create a single Unicode character
  // *     returns 2: 65536
  var str = string + '',
    code = str.charCodeAt(0);
  if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
    var hi = code;
    if (str.length === 1) {
      return code; // This is just a high surrogate with no following low surrogate, so we return its value;
      // we could also throw an error as it is not a complete character, but someone may want to know
    }
    var low = str.charCodeAt(1);
    return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
  }
  if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
    return code; // This is just a low surrogate with no preceding high surrogate, so we return its value;
    // we could also throw an error as it is not a complete character, but someone may want to know
  }
  return code;
}
function parse_str (str, array) {
  // http://kevin.vanzonneveld.net
  // +   original by: Cagri Ekin
  // +   improved by: Michael White (http://getsprink.com)
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // +   reimplemented by: stag019
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: stag019
  // +   input by: Dreamer
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
  // +   input by: Zaide (http://zaidesthings.com/)
  // +   input by: David Pesta (http://davidpesta.com/)
  // +   input by: jeicquest
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: When no argument is specified, will put variables in global scope.
  // %        note 1: When a particular argument has been passed, and the returned value is different parse_str of PHP. For example, a=b=c&d====c
  // *     example 1: var arr = {};
  // *     example 1: parse_str('first=foo&second=bar', arr);
  // *     results 1: arr == { first: 'foo', second: 'bar' }
  // *     example 2: var arr = {};
  // *     example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', arr);
  // *     results 2: arr == { str_a: "Jack and Jill didn't see the well." }
  // *     example 3: var abc = {3:'a'};
  // *     example 3: parse_str('abc[a][b]["c"]=def&abc[q]=t+5');
  // *     results 3: JSON.stringify(abc) === '{"3":"a","a":{"b":{"c":"def"}},"q":"t 5"}';


  var strArr = String(str).replace(/^&/, '').replace(/&$/, '').split('&'),
    sal = strArr.length,
    i, j, ct, p, lastObj, obj, lastIter, undef, chr, tmp, key, value,
    postLeftBracketPos, keys, keysLen,
    fixStr = function (str) {
      return decodeURIComponent(str.replace(/\+/g, '%20'));
    };

  if (!array) {
    array = this.window;
  }

  for (i = 0; i < sal; i++) {
    tmp = strArr[i].split('=');
    key = fixStr(tmp[0]);
    value = (tmp.length < 2) ? '' : fixStr(tmp[1]);

    while (key.charAt(0) === ' ') {
      key = key.slice(1);
    }
    if (key.indexOf('\x00') > -1) {
      key = key.slice(0, key.indexOf('\x00'));
    }
    if (key && key.charAt(0) !== '[') {
      keys = [];
      postLeftBracketPos = 0;
      for (j = 0; j < key.length; j++) {
        if (key.charAt(j) === '[' && !postLeftBracketPos) {
          postLeftBracketPos = j + 1;
        }
        else if (key.charAt(j) === ']') {
          if (postLeftBracketPos) {
            if (!keys.length) {
              keys.push(key.slice(0, postLeftBracketPos - 1));
            }
            keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos));
            postLeftBracketPos = 0;
            if (key.charAt(j + 1) !== '[') {
              break;
            }
          }
        }
      }
      if (!keys.length) {
        keys = [key];
      }
      for (j = 0; j < keys[0].length; j++) {
        chr = keys[0].charAt(j);
        if (chr === ' ' || chr === '.' || chr === '[') {
          keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
        }
        if (chr === '[') {
          break;
        }
      }

      obj = array;
      for (j = 0, keysLen = keys.length; j < keysLen; j++) {
        key = keys[j].replace(/^['"]/, '').replace(/['"]$/, '');
        lastIter = j !== keys.length - 1;
        lastObj = obj;
        if ((key !== '' && key !== ' ') || j === 0) {
          if (obj[key] === undef) {
            obj[key] = {};
          }
          obj = obj[key];
        }
        else { // To insert new dimension
          ct = -1;
          for (p in obj) {
            if (obj.hasOwnProperty(p)) {
              if (+p > ct && p.match(/^\d+$/g)) {
                ct = +p;
              }
            }
          }
          key = ct + 1;
        }
      }
      lastObj[key] = value;
    }
  }
}
function printf () {
  // http://kevin.vanzonneveld.net
  // +   original by: Ash Searle (http://hexmen.com/blog/)
  // +   improved by: Michael White (http://getsprink.com)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: sprintf
  // *     example 1: printf("%01.2f", 123.1);
  // *     returns 1: 6
  var body, elmt, d = this.window.document;
  var ret = '';

  var HTMLNS = 'http://www.w3.org/1999/xhtml';
  body = d.getElementsByTagNameNS ? (d.getElementsByTagNameNS(HTMLNS, 'body')[0] ? d.getElementsByTagNameNS(HTMLNS, 'body')[0] : d.documentElement.lastChild) : d.getElementsByTagName('body')[0];

  if (!body) {
    return false;
  }

  ret = this.sprintf.apply(this, arguments);

  elmt = d.createTextNode(ret);
  body.appendChild(elmt);

  return ret.length;
}
function quoted_printable_decode (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ole Vrijenhoek
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   reimplemented by: Theriault
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Theriault
  // *     example 1: quoted_printable_decode('a=3Db=3Dc');
  // *     returns 1: 'a=b=c'
  // *     example 2: quoted_printable_decode('abc  =20\r\n123  =20\r\n');
  // *     returns 2: 'abc   \r\n123   \r\n'
  // *     example 3: quoted_printable_decode('012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n56789');
  // *     returns 3: '01234567890123456789012345678901234567890123456789012345678901234567890123456789'
  // *    example 4: quoted_printable_decode("Lorem ipsum dolor sit amet=23, consectetur adipisicing elit");
  // *    returns 4: Lorem ipsum dolor sit amet#, consectetur adipisicing elit
  // Removes softline breaks
  var RFC2045Decode1 = /=\r\n/gm,
    // Decodes all equal signs followed by two hex digits
    RFC2045Decode2IN = /=([0-9A-F]{2})/gim,
    // the RFC states against decoding lower case encodings, but following apparent PHP behavior
    // RFC2045Decode2IN = /=([0-9A-F]{2})/gm,
    RFC2045Decode2OUT = function (sMatch, sHex) {
      return String.fromCharCode(parseInt(sHex, 16));
    };
  return str.replace(RFC2045Decode1, '').replace(RFC2045Decode2IN, RFC2045Decode2OUT);
}
function quoted_printable_encode (str) {
  // +   original by: Theriault
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // *     example 1: quoted_printable_encode('a=b=c');
  // *     returns 1: 'a=3Db=3Dc'
  // *     example 2: quoted_printable_encode('abc   \r\n123   \r\n');
  // *     returns 2: 'abc  =20\r\n123  =20\r\n'
  // *     example 3: quoted_printable_encode('0123456789012345678901234567890123456789012345678901234567890123456789012345');
  // *     returns 3: '012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n5'
  // RFC 2045: 6.7.2: Octets with decimal values of 33 through 60 (bang to less-than) inclusive, and 62 through 126 (greater-than to tilde), inclusive, MAY be represented as the US-ASCII characters
  // PHP does not encode any of the above; as does this function.
  // RFC 2045: 6.7.3: Octets with values of 9 and 32 MAY be represented as US-ASCII TAB (HT) and SPACE characters, respectively, but MUST NOT be so represented at the end of an encoded line
  // PHP does not encode spaces (octet 32) except before a CRLF sequence as stated above. PHP always encodes tabs (octet 9). This function replicates PHP.
  // RFC 2045: 6.7.4: A line break in a text body, represented as a CRLF sequence in the text canonical form, must be represented by a (RFC 822) line break
  // PHP does not encode a CRLF sequence, as does this function.
  // RFC 2045: 6.7.5: The Quoted-Printable encoding REQUIRES that encoded lines be no more than 76 characters long. If longer lines are to be encoded with the Quoted-Printable encoding, "soft" line breaks must be used.
  // PHP breaks lines greater than 76 characters; as does this function.
  var hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
    RFC2045Encode1IN = / \r\n|\r\n|[^!-<>-~ ]/gm,
    RFC2045Encode1OUT = function (sMatch) {
      // Encode space before CRLF sequence to prevent spaces from being stripped
      // Keep hard line breaks intact; CRLF sequences
      if (sMatch.length > 1) {
        return sMatch.replace(' ', '=20');
      }
      // Encode matching character
      var chr = sMatch.charCodeAt(0);
      return '=' + hexChars[((chr >>> 4) & 15)] + hexChars[(chr & 15)];
    },
    // Split lines to 75 characters; the reason it's 75 and not 76 is because softline breaks are preceeded by an equal sign; which would be the 76th character.
    // However, if the last line/string was exactly 76 characters, then a softline would not be needed. PHP currently softbreaks anyway; so this function replicates PHP.
    RFC2045Encode2IN = /.{1,72}(?!\r\n)[^=]{0,3}/g,
    RFC2045Encode2OUT = function (sMatch) {
      if (sMatch.substr(sMatch.length - 2) === '\r\n') {
        return sMatch;
      }
      return sMatch + '=\r\n';
    };
  str = str.replace(RFC2045Encode1IN, RFC2045Encode1OUT).replace(RFC2045Encode2IN, RFC2045Encode2OUT);
  // Strip last softline break
  return str.substr(0, str.length - 3);
}
function quotemeta (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  // *     example 1: quotemeta(". + * ? ^ ( $ )");
  // *     returns 1: '\. \+ \* \? \^ \( \$ \)'
  return (str + '').replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1');
}
function rtrim (str, charlist) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Erkekjetter
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   input by: rem
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: rtrim('    Kevin van Zonneveld    ');
  // *     returns 1: '    Kevin van Zonneveld'
  charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
  var re = new RegExp('[' + charlist + ']+$', 'g');
  return (str + '').replace(re, '');
}
function setlocale (category, locale) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   derived from: Blues at http://hacks.bluesmoon.info/strftime/strftime.js
  // +   derived from: YUI Library: http://developer.yahoo.com/yui/docs/YAHOO.util.DateLocale.html
  // -    depends on: getenv
  // %          note 1: Is extensible, but currently only implements locales en,
  // %          note 1: en_US, en_GB, en_AU, fr, and fr_CA for LC_TIME only; C for LC_CTYPE;
  // %          note 1: C and en for LC_MONETARY/LC_NUMERIC; en for LC_COLLATE
  // %          note 2: Uses global: php_js to store locale info
  // %          note 3: Consider using http://demo.icu-project.org/icu-bin/locexp as basis for localization (as in i18n_loc_set_default())
  // *     example 1: setlocale('LC_ALL', 'en_US');
  // *     returns 1: 'en_US'
  var categ = '',
    cats = [],
    i = 0,
    d = this.window.document;

  // BEGIN STATIC
  var _copy = function _copy(orig) {
    if (orig instanceof RegExp) {
      return new RegExp(orig);
    } else if (orig instanceof Date) {
      return new Date(orig);
    }
    var newObj = {};
    for (var i in orig) {
      if (typeof orig[i] === 'object') {
        newObj[i] = _copy(orig[i]);
      } else {
        newObj[i] = orig[i];
      }
    }
    return newObj;
  };

  // Function usable by a ngettext implementation (apparently not an accessible part of setlocale(), but locale-specific)
  // See http://www.gnu.org/software/gettext/manual/gettext.html#Plural-forms though amended with others from
  // https://developer.mozilla.org/En/Localization_and_Plurals (new categories noted with "MDC" below, though
  // not sure of whether there is a convention for the relative order of these newer groups as far as ngettext)
  // The function name indicates the number of plural forms (nplural)
  // Need to look into http://cldr.unicode.org/ (maybe future JavaScript); Dojo has some functions (under new BSD),
  // including JSON conversions of LDML XML from CLDR: http://bugs.dojotoolkit.org/browser/dojo/trunk/cldr
  // and docs at http://api.dojotoolkit.org/jsdoc/HEAD/dojo.cldr
  var _nplurals1 = function (n) { // e.g., Japanese
    return 0;
  };
  var _nplurals2a = function (n) { // e.g., English
    return n !== 1 ? 1 : 0;
  };
  var _nplurals2b = function (n) { // e.g., French
    return n > 1 ? 1 : 0;
  };
  var _nplurals2c = function (n) { // e.g., Icelandic (MDC)
    return n % 10 === 1 && n % 100 !== 11 ? 0 : 1;
  };
  var _nplurals3a = function (n) { // e.g., Latvian (MDC has a different order from gettext)
    return n % 10 === 1 && n % 100 !== 11 ? 0 : n !== 0 ? 1 : 2;
  };
  var _nplurals3b = function (n) { // e.g., Scottish Gaelic
    return n === 1 ? 0 : n === 2 ? 1 : 2;
  };
  var _nplurals3c = function (n) { // e.g., Romanian
    return n === 1 ? 0 : (n === 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2;
  };
  var _nplurals3d = function (n) { // e.g., Lithuanian (MDC has a different order from gettext)
    return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  };
  var _nplurals3e = function (n) { // e.g., Croatian
    return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  };
  var _nplurals3f = function (n) { // e.g., Slovak
    return n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
  };
  var _nplurals3g = function (n) { // e.g., Polish
    return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  };
  var _nplurals3h = function (n) { // e.g., Macedonian (MDC)
    return n % 10 === 1 ? 0 : n % 10 === 2 ? 1 : 2;
  };
  var _nplurals4a = function (n) { // e.g., Slovenian
    return n % 100 === 1 ? 0 : n % 100 === 2 ? 1 : n % 100 === 3 || n % 100 === 4 ? 2 : 3;
  };
  var _nplurals4b = function (n) { // e.g., Maltese (MDC)
    return n === 1 ? 0 : n === 0 || (n % 100 && n % 100 <= 10) ? 1 : n % 100 >= 11 && n % 100 <= 19 ? 2 : 3;
  };
  var _nplurals5 = function (n) { // e.g., Irish Gaeilge (MDC)
    return n === 1 ? 0 : n === 2 ? 1 : n >= 3 && n <= 6 ? 2 : n >= 7 && n <= 10 ? 3 : 4;
  };
  var _nplurals6 = function (n) { // e.g., Arabic (MDC) - Per MDC puts 0 as last group
    return n === 0 ? 5 : n === 1 ? 0 : n === 2 ? 1 : n % 100 >= 3 && n % 100 <= 10 ? 2 : n % 100 >= 11 && n % 100 <= 99 ? 3 : 4;
  };
  // END STATIC
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};

  var phpjs = this.php_js;

  // Reconcile Windows vs. *nix locale names?
  // Allow different priority orders of languages, esp. if implement gettext as in
  //     LANGUAGE env. var.? (e.g., show German if French is not available)
  if (!phpjs.locales) {
    // Can add to the locales
    phpjs.locales = {};

    phpjs.locales.en = {
      'LC_COLLATE': // For strcoll


      function (str1, str2) { // Fix: This one taken from strcmp, but need for other locales; we don't use localeCompare since its locale is not settable
        return (str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1);
      },
      'LC_CTYPE': { // Need to change any of these for English as opposed to C?
        an: /^[A-Za-z\d]+$/g,
        al: /^[A-Za-z]+$/g,
        ct: /^[\u0000-\u001F\u007F]+$/g,
        dg: /^[\d]+$/g,
        gr: /^[\u0021-\u007E]+$/g,
        lw: /^[a-z]+$/g,
        pr: /^[\u0020-\u007E]+$/g,
        pu: /^[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]+$/g,
        sp: /^[\f\n\r\t\v ]+$/g,
        up: /^[A-Z]+$/g,
        xd: /^[A-Fa-f\d]+$/g,
        CODESET: 'UTF-8',
        // Used by sql_regcase
        lower: 'abcdefghijklmnopqrstuvwxyz',
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      },
      'LC_TIME': { // Comments include nl_langinfo() constant equivalents and any changes from Blues' implementation
        a: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        // ABDAY_
        A: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        // DAY_
        b: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        // ABMON_
        B: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        // MON_
        c: '%a %d %b %Y %r %Z',
        // D_T_FMT // changed %T to %r per results
        p: ['AM', 'PM'],
        // AM_STR/PM_STR
        P: ['am', 'pm'],
        // Not available in nl_langinfo()
        r: '%I:%M:%S %p',
        // T_FMT_AMPM (Fixed for all locales)
        x: '%m/%d/%Y',
        // D_FMT // switched order of %m and %d; changed %y to %Y (C uses %y)
        X: '%r',
        // T_FMT // changed from %T to %r  (%T is default for C, not English US)
        // Following are from nl_langinfo() or http://www.cptec.inpe.br/sx4/sx4man2/g1ab02e/strftime.4.html
        alt_digits: '',
        // e.g., ordinal
        ERA: '',
        ERA_YEAR: '',
        ERA_D_T_FMT: '',
        ERA_D_FMT: '',
        ERA_T_FMT: ''
      },
      // Assuming distinction between numeric and monetary is thus:
      // See below for C locale
      'LC_MONETARY': { // Based on Windows "english" (English_United States.1252) locale
        int_curr_symbol: 'USD',
        currency_symbol: '$',
        mon_decimal_point: '.',
        mon_thousands_sep: ',',
        mon_grouping: [3],
        // use mon_thousands_sep; "" for no grouping; additional array members indicate successive group lengths after first group (e.g., if to be 1,23,456, could be [3, 2])
        positive_sign: '',
        negative_sign: '-',
        int_frac_digits: 2,
        // Fractional digits only for money defaults?
        frac_digits: 2,
        p_cs_precedes: 1,
        // positive currency symbol follows value = 0; precedes value = 1
        p_sep_by_space: 0,
        // 0: no space between curr. symbol and value; 1: space sep. them unless symb. and sign are adjacent then space sep. them from value; 2: space sep. sign and value unless symb. and sign are adjacent then space separates
        n_cs_precedes: 1,
        // see p_cs_precedes
        n_sep_by_space: 0,
        // see p_sep_by_space
        p_sign_posn: 3,
        // 0: parentheses surround quantity and curr. symbol; 1: sign precedes them; 2: sign follows them; 3: sign immed. precedes curr. symbol; 4: sign immed. succeeds curr. symbol
        n_sign_posn: 0 // see p_sign_posn
      },
      'LC_NUMERIC': { // Based on Windows "english" (English_United States.1252) locale
        decimal_point: '.',
        thousands_sep: ',',
        grouping: [3] // see mon_grouping, but for non-monetary values (use thousands_sep)
      },
      'LC_MESSAGES': {
        YESEXPR: '^[yY].*',
        NOEXPR: '^[nN].*',
        YESSTR: '',
        NOSTR: ''
      },
      nplurals: _nplurals2a
    };
    phpjs.locales.en_US = _copy(phpjs.locales.en);
    phpjs.locales.en_US.LC_TIME.c = '%a %d %b %Y %r %Z';
    phpjs.locales.en_US.LC_TIME.x = '%D';
    phpjs.locales.en_US.LC_TIME.X = '%r';
    // The following are based on *nix settings
    phpjs.locales.en_US.LC_MONETARY.int_curr_symbol = 'USD ';
    phpjs.locales.en_US.LC_MONETARY.p_sign_posn = 1;
    phpjs.locales.en_US.LC_MONETARY.n_sign_posn = 1;
    phpjs.locales.en_US.LC_MONETARY.mon_grouping = [3, 3];
    phpjs.locales.en_US.LC_NUMERIC.thousands_sep = '';
    phpjs.locales.en_US.LC_NUMERIC.grouping = [];

    phpjs.locales.en_GB = _copy(phpjs.locales.en);
    phpjs.locales.en_GB.LC_TIME.r = '%l:%M:%S %P %Z';

    phpjs.locales.en_AU = _copy(phpjs.locales.en_GB);
    phpjs.locales.C = _copy(phpjs.locales.en); // Assume C locale is like English (?) (We need C locale for LC_CTYPE)
    phpjs.locales.C.LC_CTYPE.CODESET = 'ANSI_X3.4-1968';
    phpjs.locales.C.LC_MONETARY = {
      int_curr_symbol: '',
      currency_symbol: '',
      mon_decimal_point: '',
      mon_thousands_sep: '',
      mon_grouping: [],
      p_cs_precedes: 127,
      p_sep_by_space: 127,
      n_cs_precedes: 127,
      n_sep_by_space: 127,
      p_sign_posn: 127,
      n_sign_posn: 127,
      positive_sign: '',
      negative_sign: '',
      int_frac_digits: 127,
      frac_digits: 127
    };
    phpjs.locales.C.LC_NUMERIC = {
      decimal_point: '.',
      thousands_sep: '',
      grouping: []
    };
    phpjs.locales.C.LC_TIME.c = '%a %b %e %H:%M:%S %Y'; // D_T_FMT
    phpjs.locales.C.LC_TIME.x = '%m/%d/%y'; // D_FMT
    phpjs.locales.C.LC_TIME.X = '%H:%M:%S'; // T_FMT
    phpjs.locales.C.LC_MESSAGES.YESEXPR = '^[yY]';
    phpjs.locales.C.LC_MESSAGES.NOEXPR = '^[nN]';

    phpjs.locales.fr = _copy(phpjs.locales.en);
    phpjs.locales.fr.nplurals = _nplurals2b;
    phpjs.locales.fr.LC_TIME.a = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
    phpjs.locales.fr.LC_TIME.A = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    phpjs.locales.fr.LC_TIME.b = ['jan', 'f\u00E9v', 'mar', 'avr', 'mai', 'jun', 'jui', 'ao\u00FB', 'sep', 'oct', 'nov', 'd\u00E9c'];
    phpjs.locales.fr.LC_TIME.B = ['janvier', 'f\u00E9vrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'ao\u00FBt', 'septembre', 'octobre', 'novembre', 'd\u00E9cembre'];
    phpjs.locales.fr.LC_TIME.c = '%a %d %b %Y %T %Z';
    phpjs.locales.fr.LC_TIME.p = ['', ''];
    phpjs.locales.fr.LC_TIME.P = ['', ''];
    phpjs.locales.fr.LC_TIME.x = '%d.%m.%Y';
    phpjs.locales.fr.LC_TIME.X = '%T';

    phpjs.locales.fr_CA = _copy(phpjs.locales.fr);
    phpjs.locales.fr_CA.LC_TIME.x = '%Y-%m-%d';
  }
  if (!phpjs.locale) {
    phpjs.locale = 'en_US';
    var NS_XHTML = 'http://www.w3.org/1999/xhtml';
    var NS_XML = 'http://www.w3.org/XML/1998/namespace';
    if (d.getElementsByTagNameNS && d.getElementsByTagNameNS(NS_XHTML, 'html')[0]) {
      if (d.getElementsByTagNameNS(NS_XHTML, 'html')[0].getAttributeNS && d.getElementsByTagNameNS(NS_XHTML, 'html')[0].getAttributeNS(NS_XML, 'lang')) {
        phpjs.locale = d.getElementsByTagName(NS_XHTML, 'html')[0].getAttributeNS(NS_XML, 'lang');
      } else if (d.getElementsByTagNameNS(NS_XHTML, 'html')[0].lang) { // XHTML 1.0 only
        phpjs.locale = d.getElementsByTagNameNS(NS_XHTML, 'html')[0].lang;
      }
    } else if (d.getElementsByTagName('html')[0] && d.getElementsByTagName('html')[0].lang) {
      phpjs.locale = d.getElementsByTagName('html')[0].lang;
    }
  }
  phpjs.locale = phpjs.locale.replace('-', '_'); // PHP-style
  // Fix locale if declared locale hasn't been defined
  if (!(phpjs.locale in phpjs.locales)) {
    if (phpjs.locale.replace(/_[a-zA-Z]+$/, '') in phpjs.locales) {
      phpjs.locale = phpjs.locale.replace(/_[a-zA-Z]+$/, '');
    }
  }

  if (!phpjs.localeCategories) {
    phpjs.localeCategories = {
      'LC_COLLATE': phpjs.locale,
      // for string comparison, see strcoll()
      'LC_CTYPE': phpjs.locale,
      // for character classification and conversion, for example strtoupper()
      'LC_MONETARY': phpjs.locale,
      // for localeconv()
      'LC_NUMERIC': phpjs.locale,
      // for decimal separator (See also localeconv())
      'LC_TIME': phpjs.locale,
      // for date and time formatting with strftime()
      'LC_MESSAGES': phpjs.locale // for system responses (available if PHP was compiled with libintl)
    };
  }
  // END REDUNDANT
  if (locale === null || locale === '') {
    locale = this.getenv(category) || this.getenv('LANG');
  } else if (Object.prototype.toString.call(locale) === '[object Array]') {
    for (i = 0; i < locale.length; i++) {
      if (!(locale[i] in this.php_js.locales)) {
        if (i === locale.length - 1) {
          return false; // none found
        }
        continue;
      }
      locale = locale[i];
      break;
    }
  }

  // Just get the locale
  if (locale === '0' || locale === 0) {
    if (category === 'LC_ALL') {
      for (categ in this.php_js.localeCategories) {
        cats.push(categ + '=' + this.php_js.localeCategories[categ]); // Add ".UTF-8" or allow ".@latint", etc. to the end?
      }
      return cats.join(';');
    }
    return this.php_js.localeCategories[category];
  }

  if (!(locale in this.php_js.locales)) {
    return false; // Locale not found
  }

  // Set and get locale
  if (category === 'LC_ALL') {
    for (categ in this.php_js.localeCategories) {
      this.php_js.localeCategories[categ] = locale;
    }
  } else {
    this.php_js.localeCategories[category] = locale;
  }
  return locale;
}
function sha1 (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // + namespaced by: Michael White (http://getsprink.com)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: utf8_encode
  // *     example 1: sha1('Kevin van Zonneveld');
  // *     returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
  var rotate_left = function (n, s) {
    var t4 = (n << s) | (n >>> (32 - s));
    return t4;
  };

/*var lsb_hex = function (val) { // Not in use; needed?
    var str="";
    var i;
    var vh;
    var vl;

    for ( i=0; i<=6; i+=2 ) {
      vh = (val>>>(i*4+4))&0x0f;
      vl = (val>>>(i*4))&0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  };*/

  var cvt_hex = function (val) {
    var str = "";
    var i;
    var v;

    for (i = 7; i >= 0; i--) {
      v = (val >>> (i * 4)) & 0x0f;
      str += v.toString(16);
    }
    return str;
  };

  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;

  str = this.utf8_encode(str);
  var str_len = str.length;

  var word_array = [];
  for (i = 0; i < str_len - 3; i += 4) {
    j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
    word_array.push(j);
  }

  switch (str_len % 4) {
  case 0:
    i = 0x080000000;
    break;
  case 1:
    i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
    break;
  case 2:
    i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
    break;
  case 3:
    i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 0x80;
    break;
  }

  word_array.push(i);

  while ((word_array.length % 16) != 14) {
    word_array.push(0);
  }

  word_array.push(str_len >>> 29);
  word_array.push((str_len << 3) & 0x0ffffffff);

  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
    for (i = 0; i < 16; i++) {
      W[i] = word_array[blockstart + i];
    }
    for (i = 16; i <= 79; i++) {
      W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
    }


    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;

    for (i = 0; i <= 19; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 20; i <= 39; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 40; i <= 59; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 60; i <= 79; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }

  temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
  return temp.toLowerCase();
}
function sha1_file (str_filename) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: file_get_contents
  // -    depends on: sha1
  // *     example 1: sha1_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  // *     returns 1: '40bd001563085fc35165329ea1ff5c5ecbdbbeef'
  var buf = this.file_get_contents(str_filename);
  return this.sha1(buf);
}
function similar_text (first, second, percent) {
  // http://kevin.vanzonneveld.net
  // +   original by: Rafał Kukawski (http://blog.kukawski.pl)
  // +   bugfixed by: Chris McMacken
  // +   added percent parameter by: Markus Padourek (taken from http://www.kevinhq.com/2012/06/php-similartext-function-in-javascript_16.html)
  // *     example 1: similar_text('Hello World!', 'Hello phpjs!');
  // *     returns 1: 7
  // *     example 2: similar_text('Hello World!', null);
  // *     returns 2: 0
  // *     example 3: similar_text('Hello World!', null, 1);
  // *     returns 3: 58.33
  if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
    return 0;
  }

  first += '';
  second += '';

  var pos1 = 0,
    pos2 = 0,
    max = 0,
    firstLength = first.length,
    secondLength = second.length,
    p, q, l, sum;

  max = 0;

  for (p = 0; p < firstLength; p++) {
    for (q = 0; q < secondLength; q++) {
      for (l = 0;
      (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++);
      if (l > max) {
        max = l;
        pos1 = p;
        pos2 = q;
      }
    }
  }

  sum = max;

  if (sum) {
    if (pos1 && pos2) {
      sum += this.similar_text(first.substr(0, pos2), second.substr(0, pos2));
    }

    if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
      sum += this.similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max));
    }
  }

  if (!percent) {
    return sum;
  } else {
    return (sum * 200) / (firstLength + secondLength);
  }
}
function soundex (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +    tweaked by: Jack
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   original by: Arnout Kazemier (http://www.3rd-Eden.com)
  // +    revised by: Rafał Kukawski (http://blog.kukawski.pl)
  // *     example 1: soundex('Kevin');
  // *     returns 1: 'K150'
  // *     example 2: soundex('Ellery');
  // *     returns 2: 'E460'
  // *     example 3: soundex('Euler');
  // *     returns 3: 'E460'
  str = (str + '').toUpperCase();
  if (!str) {
    return '';
  }
  var sdx = [0, 0, 0, 0],
    m = {
      B: 1,
      F: 1,
      P: 1,
      V: 1,
      C: 2,
      G: 2,
      J: 2,
      K: 2,
      Q: 2,
      S: 2,
      X: 2,
      Z: 2,
      D: 3,
      T: 3,
      L: 4,
      M: 5,
      N: 5,
      R: 6
    },
    i = 0,
    j, s = 0,
    c, p;

  while ((c = str.charAt(i++)) && s < 4) {
    if (j = m[c]) {
      if (j !== p) {
        sdx[s++] = p = j;
      }
    } else {
      s += i === 1;
      p = 0;
    }
  }

  sdx[0] = str.charAt(0);
  return sdx.join('');
}
function split (delimiter, string) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: explode
  // *     example 1: split(' ', 'Kevin van Zonneveld');
  // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
  return this.explode(delimiter, string);
}
function sprintf () {
  // http://kevin.vanzonneveld.net
  // +   original by: Ash Searle (http://hexmen.com/blog/)
  // + namespaced by: Michael White (http://getsprink.com)
  // +    tweaked by: Jack
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Paulo Freitas
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Dj
  // +   improved by: Allidylls
  // *     example 1: sprintf("%01.2f", 123.1);
  // *     returns 1: 123.10
  // *     example 2: sprintf("[%10s]", 'monkey');
  // *     returns 2: '[    monkey]'
  // *     example 3: sprintf("[%'#10s]", 'monkey');
  // *     returns 3: '[####monkey]'
  // *     example 4: sprintf("%d", 123456789012345);
  // *     returns 4: '123456789012345'
  var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
  var a = arguments,
    i = 0,
    format = a[i++];

  // pad()
  var pad = function (str, len, chr, leftJustify) {
    if (!chr) {
      chr = ' ';
    }
    var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
    return leftJustify ? str + padding : padding + str;
  };

  // justify()
  var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
    var diff = minWidth - value.length;
    if (diff > 0) {
      if (leftJustify || !zeroPad) {
        value = pad(value, minWidth, customPadChar, leftJustify);
      } else {
        value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
      }
    }
    return value;
  };

  // formatBaseX()
  var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
    // Note: casts negative numbers to positive ones
    var number = value >>> 0;
    prefix = prefix && number && {
      '2': '0b',
      '8': '0',
      '16': '0x'
    }[base] || '';
    value = prefix + pad(number.toString(base), precision || 0, '0', false);
    return justify(value, prefix, leftJustify, minWidth, zeroPad);
  };

  // formatString()
  var formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
    if (precision != null) {
      value = value.slice(0, precision);
    }
    return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
  };

  // doFormat()
  var doFormat = function (substring, valueIndex, flags, minWidth, _, precision, type) {
    var number;
    var prefix;
    var method;
    var textTransform;
    var value;

    if (substring === '%%') {
      return '%';
    }

    // parse flags
    var leftJustify = false,
      positivePrefix = '',
      zeroPad = false,
      prefixBaseX = false,
      customPadChar = ' ';
    var flagsl = flags.length;
    for (var j = 0; flags && j < flagsl; j++) {
      switch (flags.charAt(j)) {
      case ' ':
        positivePrefix = ' ';
        break;
      case '+':
        positivePrefix = '+';
        break;
      case '-':
        leftJustify = true;
        break;
      case "'":
        customPadChar = flags.charAt(j + 1);
        break;
      case '0':
        zeroPad = true;
        break;
      case '#':
        prefixBaseX = true;
        break;
      }
    }

    // parameters may be null, undefined, empty-string or real valued
    // we want to ignore null, undefined and empty-string values
    if (!minWidth) {
      minWidth = 0;
    } else if (minWidth === '*') {
      minWidth = +a[i++];
    } else if (minWidth.charAt(0) == '*') {
      minWidth = +a[minWidth.slice(1, -1)];
    } else {
      minWidth = +minWidth;
    }

    // Note: undocumented perl feature:
    if (minWidth < 0) {
      minWidth = -minWidth;
      leftJustify = true;
    }

    if (!isFinite(minWidth)) {
      throw new Error('sprintf: (minimum-)width must be finite');
    }

    if (!precision) {
      precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined;
    } else if (precision === '*') {
      precision = +a[i++];
    } else if (precision.charAt(0) == '*') {
      precision = +a[precision.slice(1, -1)];
    } else {
      precision = +precision;
    }

    // grab value using valueIndex if required?
    value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

    switch (type) {
    case 's':
      return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
    case 'c':
      return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
    case 'b':
      return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
    case 'o':
      return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
    case 'x':
      return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
    case 'X':
      return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
    case 'u':
      return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
    case 'i':
    case 'd':
      number = +value || 0;
      number = Math.round(number - number % 1); // Plain Math.round doesn't just truncate
      prefix = number < 0 ? '-' : positivePrefix;
      value = prefix + pad(String(Math.abs(number)), precision, '0', false);
      return justify(value, prefix, leftJustify, minWidth, zeroPad);
    case 'e':
    case 'E':
    case 'f': // Should handle locales (as per setlocale)
    case 'F':
    case 'g':
    case 'G':
      number = +value;
      prefix = number < 0 ? '-' : positivePrefix;
      method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
      textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
      value = prefix + Math.abs(number)[method](precision);
      return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
    default:
      return substring;
    }
  };

  return format.replace(regex, doFormat);
}
function sscanf (str, format) {
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Since JS does not support scalar reference variables, any additional arguments to the function will
  // %        note 1: only be allowable here as strings referring to a global variable (which will then be set to the value
  // %        note 1: found in 'str' corresponding to the appropriate conversion specification in 'format'
  // %        note 2: I am unclear on how WS is to be handled here because documentation seems to me to contradict PHP behavior
  // *     example 1: sscanf('SN/2350001', 'SN/%d');
  // *     returns 1: [2350001]
  // *     example 2: var myVar; // Will be set by function
  // *     example 2: sscanf('SN/2350001', 'SN/%d', 'myVar');
  // *     returns 2: 1
  // *     example 3: sscanf("10--20", "%2$d--%1$d"); // Must escape '$' in PHP, but not JS
  // *     returns 3: [20, 10]

  // SETUP
  var retArr = [],
    num = 0,
    _NWS = /\S/,
    args = arguments,
    that = this,
    digit;

  var _setExtraConversionSpecs = function (offset) {
    // Since a mismatched character sets us off track from future legitimate finds, we just scan
    // to the end for any other conversion specifications (besides a percent literal), setting them to null
    // sscanf seems to disallow all conversion specification components (of sprintf) except for type specifiers
    //var matches = format.match(/%[+-]?([ 0]|'.)?-?\d*(\.\d+)?[bcdeufFosxX]/g); // Do not allow % in last char. class
    var matches = format.slice(offset).match(/%[cdeEufgosxX]/g); // Do not allow % in last char. class;
    // b, F,G give errors in PHP, but 'g', though also disallowed, doesn't
    if (matches) {
      var lgth = matches.length;
      while (lgth--) {
        retArr.push(null);
      }
    }
    return _finish();
  };

  var _finish = function () {
    if (args.length === 2) {
      return retArr;
    }
    for (var i = 0; i < retArr.length; ++i) {
      that.window[args[i + 2]] = retArr[i];
    }
    return i;
  };

  var _addNext = function (j, regex, cb) {
    if (assign) {
      var remaining = str.slice(j);
      var check = width ? remaining.substr(0, width) : remaining;
      var match = regex.exec(check);
      var testNull = retArr[digit !== undefined ? digit : retArr.length] = match ? (cb ? cb.apply(null, match) : match[0]) : null;
      if (testNull === null) {
        throw 'No match in string';
      }
      return j + match[0].length;
    }
    return j;
  };

  if (arguments.length < 2) {
    throw 'Not enough arguments passed to sscanf';
  }

  // PROCESS
  for (var i = 0, j = 0; i < format.length; i++) {

    var width = 0,
      assign = true;

    if (format.charAt(i) === '%') {
      if (format.charAt(i + 1) === '%') {
        if (str.charAt(j) === '%') { // a matched percent literal
          ++i, ++j; // skip beyond duplicated percent
          continue;
        }
        // Format indicated a percent literal, but not actually present
        return _setExtraConversionSpecs(i + 2);
      }

      // CHARACTER FOLLOWING PERCENT IS NOT A PERCENT

      var prePattern = new RegExp('^(?:(\\d+)\\$)?(\\*)?(\\d*)([hlL]?)', 'g'); // We need 'g' set to get lastIndex

      var preConvs = prePattern.exec(format.slice(i + 1));

      var tmpDigit = digit;
      if (tmpDigit && preConvs[1] === undefined) {
        throw 'All groups in sscanf() must be expressed as numeric if any have already been used';
      }
      digit = preConvs[1] ? parseInt(preConvs[1], 10) - 1 : undefined;

      assign = !preConvs[2];
      width = parseInt(preConvs[3], 10);
      var sizeCode = preConvs[4];
      i += prePattern.lastIndex;

      // Fix: Does PHP do anything with these? Seems not to matter
      if (sizeCode) { // This would need to be processed later
        switch (sizeCode) {
        case 'h':
          // Treats subsequent as short int (for d,i,n) or unsigned short int (for o,u,x)
        case 'l':
          // Treats subsequent as long int (for d,i,n), or unsigned long int (for o,u,x);
          //    or as double (for e,f,g) instead of float or wchar_t instead of char
        case 'L':
          // Treats subsequent as long double (for e,f,g)
          break;
        default:
          throw 'Unexpected size specifier in sscanf()!';
          break;
        }
      }
      // PROCESS CHARACTER
      try {
        switch (format.charAt(i + 1)) {
          // For detailed explanations, see http://web.archive.org/web/20031128125047/http://www.uwm.edu/cgi-bin/IMT/wwwman?topic=scanf%283%29&msection=
          // Also http://www.mathworks.com/access/helpdesk/help/techdoc/ref/sscanf.html
          // p, S, C arguments in C function not available
          // DOCUMENTED UNDER SSCANF
        case 'F':
          // Not supported in PHP sscanf; the argument is treated as a float, and
          //  presented as a floating-point number (non-locale aware)
          // sscanf doesn't support locales, so no need for two (see %f)
          break;
        case 'g':
          // Not supported in PHP sscanf; shorter of %e and %f
          // Irrelevant to input conversion
          break;
        case 'G':
          // Not supported in PHP sscanf; shorter of %E and %f
          // Irrelevant to input conversion
          break;
        case 'b':
          // Not supported in PHP sscanf; the argument is treated as an integer, and presented as a binary number
          // Not supported - couldn't distinguish from other integers
          break;
        case 'i':
          // Integer with base detection (Equivalent of 'd', but base 0 instead of 10)
          j = _addNext(j, /([+-])?(?:(?:0x([\da-fA-F]+))|(?:0([0-7]+))|(\d+))/, function (num, sign, hex, oct, dec) {
            return hex ? parseInt(num, 16) : oct ? parseInt(num, 8) : parseInt(num, 10);
          });
          break;
        case 'n':
          // Number of characters processed so far
          retArr[digit !== undefined ? digit : retArr.length - 1] = j;
          break;
          // DOCUMENTED UNDER SPRINTF
        case 'c':
          // Get character; suppresses skipping over whitespace! (but shouldn't be whitespace in format anyways, so no difference here)
          // Non-greedy match
          j = _addNext(j, new RegExp('.{1,' + (width || 1) + '}'));
          break;
        case 'D':
          // sscanf documented decimal number; equivalent of 'd';
        case 'd':
          // Optionally signed decimal integer
          j = _addNext(j, /([+-])?(?:0*)(\d+)/, function (num, sign, dec) {
            // Ignores initial zeroes, unlike %i and parseInt()
            var decInt = parseInt((sign || '') + dec, 10);
            if (decInt < 0) { // PHP also won't allow less than -2147483648
              return decInt < -2147483648 ? -2147483648 : decInt; // integer overflow with negative
            } else { // PHP also won't allow greater than -2147483647
              return decInt < 2147483647 ? decInt : 2147483647;
            }
          });
          break;
        case 'f':
          // Although sscanf doesn't support locales, this is used instead of '%F'; seems to be same as %e
        case 'E':
          // These don't discriminate here as both allow exponential float of either case
        case 'e':
          j = _addNext(j, /([+-])?(?:0*)(\d*\.?\d*(?:[eE]?\d+)?)/, function (num, sign, dec) {
            if (dec === '.') {
              return null;
            }
            return parseFloat((sign || '') + dec); // Ignores initial zeroes, unlike %i and parseFloat()
          });
          break;
        case 'u':
          // unsigned decimal integer
          // We won't deal with integer overflows due to signs
          j = _addNext(j, /([+-])?(?:0*)(\d+)/, function (num, sign, dec) {
            // Ignores initial zeroes, unlike %i and parseInt()
            var decInt = parseInt(dec, 10);
            if (sign === '-') { // PHP also won't allow greater than 4294967295
              return 4294967296 - decInt; // integer overflow with negative
            } else {
              return decInt < 4294967295 ? decInt : 4294967295;
            }
          });
          break;
        case 'o':
          // Octal integer // Fix: add overflows as above?
          j = _addNext(j, /([+-])?(?:0([0-7]+))/, function (num, sign, oct) {
            return parseInt(num, 8);
          });
          break;
        case 's':
          // Greedy match
          j = _addNext(j, /\S+/);
          break;
        case 'X':
          // Same as 'x'?
        case 'x':
          // Fix: add overflows as above?
          // Initial 0x not necessary here
          j = _addNext(j, /([+-])?(?:(?:0x)?([\da-fA-F]+))/, function (num, sign, hex) {
            return parseInt(num, 16);
          });
          break;
        case '':
          // If no character left in expression
          throw 'Missing character after percent mark in sscanf() format argument';
        default:
          throw 'Unrecognized character after percent mark in sscanf() format argument';
        }
      } catch (e) {
        if (e === 'No match in string') { // Allow us to exit
          return _setExtraConversionSpecs(i + 2);
        }
      }++i; // Calculate skipping beyond initial percent too
    } else if (format.charAt(i) !== str.charAt(j)) {
      // Fix: Double-check i whitespace ignored in string and/or formats
      _NWS.lastIndex = 0;
      if ((_NWS).test(str.charAt(j)) || str.charAt(j) === '') { // Whitespace doesn't need to be an exact match)
        return _setExtraConversionSpecs(i + 1);
      } else {
        // Adjust strings when encounter non-matching whitespace, so they align in future checks above
        str = str.slice(0, j) + str.slice(j + 1); // Ok to replace with j++;?
        i--;
      }
    } else {
      j++;
    }
  }

  // POST-PROCESSING
  return _finish();
}
function str_getcsv (input, delimiter, enclosure, escape) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: str_getcsv('"abc", "def", "ghi"');
  // *     returns 1: ['abc', 'def', 'ghi']
  var output = [];
  var backwards = function (str) { // We need to go backwards to simulate negative look-behind (don't split on
    //an escaped enclosure even if followed by the delimiter and another enclosure mark)
    return str.split('').reverse().join('');
  };
  var pq = function (str) { // preg_quote()
    return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
  };

  delimiter = delimiter || ',';
  enclosure = enclosure || '"';
  escape = escape || '\\';

  input = input.replace(new RegExp('^\\s*' + pq(enclosure)), '').replace(new RegExp(pq(enclosure) + '\\s*$'), '');

  // PHP behavior may differ by including whitespace even outside of the enclosure
  input = backwards(input).split(new RegExp(pq(enclosure) + '\\s*' + pq(delimiter) + '\\s*' + pq(enclosure) + '(?!' + pq(escape) + ')', 'g')).reverse();

  for (var i = 0; i < input.length; i++) {
    output.push(backwards(input[i]).replace(new RegExp(pq(escape) + pq(enclosure), 'g'), enclosure));
  }

  return output;
}
function str_ireplace (search, replace, subject) {
  // http://kevin.vanzonneveld.net
  // +   original by: Martijn Wieringa
  // +      input by: penutbutterjelly
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    tweaked by: Jack
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Philipp Lenssen
  // *     example 1: str_ireplace('l', 'l', 'HeLLo');
  // *     returns 1: 'Hello'
  // *     example 2: str_ireplace('$', 'foo', '$bar');
  // *     returns 2: 'foobar'
  var i, k = '';
  var searchl = 0;
  var reg;

  var escapeRegex = function (s) {
    return s.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g, '\\$1');
  };

  search += '';
  searchl = search.length;
  if (Object.prototype.toString.call(replace) !== '[object Array]') {
    replace = [replace];
    if (Object.prototype.toString.call(search) === '[object Array]') {
      // If search is an array and replace is a string,
      // then this replacement string is used for every value of search
      while (searchl > replace.length) {
        replace[replace.length] = replace[0];
      }
    }
  }

  if (Object.prototype.toString.call(search) !== '[object Array]') {
    search = [search];
  }
  while (search.length > replace.length) {
    // If replace has fewer values than search,
    // then an empty string is used for the rest of replacement values
    replace[replace.length] = '';
  }

  if (Object.prototype.toString.call(subject) === '[object Array]') {
    // If subject is an array, then the search and replace is performed
    // with every entry of subject , and the return value is an array as well.
    for (k in subject) {
      if (subject.hasOwnProperty(k)) {
        subject[k] = str_ireplace(search, replace, subject[k]);
      }
    }
    return subject;
  }

  searchl = search.length;
  for (i = 0; i < searchl; i++) {
    reg = new RegExp(escapeRegex(search[i]), 'gi');
    subject = subject.replace(reg, replace[i]);
  }

  return subject;
}
function str_pad (input, pad_length, pad_string, pad_type) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // + namespaced by: Michael White (http://getsprink.com)
  // +      input by: Marco van Oort
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
  // *     returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
  // *     example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
  // *     returns 2: '------Kevin van Zonneveld-----'
  var half = '',
    pad_to_go;

  var str_pad_repeater = function (s, len) {
    var collect = '',
      i;

    while (collect.length < len) {
      collect += s;
    }
    collect = collect.substr(0, len);

    return collect;
  };

  input += '';
  pad_string = pad_string !== undefined ? pad_string : ' ';

  if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
    pad_type = 'STR_PAD_RIGHT';
  }
  if ((pad_to_go = pad_length - input.length) > 0) {
    if (pad_type === 'STR_PAD_LEFT') {
      input = str_pad_repeater(pad_string, pad_to_go) + input;
    } else if (pad_type === 'STR_PAD_RIGHT') {
      input = input + str_pad_repeater(pad_string, pad_to_go);
    } else if (pad_type === 'STR_PAD_BOTH') {
      half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
      input = half + input + half;
      input = input.substr(0, pad_length);
    }
  }

  return input;
}
function str_repeat (input, multiplier) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Ian Carter (http://euona.com/)
  // *     example 1: str_repeat('-=', 10);
  // *     returns 1: '-=-=-=-=-=-=-=-=-=-='

  var y = '';
  while (true) {
    if (multiplier & 1) {
      y += input;
    }
    multiplier >>= 1;
    if (multiplier) {
      input += input;
    }
    else {
      break;
    }
  }
  return y;
}
function str_replace (search, replace, subject, count) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Gabriel Paderni
  // +   improved by: Philip Peterson
  // +   improved by: Simon Willison (http://simonwillison.net)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   bugfixed by: Anton Ongson
  // +      input by: Onno Marsman
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    tweaked by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   input by: Oleg Eremeev
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Oleg Eremeev
  // %          note 1: The count parameter must be passed as a string in order
  // %          note 1:  to find a global variable in which the result will be given
  // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
  // *     returns 1: 'Kevin.van.Zonneveld'
  // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
  // *     returns 2: 'hemmo, mars'
  var i = 0,
    j = 0,
    temp = '',
    repl = '',
    sl = 0,
    fl = 0,
    f = [].concat(search),
    r = [].concat(replace),
    s = subject,
    ra = Object.prototype.toString.call(r) === '[object Array]',
    sa = Object.prototype.toString.call(s) === '[object Array]';
  s = [].concat(s);
  if (count) {
    this.window[count] = 0;
  }

  for (i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue;
    }
    for (j = 0, fl = f.length; j < fl; j++) {
      temp = s[i] + '';
      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
      s[i] = (temp).split(f[j]).join(repl);
      if (count && s[i] !== temp) {
        this.window[count] += (temp.length - s[i].length) / f[j].length;
      }
    }
  }
  return sa ? s : s[0];
}
function str_rot13 (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Ates Goral (http://magnetiq.com)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // *     example 1: str_rot13('Kevin van Zonneveld');
  // *     returns 1: 'Xriva ina Mbaariryq'
  // *     example 2: str_rot13('Xriva ina Mbaariryq');
  // *     returns 2: 'Kevin van Zonneveld'
  // *     example 3: str_rot13(33);
  // *     returns 3: '33'
  return (str + '').replace(/[a-z]/gi, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
  });
}
function str_shuffle (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: shuffled = str_shuffle("abcdef");
  // *     results 1: shuffled.length == 6
  if (arguments.length === 0) {
    throw 'Wrong parameter count for str_shuffle()';
  }

  if (str == null) {
    return '';
  }

  str += '';

  var newStr = '', rand, i = str.length;

  while (i) {
    rand = Math.floor(Math.random() * i);
    newStr += str.charAt(rand);
    str = str.substring(0, rand) + str.substr(rand + 1);
    i--;
  }

  return newStr;
}
function str_split (string, split_length) {
  // http://kevin.vanzonneveld.net
  // +     original by: Martijn Wieringa
  // +     improved by: Brett Zamir (http://brett-zamir.me)
  // +     bugfixed by: Onno Marsman
  // +      revised by: Theriault
  // +        input by: Bjorn Roesbeke (http://www.bjornroesbeke.be/)
  // +      revised by: Rafał Kukawski (http://blog.kukawski.pl/)
  // *       example 1: str_split('Hello Friend', 3);
  // *       returns 1: ['Hel', 'lo ', 'Fri', 'end']
  if (split_length === null) {
    split_length = 1;
  }
  if (string === null || split_length < 1) {
    return false;
  }
  string += '';
  var chunks = [],
    pos = 0,
    len = string.length;
  while (pos < len) {
    chunks.push(string.slice(pos, pos += split_length));
  }

  return chunks;
}
function str_word_count (str, format, charlist) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ole Vrijenhoek
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Bug?
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // -   depends on: ctype_alpha
  // *     example 1: str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1);
  // *     returns 1: ['Hello', 'fri', 'nd', "you're", 'looking', 'good', 'today']
  // *     example 2: str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 2);
  // *     returns 2: {0: 'Hello', 6: 'fri', 10: 'nd', 14: "you're", 29: 'looking', 46: 'good', 51: 'today'}
  // *     example 3: str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1, '\u00e0\u00e1\u00e3\u00e73');
  // *     returns 3: ['Hello', 'fri3nd', 'youre', 'looking', 'good', 'today']
  var len = str.length,
    cl = charlist && charlist.length,
    chr = '',
    tmpStr = '',
    i = 0,
    c = '',
    wArr = [],
    wC = 0,
    assoc = {},
    aC = 0,
    reg = '',
    match = false;

  // BEGIN STATIC
  var _preg_quote = function (str) {
    return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, '\\$1');
  },
    _getWholeChar = function (str, i) { // Use for rare cases of non-BMP characters
      var code = str.charCodeAt(i);
      if (code < 0xD800 || code > 0xDFFF) {
        return str.charAt(i);
      }
      if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
        if (str.length <= (i + 1)) {
          throw 'High surrogate without following low surrogate';
        }
        var next = str.charCodeAt(i + 1);
        if (0xDC00 > next || next > 0xDFFF) {
          throw 'High surrogate without following low surrogate';
        }
        return str.charAt(i) + str.charAt(i + 1);
      }
      // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
      if (i === 0) {
        throw 'Low surrogate without preceding high surrogate';
      }
      var prev = str.charCodeAt(i - 1);
      if (0xD800 > prev || prev > 0xDBFF) { // (could change last hex to 0xDB7F to treat high private surrogates as single characters)
        throw 'Low surrogate without preceding high surrogate';
      }
      return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
    };
  // END STATIC
  if (cl) {
    reg = '^(' + _preg_quote(_getWholeChar(charlist, 0));
    for (i = 1; i < cl; i++) {
      if ((chr = _getWholeChar(charlist, i)) === false) {
        continue;
      }
      reg += '|' + _preg_quote(chr);
    }
    reg += ')$';
    reg = new RegExp(reg);
  }

  for (i = 0; i < len; i++) {
    if ((c = _getWholeChar(str, i)) === false) {
      continue;
    }
    match = this.ctype_alpha(c) || (reg && c.search(reg) !== -1) || ((i !== 0 && i !== len - 1) && c === '-') || // No hyphen at beginning or end unless allowed in charlist (or locale)
    (i !== 0 && c === "'"); // No apostrophe at beginning unless allowed in charlist (or locale)
    if (match) {
      if (tmpStr === '' && format === 2) {
        aC = i;
      }
      tmpStr = tmpStr + c;
    }
    if (i === len - 1 || !match && tmpStr !== '') {
      if (format !== 2) {
        wArr[wArr.length] = tmpStr;
      } else {
        assoc[aC] = tmpStr;
      }
      tmpStr = '';
      wC++;
    }
  }

  if (!format) {
    return wC;
  } else if (format === 1) {
    return wArr;
  } else if (format === 2) {
    return assoc;
  }
  throw 'You have supplied an incorrect format';
}
function strcasecmp (f_string1, f_string2) {
  // http://kevin.vanzonneveld.net
  // +     original by: Martijn Wieringa
  // +     bugfixed by: Onno Marsman
  // *         example 1: strcasecmp('Hello', 'hello');
  // *         returns 1: 0
  var string1 = (f_string1 + '').toLowerCase();
  var string2 = (f_string2 + '').toLowerCase();

  if (string1 > string2) {
    return 1;
  } else if (string1 == string2) {
    return 0;
  }

  return -1;
}
function strchr (haystack, needle, bool) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // -    depends on: strstr
  // *     example 1: strchr('Kevin van Zonneveld', 'van');
  // *     returns 1: 'van Zonneveld'
  // *     example 2: strchr('Kevin van Zonneveld', 'van', true);
  // *     returns 2: 'Kevin '
  return this.strstr(haystack, needle, bool);
}
function strcmp (str1, str2) {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // +      input by: Steve Hilder
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: gorthaur
  // *     example 1: strcmp( 'waldo', 'owald' );
  // *     returns 1: 1
  // *     example 2: strcmp( 'owald', 'waldo' );
  // *     returns 2: -1
  return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
}
function strcoll (str1, str2) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: setlocale
  // *     example 1: strcoll('a', 'b');
  // *     returns 1: -1
  this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
  var cmp = this.php_js.locales[this.php_js.localeCategories.LC_COLLATE].LC_COLLATE;
  // return str1.localeCompare(str2); // We don't use this as it doesn't allow us to control it via setlocale()
  return cmp(str1, str2);
}
function strcspn (str, mask, start, length) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strcspn('abcdefg123', '1234567890');
  // *     returns 1: 7
  // *     example 2: strcspn('123abc', '1234567890');
  // *     returns 2: 3
  start = start ? start : 0;
  var count = (length && ((start + length) < str.length)) ? start + length : str.length;
  strct: for (var i = start, lgth = 0; i < count; i++) {
    for (var j = 0; j < mask.length; j++) {
      if (str.charAt(i).indexOf(mask[j]) !== -1) {
        continue strct;
      }
    }++lgth;
  }

  return lgth;
}
function strip_tags (input, allowed) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Luke Godfrey
  // +      input by: Pul
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +      input by: Alex
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Marc Palau
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Eric Nagel
  // +      input by: Bobby Drake
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Tomasz Wesolowski
  // +      input by: Evertjan Garretsen
  // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
  // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
  // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
  // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
  // *     returns 2: '<p>Kevin van Zonneveld</p>'
  // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
  // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
  // *     example 4: strip_tags('1 < 5 5 > 1');
  // *     returns 4: '1 < 5 5 > 1'
  // *     example 5: strip_tags('1 <br/> 1');
  // *     returns 5: '1  1'
  // *     example 6: strip_tags('1 <br/> 1', '<br>');
  // *     returns 6: '1  1'
  // *     example 7: strip_tags('1 <br/> 1', '<br><br/>');
  // *     returns 7: '1 <br/> 1'
  allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
  });
}
function stripos (f_haystack, f_needle, f_offset) {
  // http://kevin.vanzonneveld.net
  // +     original by: Martijn Wieringa
  // +      revised by: Onno Marsman
  // *         example 1: stripos('ABC', 'a');
  // *         returns 1: 0
  var haystack = (f_haystack + '').toLowerCase();
  var needle = (f_needle + '').toLowerCase();
  var index = 0;

  if ((index = haystack.indexOf(needle, f_offset)) !== -1) {
    return index;
  }
  return false;
}
function stripslashes (str) {
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Ates Goral (http://magnetiq.com)
  // +      fixed by: Mick@el
  // +   improved by: marrtins
  // +   bugfixed by: Onno Marsman
  // +   improved by: rezna
  // +   input by: Rick Waldron
  // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Brant Messenger (http://www.brantmessenger.com/)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: stripslashes('Kevin\'s code');
  // *     returns 1: "Kevin's code"
  // *     example 2: stripslashes('Kevin\\\'s code');
  // *     returns 2: "Kevin\'s code"
  return (str + '').replace(/\\(.?)/g, function (s, n1) {
    switch (n1) {
    case '\\':
      return '\\';
    case '0':
      return '\u0000';
    case '':
      return '';
    default:
      return n1;
    }
  });
}
function stristr (haystack, needle, bool) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfxied by: Onno Marsman
  // *     example 1: stristr('Kevin van Zonneveld', 'Van');
  // *     returns 1: 'van Zonneveld'
  // *     example 2: stristr('Kevin van Zonneveld', 'VAN', true);
  // *     returns 2: 'Kevin '
  var pos = 0;

  haystack += '';
  pos = haystack.toLowerCase().indexOf((needle + '').toLowerCase());
  if (pos == -1) {
    return false;
  } else {
    if (bool) {
      return haystack.substr(0, pos);
    } else {
      return haystack.slice(pos);
    }
  }
}
function strlen (string) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Sakimori
  // +      input by: Kirk Strobeck
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
  // %        note 1: characters and to this function in PHP which does not count the number of bytes
  // %        note 1: but counts the number of characters, something like this is really necessary.
  // *     example 1: strlen('Kevin van Zonneveld');
  // *     returns 1: 19
  // *     example 2: strlen('A\ud87e\udc04Z');
  // *     returns 2: 3
  var str = string + '';
  var i = 0,
    chr = '',
    lgth = 0;

  if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini['unicode.semantics'].local_value.toLowerCase() !== 'on') {
    return string.length;
  }

  var getWholeChar = function (str, i) {
    var code = str.charCodeAt(i);
    var next = '',
      prev = '';
    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
      if (str.length <= (i + 1)) {
        throw 'High surrogate without following low surrogate';
      }
      next = str.charCodeAt(i + 1);
      if (0xDC00 > next || next > 0xDFFF) {
        throw 'High surrogate without following low surrogate';
      }
      return str.charAt(i) + str.charAt(i + 1);
    } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
      if (i === 0) {
        throw 'Low surrogate without preceding high surrogate';
      }
      prev = str.charCodeAt(i - 1);
      if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
        throw 'Low surrogate without preceding high surrogate';
      }
      return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
    }
    return str.charAt(i);
  };

  for (i = 0, lgth = 0; i < str.length; i++) {
    if ((chr = getWholeChar(str, i)) === false) {
      continue;
    } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
    lgth++;
  }
  return lgth;
}
function strnatcasecmp (str1, str2) {
  // http://kevin.vanzonneveld.net
  // +      original by: Martin Pool
  // + reimplemented by: Pierre-Luc Paour
  // + reimplemented by: Kristof Coomans (SCK-CEN (Belgian Nucleair Research Centre))
  // + reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +         input by: Devan Penner-Woelk
  // +      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *        example 1: strnatcasecmp(10, 1);
  // *        returns 1: 1
  // *        example 1: strnatcasecmp('1', '10');
  // *        returns 1: -1
  var a = (str1 + '').toLowerCase();
  var b = (str2 + '').toLowerCase();

  var isWhitespaceChar = function (a) {
    return a.charCodeAt(0) <= 32;
  };

  var isDigitChar = function (a) {
    var charCode = a.charCodeAt(0);
    return (charCode >= 48 && charCode <= 57);
  };

  var compareRight = function (a, b) {
    var bias = 0;
    var ia = 0;
    var ib = 0;

    var ca;
    var cb;

    // The longest run of digits wins.  That aside, the greatest
    // value wins, but we can't know that it will until we've scanned
    // both numbers to know that they have the same magnitude, so we
    // remember it in BIAS.
    for (var cnt = 0; true; ia++, ib++) {
      ca = a.charAt(ia);
      cb = b.charAt(ib);

      if (!isDigitChar(ca) && !isDigitChar(cb)) {
        return bias;
      } else if (!isDigitChar(ca)) {
        return -1;
      } else if (!isDigitChar(cb)) {
        return 1;
      } else if (ca < cb) {
        if (bias === 0) {
          bias = -1;
        }
      } else if (ca > cb) {
        if (bias === 0) {
          bias = 1;
        }
      } else if (ca === '0' && cb === '0') {
        return bias;
      }
    }
  };

  var ia = 0,
    ib = 0;
  var nza = 0,
    nzb = 0;
  var ca, cb;
  var result;

  while (true) {
    // only count the number of zeroes leading the last number compared
    nza = nzb = 0;

    ca = a.charAt(ia);
    cb = b.charAt(ib);

    // skip over leading spaces or zeros
    while (isWhitespaceChar(ca) || ca === '0') {
      if (ca === '0') {
        nza++;
      } else {
        // only count consecutive zeroes
        nza = 0;
      }

      ca = a.charAt(++ia);
    }

    while (isWhitespaceChar(cb) || cb === '0') {
      if (cb === '0') {
        nzb++;
      } else {
        // only count consecutive zeroes
        nzb = 0;
      }

      cb = b.charAt(++ib);
    }

    // process run of digits
    if (isDigitChar(ca) && isDigitChar(cb)) {
      if ((result = compareRight(a.substring(ia), b.substring(ib))) !== 0) {
        return result;
      }
    }

    if (ca === '0' && cb === '0') {
      // The strings compare the same.  Perhaps the caller
      // will want to call strcmp to break the tie.
      return nza - nzb;
    }

    if (ca < cb) {
      return -1;
    } else if (ca > cb) {
      return +1;
    }

    // prevent possible infinite loop
    if (ia >= a.length && ib >= b.length) return 0;

    ++ia;
    ++ib;
  }
}
function strnatcmp (f_string1, f_string2, f_version) {
  // http://kevin.vanzonneveld.net
  // +   original by: Martijn Wieringa
  // + namespaced by: Michael White (http://getsprink.com)
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // -    depends on: strcmp
  // %          note: Added f_version argument against code guidelines, because it's so neat
  // *     example 1: strnatcmp('Price 12.9', 'Price 12.15');
  // *     returns 1: 1
  // *     example 2: strnatcmp('Price 12.09', 'Price 12.15');
  // *     returns 2: -1
  // *     example 3: strnatcmp('Price 12.90', 'Price 12.15');
  // *     returns 3: 1
  // *     example 4: strnatcmp('Version 12.9', 'Version 12.15', true);
  // *     returns 4: -6
  // *     example 5: strnatcmp('Version 12.15', 'Version 12.9', true);
  // *     returns 5: 6
  var i = 0;

  if (f_version == undefined) {
    f_version = false;
  }

  var __strnatcmp_split = function (f_string) {
    var result = [];
    var buffer = '';
    var chr = '';
    var i = 0,
      f_stringl = 0;

    var text = true;

    f_stringl = f_string.length;
    for (i = 0; i < f_stringl; i++) {
      chr = f_string.substring(i, i + 1);
      if (chr.match(/\d/)) {
        if (text) {
          if (buffer.length > 0) {
            result[result.length] = buffer;
            buffer = '';
          }

          text = false;
        }
        buffer += chr;
      } else if ((text == false) && (chr === '.') && (i < (f_string.length - 1)) && (f_string.substring(i + 1, i + 2).match(/\d/))) {
        result[result.length] = buffer;
        buffer = '';
      } else {
        if (text == false) {
          if (buffer.length > 0) {
            result[result.length] = parseInt(buffer, 10);
            buffer = '';
          }
          text = true;
        }
        buffer += chr;
      }
    }

    if (buffer.length > 0) {
      if (text) {
        result[result.length] = buffer;
      } else {
        result[result.length] = parseInt(buffer, 10);
      }
    }

    return result;
  };

  var array1 = __strnatcmp_split(f_string1 + '');
  var array2 = __strnatcmp_split(f_string2 + '');

  var len = array1.length;
  var text = true;

  var result = -1;
  var r = 0;

  if (len > array2.length) {
    len = array2.length;
    result = 1;
  }

  for (i = 0; i < len; i++) {
    if (isNaN(array1[i])) {
      if (isNaN(array2[i])) {
        text = true;

        if ((r = this.strcmp(array1[i], array2[i])) != 0) {
          return r;
        }
      } else if (text) {
        return 1;
      } else {
        return -1;
      }
    } else if (isNaN(array2[i])) {
      if (text) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if (text || f_version) {
        if ((r = (array1[i] - array2[i])) != 0) {
          return r;
        }
      } else {
        if ((r = this.strcmp(array1[i].toString(), array2[i].toString())) != 0) {
          return r;
        }
      }

      text = false;
    }
  }

  return result;
}
function strncasecmp (argStr1, argStr2, len) {
  // http://kevin.vanzonneveld.net
  // +   original by: Saulo Vallory
  // +      input by: Nate
  // +   bugfixed by: Onno Marsman
  // %          note: Returns < 0 if str1 is less than str2 ; > 0 if str1 is greater than str2 , and 0 if they are equal.
  // *     example 1: strncasecmp('Price 12.9', 'Price 12.15', 2);
  // *     returns 1: 0
  // *     example 2: strncasecmp('Price 12.09', 'Price 12.15', 10);
  // *     returns 2: -1
  // *     example 3: strncasecmp('Price 12.90', 'Price 12.15', 30);
  // *     returns 3: 8
  // *     example 4: strncasecmp('Version 12.9', 'Version 12.15', 20);
  // *     returns 4: 8
  // *     example 5: strncasecmp('Version 12.15', 'Version 12.9', 20);
  // *     returns 5: -8
  var diff, i = 0;
  var str1 = (argStr1 + '').toLowerCase().substr(0, len);
  var str2 = (argStr2 + '').toLowerCase().substr(0, len);

  if (str1.length !== str2.length) {
    if (str1.length < str2.length) {
      len = str1.length;
      if (str2.substr(0, str1.length) == str1) {
        return str1.length - str2.length; // return the difference of chars
      }
    } else {
      len = str2.length;
      // str1 is longer than str2
      if (str1.substr(0, str2.length) == str2) {
        return str1.length - str2.length; // return the difference of chars
      }
    }
  } else {
    // Avoids trying to get a char that does not exist
    len = str1.length;
  }

  for (diff = 0, i = 0; i < len; i++) {
    diff = str1.charCodeAt(i) - str2.charCodeAt(i);
    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
}
function strncmp (str1, str2, lgth) {
  // http://kevin.vanzonneveld.net
  // +      original by: Waldo Malqui Silva
  // +         input by: Steve Hilder
  // +      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +       revised by: gorthaur
  // + reimplemented by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strncmp('aaa', 'aab', 2);
  // *     returns 1: 0
  // *     example 2: strncmp('aaa', 'aab', 3 );
  // *     returns 2: -1
  var s1 = (str1 + '').substr(0, lgth);
  var s2 = (str2 + '').substr(0, lgth);

  return ((s1 == s2) ? 0 : ((s1 > s2) ? 1 : -1));
}
function strpbrk (haystack, char_list) {
  // http://kevin.vanzonneveld.net
  // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
  // +   bugfixed by: Onno Marsman
  // +    revised by: Christoph
  // +    improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strpbrk('This is a Simple text.', 'is');
  // *     returns 1: 'is is a Simple text.'
  for (var i = 0, len = haystack.length; i < len; ++i) {
    if (char_list.indexOf(haystack.charAt(i)) >= 0) {
      return haystack.slice(i);
    }
  }
  return false;
}
function strpos (haystack, needle, offset) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Onno Marsman
  // +   bugfixed by: Daniel Esteban
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
  // *     returns 1: 14
  var i = (haystack + '').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}
function strrchr (haystack, needle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Jason Wong (http://carrot.org/)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strrchr("Line 1\nLine 2\nLine 3", 10).substr(1)
  // *     returns 1: 'Line 3'
  var pos = 0;

  if (typeof needle !== 'string') {
    needle = String.fromCharCode(parseInt(needle, 10));
  }
  needle = needle.charAt(0);
  pos = haystack.lastIndexOf(needle);
  if (pos === -1) {
    return false;
  }

  return haystack.substr(pos);
}
function strrev (string) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strrev('Kevin van Zonneveld');
  // *     returns 1: 'dlevennoZ nav niveK'
  // *     example 2: strrev('a\u0301haB') === 'Baha\u0301'; // combining
  // *     returns 2: true
  // *     example 3: strrev('A\uD87E\uDC04Z') === 'Z\uD87E\uDC04A'; // surrogates
  // *     returns 2: true
  string = string + '';

  // Performance will be enhanced with the next two lines of code commented
  //      out if you don't care about combining characters
  // Keep Unicode combining characters together with the character preceding
  //      them and which they are modifying (as in PHP 6)
  // See http://unicode.org/reports/tr44/#Property_Table (Me+Mn)
  // We also add the low surrogate range at the beginning here so it will be
  //      maintained with its preceding high surrogate
  var grapheme_extend = /(.)([\uDC00-\uDFFF\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065E\u0670\u06D6-\u06DC\u06DE-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0901-\u0903\u093C\u093E-\u094D\u0951-\u0954\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F90-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1C24-\u1C37\u1DC0-\u1DE6\u1DFE\u1DFF\u20D0-\u20F0\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA926-\uA92D\uA947-\uA953\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uFB1E\uFE00-\uFE0F\uFE20-\uFE26]+)/g;
  string = string.replace(grapheme_extend, '$2$1'); // Temporarily reverse
  return string.split('').reverse().join('');
}
function strripos (haystack, needle, offset) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   input by: saulius
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strripos('Kevin van Zonneveld', 'E');
  // *     returns 1: 16
  haystack = (haystack + '').toLowerCase();
  needle = (needle + '').toLowerCase();

  var i = -1;
  if (offset) {
    i = (haystack + '').slice(offset).lastIndexOf(needle); // strrpos' offset indicates starting point of range till end,
    // while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
    if (i !== -1) {
      i += offset;
    }
  } else {
    i = (haystack + '').lastIndexOf(needle);
  }
  return i >= 0 ? i : false;
}
function strrpos (haystack, needle, offset) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   input by: saulius
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strrpos('Kevin van Zonneveld', 'e');
  // *     returns 1: 16
  // *     example 2: strrpos('somepage.com', '.', false);
  // *     returns 2: 8
  // *     example 3: strrpos('baa', 'a', 3);
  // *     returns 3: false
  // *     example 4: strrpos('baa', 'a', 2);
  // *     returns 4: 2
  var i = -1;
  if (offset) {
    i = (haystack + '').slice(offset).lastIndexOf(needle); // strrpos' offset indicates starting point of range till end,
    // while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
    if (i !== -1) {
      i += offset;
    }
  } else {
    i = (haystack + '').lastIndexOf(needle);
  }
  return i >= 0 ? i : false;
}
function strspn (str1, str2, start, lgth) {
  // http://kevin.vanzonneveld.net
  // +   original by: Valentina De Rosa
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strspn('42 is the answer, what is the question ...', '1234567890');
  // *     returns 1: 2
  // *     example 2: strspn('foo', 'o', 1, 2);
  // *     returns 2: 2
  var found;
  var stri;
  var strj;
  var j = 0;
  var i = 0;

  start = start ? (start < 0 ? (str1.length + start) : start) : 0;
  lgth = lgth ? ((lgth < 0) ? (str1.length + lgth - start) : lgth) : str1.length - start;
  str1 = str1.substr(start, lgth);

  for (i = 0; i < str1.length; i++) {
    found = 0;
    stri = str1.substring(i, i + 1);
    for (j = 0; j <= str2.length; j++) {
      strj = str2.substring(j, j + 1);
      if (stri == strj) {
        found = 1;
        break;
      }
    }
    if (found != 1) {
      return i;
    }
  }

  return i;
}
function strstr (haystack, needle, bool) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: strstr('Kevin van Zonneveld', 'van');
  // *     returns 1: 'van Zonneveld'
  // *     example 2: strstr('Kevin van Zonneveld', 'van', true);
  // *     returns 2: 'Kevin '
  // *     example 3: strstr('name@example.com', '@');
  // *     returns 3: '@example.com'
  // *     example 4: strstr('name@example.com', '@', true);
  // *     returns 4: 'name'
  var pos = 0;

  haystack += '';
  pos = haystack.indexOf(needle);
  if (pos == -1) {
    return false;
  } else {
    if (bool) {
      return haystack.substr(0, pos);
    } else {
      return haystack.slice(pos);
    }
  }
}
function strtok (str, tokens) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Use tab and newline as tokenizing characters as well
  // *     example 1: $string = "\t\t\t\nThis is\tan example\nstring\n";
  // *     example 1: $tok = strtok($string, " \n\t");
  // *     example 1: $b = '';
  // *     example 1: while ($tok !== false) {$b += "Word="+$tok+"\n"; $tok = strtok(" \n\t");}
  // *     example 1: $b
  // *     returns 1: "Word=This\nWord=is\nWord=an\nWord=example\nWord=string\n"
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  // END REDUNDANT
  if (tokens === undefined) {
    tokens = str;
    str = this.php_js.strtokleftOver;
  }
  if (str.length === 0) {
    return false;
  }
  if (tokens.indexOf(str.charAt(0)) !== -1) {
    return this.strtok(str.substr(1), tokens);
  }
  for (var i = 0; i < str.length; i++) {
    if (tokens.indexOf(str.charAt(i)) !== -1) {
      break;
    }
  }
  this.php_js.strtokleftOver = str.substr(i + 1);
  return str.substring(0, i);
}
function strtolower (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Onno Marsman
  // *     example 1: strtolower('Kevin van Zonneveld');
  // *     returns 1: 'kevin van zonneveld'
  return (str + '').toLowerCase();
}
function strtoupper (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Onno Marsman
  // *     example 1: strtoupper('Kevin van Zonneveld');
  // *     returns 1: 'KEVIN VAN ZONNEVELD'
  return (str + '').toUpperCase();
}
function strtr (str, from, to) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +      input by: uestla
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Alan C
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Taras Bogach
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: jpfle
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -   depends on: krsort
  // -   depends on: ini_set
  // *     example 1: $trans = {'hello' : 'hi', 'hi' : 'hello'};
  // *     example 1: strtr('hi all, I said hello', $trans)
  // *     returns 1: 'hello all, I said hi'
  // *     example 2: strtr('äaabaåccasdeöoo', 'äåö','aao');
  // *     returns 2: 'aaabaaccasdeooo'
  // *     example 3: strtr('ääääääää', 'ä', 'a');
  // *     returns 3: 'aaaaaaaa'
  // *     example 4: strtr('http', 'pthxyz','xyzpth');
  // *     returns 4: 'zyyx'
  // *     example 5: strtr('zyyx', 'pthxyz','xyzpth');
  // *     returns 5: 'http'
  // *     example 6: strtr('aa', {'a':1,'aa':2});
  // *     returns 6: '2'
  var fr = '',
    i = 0,
    j = 0,
    lenStr = 0,
    lenFrom = 0,
    tmpStrictForIn = false,
    fromTypeStr = '',
    toTypeStr = '',
    istr = '';
  var tmpFrom = [];
  var tmpTo = [];
  var ret = '';
  var match = false;

  // Received replace_pairs?
  // Convert to normal from->to chars
  if (typeof from === 'object') {
    tmpStrictForIn = this.ini_set('phpjs.strictForIn', false); // Not thread-safe; temporarily set to true
    from = this.krsort(from);
    this.ini_set('phpjs.strictForIn', tmpStrictForIn);

    for (fr in from) {
      if (from.hasOwnProperty(fr)) {
        tmpFrom.push(fr);
        tmpTo.push(from[fr]);
      }
    }

    from = tmpFrom;
    to = tmpTo;
  }

  // Walk through subject and replace chars when needed
  lenStr = str.length;
  lenFrom = from.length;
  fromTypeStr = typeof from === 'string';
  toTypeStr = typeof to === 'string';

  for (i = 0; i < lenStr; i++) {
    match = false;
    if (fromTypeStr) {
      istr = str.charAt(i);
      for (j = 0; j < lenFrom; j++) {
        if (istr == from.charAt(j)) {
          match = true;
          break;
        }
      }
    } else {
      for (j = 0; j < lenFrom; j++) {
        if (str.substr(i, from[j].length) == from[j]) {
          match = true;
          // Fast forward
          i = (i + from[j].length) - 1;
          break;
        }
      }
    }
    if (match) {
      ret += toTypeStr ? to.charAt(j) : to[j];
    } else {
      ret += str.charAt(i);
    }
  }

  return ret;
}
function substr (str, start, len) {
  // Returns part of a string
  //
  // version: 909.322
  // discuss at: http://phpjs.org/functions/substr
  // +     original by: Martijn Wieringa
  // +     bugfixed by: T.Wild
  // +      tweaked by: Onno Marsman
  // +      revised by: Theriault
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // %    note 1: Handles rare Unicode characters if 'unicode.semantics' ini (PHP6) is set to 'on'
  // *       example 1: substr('abcdef', 0, -1);
  // *       returns 1: 'abcde'
  // *       example 2: substr(2, 0, -6);
  // *       returns 2: false
  // *       example 3: ini_set('unicode.semantics',  'on');
  // *       example 3: substr('a\uD801\uDC00', 0, -1);
  // *       returns 3: 'a'
  // *       example 4: ini_set('unicode.semantics',  'on');
  // *       example 4: substr('a\uD801\uDC00', 0, 2);
  // *       returns 4: 'a\uD801\uDC00'
  // *       example 5: ini_set('unicode.semantics',  'on');
  // *       example 5: substr('a\uD801\uDC00', -1, 1);
  // *       returns 5: '\uD801\uDC00'
  // *       example 6: ini_set('unicode.semantics',  'on');
  // *       example 6: substr('a\uD801\uDC00z\uD801\uDC00', -3, 2);
  // *       returns 6: '\uD801\uDC00z'
  // *       example 7: ini_set('unicode.semantics',  'on');
  // *       example 7: substr('a\uD801\uDC00z\uD801\uDC00', -3, -1)
  // *       returns 7: '\uD801\uDC00z'
  // Add: (?) Use unicode.runtime_encoding (e.g., with string wrapped in "binary" or "Binary" class) to
  // allow access of binary (see file_get_contents()) by: charCodeAt(x) & 0xFF (see https://developer.mozilla.org/En/Using_XMLHttpRequest ) or require conversion first?
  var i = 0,
    allBMP = true,
    es = 0,
    el = 0,
    se = 0,
    ret = '';
  str += '';
  var end = str.length;

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {
  case 'on':
    // Full-blown Unicode including non-Basic-Multilingual-Plane characters
    // strlen()
    for (i = 0; i < str.length; i++) {
      if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
        allBMP = false;
        break;
      }
    }

    if (!allBMP) {
      if (start < 0) {
        for (i = end - 1, es = (start += end); i >= es; i--) {
          if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
            start--;
            es--;
          }
        }
      } else {
        var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        while ((surrogatePairs.exec(str)) != null) {
          var li = surrogatePairs.lastIndex;
          if (li - 2 < start) {
            start++;
          } else {
            break;
          }
        }
      }

      if (start >= end || start < 0) {
        return false;
      }
      if (len < 0) {
        for (i = end - 1, el = (end += len); i >= el; i--) {
          if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
            end--;
            el--;
          }
        }
        if (start > end) {
          return false;
        }
        return str.slice(start, end);
      } else {
        se = start + len;
        for (i = start; i < se; i++) {
          ret += str.charAt(i);
          if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
            se++; // Go one further, since one of the "characters" is part of a surrogate pair
          }
        }
        return ret;
      }
      break;
    }
    // Fall-through
  case 'off':
    // assumes there are no non-BMP characters;
    //    if there may be such characters, then it is best to turn it on (critical in true XHTML/XML)
  default:
    if (start < 0) {
      start += end;
    }
    end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
    // PHP returns false if start does not fall within the string.
    // PHP returns false if the calculated end comes before the calculated start.
    // PHP returns an empty string if start and end are the same.
    // Otherwise, PHP returns the portion of the string from start to end.
    return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
  }
  return undefined; // Please Netbeans
}
function substr_compare (main_str, str, offset, length, case_insensitivity) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   derived from: strcasecmp, strcmp
  // *     example 1: substr_compare("abcde", "bc", 1, 2);
  // *     returns 1: 0
  if (!offset && offset !== 0) {
    throw 'Missing offset for substr_compare()';
  }

  if (offset < 0) {
    offset = main_str.length + offset;
  }

  if (length && length > (main_str.length - offset)) {
    return false;
  }
  length = length || main_str.length - offset;

  main_str = main_str.substr(offset, length);
  str = str.substr(0, length); // Should only compare up to the desired length
  if (case_insensitivity) { // Works as strcasecmp
    main_str = (main_str + '').toLowerCase();
    str = (str + '').toLowerCase();
    if (main_str == str) {
      return 0;
    }
    return (main_str > str) ? 1 : -1;
  }
  // Works as strcmp
  return ((main_str == str) ? 0 : ((main_str > str) ? 1 : -1));
}
function substr_count (haystack, needle, offset, length) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Thomas
  // *     example 1: substr_count('Kevin van Zonneveld', 'e');
  // *     returns 1: 3
  // *     example 2: substr_count('Kevin van Zonneveld', 'K', 1);
  // *     returns 2: 0
  // *     example 3: substr_count('Kevin van Zonneveld', 'Z', 0, 10);
  // *     returns 3: false

  var cnt = 0;

  haystack += '';
  needle += '';
  if (isNaN(offset)) {
    offset = 0;
  }
  if (isNaN(length)) {
    length = 0;
  }
  if (needle.length == 0) {
    return false;
  }
  offset--;

  while ((offset = haystack.indexOf(needle, offset + 1)) != -1) {
    if (length > 0 && (offset + needle.length) > length) {
      return false;
    }
    cnt++;
  }

  return cnt;
}
function substr_replace (str, replace, start, length) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0);
  // *     returns 1: 'bob'
  // *     example 2: $var = 'ABCDEFGH:/MNRPQR/';
  // *     example 2: substr_replace($var, 'bob', 0, $var.length);
  // *     returns 2: 'bob'
  // *     example 3: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0);
  // *     returns 3: 'bobABCDEFGH:/MNRPQR/'
  // *     example 4: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1);
  // *     returns 4: 'ABCDEFGH:/bob/'
  // *     example 5: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1);
  // *     returns 5: 'ABCDEFGH:/bob/'
  // *     example 6: 'substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)'
  // *     returns 6: 'ABCDEFGH://'
  if (start < 0) { // start position in str
    start = start + str.length;
  }
  length = length !== undefined ? length : str.length;
  if (length < 0) {
    length = length + str.length - start;
  }
  return str.slice(0, start) + replace.substr(0, length) + replace.slice(length) + str.slice(start + length);
}
function trim (str, charlist) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: mdsjack (http://www.mdsjack.bo.it)
  // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
  // +      input by: Erkekjetter
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: DxGx
  // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // *     example 1: trim('    Kevin van Zonneveld    ');
  // *     returns 1: 'Kevin van Zonneveld'
  // *     example 2: trim('Hello World', 'Hdle');
  // *     returns 2: 'o Wor'
  // *     example 3: trim(16, 1);
  // *     returns 3: 6
  var whitespace, l = 0,
    i = 0;
  str += '';

  if (!charlist) {
    // default list
    whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
  } else {
    // preg_quote custom list
    charlist += '';
    whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
  }

  l = str.length;
  for (i = 0; i < l; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i);
      break;
    }
  }

  l = str.length;
  for (i = l - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }

  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}
function ucfirst (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ucfirst('kevin van zonneveld');
  // *     returns 1: 'Kevin van zonneveld'
  str += '';
  var f = str.charAt(0).toUpperCase();
  return f + str.substr(1);
}
function ucwords (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Waldo Malqui Silva
  // +   bugfixed by: Onno Marsman
  // +   improved by: Robin
  // +      input by: James (http://www.james-bell.co.uk/)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: ucwords('kevin van  zonneveld');
  // *     returns 1: 'Kevin Van  Zonneveld'
  // *     example 2: ucwords('HELLO WORLD');
  // *     returns 2: 'HELLO WORLD'
  return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
    return $1.toUpperCase();
  });
}
function vprintf (format, args) {
  // http://kevin.vanzonneveld.net
  // +   original by: Ash Searle (http://hexmen.com/blog/)
  // +   improved by: Michael White (http://getsprink.com)
  // + reimplemented by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: sprintf
  // *     example 1: printf("%01.2f", 123.1);
  // *     returns 1: 6
  var body, elmt;
  var ret = '',
    d = this.window.document;

  // .shift() does not work to get first item in bodies
  var HTMLNS = 'http://www.w3.org/1999/xhtml';
  body = d.getElementsByTagNameNS ? (d.getElementsByTagNameNS(HTMLNS, 'body')[0] ? d.getElementsByTagNameNS(HTMLNS, 'body')[0] : d.documentElement.lastChild) : d.getElementsByTagName('body')[0];

  if (!body) {
    return false;
  }

  ret = this.sprintf.apply(this, [format].concat(args));

  elmt = d.createTextNode(ret);
  body.appendChild(elmt);

  return ret.length;
}
function vsprintf (format, args) {
  // http://kevin.vanzonneveld.net
  // +   original by: ejsanders
  // -    depends on: sprintf
  // *     example 1: vsprintf('%04d-%02d-%02d', [1988, 8, 1]);
  // *     returns 1: '1988-08-01'
  return this.sprintf.apply(this, [format].concat(args));
}
function wordwrap (str, int_width, str_break, cut) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Nick Callen
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Sakimori
  // +   bugfixed by: Michael Grier
  // *     example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
  // *     returns 1: 'Kevin |van |Zonnev|eld'
  // *     example 2: wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n');
  // *     returns 2: 'The quick brown fox <br />\njumped over the lazy<br />\n dog.'
  // *     example 3: wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
  // *     returns 3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat.'
  // PHP Defaults
  var m = ((arguments.length >= 2) ? arguments[1] : 75);
  var b = ((arguments.length >= 3) ? arguments[2] : "\n");
  var c = ((arguments.length >= 4) ? arguments[3] : false);

  var i, j, l, s, r;

  str += '';

  if (m < 1) {
    return str;
  }

  for (i = -1, l = (r = str.split(/\r\n|\n|\r/)).length; ++i < l; r[i] += s) {
    for (s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")) {
      j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
    }
  }

  return r.join("\n");
}
function base64_decode (data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Tyler Akins (http://rumkin.com)
  // +   improved by: Thunder.m
  // +      input by: Aman Gupta
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   bugfixed by: Pellentesque Malesuada
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
  // *     returns 1: 'Kevin van Zonneveld'
  // mozilla has this native
  // - but breaks in 2.0.0.12!
  //if (typeof this.window['atob'] == 'function') {
  //    return atob(data);
  //}
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    dec = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data += '';

  do { // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');

  return dec;
}
function base64_encode (data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Tyler Akins (http://rumkin.com)
  // +   improved by: Bayron Guevara
  // +   improved by: Thunder.m
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Pellentesque Malesuada
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Rafał Kukawski (http://kukawski.pl)
  // *     example 1: base64_encode('Kevin van Zonneveld');
  // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  // mozilla has this native
  // - but breaks in 2.0.0.12!
  //if (typeof this.window['btoa'] == 'function') {
  //    return btoa(data);
  //}
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

}
function get_headers (url, format) {
  // +   original by: Paulo Freitas
  // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: array_filter
  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
  // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
  // *     example 1: get_headers('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm')[0];
  // *     returns 1: 'Date: Wed, 13 May 2009 23:53:11 GMT'
  var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
  if (!req) {
    throw new Error('XMLHttpRequest not supported');
  }
  var tmp, headers, pair, i, j = 0;

  req.open('HEAD', url, false);
  req.send(null);

  if (req.readyState < 3) {
    return false;
  }

  tmp = req.getAllResponseHeaders();
  tmp = tmp.split('\n');
  tmp = this.array_filter(tmp, function (value) {
    return value.substring(1) !== '';
  });
  headers = format ? {} : [];

  for (i in tmp) {
    if (format) {
      pair = tmp[i].split(':');
      headers[pair.splice(0, 1)] = pair.join(':').substring(1);
    } else {
      headers[j++] = tmp[i];
    }
  }
  return headers;
}
function get_meta_tags (file) {
  // Extracts all meta tag content attributes from a file and returns an array
  //
  // version: 905.3122
  // discuss at: http://phpjs.org/functions/get_meta_tags
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
  // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
  // -    depends on: file_get_contents
  // *     example 1: get_meta_tags('http://kevin.vanzonneveld.net/pj_test_supportfile_2.htm');
  // *     returns 1: {description: 'a php manual', author: 'name', keywords: 'php documentation', 'geo_position': '49.33;-86.59'}
  var fulltxt = '';

  if (false) {
    // Use this for testing instead of the line above:
    fulltxt = '<meta name="author" content="name">' + '<meta name="keywords" content="php documentation">' + '<meta name="DESCRIPTION" content="a php manual">' + '<meta name="geo.position" content="49.33;-86.59">' + '</head>';
  } else {
    fulltxt = this.file_get_contents(file).match(/^[\s\S]*<\/head>/i); // We have to disallow some character, so we choose a Unicode non-character
  }

  var patt = /<meta[^>]*?>/gim;
  var patt1 = /<meta\s+.*?name\s*=\s*(['"]?)(.*?)\1\s+.*?content\s*=\s*(['"]?)(.*?)\3/gim;
  var patt2 = /<meta\s+.*?content\s*=\s*(['"?])(.*?)\1\s+.*?name\s*=\s*(['"]?)(.*?)\3/gim;
  var txt, match, name, arr = {};

  while ((txt = patt.exec(fulltxt)) !== null) {
    while ((match = patt1.exec(txt)) !== null) {
      name = match[2].replace(/\W/g, '_').toLowerCase();
      arr[name] = match[4];
    }
    while ((match = patt2.exec(txt)) !== null) {
      name = match[4].replace(/\W/g, '_').toLowerCase();
      arr[name] = match[2];
    }
  }
  return arr;
}
function http_build_query (formdata, numeric_prefix, arg_separator) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Legaev Andrey
  // +   improved by: Michael White (http://getsprink.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +    revised by: stag019
  // +   input by: Dreamer
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
  // %        note 1: If the value is null, key and value is skipped in http_build_query of PHP. But, phpjs is not.
  // -    depends on: urlencode
  // *     example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
  // *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
  // *     example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
  // *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'
  var value, key, tmp = [],
    that = this;

  var _http_build_query_helper = function (key, val, arg_separator) {
    var k, tmp = [];
    if (val === true) {
      val = "1";
    } else if (val === false) {
      val = "0";
    }
    if (val != null) {
      if(typeof(val) === "object") {
        for (k in val) {
          if (val[k] != null) {
            tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
          }
        }
        return tmp.join(arg_separator);
      } else if (typeof(val) !== "function") {
        return that.urlencode(key) + "=" + that.urlencode(val);
      } else {
        throw new Error('There was an error processing for http_build_query().');
      }
    } else {
      return '';
    }
  };

  if (!arg_separator) {
    arg_separator = "&";
  }
  for (key in formdata) {
    value = formdata[key];
    if (numeric_prefix && !isNaN(key)) {
      key = String(numeric_prefix) + key;
    }
    var query=_http_build_query_helper(key, value, arg_separator);
    if(query !== '') {
      tmp.push(query);
    }
  }

  return tmp.join(arg_separator);
}
function parse_url (str, component) {
  // http://kevin.vanzonneveld.net
  // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
  // + reimplemented by: Brett Zamir (http://brett-zamir.me)
  // + input by: Lorenzo Pisani
  // + input by: Tony
  // + improved by: Brett Zamir (http://brett-zamir.me)
  // %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
  // %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
  // %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
  // %          note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
  // %          note: a seriously malformed URL.
  // %          note: Besides function name, is essentially the same as parseUri as well as our allowing
  // %          note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
  // *     example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
  // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
  var query, key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
            'relative', 'path', 'directory', 'file', 'query', 'fragment'],
    ini = (this.php_js && this.php_js.ini) || {},
    mode = (ini['phpjs.parse_url.mode'] &&
      ini['phpjs.parse_url.mode'].local_value) || 'php',
    parser = {
      php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
    };

  var m = parser[mode].exec(str),
    uri = {},
    i = 14;
  while (i--) {
    if (m[i]) {
      uri[key[i]] = m[i];
    }
  }

  if (component) {
    return uri[component.replace('PHP_URL_', '').toLowerCase()];
  }
  if (mode !== 'php') {
    var name = (ini['phpjs.parse_url.queryKey'] &&
        ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
    parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
    uri[name] = {};
    query = uri[key[12]] || '';
    query.replace(parser, function ($0, $1, $2) {
      if ($1) {uri[name][$1] = $2;}
    });
  }
  delete uri.source;
  return uri;
}
function rawurldecode (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +      input by: travc
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Ratheous
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
  // %        note 1: pages served as UTF-8
  // *     example 1: rawurldecode('Kevin+van+Zonneveld%21');
  // *     returns 1: 'Kevin+van+Zonneveld!'
  // *     example 2: rawurldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
  // *     returns 2: 'http://kevin.vanzonneveld.net/'
  // *     example 3: rawurldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
  // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
  // *     example 4: rawurldecode('-22%97bc%2Fbc');
  // *     returns 4: '-22—bc/bc'
  return decodeURIComponent(str + '');
}
function rawurlencode (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +      input by: travc
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Michael Grier
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Ratheous
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Joris
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: This reflects PHP 5.3/6.0+ behavior
  // %        note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
  // %        note 2: pages served as UTF-8
  // *     example 1: rawurlencode('Kevin van Zonneveld!');
  // *     returns 1: 'Kevin%20van%20Zonneveld%21'
  // *     example 2: rawurlencode('http://kevin.vanzonneveld.net/');
  // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
  // *     example 3: rawurlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
  // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
  str = (str + '').toString();

  // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
  replace(/\)/g, '%29').replace(/\*/g, '%2A');
}
function urldecode (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: AJ
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: travc
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Lars Fischer
  // +      input by: Ratheous
  // +   improved by: Orlando
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +      bugfixed by: Rob
  // +      input by: e-mike
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
  // %        note 2: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
  // %        note 2: pages served as UTF-8
  // *     example 1: urldecode('Kevin+van+Zonneveld%21');
  // *     returns 1: 'Kevin van Zonneveld!'
  // *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
  // *     returns 2: 'http://kevin.vanzonneveld.net/'
  // *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
  // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
  return decodeURIComponent((str + '').replace(/\+/g, '%20'));
}
function urlencode (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: AJ
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: travc
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Lars Fischer
  // +      input by: Ratheous
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Joris
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: This reflects PHP 5.3/6.0+ behavior
  // %        note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
  // %        note 2: pages served as UTF-8
  // *     example 1: urlencode('Kevin van Zonneveld!');
  // *     returns 1: 'Kevin+van+Zonneveld%21'
  // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
  // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
  // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
  // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
  str = (str + '').toString();

  // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
  replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}
function doubleval (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  //  -   depends on: floatval
  // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
  // *     example 1: doubleval(186);
  // *     returns 1: 186.00
  return this.floatval(mixed_var);
}
function empty (mixed_var) {
  // Checks if the argument variable is empty
  // undefined, null, false, number 0, empty string,
  // string "0", objects without properties and empty arrays
  // are considered empty
  //
  // http://kevin.vanzonneveld.net
  // +   original by: Philippe Baumann
  // +      input by: Onno Marsman
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: LH
  // +   improved by: Onno Marsman
  // +   improved by: Francesco
  // +   improved by: Marc Jansen
  // +      input by: Stoyan Kyosev (http://www.svest.org/)
  // +   improved by: Rafal Kukawski
  // *     example 1: empty(null);
  // *     returns 1: true
  // *     example 2: empty(undefined);
  // *     returns 2: true
  // *     example 3: empty([]);
  // *     returns 3: true
  // *     example 4: empty({});
  // *     returns 4: true
  // *     example 5: empty({'aFunc' : function () { alert('humpty'); } });
  // *     returns 5: false
  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, "", "0"];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === "object") {
    for (key in mixed_var) {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }
    return true;
  }

  return false;
}
function floatval (mixed_var) {
  // +   original by: Michael White (http://getsprink.com)
  // %        note 1: The native parseFloat() method of JavaScript returns NaN when it encounters a string before an int or float value.
  // *     example 1: floatval('150.03_page-section');
  // *     returns 1: 150.03
  // *     example 2: floatval('page: 3');
  // *     returns 2: 0
  // *     example 2: floatval('-50 + 8');
  // *     returns 2: -50
  return (parseFloat(mixed_var) || 0);
}
function get_defined_vars () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Test case 1: If get_defined_vars can find itself in the defined vars, it worked :)
  // *     example 1: function test_in_array(array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] == p_val) return true;} return false;}
  // *     example 1: funcs = get_defined_vars();
  // *     example 1: found = test_in_array(funcs, 'get_defined_vars');
  // *     results 1: found == true
  var i = '',
    arr = [],
    already = {};

  for (i in this.window) {
    try {
      if (typeof this.window[i] === 'object') {
        for (var j in this.window[i]) {
          if (this.window[j] && !already[j]) {
            already[j] = 1;
            arr.push(j);
          }
        }
      } else if (!already[i]) {
        already[i] = 1;
        arr.push(i);
      }
    } catch (e) { // Problems accessing some properties in FF (e.g., sessionStorage)
      if (!already[i]) {
        already[i] = 1;
        arr.push(i);
      }
    }
  }

  return arr;
}
function get_resource_type (handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: get_resource_type('a');
  // *     returns 1: false
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (!handle || typeof handle !== 'object' || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
    return false;
  }

  return handle.get_resource_type();
}
function gettype (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Douglas Crockford (http://javascript.crockford.com)
  // +   input by: KELAN
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: is_float
  // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
  // *     example 1: gettype(1);
  // *     returns 1: 'integer'
  // *     example 2: gettype(undefined);
  // *     returns 2: 'undefined'
  // *     example 3: gettype({0: 'Kevin van Zonneveld'});
  // *     returns 3: 'array'
  // *     example 4: gettype('foo');
  // *     returns 4: 'string'
  // *     example 5: gettype({0: function () {return false;}});
  // *     returns 5: 'array'
  var s = typeof mixed_var,
    name;
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (s === 'object') {
    if (mixed_var !== null) { // From: http://javascript.crockford.com/remedial.html
      if (typeof mixed_var.length === 'number' && !(mixed_var.propertyIsEnumerable('length')) && typeof mixed_var.splice === 'function') {
        s = 'array';
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
function import_request_variables (types, prefix) {
  // http://kevin.vanzonneveld.net
  // +      original by: Jalal Berrami
  // + reimplemented by: Brett Zamir (http://brett-zamir.me)
  // + improved by: Brett Zamir (http://brett-zamir.me)
  // %          note 1: IMPORTANT: You must sanitize user variables passed in via URL in JavaScript as in PHP,
  // %          note 1: especially if you want to use any of these variables in an eval()-like function (not recommended)!
  // *        example 1: document.cookie = 'snack=yummy';
  // *        example 1: import_request_variables('gc', 'pr_');
  // *        results 1: pr_snack === 'yummy'
  // *        example 2: ini_set('phpjs.getVarsObj', $_GET = {}); // Only works in PHP.JS, not PHP (!), though by using ini_set(), it does work as though PHP.JS were an extension to PHP
  // *        example 2: import_request_variables('g'); // Allows $_GET['myRequestVar'] access to query string variables

  var i = 0,
    current = '',
    url = '',
    vars = '',
    arrayBracketPos = -1,
    arrName = '',
    win = this.window,
    requestObj = this.window,
    getObj = false,
    cookieObj = false;
  prefix = prefix || '';

  var that = this;
  var _ini_get = function (ini) {
    if (that.php_js && that.php_js.ini && that.php_js.ini[ini] && that.php_js.ini[ini].local_value) { // Allow designated object to be used instead of window
      return that.php_js.ini[ini].local_value;
    }
    return false;
  };

  requestObj = _ini_get('phpjs.requestVarsObj') || requestObj;
  if (/g/i.test(types)) { // GET
    getObj = _ini_get('phpjs.getVarsObj') || getObj;
    for (i = 0, url = win.location.href, vars = url.substring(url.lastIndexOf('?') + 1, url.length).split('&'); i < vars.length; i++) {
      current = vars[i].split('=');
      current[1] = decodeURIComponent(current[1]);
      arrayBracketPos = current[0].indexOf('[');
      if (arrayBracketPos !== -1) {
        arrName = current[0].substring(0, arrayBracketPos);
        arrName = decodeURIComponent(arrName);
        if (!requestObj[prefix + arrName]) {
          requestObj[prefix + arrName] = [];
        }
        requestObj[prefix + arrName].push(current[1] || null);
        if (getObj) {
          if (!getObj[prefix + arrName]) {
            getObj[prefix + arrName] = [];
          }
          getObj[prefix + arrName].push(current[1] || null);
        }
      } else {
        current[0] = decodeURIComponent(current[0]);
        requestObj[prefix + current[0]] = current[1] || null;
        if (getObj) {
          getObj[prefix + current[0]] = current[1] || null;
        }
      }
    }
  }
  if (/c/i.test(types)) { // COOKIE
    cookieObj = _ini_get('phpjs.cookieVarsObj') || cookieObj;
    for (i = 0, vars = win.document.cookie.split("&"); i < vars.length; i++) {
      current = vars[i].split("=");
      requestObj[prefix + current[0]] = current[1].split(";")[0] || null;
      if (cookieObj) {
        cookieObj[prefix + current[0]] = current[1].split(";")[0] || null;
      }
    }
  }
}
function intval (mixed_var, base) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: stensi
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   input by: Matteo
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Rafał Kukawski (http://kukawski.pl)
  // *     example 1: intval('Kevin van Zonneveld');
  // *     returns 1: 0
  // *     example 2: intval(4.2);
  // *     returns 2: 4
  // *     example 3: intval(42, 8);
  // *     returns 3: 42
  // *     example 4: intval('09');
  // *     returns 4: 9
  // *     example 5: intval('1e', 16);
  // *     returns 5: 30
  var tmp;

  var type = typeof(mixed_var);

  if (type === 'boolean') {
    return +mixed_var;
  } else if (type === 'string') {
    tmp = parseInt(mixed_var, base || 10);
    return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
  } else if (type === 'number' && isFinite(mixed_var)) {
    return mixed_var | 0;
  } else {
    return 0;
  }
}
function is_array (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Legaev Andrey
  // +   bugfixed by: Cord
  // +   bugfixed by: Manish
  // +   improved by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Nathan Sepulveda
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: In php.js, javascript objects are like php associative arrays, thus JavaScript objects will also
  // %        note 1: return true in this function (except for objects which inherit properties, being thus used as objects),
  // %        note 1: unless you do ini_set('phpjs.objectsAsArrays', 0), in which case only genuine JavaScript arrays
  // %        note 1: will return true
  // *     example 1: is_array(['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: true
  // *     example 2: is_array('Kevin van Zonneveld');
  // *     returns 2: false
  // *     example 3: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
  // *     returns 3: true
  // *     example 4: is_array(function tmp_a(){this.name = 'Kevin'});
  // *     returns 4: false
  var ini,
    _getFuncName = function (fn) {
      var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
      if (!name) {
        return '(Anonymous)';
      }
      return name[1];
    },
    _isArray = function (mixed_var) {
      // return Object.prototype.toString.call(mixed_var) === '[object Array]';
      // The above works, but let's do the even more stringent approach: (since Object.prototype.toString could be overridden)
      // Null, Not an object, no length property so couldn't be an Array (or String)
      if (!mixed_var || typeof mixed_var !== 'object' || typeof mixed_var.length !== 'number') {
        return false;
      }
      var len = mixed_var.length;
      mixed_var[mixed_var.length] = 'bogus';
      // The only way I can think of to get around this (or where there would be trouble) would be to have an object defined
      // with a custom "length" getter which changed behavior on each call (or a setter to mess up the following below) or a custom
      // setter for numeric properties, but even that would need to listen for specific indexes; but there should be no false negatives
      // and such a false positive would need to rely on later JavaScript innovations like __defineSetter__
      if (len !== mixed_var.length) { // We know it's an array since length auto-changed with the addition of a
      // numeric property at its length end, so safely get rid of our bogus element
        mixed_var.length -= 1;
        return true;
      }
      // Get rid of the property we added onto a non-array object; only possible
      // side-effect is if the user adds back the property later, it will iterate
      // this property in the older order placement in IE (an order which should not
      // be depended on anyways)
      delete mixed_var[mixed_var.length];
      return false;
    };

  if (!mixed_var || typeof mixed_var !== 'object') {
    return false;
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT

  ini = this.php_js.ini['phpjs.objectsAsArrays'];

  return _isArray(mixed_var) ||
    // Allow returning true unless user has called
    // ini_set('phpjs.objectsAsArrays', 0) to disallow objects as arrays
    ((!ini || ( // if it's not set to 0 and it's not 'off', check for objects as arrays
    (parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !== 'off')))
    ) && (
    Object.prototype.toString.call(mixed_var) === '[object Object]' && _getFuncName(mixed_var.constructor) === 'Object' // Most likely a literal and intended as assoc. array
    ));
}
function is_binary (vr) {
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: is_binary('This could be binary as far as JavaScript knows...');
  // *     returns 1: true
  return typeof vr === 'string'; // If it is a string of any kind, it could be binary
}
function is_bool (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Onno Marsman
  // +   improved by: CoursesWeb (http://www.coursesweb.net/)
  // *     example 1: is_bool(false);
  // *     returns 1: true
  // *     example 2: is_bool(0);
  // *     returns 2: false
  return (obj === true || obj === false); // Faster (in FF) than type checking
}
function is_buffer (vr) {
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: is_buffer('This could be binary or a regular string as far as JavaScript knows...');
  // *     returns 1: true
  return typeof vr === 'string';
}
function is_callable (v, syntax_only, callable_name) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: François
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: The variable callable_name cannot work as a string variable passed by reference as in PHP (since JavaScript does not support passing strings by reference), but instead will take the name of a global variable and set that instead
  // %        note 2: When used on an object, depends on a constructor property being kept on the object prototype
  // *     example 1: is_callable('is_callable');
  // *     returns 1: true
  // *     example 2: is_callable('bogusFunction', true);
  // *     returns 2: true // gives true because does not do strict checking
  // *     example 3: function SomeClass () {}
  // *     example 3: SomeClass.prototype.someMethod = function (){};
  // *     example 3: var testObj = new SomeClass();
  // *     example 3: is_callable([testObj, 'someMethod'], true, 'myVar');
  // *     example 3: myVar;
  // *     returns 3: 'SomeClass::someMethod'
  // *     example 4: is_callable(function () {});
  // *     returns 4: true

  var name = '',
    obj = {},
    method = '';
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (typeof v === 'string') {
    obj = this.window;
    method = v;
    name = v;
  }
  else if (typeof v === 'function') {
    return true;
  }
  else if (Object.prototype.toString.call(v) === '[object Array]' &&
        v.length === 2 && typeof v[0] === 'object' && typeof v[1] === 'string') {
    obj = v[0];
    method = v[1];
    name = (obj.constructor && getFuncName(obj.constructor)) + '::' + method;
  }
  else {
    return false;
  }
  if (syntax_only || typeof obj[method] === 'function') {
    if (callable_name) {
      this.window[callable_name] = name;
    }
    return true;
  }
  return false;
}
function is_double (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  //  -   depends on: is_float
  // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
  // *     example 1: is_double(186.31);
  // *     returns 1: true
  return this.is_float(mixed_var);
}
function is_float (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
  // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
  // *     example 1: is_float(186.31);
  // *     returns 1: true

  return +mixed_var === mixed_var && (!isFinite(mixed_var) || !!(mixed_var % 1));
}
function is_int (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Alex
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Matt Bradley
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
  // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
  // *     example 1: is_int(23)
  // *     returns 1: true
  // *     example 2: is_int('23')
  // *     returns 2: false
  // *     example 3: is_int(23.5)
  // *     returns 3: false
  // *     example 4: is_int(true)
  // *     returns 4: false

  return mixed_var === +mixed_var && isFinite(mixed_var) && !(mixed_var % 1);
}
function is_integer (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  //  -   depends on: is_int
  // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
  // *     example 1: is_integer(186.31);
  // *     returns 1: false
  // *     example 2: is_integer(12);
  // *     returns 2: true
  return this.is_int(mixed_var);
}
function is_long (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  //  -   depends on: is_float
  // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
  // *     example 1: is_long(186.31);
  // *     returns 1: true
  return this.is_float(mixed_var);
}
function is_null (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: is_null('23');
  // *     returns 1: false
  // *     example 2: is_null(null);
  // *     returns 2: true
  return (mixed_var === null);
}
function is_numeric (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: David
  // +   improved by: taith
  // +   bugfixed by: Tim de Koning
  // +   bugfixed by: WebDevHobo (http://webdevhobo.blogspot.com/)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: is_numeric(186.31);
  // *     returns 1: true
  // *     example 2: is_numeric('Kevin van Zonneveld');
  // *     returns 2: false
  // *     example 3: is_numeric('+186.31e2');
  // *     returns 3: true
  // *     example 4: is_numeric('');
  // *     returns 4: false
  // *     example 4: is_numeric([]);
  // *     returns 4: false
  return (typeof(mixed_var) === 'number' || typeof(mixed_var) === 'string') && mixed_var !== '' && !isNaN(mixed_var);
}
function is_object (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Legaev Andrey
  // +   improved by: Michael White (http://getsprink.com)
  // *     example 1: is_object('23');
  // *     returns 1: false
  // *     example 2: is_object({foo: 'bar'});
  // *     returns 2: true
  // *     example 3: is_object(null);
  // *     returns 3: false
  if (Object.prototype.toString.call(mixed_var) === '[object Array]') {
    return false;
  }
  return mixed_var !== null && typeof mixed_var === 'object';
}
function is_real (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  //  -   depends on: is_float
  // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
  // *     example 1: is_double(186.31);
  // *     returns 1: true
  return this.is_float(mixed_var);
}
function is_resource (handle) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Luis Salazar (http://www.freaky-media.com/)
  // *     example 1: is_resource('a');
  // *     returns 1: false
  var getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  return !(!handle || typeof handle !== 'object' || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource');
}
function is_scalar (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  // *     example 1: is_scalar(186.31);
  // *     returns 1: true
  // *     example 2: is_scalar({0: 'Kevin van Zonneveld'});
  // *     returns 2: false
  return (/boolean|number|string/).test(typeof mixed_var);
}
function is_string (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: is_string('23');
  // *     returns 1: true
  // *     example 2: is_string(23.5);
  // *     returns 2: false
  return (typeof(mixed_var) == 'string');
}
function is_unicode (vr) {
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Almost all strings in JavaScript should be Unicode
  // *     example 1: is_unicode('We the peoples of the United Nations...!');
  // *     returns 1: true
  if (typeof vr !== 'string') {
    return false;
  }

  // If surrogates occur outside of high-low pairs, then this is not Unicode
  var arr = [],
    any = '([\s\S])',
    highSurrogate = '[\uD800-\uDBFF]',
    lowSurrogate = '[\uDC00-\uDFFF]',
    highSurrogateBeforeAny = new RegExp(highSurrogate + any, 'g'),
    lowSurrogateAfterAny = new RegExp(any + lowSurrogate, 'g'),
    singleLowSurrogate = new RegExp('^' + lowSurrogate + '$'),
    singleHighSurrogate = new RegExp('^' + highSurrogate + '$');

  while ((arr = highSurrogateBeforeAny.exec(vr)) !== null) {
    if (!arr[1] || !arr[1].match(singleLowSurrogate)) { // If high not followed by low surrogate
      return false;
    }
  }
  while ((arr = lowSurrogateAfterAny.exec(vr)) !== null) {
    if (!arr[1] || !arr[1].match(singleHighSurrogate)) { // If low not preceded by high surrogate
      return false;
    }
  }
  return true;
}
function isset () {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: FremyCompany
  // +   improved by: Onno Marsman
  // +   improved by: Rafał Kukawski
  // *     example 1: isset( undefined, true);
  // *     returns 1: false
  // *     example 2: isset( 'Kevin van Zonneveld' );
  // *     returns 2: true
  var a = arguments,
    l = a.length,
    i = 0,
    undef;

  if (l === 0) {
    throw new Error('Empty isset');
  }

  while (i !== l) {
    if (a[i] === undef || a[i] === null) {
      return false;
    }
    i++;
  }
  return true;
}
function print_r (array, return_val) {
  // http://kevin.vanzonneveld.net
  // +   original by: Michael White (http://getsprink.com)
  // +   improved by: Ben Bryan
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: echo
  // *     example 1: print_r(1, true);
  // *     returns 1: 1
  var output = '',
    pad_char = ' ',
    pad_val = 4,
    d = this.window.document,
    getFuncName = function (fn) {
      var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
      if (!name) {
        return '(Anonymous)';
      }
      return name[1];
    },
    repeat_char = function (len, pad_char) {
      var str = '';
      for (var i = 0; i < len; i++) {
        str += pad_char;
      }
      return str;
    },
    formatArray = function (obj, cur_depth, pad_val, pad_char) {
      if (cur_depth > 0) {
        cur_depth++;
      }

      var base_pad = repeat_char(pad_val * cur_depth, pad_char);
      var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
      var str = '';

      if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !== 'PHPJS_Resource') {
        str += 'Array\n' + base_pad + '(\n';
        for (var key in obj) {
          if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
            str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);
          }
          else {
            str += thick_pad + '[' + key + '] => ' + obj[key] + '\n';
          }
        }
        str += base_pad + ')\n';
      }
      else if (obj === null || obj === undefined) {
        str = '';
      }
      else { // for our "resource" class
        str = obj.toString();
      }

      return str;
    };

  output = formatArray(array, 0, pad_val, pad_char);

  if (return_val !== true) {
    if (d.body) {
      this.echo(output);
    }
    else {
      try {
        d = XULDocument; // We're in XUL, so appending as plain text won't work; trigger an error out of XUL
        this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + output + '</pre>');
      } catch (e) {
        this.echo(output); // Outputting as plain text may work in some plain XML
      }
    }
    return true;
  }
  return output;
}
function serialize (mixed_value) {
  // http://kevin.vanzonneveld.net
  // +   original by: Arpad Ray (mailto:arpad@php.net)
  // +   improved by: Dino
  // +   bugfixed by: Andrej Pavlovic
  // +   bugfixed by: Garagoth
  // +      input by: DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)
  // +   bugfixed by: Russell Walker (http://www.nbill.co.uk/)
  // +   bugfixed by: Jamie Beck (http://www.terabit.ca/)
  // +      input by: Martin (http://www.erlenwiese.de/)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
  // +   improved by: Le Torbi (http://www.letorbi.de/)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
  // +   bugfixed by: Ben (http://benblume.co.uk/)
  // %          note: We feel the main purpose of this function should be to ease the transport of data between php & js
  // %          note: Aiming for PHP-compatibility, we have to translate objects to arrays
  // *     example 1: serialize(['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
  // *     example 2: serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});
  // *     returns 2: 'a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}'
  var val, key, okey,
    ktype = '', vals = '', count = 0,
    _utf8Size = function (str) {
      var size = 0,
        i = 0,
        l = str.length,
        code = '';
      for (i = 0; i < l; i++) {
        code = str.charCodeAt(i);
        if (code < 0x0080) {
          size += 1;
        }
        else if (code < 0x0800) {
          size += 2;
        }
        else {
          size += 3;
        }
      }
      return size;
    },
    _getType = function (inp) {
      var match, key, cons, types, type = typeof inp;

      if (type === 'object' && !inp) {
        return 'null';
      }
      if (type === 'object') {
        if (!inp.constructor) {
          return 'object';
        }
        cons = inp.constructor.toString();
        match = cons.match(/(\w+)\(/);
        if (match) {
          cons = match[1].toLowerCase();
        }
        types = ['boolean', 'number', 'string', 'array'];
        for (key in types) {
          if (cons == types[key]) {
            type = types[key];
            break;
          }
        }
      }
      return type;
    },
    type = _getType(mixed_value)
  ;

  switch (type) {
    case 'function':
      val = '';
      break;
    case 'boolean':
      val = 'b:' + (mixed_value ? '1' : '0');
      break;
    case 'number':
      val = (Math.round(mixed_value) == mixed_value ? 'i' : 'd') + ':' + mixed_value;
      break;
    case 'string':
      val = 's:' + _utf8Size(mixed_value) + ':"' + mixed_value + '"';
      break;
    case 'array': case 'object':
      val = 'a';
  /*
        if (type === 'object') {
          var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
          if (objname == undefined) {
            return;
          }
          objname[1] = this.serialize(objname[1]);
          val = 'O' + objname[1].substring(1, objname[1].length - 1);
        }
        */

      for (key in mixed_value) {
        if (mixed_value.hasOwnProperty(key)) {
          ktype = _getType(mixed_value[key]);
          if (ktype === 'function') {
            continue;
          }

          okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
          vals += this.serialize(okey) + this.serialize(mixed_value[key]);
          count++;
        }
      }
      val += ':' + count + ':{' + vals + '}';
      break;
    case 'undefined':
      // Fall-through
    default:
      // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP
      val = 'N';
      break;
  }
  if (type !== 'object' && type !== 'array') {
    val += ';';
  }
  return val;
}
function settype (vr, type) {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Credits to Crockford also
  // %        note 2: only works on global variables, and "vr" must be passed in as a string
  // *     example 1: foo = '5bar';
  // *     example 1: settype('foo', 'integer');
  // *     results 1: foo === 5
  // *     returns 1: true
  // *     example 2: foo = true;
  // *     example 2: settype('foo', 'string');
  // *     results 2: foo === '1'
  // *     returns 2: true
  var is_array = function (arr) {
    return typeof arr === 'object' && typeof arr.length === 'number' && !(arr.propertyIsEnumerable('length')) && typeof arr.splice === 'function';
  };
  var v, mtch, i, obj;
  v = this[vr] ? this[vr] : vr;

  try {
    switch (type) {
    case 'boolean':
      if (is_array(v) && v.length === 0) {
        this[vr] = false;
      } else if (v === '0') {
        this[vr] = false;
      } else if (typeof v === 'object' && !is_array(v)) {
        var lgth = false;
        for (i in v) {
          lgth = true;
        }
        this[vr] = lgth;
      } else {
        this[vr] = !! v;
      }
      break;
    case 'integer':
      if (typeof v === 'number') {
        this[vr] = parseInt(v, 10);
      } else if (typeof v === 'string') {
        mtch = v.match(/^([+\-]?)(\d+)/);
        if (!mtch) {
          this[vr] = 0;
        } else {
          this[vr] = parseInt(v, 10);
        }
      } else if (v === true) {
        this[vr] = 1;
      } else if (v === false || v === null) {
        this[vr] = 0;
      } else if (is_array(v) && v.length === 0) {
        this[vr] = 0;
      } else if (typeof v === 'object') {
        this[vr] = 1;
      }

      break;
    case 'float':
      if (typeof v === 'string') {
        mtch = v.match(/^([+\-]?)(\d+(\.\d+)?|\.\d+)([eE][+\-]?\d+)?/);
        if (!mtch) {
          this[vr] = 0;
        } else {
          this[vr] = parseFloat(v, 10);
        }
      } else if (v === true) {
        this[vr] = 1;
      } else if (v === false || v === null) {
        this[vr] = 0;
      } else if (is_array(v) && v.length === 0) {
        this[vr] = 0;
      } else if (typeof v === 'object') {
        this[vr] = 1;
      }
      break;
    case 'string':
      if (v === null || v === false) {
        this[vr] = '';
      } else if (is_array(v)) {
        this[vr] = 'Array';
      } else if (typeof v === 'object') {
        this[vr] = 'Object';
      } else if (v === true) {
        this[vr] = '1';
      } else {
        this[vr] += '';
      } // numbers (and functions?)
      break;
    case 'array':
      if (v === null) {
        this[vr] = [];
      } else if (typeof v !== 'object') {
        this[vr] = [v];
      }
      break;
    case 'object':
      if (v === null) {
        this[vr] = {};
      } else if (is_array(v)) {
        for (i = 0, obj = {}; i < v.length; i++) {
          obj[i] = v;
        }
        this[vr] = obj;
      } else if (typeof v !== 'object') {
        this[vr] = {
          scalar: v
        };
      }
      break;
    case 'null':
      delete this[vr];
      break;
    }
    return true;
  } catch (e) {
    return false;
  }
}
function strval (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Comment out the entire switch if you want JS-like behavior instead of PHP behavior
  // -    depends on: gettype
  // *     example 1: strval({red: 1, green: 2, blue: 3, white: 4});
  // *     returns 1: 'Array'
  var type = '';

  if (str === null) {
    return '';
  }

  type = this.gettype(str);
  switch (type) {
  case 'boolean':
    if (str === true) {
      return '1';
    }
    return '';
  case 'array':
    return 'Array';
  case 'object':
    return 'Object';
  }

  return str;
}
function unserialize (data) {
  // http://kevin.vanzonneveld.net
  // +     original by: Arpad Ray (mailto:arpad@php.net)
  // +     improved by: Pedro Tainha (http://www.pedrotainha.com)
  // +     bugfixed by: dptr1988
  // +      revised by: d3x
  // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +        input by: Brett Zamir (http://brett-zamir.me)
  // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     improved by: Chris
  // +     improved by: James
  // +        input by: Martin (http://www.erlenwiese.de/)
  // +     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     improved by: Le Torbi
  // +     input by: kilops
  // +     bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Jaroslaw Czarniak
  // %            note: We feel the main purpose of this function should be to ease the transport of data between php & js
  // %            note: Aiming for PHP-compatibility, we have to translate objects to arrays
  // *       example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
  // *       returns 1: ['Kevin', 'van', 'Zonneveld']
  // *       example 2: unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
  // *       returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}
  var that = this,
    utf8Overhead = function (chr) {
      // http://phpjs.org/functions/unserialize:571#comment_95906
      var code = chr.charCodeAt(0);
      if (code < 0x0080) {
        return 0;
      }
      if (code < 0x0800) {
        return 1;
      }
      return 2;
    },
    error = function (type, msg, filename, line) {
      throw new that.window[type](msg, filename, line);
    },
    read_until = function (data, offset, stopchr) {
      var i = 2, buf = [], chr = data.slice(offset, offset + 1);

      while (chr != stopchr) {
        if ((i + offset) > data.length) {
          error('Error', 'Invalid');
        }
        buf.push(chr);
        chr = data.slice(offset + (i - 1), offset + i);
        i += 1;
      }
      return [buf.length, buf.join('')];
    },
    read_chrs = function (data, offset, length) {
      var i, chr, buf;

      buf = [];
      for (i = 0; i < length; i++) {
        chr = data.slice(offset + (i - 1), offset + i);
        buf.push(chr);
        length -= utf8Overhead(chr);
      }
      return [buf.length, buf.join('')];
    },
    _unserialize = function (data, offset) {
      var dtype, dataoffset, keyandchrs, keys,
        readdata, readData, ccount, stringlength,
        i, key, kprops, kchrs, vprops, vchrs, value,
        chrs = 0,
        typeconvert = function (x) {
          return x;
        };

      if (!offset) {
        offset = 0;
      }
      dtype = (data.slice(offset, offset + 1)).toLowerCase();

      dataoffset = offset + 2;

      switch (dtype) {
        case 'i':
          typeconvert = function (x) {
            return parseInt(x, 10);
          };
          readData = read_until(data, dataoffset, ';');
          chrs = readData[0];
          readdata = readData[1];
          dataoffset += chrs + 1;
          break;
        case 'b':
          typeconvert = function (x) {
            return parseInt(x, 10) !== 0;
          };
          readData = read_until(data, dataoffset, ';');
          chrs = readData[0];
          readdata = readData[1];
          dataoffset += chrs + 1;
          break;
        case 'd':
          typeconvert = function (x) {
            return parseFloat(x);
          };
          readData = read_until(data, dataoffset, ';');
          chrs = readData[0];
          readdata = readData[1];
          dataoffset += chrs + 1;
          break;
        case 'n':
          readdata = null;
          break;
        case 's':
          ccount = read_until(data, dataoffset, ':');
          chrs = ccount[0];
          stringlength = ccount[1];
          dataoffset += chrs + 2;

          readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
          chrs = readData[0];
          readdata = readData[1];
          dataoffset += chrs + 2;
          if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
            error('SyntaxError', 'String length mismatch');
          }
          break;
        case 'a':
          readdata = {};

          keyandchrs = read_until(data, dataoffset, ':');
          chrs = keyandchrs[0];
          keys = keyandchrs[1];
          dataoffset += chrs + 2;

          for (i = 0; i < parseInt(keys, 10); i++) {
            kprops = _unserialize(data, dataoffset);
            kchrs = kprops[1];
            key = kprops[2];
            dataoffset += kchrs;

            vprops = _unserialize(data, dataoffset);
            vchrs = vprops[1];
            value = vprops[2];
            dataoffset += vchrs;

            readdata[key] = value;
          }

          dataoffset += 1;
          break;
        default:
          error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
          break;
      }
      return [dtype, dataoffset - offset, typeconvert(readdata)];
    }
  ;

  return _unserialize((data + ''), 0)[2];
}
function var_dump () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Zahlii
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: echo
  // %        note 1: For returning a string, use var_export() with the second argument set to true
  // *     example 1: var_dump(1);
  // *     returns 1: 'int(1)'

  var output = '',
    pad_char = ' ',
    pad_val = 4,
    lgth = 0,
    i = 0,
    d = this.window.document;
  var _getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  var _repeat_char = function (len, pad_char) {
    var str = '';
    for (var i = 0; i < len; i++) {
      str += pad_char;
    }
    return str;
  };
  var _getInnerVal = function (val, thick_pad) {
    var ret = '';
    if (val === null) {
      ret = 'NULL';
    } else if (typeof val === 'boolean') {
      ret = 'bool(' + val + ')';
    } else if (typeof val === 'string') {
      ret = 'string(' + val.length + ') "' + val + '"';
    } else if (typeof val === 'number') {
      if (parseFloat(val) == parseInt(val, 10)) {
        ret = 'int(' + val + ')';
      } else {
        ret = 'float(' + val + ')';
      }
    }
    // The remaining are not PHP behavior because these values only exist in this exact form in JavaScript
    else if (typeof val === 'undefined') {
      ret = 'undefined';
    } else if (typeof val === 'function') {
      var funcLines = val.toString().split('\n');
      ret = '';
      for (var i = 0, fll = funcLines.length; i < fll; i++) {
        ret += (i !== 0 ? '\n' + thick_pad : '') + funcLines[i];
      }
    } else if (val instanceof Date) {
      ret = 'Date(' + val + ')';
    } else if (val instanceof RegExp) {
      ret = 'RegExp(' + val + ')';
    } else if (val.nodeName) { // Different than PHP's DOMElement
      switch (val.nodeType) {
      case 1:
        if (typeof val.namespaceURI === 'undefined' || val.namespaceURI === 'http://www.w3.org/1999/xhtml') { // Undefined namespace could be plain XML, but namespaceURI not widely supported
          ret = 'HTMLElement("' + val.nodeName + '")';
        } else {
          ret = 'XML Element("' + val.nodeName + '")';
        }
        break;
      case 2:
        ret = 'ATTRIBUTE_NODE(' + val.nodeName + ')';
        break;
      case 3:
        ret = 'TEXT_NODE(' + val.nodeValue + ')';
        break;
      case 4:
        ret = 'CDATA_SECTION_NODE(' + val.nodeValue + ')';
        break;
      case 5:
        ret = 'ENTITY_REFERENCE_NODE';
        break;
      case 6:
        ret = 'ENTITY_NODE';
        break;
      case 7:
        ret = 'PROCESSING_INSTRUCTION_NODE(' + val.nodeName + ':' + val.nodeValue + ')';
        break;
      case 8:
        ret = 'COMMENT_NODE(' + val.nodeValue + ')';
        break;
      case 9:
        ret = 'DOCUMENT_NODE';
        break;
      case 10:
        ret = 'DOCUMENT_TYPE_NODE';
        break;
      case 11:
        ret = 'DOCUMENT_FRAGMENT_NODE';
        break;
      case 12:
        ret = 'NOTATION_NODE';
        break;
      }
    }
    return ret;
  };

  var _formatArray = function (obj, cur_depth, pad_val, pad_char) {
    var someProp = '';
    if (cur_depth > 0) {
      cur_depth++;
    }

    var base_pad = _repeat_char(pad_val * (cur_depth - 1), pad_char);
    var thick_pad = _repeat_char(pad_val * (cur_depth + 1), pad_char);
    var str = '';
    var val = '';

    if (typeof obj === 'object' && obj !== null) {
      if (obj.constructor && _getFuncName(obj.constructor) === 'PHPJS_Resource') {
        return obj.var_dump();
      }
      lgth = 0;
      for (someProp in obj) {
        lgth++;
      }
      str += 'array(' + lgth + ') {\n';
      for (var key in obj) {
        var objVal = obj[key];
        if (typeof objVal === 'object' && objVal !== null && !(objVal instanceof Date) && !(objVal instanceof RegExp) && !objVal.nodeName) {
          str += thick_pad + '[' + key + '] =>\n' + thick_pad + _formatArray(objVal, cur_depth + 1, pad_val, pad_char);
        } else {
          val = _getInnerVal(objVal, thick_pad);
          str += thick_pad + '[' + key + '] =>\n' + thick_pad + val + '\n';
        }
      }
      str += base_pad + '}\n';
    } else {
      str = _getInnerVal(obj, thick_pad);
    }
    return str;
  };

  output = _formatArray(arguments[0], 0, pad_val, pad_char);
  for (i = 1; i < arguments.length; i++) {
    output += '\n' + _formatArray(arguments[i], 0, pad_val, pad_char);
  }

  if (d.body) {
    this.echo(output);
  } else {
    try {
      d = XULDocument; // We're in XUL, so appending as plain text won't work
      this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + output + '</pre>');
    } catch (e) {
      this.echo(output); // Outputting as plain text may work in some plain XML
    }
  }
}
function var_export (mixed_expression, bool_return) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +   improved by: johnrembo
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Brian Tafoya (http://www.premasolutions.com/)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Hans Henrik (http://hanshenrik.tk/)
  // -    depends on: echo
  // *     example 1: var_export(null);
  // *     returns 1: null
  // *     example 2: var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true);
  // *     returns 2: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld'\n)"
  // *     example 3: data = 'Kevin';
  // *     example 3: var_export(data, true);
  // *     returns 3: "'Kevin'"
  var retstr = '',
    iret = '',
    value,
    cnt = 0,
    x = [],
    i = 0,
    funcParts = [],
    // We use the last argument (not part of PHP) to pass in
    // our indentation level
    idtLevel = arguments[2] || 2,
    innerIndent = '',
    outerIndent = '',
    getFuncName = function (fn) {
      var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
      if (!name) {
        return '(Anonymous)';
      }
      return name[1];
    },
    _makeIndent = function (idtLevel) {
      return (new Array(idtLevel + 1)).join(' ');
    },
    __getType = function (inp) {
      var i = 0, match, types, cons, type = typeof inp;
      if (type === 'object' && inp.constructor &&
        getFuncName(inp.constructor) === 'PHPJS_Resource') {
        return 'resource';
      }
      if (type === 'function') {
        return 'function';
      }
      if (type === 'object' && !inp) {
        return 'null'; // Should this be just null?
      }
      if (type === "object") {
        if (!inp.constructor) {
          return 'object';
        }
        cons = inp.constructor.toString();
        match = cons.match(/(\w+)\(/);
        if (match) {
          cons = match[1].toLowerCase();
        }
        types = ["boolean", "number", "string", "array"];
        for (i = 0; i < types.length; i++) {
          if (cons === types[i]) {
            type = types[i];
            break;
          }
        }
      }
      return type;
    },
    type = __getType(mixed_expression);

  if (type === null) {
    retstr = "NULL";
  } else if (type === 'array' || type === 'object') {
    outerIndent = _makeIndent(idtLevel - 2);
    innerIndent = _makeIndent(idtLevel);
    for (i in mixed_expression) {
      value = this.var_export(mixed_expression[i], 1, idtLevel + 2);
      value = typeof value === 'string' ? value.replace(/</g, '&lt;').
                        replace(/>/g, '&gt;') : value;
      x[cnt++] = innerIndent + i + ' => ' +
            (__getType(mixed_expression[i]) === 'array' ?
              '\n' : '') + value;
    }
    iret = x.join(',\n');
    retstr = outerIndent + "array (\n" + iret + '\n' + outerIndent + ')';
  } else if (type === 'function') {
    funcParts = mixed_expression.toString().
            match(/function .*?\((.*?)\) \{([\s\S]*)\}/);

    // For lambda functions, var_export() outputs such as the following:
    // '\000lambda_1'. Since it will probably not be a common use to
    // expect this (unhelpful) form, we'll use another PHP-exportable
    // construct, create_function() (though dollar signs must be on the
    // variables in JavaScript); if using instead in JavaScript and you
    // are using the namespaced version, note that create_function() will
    // not be available as a global
    retstr = "create_function ('" + funcParts[1] + "', '" +
          funcParts[2].replace(new RegExp("'", 'g'), "\\'") + "')";
  } else if (type === 'resource') {
    retstr = 'NULL'; // Resources treated as null for var_export
  } else {
    retstr = typeof mixed_expression !== 'string' ? mixed_expression :
          "'" + mixed_expression.replace(/(["'])/g, "\\$1").
              replace(/\0/g, "\\0") + "'";
  }

  if (!bool_return) {
    this.echo(retstr);
    return null;
  }
  return retstr;
}
function xdiff_string_diff (old_data, new_data, context_lines, minimal) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   based on: Imgen Tata (http://www.myipdf.com/)
  // +   bugfixed by: Imgen Tata (http://www.myipdf.com/)
  // %        note 1: The minimal argument is not currently supported
  // *     example 1: xdiff_string_diff('', 'Hello world!');
  // *     returns 1: '@@ -0,0 +1,1 @@\n+Hello world!'

  // (This code was done by Imgen Tata; I have only reformatted for use in php.js)

  // See http://en.wikipedia.org/wiki/Diff#Unified_format
  var i = 0,
    j = 0,
    k = 0,
    ori_hunk_start, new_hunk_start, ori_hunk_end, new_hunk_end, ori_hunk_line_no, new_hunk_line_no, ori_hunk_size, new_hunk_size,
    // Potential configuration
    MAX_CONTEXT_LINES = Number.POSITIVE_INFINITY,
    MIN_CONTEXT_LINES = 0,
    DEFAULT_CONTEXT_LINES = 3,
    //
    HEADER_PREFIX = '@@ ',
    HEADER_SUFFIX = ' @@',
    ORIGINAL_INDICATOR = '-',
    NEW_INDICATOR = '+',
    RANGE_SEPARATOR = ',',
    CONTEXT_INDICATOR = ' ',
    DELETION_INDICATOR = '-',
    ADDITION_INDICATOR = '+',
    ori_lines, new_lines, NEW_LINE = '\n',
/*
    *Trims string
    */
    trim = function (text) {
      if (typeof text !== 'string') {
        throw Error('String parameter required');
      }

      return text.replace(/(^\s*)|(\s*$)/g, '');
    },
/*
    *Verifies type of arguments
    */
    verify_type = function (type) {
      var args = arguments,
        args_len = arguments.length,
        basic_types = ['number', 'boolean', 'string', 'function', 'object', 'undefined'],
        basic_type, i, j, type_of_type = typeof type;
      if (type_of_type !== 'string' && type_of_type !== 'function') {
        throw new Error('Bad type parameter');
      }

      if (args_len < 2) {
        throw new Error('Too few arguments');
      }

      if (type_of_type === 'string') {
        type = trim(type);

        if (type === '') {
          throw new Error('Bad type parameter');
        }

        for (j = 0; j < basic_types.length; j++) {
          basic_type = basic_types[j];

          if (basic_type == type) {
            for (i = 1; i < args_len; i++) {
              if (typeof args[i] != type) {
                throw new Error('Bad type');
              }
            }

            return;
          }
        }

        throw new Error('Bad type parameter');
      }

      // Not basic type. we need to use instanceof operator
      for (i = 1; i < args_len; i++) {
        if (!(args[i] instanceof type)) {
          throw new Error('Bad type');
        }
      }
    },
/*
    *Checks if the specified array contains an element with specified value
    */
    has_value = function (array, value) {
      var i;
      verify_type(Array, array);

      for (i = 0; i < array.length; i++) {
        if (array[i] === value) {
          return true;
        }
      }

      return false;
    },
/*
    *Checks the type of arguments
    *@param {String | Function} type Specifies the desired type
    *@return {Boolean} Return true if all arguments after the type argument are of specified type. Else false
    */
    are_type_of = function (type) {
      var args = arguments,
        args_len = arguments.length,
        basic_types = ['number', 'boolean', 'string', 'function', 'object', 'undefined'],
        basic_type, i, j, type_of_type = typeof type;
      if (type_of_type !== 'string' && type_of_type !== 'function') {
        throw new Error('Bad type parameter');
      }

      if (args_len < 2) {
        throw new Error('Too few arguments');
      }

      if (type_of_type === 'string') {
        type = trim(type);

        if (type === '') {
          return false;
        }

        for (j = 0; j < basic_types.length; j++) {
          basic_type = basic_types[j];

          if (basic_type == type) {
            for (i = 1; i < args_len; i++) {
              if (typeof args[i] != type) {
                return false;
              }
            }

            return true;
          }
        }

        throw new Error('Bad type parameter');
      }

      // Not basic type. we need to use instanceof operator
      for (i = 1; i < args_len; i++) {
        if (!(args[i] instanceof type)) {
          return false;
        }
      }

      return true;
    },
/*
    *Initialize and return an array with specified size and initial value
    */
    get_initialized_array = function (array_size, init_value) {
      var array = [],
        i;
      verify_type('number', array_size);

      for (i = 0; i < array_size; i++) {
        array.push(init_value);
      }

      return array;
    },
/*
    *Splits text into lines and return as a string array
    */
    split_into_lines = function (text) {
      verify_type('string', text);

      if (text === '') {
        return [];
      }
      return text.split('\n');
    },
    is_empty_array = function (obj) {
      return are_type_of(Array, obj) && obj.length === 0;
    },
/*
    * Finds longest common sequence between two sequences
    *See http://wordaligned.org/articles/longest-common-subsequence
    */
    find_longest_common_sequence = function (seq1, seq2, seq1_is_in_lcs, seq2_is_in_lcs) {
      if (!are_type_of(Array, seq1, seq2)) {
        throw new Error('Array parameters are required');
      }

      // Deal with edge case
      if (is_empty_array(seq1) || is_empty_array(seq2)) {
        return [];
      }

      // Function to calculate lcs lengths
      var lcs_lens = function (xs, ys) {
        var curr = get_initialized_array(ys.length + 1, 0);
        var prev;
        var i, j;

        for (i = 0; i < xs.length; i++) {
          prev = curr.slice(0);
          for (j = 0; j < ys.length; j++) {
            if (xs[i] === ys[j]) {
              curr[j + 1] = prev[j] + 1;
            } else {
              curr[j + 1] = Math.max(curr[j], prev[j + 1]);
            }
          }
        }

        return curr;
      },
        // Function to find lcs and fill in the array to indicate the optimal longest common sequence
        find_lcs = function (xs, xidx, xs_is_in, ys) {
          var nx = xs.length;
          var ny = ys.length;
          var i;
          var xb, xe;
          var ll_b, ll_e;
          var pivot;
          var max;
          var yb, ye;

          if (nx === 0) {
            return [];
          } else if (nx === 1) {
            if (has_value(ys, xs[0])) {
              xs_is_in[xidx] = true;
              return [xs[0]];
            } else {
              return [];
            }
          } else {
            i = Math.floor(nx / 2);
            xb = xs.slice(0, i);
            xe = xs.slice(i);
            ll_b = lcs_lens(xb, ys);
            ll_e = lcs_lens(xe.slice(0).reverse(), ys.slice(0).reverse());

            pivot = 0;
            max = 0;
            for (j = 0; j <= ny; j++) {
              if (ll_b[j] + ll_e[ny - j] > max) {
                pivot = j;
                max = ll_b[j] + ll_e[ny - j];
              }
            }
            yb = ys.slice(0, pivot);
            ye = ys.slice(pivot);
            return find_lcs(xb, xidx, xs_is_in, yb).concat(find_lcs(xe, xidx + i, xs_is_in, ye));
          }
        };

      // Fill in seq1_is_in_lcs to find the optimal longest common subsequence of first sequence
      find_lcs(seq1, 0, seq1_is_in_lcs, seq2);
      // Fill in seq2_is_in_lcs to find the optimal longest common subsequence of second sequence and return the result
      return find_lcs(seq2, 0, seq2_is_in_lcs, seq1);
    };

  // First, check the parameters
  if (are_type_of('string', old_data, new_data) === false) {
    return false;
  }

  if (old_data == new_data) {
    return '';
  }

  if (typeof context_lines !== 'number' || context_lines > MAX_CONTEXT_LINES || context_lines < MIN_CONTEXT_LINES) {
    context_lines = DEFAULT_CONTEXT_LINES;
  }

  ori_lines = split_into_lines(old_data);
  new_lines = split_into_lines(new_data);
  var ori_len = ori_lines.length,
    new_len = new_lines.length,
    ori_is_in_lcs = get_initialized_array(ori_len, false),
    new_is_in_lcs = get_initialized_array(new_len, false),
    lcs_len = find_longest_common_sequence(ori_lines, new_lines, ori_is_in_lcs, new_is_in_lcs).length,
    unidiff = '';

  if (lcs_len === 0) { // No common sequence
    unidiff = HEADER_PREFIX + ORIGINAL_INDICATOR + (ori_len > 0 ? '1' : '0') + RANGE_SEPARATOR + ori_len + ' ' + NEW_INDICATOR + (new_len > 0 ? '1' : '0') + RANGE_SEPARATOR + new_len + HEADER_SUFFIX;

    for (i = 0; i < ori_len; i++) {
      unidiff += NEW_LINE + DELETION_INDICATOR + ori_lines[i];
    }

    for (j = 0; j < new_len; j++) {
      unidiff += NEW_LINE + ADDITION_INDICATOR + new_lines[j];
    }

    return unidiff;
  }

  var leading_context = [],
    trailing_context = [],
    actual_leading_context = [],
    actual_trailing_context = [],

    // Regularize leading context by the context_lines parameter
    regularize_leading_context = function (context) {
      if (context.length === 0 || context_lines === 0) {
        return [];
      }

      var context_start_pos = Math.max(context.length - context_lines, 0);

      return context.slice(context_start_pos);
    },

    // Regularize trailing context by the context_lines parameter
    regularize_trailing_context = function (context) {
      if (context.length === 0 || context_lines === 0) {
        return [];
      }

      return context.slice(0, Math.min(context_lines, context.length));
    };

  // Skip common lines in the beginning
  while (i < ori_len && ori_is_in_lcs[i] === true && new_is_in_lcs[i] === true) {
    leading_context.push(ori_lines[i]);
    i++;
  }

  j = i;
  k = i; // The index in the longest common sequence
  ori_hunk_start = i;
  new_hunk_start = j;
  ori_hunk_end = i;
  new_hunk_end = j;

  while (i < ori_len || j < new_len) {
    while (i < ori_len && ori_is_in_lcs[i] === false) {
      i++;
    }
    ori_hunk_end = i;

    while (j < new_len && new_is_in_lcs[j] === false) {
      j++;
    }
    new_hunk_end = j;

    // Find the trailing context
    trailing_context = [];
    while (i < ori_len && ori_is_in_lcs[i] === true && j < new_len && new_is_in_lcs[j] === true) {
      trailing_context.push(ori_lines[i]);
      k++;
      i++;
      j++;
    }

    if (k >= lcs_len || // No more in longest common lines
    trailing_context.length >= 2 * context_lines) { // Context break found
      if (trailing_context.length < 2 * context_lines) { // It must be last block of common lines but not a context break
        trailing_context = [];

        // Force break out
        i = ori_len;
        j = new_len;

        // Update hunk ends to force output to the end
        ori_hunk_end = ori_len;
        new_hunk_end = new_len;
      }

      // Output the diff hunk

      // Trim the leading and trailing context block
      actual_leading_context = regularize_leading_context(leading_context);
      actual_trailing_context = regularize_trailing_context(trailing_context);

      ori_hunk_start -= actual_leading_context.length;
      new_hunk_start -= actual_leading_context.length;
      ori_hunk_end += actual_trailing_context.length;
      new_hunk_end += actual_trailing_context.length;

      ori_hunk_line_no = ori_hunk_start + 1;
      new_hunk_line_no = new_hunk_start + 1;
      ori_hunk_size = ori_hunk_end - ori_hunk_start;
      new_hunk_size = new_hunk_end - new_hunk_start;

      // Build header
      unidiff += HEADER_PREFIX + ORIGINAL_INDICATOR + ori_hunk_line_no + RANGE_SEPARATOR + ori_hunk_size + ' ' + NEW_INDICATOR + new_hunk_line_no + RANGE_SEPARATOR + new_hunk_size + HEADER_SUFFIX + NEW_LINE;

      // Build the diff hunk content
      while (ori_hunk_start < ori_hunk_end || new_hunk_start < new_hunk_end) {
        if (ori_hunk_start < ori_hunk_end && ori_is_in_lcs[ori_hunk_start] === true && new_is_in_lcs[new_hunk_start] === true) { // The context line
          unidiff += CONTEXT_INDICATOR + ori_lines[ori_hunk_start] + NEW_LINE;
          ori_hunk_start++;
          new_hunk_start++;
        } else if (ori_hunk_start < ori_hunk_end && ori_is_in_lcs[ori_hunk_start] === false) { // The deletion line
          unidiff += DELETION_INDICATOR + ori_lines[ori_hunk_start] + NEW_LINE;
          ori_hunk_start++;
        } else if (new_hunk_start < new_hunk_end && new_is_in_lcs[new_hunk_start] === false) { // The additional line
          unidiff += ADDITION_INDICATOR + new_lines[new_hunk_start] + NEW_LINE;
          new_hunk_start++;
        }
      }

      // Update hunk position and leading context
      ori_hunk_start = i;
      new_hunk_start = j;
      leading_context = trailing_context;
    }
  }

  // Trim the trailing new line if it exists
  if (unidiff.length > 0 && unidiff.charAt(unidiff.length) === NEW_LINE) {
    unidiff = unidiff.slice(0, -1);
  }

  return unidiff;
}
function xdiff_string_patch (originalStr, patch, flags, error) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Steven Levithan (stevenlevithan.com)
  // %        note 1: The XDIFF_PATCH_IGNORESPACE flag and the error argument are not currently supported
  // %        note 2: This has not been widely tested
  // *     example 1: xdiff_string_patch('', '@@ -0,0 +1,1 @@\n+Hello world!');
  // *     returns 1: 'Hello world!'

  // First two functions were adapted from Steven Levithan, also under an MIT license
  // Adapted from XRegExp 1.5.0
  // (c) 2007-2010 Steven Levithan
  // MIT License
  // <http://xregexp.com>
  var getNativeFlags = function (regex) {
    return (regex.global ? "g" : "") + (regex.ignoreCase ? "i" : "") + (regex.multiline ? "m" : "") + (regex.extended ? "x" : "") + // Proposed for ES4; included in AS3
    (regex.sticky ? "y" : "");
  },
    cbSplit = function (str, s /* separator */ ) {
      // If separator `s` is not a regex, use the native `split`
      if (!(s instanceof RegExp)) { // Had problems to get it to work here using prototype test
        return String.prototype.split.apply(str, arguments);
      }
      str = str + '';
      var output = [],
        lastLastIndex = 0,
        match, lastLength, limit = Infinity;

      // This is required if not `s.global`, and it avoids needing to set `s.lastIndex` to zero
      // and restore it to its original value when we're done using the regex
      var x = s._xregexp;
      s = new RegExp(s.source, getNativeFlags(s) + 'g'); // Brett paring down
      if (x) {
        s._xregexp = {
          source: x.source,
          captureNames: x.captureNames ? x.captureNames.slice(0) : null
        };
      }

      while ((match = s.exec(str))) { // Run the altered `exec` (required for `lastIndex` fix, etc.)
        if (s.lastIndex > lastLastIndex) {
          output.push(str.slice(lastLastIndex, match.index));

          if (match.length > 1 && match.index < str.length) {
            Array.prototype.push.apply(output, match.slice(1));
          }

          lastLength = match[0].length;
          lastLastIndex = s.lastIndex;

          if (output.length >= limit) break;
        }

        if (s.lastIndex === match.index) {
          s.lastIndex++;
        }
      }

      if (lastLastIndex === str.length) {
        if (!s.test("") || lastLength) {
          output.push("");
        }
      } else {
        output.push(str.slice(lastLastIndex));
      }

      return output.length > limit ? output.slice(0, limit) : output;
    },
    i = 0,
    ll = 0,
    ranges = [],
    lastLinePos = 0,
    firstChar = '',
    rangeExp = /^@@\s+-(\d+),(\d+)\s+\+(\d+),(\d+)\s+@@$/,
    lineBreaks = /\r?\n/,
    lines = cbSplit(patch.replace(/(\r?\n)+$/, ''), lineBreaks),
    origLines = cbSplit(originalStr, lineBreaks),
    newStrArr = [],
    linePos = 0,
    errors = '',
    // Both string & integer (constant) input is allowed
    optTemp = 0,
    OPTS = { // Unsure of actual PHP values, so better to rely on string
      'XDIFF_PATCH_NORMAL': 1,
      'XDIFF_PATCH_REVERSE': 2,
      'XDIFF_PATCH_IGNORESPACE': 4
    };

  // Input defaulting & sanitation
  if (typeof originalStr !== 'string' || !patch) {
    return false;
  }
  if (!flags) {
    flags = 'XDIFF_PATCH_NORMAL';
  }

  if (typeof flags !== 'number') { // Allow for a single string or an array of string flags
    flags = [].concat(flags);
    for (i = 0; i < flags.length; i++) {
      // Resolve string input to bitwise e.g. 'XDIFF_PATCH_NORMAL' becomes 1
      if (OPTS[flags[i]]) {
        optTemp = optTemp | OPTS[flags[i]];
      }
    }
    flags = optTemp;
  }

  if (flags & OPTS.XDIFF_PATCH_NORMAL) {
    for (i = 0, ll = lines.length; i < ll; i++) {
      ranges = lines[i].match(rangeExp);
      if (ranges) {
        lastLinePos = linePos;
        linePos = ranges[1] - 1;
        while (lastLinePos < linePos) {
          newStrArr[newStrArr.length] = origLines[lastLinePos++];
        }
        while (lines[++i] && (rangeExp.exec(lines[i])) == null) {
          firstChar = lines[i].charAt(0);
          switch (firstChar) {
          case '-':
            ++linePos; // Skip including that line
            break;
          case '+':
            newStrArr[newStrArr.length] = lines[i].slice(1);
            break;
          case ' ':
            newStrArr[newStrArr.length] = origLines[linePos++];
            break;
          default:
            throw 'Unrecognized initial character in unidiff line'; // Reconcile with returning errrors arg?
          }
        }
        if (lines[i]) {
          i--;
        }
      }
    }
	while (linePos < origLines.length) {
	  newStrArr[newStrArr.length] = origLines[linePos++];
	}
  } else if (flags & OPTS.XDIFF_PATCH_REVERSE) { // Only differs from above by a few lines
    for (i = 0, ll = lines.length; i < ll; i++) {
      ranges = lines[i].match(rangeExp);
      if (ranges) {
        lastLinePos = linePos;
        linePos = ranges[3] - 1;
        while (lastLinePos < linePos) {
          newStrArr[newStrArr.length] = origLines[lastLinePos++];
        }
        while (lines[++i] && (rangeExp.exec(lines[i])) == null) {
          firstChar = lines[i].charAt(0);
          switch (firstChar) {
          case '-':
            newStrArr[newStrArr.length] = lines[i].slice(1);
            break;
          case '+':
            ++linePos; // Skip including that line
            break;
          case ' ':
            newStrArr[newStrArr.length] = origLines[linePos++];
            break;
          default:
            throw 'Unrecognized initial character in unidiff line'; // Reconcile with returning errrors arg?
          }
        }
        if (lines[i]) {
          i--;
        }
      }
    }
	while (linePos < origLines.length) {
	  newStrArr[newStrArr.length] = origLines[linePos++];
	}
  }
  if (typeof(error) === 'string') {
    this.window[error] = errors;
  }
  return newStrArr.join('\n');
}
function utf8_decode (str_data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // +      input by: Aman Gupta
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Norman "zEh" Fuchs
  // +   bugfixed by: hitwork
  // +   bugfixed by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: kirilloid
  // *     example 1: utf8_decode('Kevin van Zonneveld');
  // *     returns 1: 'Kevin van Zonneveld'

  var tmp_arr = [],
    i = 0,
    ac = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0,
    c4 = 0;

  str_data += '';

  while (i < str_data.length) {
    c1 = str_data.charCodeAt(i);
    if (c1 <= 191) {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
    } else if (c1 <= 223) {
      c2 = str_data.charCodeAt(i + 1);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else if (c1 <= 239) {
      // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    } else {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      c4 = str_data.charCodeAt(i + 3);
      c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
      c1 -= 0x10000;
      tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1>>10) & 0x3FF));
      tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
      i += 4;
    }
  }

  return tmp_arr.join('');
}
function utf8_encode (argString) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: sowberry
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // +   improved by: Yves Sucaet
  // +   bugfixed by: Onno Marsman
  // +   bugfixed by: Ulrich
  // +   bugfixed by: Rafal Kukawski
  // +   improved by: kirilloid
  // +   bugfixed by: kirilloid
  // *     example 1: utf8_encode('Kevin van Zonneveld');
  // *     returns 1: 'Kevin van Zonneveld'

  if (argString === null || typeof argString === "undefined") {
    return "";
  }

  var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  var utftext = '',
    start, end, stringl = 0;

  start = end = 0;
  stringl = string.length;
  for (var n = 0; n < stringl; n++) {
    var c1 = string.charCodeAt(n);
    var enc = null;

    if (c1 < 128) {
      end++;
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode(
         (c1 >> 6)        | 192,
        ( c1        & 63) | 128
      );
    } else if (c1 & 0xF800 != 0xD800) {
      enc = String.fromCharCode(
         (c1 >> 12)       | 224,
        ((c1 >> 6)  & 63) | 128,
        ( c1        & 63) | 128
      );
    } else { // surrogate pairs
      if (c1 & 0xFC00 != 0xD800) { throw new RangeError("Unmatched trail surrogate at " + n); }
      var c2 = string.charCodeAt(++n);
      if (c2 & 0xFC00 != 0xDC00) { throw new RangeError("Unmatched lead surrogate at " + (n-1)); }
      c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
      enc = String.fromCharCode(
         (c1 >> 18)       | 240,
        ((c1 >> 12) & 63) | 128,
        ((c1 >> 6)  & 63) | 128,
        ( c1        & 63) | 128
      );
    }
    if (enc !== null) {
      if (end > start) {
        utftext += string.slice(start, end);
      }
      utftext += enc;
      start = end = n + 1;
    }
  }

  if (end > start) {
    utftext += string.slice(start, stringl);
  }

  return utftext;
}

function is_callable(v, syntax_only, callable_name) {
  //  discuss at: http://phpjs.org/functions/is_callable/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: François
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: The variable callable_name cannot work as a string variable passed by reference as in PHP (since JavaScript does not support passing strings by reference), but instead will take the name of a global variable and set that instead
  //        note: When used on an object, depends on a constructor property being kept on the object prototype
  //        test: skip
  //   example 1: is_callable('is_callable');
  //   returns 1: true
  //   example 2: is_callable('bogusFunction', true);
  //   returns 2: true // gives true because does not do strict checking
  //   example 3: function SomeClass () {}
  //   example 3: SomeClass.prototype.someMethod = function (){};
  //   example 3: var testObj = new SomeClass();
  //   example 3: is_callable([testObj, 'someMethod'], true, 'myVar');
  //   example 3: $result = myVar;
  //   returns 3: 'SomeClass::someMethod'
  //   example 4: is_callable(function () {});
  //   returns 4: true

  var name = '',
    obj = {},
    method = '';
  var getFuncName = function(fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/)
      .exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  if (typeof v === 'string') {
    obj = this.window;
    method = v;
    name = v;
  } else if (typeof v === 'function') {
    return true;
  } else if (Object.prototype.toString.call(v) === '[object Array]' &&
    v.length === 2 && typeof v[0] === 'object' && typeof v[1] === 'string') {
    obj = v[0];
    method = v[1];
    name = (obj.constructor && getFuncName(obj.constructor)) + '::' + method;
  } else {
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
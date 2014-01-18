function call_user_method_array(method, obj, params) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: dnukem
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: Exception
  // %        note 1: Deprecated in PHP
  // *     example 1: call_user_method_array('alert', this.window, ['Hello!']);
  // *     returns 1: 'Hello!'
  // *     example 1: call_user_method_array([this.window, 'alert'], ['Hello!']);
  // *     returns 1: 'Hello!'

  var func, object = obj, methodName = method;
  if (method && typeof method === 'object' && method.length) {
    params = obj;
    object = method[0];
    object = typeof object === 'string' ? this.window[object] : object;
    methodName = method[1];
  }
  func = object[methodName];

  if (typeof func !== 'function') {
    throw new this.Exception(func + ' is not a valid method');
  }

  return func.apply(object, params);
}

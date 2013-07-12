function call_user_method(method, obj) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   input by: dnukem
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: Exception
    // %        note 1: Deprecated in PHP
    // *     example 1: call_user_method('alert', this.window, 'Hello!');
    // *     returns 1: 'Hello!'
    // *     example 2: call_user_method([this.window, 'alert'], 'Hello!');
    // *     returns 2: 'Hello!'

    var func, object = obj, methodName = method, paramBegin = 2;
    if (method && typeof method === 'object' && method.length) {
        paramBegin = 1;
        object = method[0];
        object = typeof object === 'string' ? this.window[object] : object;
        methodName = method[1];
    }
    func = object[methodName];

    if (typeof func !== 'function') {
        throw new this.Exception(func + ' is not a valid method');
    }

    return func.apply(object, Array.prototype.slice.call(arguments, paramBegin));
}

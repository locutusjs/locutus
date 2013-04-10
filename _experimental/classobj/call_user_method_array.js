function call_user_method_array(method, obj, params) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: Exception
    // %        note 1: Deprecated in PHP
    // *     example 1: call_user_method_array('alert', 'this.window', ['Hello!']);
    // *     returns 1: 'Hello!'

    var func;
    func = eval(obj+"['"+method+"']");

    if (typeof func != 'function') {
        throw new this.Exception(func + ' is not a valid method');
    }

    return func.apply(null, params);
}

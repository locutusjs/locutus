function overload (class_name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: This can only work in Mozilla at present
    // %          note 2: only __call() and __callStatic() are made allowable at this point by a call to overload() (__get(), __set(), __isset(), and __unset() are regrettably not possible in JavaScript at present (including Mozilla)!)
    // %          note 3: If passing in string, only works with reference to global class
    // *     example 1: function A () {}
    // *     example 1: A.prototype.__call = function (name, args) {alert(name+'::'+args);};
    // *     example 1: A.__callStatic = function (name, args) {alert('static: '+name+'::'+args);};
    // *     example 1: overload('A');
    // *     example 1: var a = new A();
    // *     example 1: a.b(3, 4); // b::3,4
    // *     example 1: A.c(5, 6); // static: c::5,6
    // *     returns 1: undefined

    var clss = typeof class_name === 'string' ? this.window[class_name] : class_name; // allow as class constructor as well as string reference to global

    // Mozilla only
    clss.prototype.__noSuchMethod__ = function (method_name, args) {
        return this.__call.apply(this, arguments);
    };
    clss.__noSuchMethod__ = function (method_name, args) {
        return clss.__callStatic.apply(null, arguments);
    };
}

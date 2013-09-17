function clone (object) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var obj = {a:5, __clone: function () {this.b=10;}};
    // *     example 1: clone(obj);
    // *     returns 1: {a:5, __clone: function () {this.b=10;}, b:10}

    var retObj = {};

    // As per PHP, make only a shallow copy
    for (var prop in object) {
        retObj[prop] = object[prop];
    }
    if (retObj.__clone) {
        retObj.__clone();
    }

    return retObj;
}

function runkit_class_adopt (classname, parentname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// %          note 1: Function can only obtain and set classes from the global context
    // *     example 1: function A () {}
    // *     example 1: A.prototype.methodA = function () {};
    // *     example 1: function B () {}
    // *     example 1: runkit_class_adopt('B', 'A');
    // *     returns 1: true

    if (typeof window[classname] !== 'function' || typeof window[parentname] !== 'function') {
        return false;
    }

    // Classical style of inheritance
    window[classname].prototype = new window[parentname]; // Has side effects by calling the constructor!

/*
    // Prototypal completely by reference
    window[classname].prototype = parentname.prototype; // By mutual reference!
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
    _copy(window[classname].prototype, window[parentname].prototype);
*/

    // Put original constructor property back
    window[classname].constructor = window[classname];
    return true;
}

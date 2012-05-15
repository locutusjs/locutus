function array () {
    // http://kevin.vanzonneveld.net
    // +   original by: d3x
    // +      improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array('Kevin', 'van', 'Zonneveld');
    // *     returns 1: ['Kevin', 'van', 'Zonneveld']
    // *     example 2: ini_set('phpjs.return_phpjs_arrays', 'on');
    // *     example 2: var arr = array({0:2}, {a:41}, {2:3}).change_key_case('CASE_UPPER').keys();
    // *     returns 1: [0,'A',2]
    
    var mainArgs = arguments, p = this.php_js = this.php_js || {},
        _indexOf = function (value, from, strict) {
            for (var i = (from || 0), nonstrict = !strict, length=this.length; i < length; i++) {
                if (this[i] === value || (nonstrict && this[i] == value)) {
                    return i;
                }
            }
            return -1;
        };
    // BEGIN REDUNDANT
    if (!p.Relator) {
        p.Relator = function () {// Used this functional class for giving privacy to the class we are creating
            // Code adapted from http://www.devpro.it/code/192.html
            // Relator explained at http://webreflection.blogspot.com/2008/07/javascript-relator-object-aka.html
            // Its use as privacy technique described at http://webreflection.blogspot.com/2008/10/new-relator-object-plus-unshared.html
            // 1) At top of closure, put: var __ = Relator.$();
            // 2) In constructor, put: var _ = __.constructor(this);
            // 3) At top of each prototype method, put: var _ = __.method(this);
            // 4) Use like:  _.privateVar = 5;
            function _indexOf (value) {
                for (var i = 0, length=this.length; i < length; i++) {
                    if (this[i] === value) {
                        return i;
                    }
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
        }();
    }
    // END REDUNDANT
    
    if (p && p.ini && p.ini['phpjs.return_phpjs_arrays'].local_value.toLowerCase() === 'on') {    
        if (!p.PHPJS_Array) {
            // We keep this Relator outside the class in case adding prototype methods below
            // Prototype methods added elsewhere can also use this ArrayRelator to share these "pseudo-global mostly-private" variables
            var __ = p.ArrayRelator = p.ArrayRelator || p.Relator.$();
            // We could instead allow arguments of {key:XX, value:YY} but even more cumbersome to write
            p.PHPJS_Array = function PHPJS_Array () {
                var _ = __.constructor(this), args = arguments;
                args = (args.length === 1 && args[0] && typeof args[0] === 'object' && 
                        args[0].length && !args[0].propertyIsEnumerable('length')) ? args[0] : args; // If first and only arg is an array, use that (Don't depend on this)
                if (!_.objectChain) {
                    _.objectChain = args;
                    _.object = {};
                    _.keys = [];
                    _.values = [];
                }
                for (var i=0, argl = args.length; i < argl; i++) {
                    for (var p in args[i]) {
                        // Allow for access by key; use of private members to store sequence allows these to be iterated via for...in (but for read-only use, with hasOwnProperty or function filtering to avoid prototype methods, and per ES, potentially out of order)
                        this[p] = _.object[p] = args[i][p];
                        // Allow for easier access by prototype methods
                        _.keys[_.keys.length] = p;
                        _.values[_.values.length] = args[i][p];
                        break;
                    }
                }
            };
            var e = p.PHPJS_Array.prototype, that = this;
            e.change_key_case = function (cs) {var _ = __.method(this);
                var case_fn = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';
                for (var i=0, kl = _.keys.length; i < kl; i++) {
                    var oldkey = _.keys[i],
                        newkey = _.keys[i] = _.keys[i][case_fn]();
                    this[newkey] = _.object[newkey] = _.objectChain[i][newkey] = _.values[i]; // Fix: should we make a deep copy?
                    this[oldkey] = _.object[oldkey] = _.objectChain[i][oldkey] = null; // Break reference before deleting
                    delete this[oldkey];
                    delete _.object[oldkey];
                    delete _.objectChain[i][oldkey];
                }
                return this;
            };
            // Here we'll return actual arrays since most logical and practical for these functions to do this
            e.keys = function (search_value, argStrict) {var _ = __.method(this);
                var pos, search = typeof search_value !== 'undefined',
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
            e.search = function (needle, argStrict) {var _ = __.method(this);
                var strict = !!argStrict, haystack = _.values, i, vl, val;
                if (typeof needle === 'object' && needle.exec) { // Duck-type for RegExp
                    if (!strict) { // Let's consider case sensitive searches as strict
                        var flags = 'i' + (needle.global ? 'g' : '') +
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
                for (i=0, vl = haystack.length; i < vl; i++) {
                    val = haystack[i];
                    if ((strict && val === needle) || (!strict && val == needle)) {
                        return _.keys[i];
                    }
                }
                return false;
            };
            // Experimental functions
            e.foreach = function (handler) {var _ = __.method(this);
                for (var i = 0, kl = _.keys.length; i < kl; i++) {
                    if (handler.length === 1) {
                        handler(_.values[i]); // only pass the value
                    }
                    else {
                        handler(_.keys[i], _.values[i]);
                    }                    
                }
                return this;
            };
            e.list = function () {var _ = __.method(this);
                for (var i = 0, argl = arguments.length; i < argl; i++) {
                    var key = _.keys[i];
                    if (key && key.length === parseInt(key).toString().length && // Key represents an int
                        parseInt(key) < argl) { // Key does not exceed arguments
                        that.window[arguments[key]] = _.values[key];
                    }
                }
                return this;
            };
            // Parallel functionality and naming of built-in JavaScript array methods
            e.forEach = function (handler) {var _ = __.method(this);
                for (var i = 0, kl = _.keys.length; i < kl; i++) {
                    handler(_.values[i], _.keys[i], this);
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
        function PHPJS_Array() {}
        PHPJS_Array.prototype = p.PHPJS_Array.prototype;
        var arrInst = new PHPJS_Array();
        p.PHPJS_Array.apply(arrInst, mainArgs);
        return arrInst;
    }
    return Array.prototype.slice.call(mainArgs);
}

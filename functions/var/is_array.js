function is_array (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   bugfixed by: Cord
    // +   bugfixed by: Manish
    // +   improved by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Nathan
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

    var _getFuncName = function (fn) {
            var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
            if (!name) {
                return '(Anonymous)';
            }
            return name[1];
        },
        _isArray = function (mixed_var) {
            return Object.prototype.toString.call(mixed_var) === '[object Array]';
            // Other approaches:
            // && mixed_var.hasOwnProperty('length') && // Not non-enumerable because of being on parent class
            // !mixed_var.propertyIsEnumerable('length') && // Since is own property, if not enumerable, it must be a built-in function
            //   _getFuncName(mixed_var.constructor) !== 'String'; // exclude String(), but not another function returning String()
        };

    if (!mixed_var || typeof mixed_var !== 'object') {
        return false;
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    var ini = this.php_js.ini['phpjs.objectsAsArrays'];

    return _isArray(mixed_var) ||
        // Allow returning true unless user has called
        // ini_set('phpjs.objectsAsArrays', 0) to disallow objects as arrays
        (!ini ||
            ( // if it's not set to 0 and it's not 'off', check for objects as arrays
                (parseInt(ini.local_value, 10) !== 0 &&
                    (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !== 'off'))
            )
        ) &&
        (
            Object.prototype.toString.call(mixed_var) === '[object Object]' &&
            _getFuncName(mixed_var.constructor) === 'Object' // Most likely a literal and intended as assoc. array
        );
}

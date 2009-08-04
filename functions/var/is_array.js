function is_array (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   bugfixed by: Cord
    // +   bugfixed by: Manish
    // +   improved by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: In php.js, javascript objects are like php associative arrays, thus JavaScript objects will also
    // %        note 1: return true  in this function (except for objects which inherit properties, being thus used as objects),
    // %        note 1: unless you do ini_set('phpjs.objectsAsArrays', true), in which case only genuine JavaScript arrays
    // %        note 1: will return true
    // *     example 1: is_array(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: is_array('Kevin van Zonneveld');
    // *     returns 2: false
    // *     example 3: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
    // *     returns 3: true
    // *     example 4: is_array(function tmp_a(){this.name = 'Kevin'});
    // *     returns 4: false

    var key = '';
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };

    if (!mixed_var) {
        return false;
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT

    if (typeof mixed_var === 'object') {

        if (this.php_js.ini['phpjs.objectsAsArrays'] &&  // Strict checking for being a JavaScript array (only check this way if call ini_set('phpjs.objectsAsArrays', 0) to disallow objects as arrays)
            (
            (this.php_js.ini['phpjs.objectsAsArrays'].local_value.toLowerCase &&
                    this.php_js.ini['phpjs.objectsAsArrays'].local_value.toLowerCase() === 'off') ||
                parseInt(this.php_js.ini['phpjs.objectsAsArrays'].local_value, 10) === 0)
            ) {
            return mixed_var.hasOwnProperty('length') && // Not non-enumerable because of being on parent class
                            !mixed_var.propertyIsEnumerable('length') && // Since is own property, if not enumerable, it must be a built-in function
                                getFuncName(mixed_var.constructor) !== 'String'; // exclude String()
        }

        if (mixed_var.hasOwnProperty) {
            for (key in mixed_var) {
                // Checks whether the object has the specified property
                // if not, we figure it's not an object in the sense of a php-associative-array.
                if (false === mixed_var.hasOwnProperty(key)) {
                    return false;
                }
            }
        }

        // Read discussion at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_array/
        return true;
    }

    return false;
}
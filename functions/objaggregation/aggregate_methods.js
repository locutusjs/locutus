function aggregate_methods (obj, class_name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // %          note 1: We can't copy privileged functions, as those require instantiation (with potential side-effects when called)
    // %          note 1: We've chosen not to assign to or create a prototype object on the destination object even if the original object had the methods on its prototype
    // *     example 1: var A = function () {};
    // *     example 1: A.prototype.method = function () {};
    // *     example 1: var b = {};
    // *     example 1: aggregate_methods(b, 'A');
    // *     returns 1: undefined

    var p = '', record={}, pos=-1;

    if (typeof class_name === 'string') { // PHP behavior
        class_name = this.window[class_name];
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.aggregateKeys = this.php_js.aggregateKeys || [];
    this.php_js.aggregateRecords = this.php_js.aggregateRecords || []; // Needed to allow deaggregate() and aggregate_info()
    this.php_js.aggregateClasses = this.php_js.aggregateClasses || [];
    // END REDUNDANT
    this.php_js.aggregateClasses.push(class_name.name);

    for (p in class_name) {
        if (!(p in obj) && typeof class_name[p] === 'function' && p[0] !== '_') { // Static (non-private) class methods
            obj[p] = class_name[p];
            record[p] = class_name[p];
        }
    }
    for (p in class_name.prototype) {
        if (!(p in obj) && typeof class_name.prototype[p] === 'function' && p[0] !== '_') { // Prototype (non-private) instance methods
            obj[p] = class_name.prototype[p];
            record[p] = class_name.prototype[p];
        }
    }
    pos = this.php_js.aggregateKeys.indexOf(obj);
    if (pos !== -1) {
        this.php_js.aggregateRecords[pos].push(record);
        this.php_js.aggregateClasses[pos].push(class_name.name);
    } else {
        this.php_js.aggregateKeys.push(obj);
        this.php_js.aggregateRecords.push([record]);
        this.php_js.aggregateClasses[0] = [];
        this.php_js.aggregateClasses[0].push(class_name.name);
    }
}
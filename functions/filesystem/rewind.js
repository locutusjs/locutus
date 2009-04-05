function rewind (handle) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fread(h, 100);
    // *     example 1: rewind(h);
    // *     returns 1: true

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer ||
            !handle || !handle.constructor || handle.constructor.name !== 'PHPJS_Resource') {
        return false;
    }
    this.php_js.resourceDataPointer[handle.id] = 0;
    return true;
}
function ftell (handle) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: fread(h, 100);
    // *     example 1: ftell(h);
    // *     returns 1: 99

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer ||
            !handle || !handle.constructor || handle.constructor.name !== 'PHPJS_Resource') {
        return false;
    }
    return this.php_js.resourceDataPointer[handle.id]*2-1; // We're currently storing by character, so need to multiply by two; subtract one to appear like array pointer
}
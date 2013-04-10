function get_loaded_extensions (zend_extensions) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: get_loaded_extensions();
    // *     returns 1: ['strings', 'xml']

    var ret = (this.php_js && this.php_js.ini && this.php_js.ini['phpjs.loaded_extensions'] &&
                    this.php_js.ini['phpjs.loaded_extensions'].local_value) || false;
    if (ret && zend_extensions) {
        var retNew = [];
        for (var i = 0; i < ret.length; i++) {
            if (ret[i].substr(0, 5) !== 'zend_') { // Fix: Is this correct?
                retNew.push(ret[i]);
            }
        }
        return retNew;
    }
    return ret;
}

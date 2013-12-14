function inclued_get_data () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: inclued_get_data(); // for "include 'x.js';" called in /temp/z.js:
    // *     returns 1: {includes: [{operation: 'include', op_type: 2,filename: 'x.js',opened_path: '/tmp/x.js',fromfile: '/tmp/z.js', fromline: 2}]}

    // require, include, etc. will need to check inclued.enabled and if set, record to it
    // The only other directive is inclued.dumpdir but that requires file writing
    // Per the docs, "Class inheritance dependencies are also reported"; how?

    /*
     * this.php_js.incluedData could look like:
    {
        includes : [
            {
              operation : 'include',
              op_type : 2, // ZEND_EVAL 1, ZEND_INCLUDE 2, ZEND_INCLUDE_ONCE 4, ZEND_REQUIRE 8, ZEND_REQUIRE_ONCE 16
              filename : 'x.js',
              opened_path : '/tmp/x.js',
              fromfile : '/tmp/z.js',
              fromline : 2
            }
        ]
    }
*/

    if (!this.php_js || !this.php_js.incluedData) {
        return {};
    }
    return this.php_js.incluedData;
}

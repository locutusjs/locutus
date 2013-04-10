function php_user_filter () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: To be extended on class refererenced in second argument of stream_filter_register()
    // *     example 1: var f = new php_user_filter();
    // *     example 1: f.filtername;
    // *     returns 1: ''

    this.filtername = '';
    this.params = '';

}
php_user_filter.prototype = {
    constructor: php_user_filter,
    filter : function ($in, out, consumed, closing) { //  resource, resource, int reference, bool; returns int
        if (closing) {
            this.stream = ''; // ?
        }
        return null;
    },
    onCreate : function () { // returns bool
        return null;
    },
    onClose : function () {
        return null;
    }
};

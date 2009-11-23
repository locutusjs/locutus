function textdomain (domain) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: textdomain('myapp');
    // *     returns 1: 'myapp'

    // This appears to undo a cache for gettext, so should probably obtain the file here (as in the domain-overriding functions)

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.current_textdomain = this.php_js.current_textdomain || null; // Default is null?
    // END REDUNDANT

    if (domain === null) {
        return this.php_js.current_textdomain;
    }
    this.php_js.current_textdomain = domain;
    return domain;
}
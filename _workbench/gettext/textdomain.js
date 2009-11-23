function textdomain (domain) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: textdomain('myapp');
    // *     returns 1: 'myapp'


    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.textdomains_codesets = this.php_js.textdomains_codesets || {};
    this.php_js.current_textdomain = this.php_js.current_textdomain || null; // Default is null?
    // END REDUNDANT

    // This appears to undo a cache for gettext, so should probably obtain the file here (as in the domain-overriding functions)
    var codeset = this.php_js.textdomains_codesets[domain]; // For file-getting
    var dir = this.php_js.textdomains[domain]; // For file-getting

    

    if (domain === null) {
        return this.php_js.current_textdomain;
    }
    this.php_js.current_textdomain = domain;
    return domain;
}
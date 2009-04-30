function ctype_upper (text) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // -    depends on: setlocale
    // *     example 1: ctype_upper('AZ');
    // *     returns 1: true
    if (typeof text !== 'string') {
        return false;
    }
    // BEGIN STATIC
    setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END STATIC
    return this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.up.test(text);
}
function dcgettext (domain, msg, category) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1:
    // *     returns 1:

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.textdomains_codesets = this.php_js.textdomains_codesets || {};
    // END REDUNDANT

    var codeset = this.php_js.textdomains_codesets[domain]; // For file-getting
    var dir = this.php_js.textdomains[domain]; // For file-getting

    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    var lang = this.php_js.localeCategories[category];

}

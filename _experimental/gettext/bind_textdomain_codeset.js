function bind_textdomain_codeset (domain, codeset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: bind_textdomain_codeset('myapp', 'UTF-8');
    // *     returns 1: 'UTF-8'

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.textdomains_codesets = this.php_js.textdomains_codesets || {};
    // END REDUNDANT

    if (codeset === null) {
        return this.php_js.last_textdomain_codeset || null; // Doesn't seem to remember codesets in PHP?
    }

    this.php_js.textdomains_codesets[domain] = codeset;
    this.php_js.last_textdomain_codeset = codeset;
    return codeset;
}

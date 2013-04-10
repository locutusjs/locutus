function bindtextdomain (domain, dir) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: bindtextdomain('myapp', '/myapp/locale');
    // *     returns 1: '/myapp/locale'

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.textdomains = this.php_js.textdomains || {};
    // END REDUNDANT

    if (dir === null) {
        return this.php_js.last_textdomain || null; // Doesn't seem to remember bindings in PHP?
    }

    this.php_js.textdomains[domain] = dir;
    this.php_js.last_textdomain = dir;
    return dir;
}

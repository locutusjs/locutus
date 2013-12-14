function ngettext (msgid1, msgid2, n) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1:
    // *     returns 1:

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT

    var lang = this.setlocale('LC_ALL', 0);

    var domain = this.php_js.current_textdomain;

    // rely on phpjs.locales.LL.nplurals(n)

}

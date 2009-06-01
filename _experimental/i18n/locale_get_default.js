function locale_get_default () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Being renamed in PHP6 to i18n_loc_get_default and in the Unicode extension?  Not listed apparently at php.net
    // %          note 2: List of locales at http://demo.icu-project.org/icu-bin/locexp
    // %          note 3: To be usable with sort() if it is passed the SORT_LOCALE_STRING sorting flag: http://php.net/manual/en/function.sort.php
    // %          note 3: However, the behavior is not yet implemented in sort()
    // *     example 1: locale_get_default();
    // *     returns 1: 'en_US_POSIX'

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT
    return this.php_js.i18nLocale || 'en_US_POSIX';
}
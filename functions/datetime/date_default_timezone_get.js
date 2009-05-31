function date_default_timezone_get () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // -    depends on: timezone_abbreviations_list
    // %        note 1: Uses global: php_js to store the default timezone
    // *     example 1: date_default_timezone_get();
    // *     returns 1: 'unknown'

    var tal = {}, abbr = '', i = 0, today = new Date();

    if (this.php_js) {
        if (this.php_js.default_timezone) { // set by date_default_timezone_set
            return this.php_js.default_timezone;
        }
        if (this.php_js.ENV && this.php_js.ENV.TZ) { // getenv
            return this.php_js.ENV.TZ;
        }
        if (this.php_js.ini && this.php_js.ini['date.timezone']) { // e.g., if set by ini_set()
            return this.php_js.ini['date.timezone'].local_value ? this.php_js.ini['date.timezone'].local_value : this.php_js.ini['date.timezone'].global_value;
        }
    }
    // Get from system
    tal = this.timezone_abbreviations_list();
    for (abbr in tal) {
        for (i=0; i < tal[abbr].length; i++) {
            if (tal[abbr][i].offset === -today.getTimezoneOffset()*60) {
                return tal[abbr][i].timezone_id;
            }
        }
    }
    return 'UTC';
}
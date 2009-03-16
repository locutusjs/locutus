function date_default_timezone_get () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // *     example 1: date_default_timezone_get();
    // *     returns 1: 'unknown';

    var tal = {}, abbr = '', i = 0;

	if (window.php_js && window.php_js.default_timezone) {
		return window.php_js.default_timezone;
	}
	tal = timezone_abbreviations_list();
	for (abbr in tal) {
		for (i=0; i < tal[abbr].length; i++) {
			if (tal[abbr][i].offset === -today.getTimezoneOffset()*60) {
				return tal[abbr][i].timezone_id;
			}
		}
	}
	return 'UTC';
}
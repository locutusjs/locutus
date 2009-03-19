function date_default_timezone_get () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // -    depends on: timezone_abbreviations_list
    // %        note 1: Uses global: php_js to store the default timezone
    // *     example 1: date_default_timezone_get();
    // *     returns 1: 'unknown';

    var tal = {}, abbr = '', i = 0, today = new Date();

	if (php_js && php_js.default_timezone) {
		return php_js.default_timezone;
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
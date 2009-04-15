function date_parse (date) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// -    depends on: strtotime
	// *     example 1: date_parse('');
	// *     returns 1: {year : 2006, month: 12, day: 12, hour: 10, minute: 0, second: 0, fraction: 0.5, warning_count: 0, warnings: [], error_count: 0, errors: [], is_localtime: false}

    if (!this.php_js) {
        this.php_js = {};
    }

    var warningsOffset = this.php_js.warnings ? this.php_js.warnings.length : null;
    var errorsOffset = this.php_js.errors ? this.php_js.errors.length : null;

    try {
        var ts = strtotime(date);
    }
    finally {
        if (!ts) {
            return false;
        }
    }

    var dt = new Date(ts*1000);

    var retObj = { // Grab any new warnings or errors added (not implemented yet in strtotime())
        warning_count: warningsOffset !== null ? this.php_js.warnings.slice(warningsOffset).length : 0,
        warnings: warningsOffset !== null ? this.php_js.warnings.slice(warningsOffset) : [],
        error_count: errorsOffset !== null ? this.php_js.errors.slice(errorsOffset).length : 0,
        errors: errorsOffset !== null ? this.php_js.errors.slice(errorsOffset) : []
    };
    retObj.year = dt.getFullYear();
    retObj.month = dt.getMonth()+1;
    retObj.day = dt.getDate();
    retObj.hour = dt.getHours();
    retObj.minute = dt.getMinutes();
    retObj.second = dt.getSeconds();
    retObj.fraction = parseFloat('0.'+dt.getMilliseconds());
    retObj.is_localtime = dt.getTimezoneOffset !== 0;

    return retObj;
}
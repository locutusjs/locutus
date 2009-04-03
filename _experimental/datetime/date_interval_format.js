function date_interval_format (dateIntervalObj) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: var dtIntvObj = date_interval_create_from_date_string('+1 day');
    // *     example 1: date_interval_format(dtIntvObj);
    // *     returns 1: '+1 day'

    // Fix need to check return to the example above

    return dateIntervalObj.format();
}
function date_sub (dt, intervalObj) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var dt = date_create();
    // *     example 1: var itvObj = date_interval_create_from_date_string('+1 day');
    // *     example 1: date_sub(dt, itvObj);
    // *     returns 1: {}

    return dt.sub(intervalObj);
}

function date_date_set (dt, year, month, day) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var dt = date_create();
    // *     example 1: date_date_set(dt, 1992, 5, 29);
    // *     returns 1: {}

    return dt.setDate(year, month, day);
}

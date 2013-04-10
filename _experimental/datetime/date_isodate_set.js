function date_isodate_set (dt, year, week, day) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var dt = date_create();
    // *     example 1: date_isodate_set(dt, 2008, 2, 5);
    // *     returns 1: {}

    return dt.setISODate(year, week, day);
}

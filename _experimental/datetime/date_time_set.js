function date_time_set (dt, hour, minute, second) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: var dt = date_create();
    // *     example 1: date_time_set(dt, 10, 15, 30);
    // *     returns 1: {}

    return dt.setTime(hour, minute, second);
}
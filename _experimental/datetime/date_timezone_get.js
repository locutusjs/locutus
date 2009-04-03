function date_timezone_get (dt) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: var dt = date_create();
    // *     example 1: date_timezone_get(dt);
    // *     returns 1: {}

    return dt.getTimezone();
}
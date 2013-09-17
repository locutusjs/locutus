function date_timezone_set (dt, tzo) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var dt = date_create();
    // *     example 1: var tzo = timezone_open();
    // *     example 1: date_timezone_set(dt, tzo);
    // *     returns 1: {}

    return dt.setTimezone(tzo);
}

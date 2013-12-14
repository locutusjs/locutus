function date_create_from_format (dt, format, time, tzo) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var dt = date_create();
    // *     example 1: var tzo = timezone_open();
    // *     example 1: date_create_from_format(dt, 'd', '+1 day', tzo);
    // *     returns 1: {}

    // Fix: check time string above

    return dt.constructor.createFromFormat(format, time, tzo);
}

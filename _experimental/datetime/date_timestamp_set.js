function date_timestamp_set (dt, timestamp) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var dt = date_create();
    // *     example 1: date_timestamp_set(dt, 1000000);
    // *     returns 1: {}

    return dt.setTimestamp(timestamp);
}

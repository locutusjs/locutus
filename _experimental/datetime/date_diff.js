function date_diff (dt, dt2, absolute) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: var dt = date_create();
    // *     example 1: date_diff(dt, absolute);
    // *     returns 1: {}

    return dt.diff(dt2, absolute);
}
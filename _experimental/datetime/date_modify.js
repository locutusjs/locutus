function date_modify (dt, modify) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var dt = date_create();
    // *     example 1: var modify = '+1 day';
    // *     example 1: date_modify(dt, modify);
    // *     returns 1: {}

    return dt.modify(modify);
}

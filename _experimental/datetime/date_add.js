function date_add (dt, interval) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var dt = date_create();
    // *     example 1: var dti = date_interval_create_from_date_string('+1 day');
    // *     example 1: date_add(dt, dti);
    // *     returns 1: {}

    // Fix: need to check argument to the dti example above

    return dt.add(interval);
}

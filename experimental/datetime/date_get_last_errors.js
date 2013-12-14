function date_get_last_errors (dt) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var dt = date_create('asdfasdf');
    // *     example 1: date_get_last_errors(dt);
    // *     returns 1: {warning_count : 1, warnings : {6 : 'Double timezone specification'}, error_count : 1, errors : ['The timezone could not be found in the database']}

    return dt.constructor.getLastErrors();
}

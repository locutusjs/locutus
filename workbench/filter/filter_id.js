function filter_id (name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: filter_id('int');
    // *     returns 1: 257

    var filters = {
        // VALIDATE
        'int': 257, // FILTER_VALIDATE_INT
        'boolean' : 258, // FILTER_VALIDATE_BOOLEAN
        'float': 259, // FILTER_VALIDATE_FLOAT
        validate_regexp: 272, // FILTER_VALIDATE_REGEXP
        validate_url: 273, // FILTER_VALIDATE_URL
        validate_email: 274, // FILTER_VALIDATE_EMAIL
        validate_ip: 275, // FILTER_VALIDATE_IP
        // SANITIZE
        string: 513, // FILTER_SANITIZE_STRING
        stripped: 513, // FILTER_SANITIZE_STRIPPED
        encoded: 514, // FILTER_SANITIZE_ENCODED
        special_chars: 515, // FILTER_SANITIZE_SPECIAL_CHARS
        unsafe_raw: 516, // FILTER_UNSAFE_RAW
        email: 517, // FILTER_SANITIZE_EMAIL
        url: 518, // FILTER_SANITIZE_URL
        number_int: 519, // FILTER_SANITIZE_NUMBER_INT
        number_float: 520, // FILTER_SANITIZE_NUMBER_FLOAT
        magic_quotes: 521, // FILTER_SANITIZE_MAGIC_QUOTES
        // OTHER
        callback: 1024 // FILTER_CALLBACK
    };
    return filters[name];
}

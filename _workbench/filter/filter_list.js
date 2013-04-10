function filter_list () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: filter_list();
    // *     returns 1: ['int','boolean','float','validate_regexp','validate_url','validate_email','validate_ip','string','stripped','encoded','special_chars','unsafe_raw','email','url','number_int','number_float','magic_quotes','callback']

    return [
        // VALIDATE
        'int',
        'boolean',
        'float',
        'validate_regexp',
        'validate_url',
        'validate_email',
        'validate_ip',
        // SANITIZE
        'string',
        'stripped',
        'encoded',
        'special_chars',
        'unsafe_raw',
        'email',
        'url',
        'number_int',
        'number_float',
        'magic_quotes',
        // OTHER
        'callback'
    ];
}

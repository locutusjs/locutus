function ezmlm_hash (address) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ezmlm_hash('brettz');
    // *     returns 1: 50

    // Isn't working with larger strings (e.g., 'brettz9')

    // h is int,
    var h = 5381, j = 0, str_len = 0;
    for (j = 0, str_len = address.length; j < str_len; j++) {
        h = ((h + (h << 5)) ^ ((((Math.abs(address.charAt(j).toLowerCase().charCodeAt(0))) % 255) % 4294967296)));
    }
    return (h % 53) % 65535;
}

function ip2long ( ip_address ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // +   improved by: Victor
    // +    revised by: fearphage (http://http/my.opera.com/fearphage/)
    // *     example 1: ip2long( '192.0.34.166' );
    // *     returns 1: 3221234342

    var parts = ip_address.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    return parts
        ? parts[1] * 16777216 + parts[2] * 65536 + parts[3] * 256 + parts[4] * 1
        : false;
}
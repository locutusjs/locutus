function ip2long ( ip_address ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // +   improved by: Victor
    // *     example 1: ip2long( '192.0.34.166' );
    // *     returns 1: 3221234342
    
    var output = false;
    var parts = [];
    if (ip_address.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
        parts  = ip_address.split('.');
        output = ( parts[0] * 16777216 +
        ( parts[1] * 65536 ) +
        ( parts[2] * 256 ) +
        ( parts[3] * 1 ) );
    }
     
    return output;
}
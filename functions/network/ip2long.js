function ip2long ( ip_address ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // *     example 1: ip2long( '192.0.34.166' );
    // *     returns 1: 3221234342
    
    var output = false;
 
    if ( ip_address.match ( /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/ ) ) {
      var parts  = ip_address.split ( '.' );
      var output = 0;
 
      output = ( parts [ 0 ] * Math.pow ( 256, 3 ) ) +
               ( parts [ 1 ] * Math.pow ( 256, 2 ) ) +
               ( parts [ 2 ] * Math.pow ( 256, 1 ) ) +
               ( parts [ 3 ] * Math.pow ( 256, 0 ) );
    }
     
    return output;
}
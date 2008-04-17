function isset(  ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: FremyCompany
    // *     example 1: isset( undefined, true);
    // *     returns 1: false
    // *     example 2: isset( 'Kevin van Zonneveld' );
    // *     returns 2: true

    var a=arguments; var l=a.length; var i=0;
    
    while ( i!=l ) {
        if (typeof(a[i])=='undefined') { 
            return false; 
        } else { 
            i++; 
        }
    }
    
    return true;
}
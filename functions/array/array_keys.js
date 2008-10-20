function array_keys( input, search_value, strict ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'firstname', 1: 'surname'}
    
    var tmp_arr = {}, strict = !!strict, include = true, cnt = 0;
    
    for ( key in input ){
        include = true;
        if ( search_value != undefined ) {
            if( strict && input[key] !== search_value ){
                include = false;
            } else if( input[key] != search_value ){
                include = false;
            }
        }
        
        if( include ) {
            tmp_arr[cnt] = key;
            cnt++;
        }
    }
    
    return tmp_arr;
}
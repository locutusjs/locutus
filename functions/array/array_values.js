function array_values( input ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}

    var tmp_arr = new Array(), cnt = 0;

    for ( key in input ){
        tmp_arr[cnt] = input[key];
        cnt++;
    }

    return tmp_arr;
}
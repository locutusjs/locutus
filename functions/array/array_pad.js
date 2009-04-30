function array_pad ( input, pad_size, pad_value ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // *     example 1: array_pad([ 7, 8, 9 ], 2, 'a');
    // *     returns 1: [ 7, 8, 9]
    // *     example 2: array_pad([ 7, 8, 9 ], 5, 'a');
    // *     returns 2: [ 7, 8, 9, 'a', 'a']
    // *     example 3: array_pad([ 7, 8, 9 ], 5, 2);
    // *     returns 3: [ 7, 8, 9, 2, 2]
    // *     example 4: array_pad([ 7, 8, 9 ], -5, 'a');
    // *     returns 4: [ 'a', 'a', 7, 8, 9 ]

    var pad = [], newArray = [], newLength, i=0;

    if ( input instanceof Array && !isNaN( pad_size ) ) {
        newLength = ( ( pad_size < 0 ) ? ( pad_size * -1 ) : pad_size );
        if ( newLength > input.length ) {
            for ( i = 0; i < ( newLength - input.length ); i++ ) { newArray [ i ] = pad_value; }
            pad = ( ( pad_size < 0 ) ? newArray.concat( input ) : input.concat( newArray ) );
        } else {
            pad = input;
        }
    }

    return pad;
}
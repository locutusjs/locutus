function array_rand ( input, num_req ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // *     example 1: array_rand( ['Kevin'], 1 );
    // *     returns 1: 0

    var Indexes = [];
    var Ticks = num_req || 1;
    var checkDuplicate = function ( input, value ) {
        var Exist = false, Index = 0;
        while ( Index < input.length ) {
            if ( input [ Index ] === value ) {
                Exist = true;
                break;
            }
            Index++;
        }
        return Exist;
    };

    if ( input instanceof Array && Ticks <= input.length ) {
        while ( true ) {
            var Rand = Math.floor ( ( Math.random ( ) * input.length ) );
            if ( Indexes.length === Ticks ) { break; }
            if ( !checkDuplicate ( Indexes, Rand ) ) { Indexes.push ( Rand ); }
        }
    } else {
        Indexes = null;
    }

    return ( ( Ticks == 1 ) ? Indexes.join ( ) : Indexes );
}

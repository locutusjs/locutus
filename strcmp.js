function strcmp ( str1, str2 ) {
    // http://kevin.vanzonneveld.net
    // +   original by: _argos
    // *     example 1: strcmp( 'waldo', 'Waldo' );
    // *     returns 1: 1
    // *     example 2: strcmp( 'Waldo', 'waldo' );
    // *     returns 2: -1
    // *     example 3: strcmp( 'waldo', 'waldo' );
    // *     returns 3: 0

    var size1 = str1.charCodeAt ( 0 );
    var size2 = str2.charCodeAt ( 0 );

    return ( ( size1 == size2 ) ? 0 : ( ( size1 > size2 ) ? 1 : -1 ) );
}
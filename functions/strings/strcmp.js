function strcmp ( str1, str2 ) {
    // http://kevin.vanzonneveld.net
    // +   original by: _argos
    // +      input by: Steve Hilder
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strcmp( 'waldo', 'Waldo' );
    // *     returns 1: 1
    // *     example 2: strcmp( 'Waldo', 'waldo' );
    // *     returns 2: -1
    // *     example 3: strcmp( 'waldo', 'waldo' );
    // *     returns 3: 0
    // *     example 4: strcmp( 'test', 'tomato' );
    // *     returns 4: -1

    var i = size1 = size2 = 0;
    
    for (i = 0; i < str1.length; ++i) {
        size1 += str1.charCodeAt(i);
    }

    for (i = 0; i < str2.length; ++i) {
        size2 += str2.charCodeAt(i);
    }
    
    return ( ( size1 == size2 ) ? 0 : ( ( size1 > size2 ) ? 1 : -1 ) );
}
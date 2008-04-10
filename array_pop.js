function array_pop( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_pop([0,1,2]);
    // *     returns 1: 2

    // done popping, are we?
    if( !array.length ){
        return null;
    }

    return array.pop();
}
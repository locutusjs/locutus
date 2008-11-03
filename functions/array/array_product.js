function array_product ( input ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // *     example 1: array_product([ 2, 4, 6, 8 ]);
    // *     returns 1: 384

    var Index = 0, Product = 1;
    if ( input instanceof Array ) {
        while ( Index < input.length ) {
            Product *= ( !isNaN ( input [ Index ] ) ? input [ Index ] : 0 );
            Index++;
        }
    } else {
        Product = null;
    }

    return Product;
}
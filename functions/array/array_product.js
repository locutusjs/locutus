function array_product (input) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // *     example 1: array_product([ 2, 4, 6, 8 ]);
    // *     returns 1: 384
    var Index = 0,
        product = 1;
    if (Object.prototype.toString.call(input) === '[object Array]') {
        while (Index < input.length) {
            product *= (!isNaN(input[Index]) ? input[Index] : 0);
            Index++;
        }
    } else {
        product = null;
    }

    return product;
}

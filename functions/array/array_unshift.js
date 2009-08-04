function array_unshift (array) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Martijn Wieringa
    // *     example 1: array_unshift(['van', 'Zonneveld'], 'Kevin');
    // *     returns 1: 3

    var argc = arguments.length, argv = arguments, i;
    
    for (i = 1; i < argc; i++) {
        array.unshift(argv[i]);
    }
    
    return (array.length);
}
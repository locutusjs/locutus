function array_push ( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_push(['kevin','van'], 'zonneveld');
    // *     returns 1: 3

    var i, argv = arguments, argc = argv.length;

    for (i=1; i < argc; i++){
        array[array.length++] = argv[i];
    }

    return array.length;
}
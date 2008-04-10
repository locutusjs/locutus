function isset( mixed_var ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: isset( undefined, true);
    // *     returns 1: false
    // *     example 2: isset( 'Kevin van Zonneveld' );
    // *     returns 2: true

    var i = 0, argc = arguments.length, argv = arguments, set=true;

    for (i = 0; i< argc; i++){
        if( argv[i] == undefined ){
            set = false;
            break;
        }
    }

    return set;
}
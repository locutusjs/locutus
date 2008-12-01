function array_diff_assoc ( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: 0m3r
    // *     example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});
    // *     returns 1: {1: 'van', 2: 'Zonneveld'}

    var arr_dif = {}, i = 1, argc = arguments.length, argv = arguments, key, key_c, found=false;

    // input sanitation
    if( !array || (array.constructor !== Array && array.constructor !== Array && typeof array != 'object' && typeof array != 'array') ){
        return null;
    }

    // loop through 1st array
    for ( key in array ){
        // loop over other arrays
        for (i = 1; i< argc; i++){
            // find in the compare array
            found = false;
            if(argv[i][key] && argv[i][key] == array[key]){
                found = true;
                break;
            }

            if(!found){
                arr_dif[key] = array[key];
            }
        }
    }

    return arr_dif;
}
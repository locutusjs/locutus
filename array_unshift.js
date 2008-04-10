function array_unshift( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_unshift(['van', 'Zonneveld'], 'Kevin');
    // *     returns 1: 3

    var cnt=0, tot_cnt=0, tmp_arr = {}, argc = arguments.length, argv = arguments;

    // input sanitation
    if( !array || (array.constructor !== Array && array.constructor !== Array && typeof array != 'object' && typeof array != 'array') ){
        return null;
    }

    // prepend
    for (i = 1; i< argc; i++){
        tmp_arr[cnt] = argv[i];
        cnt++; tot_cnt++;
    }

    // append original
    for(var key in array){
        if( typeof key == 'number' && isFinite( key ) ){
            // modify numeric key
            tmp_arr[cnt] = array[key];
            cnt++; tot_cnt++;
        } else{
            // save original alphanumeric key
            tmp_arr[key] = array[key];
            tot_cnt++;
        }
    }

    return tot_cnt;
}
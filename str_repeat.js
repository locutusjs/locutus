function str_repeat ( input, multiplier ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: str_repeat('-=', 10);
    // *     returns 1: '-=-=-=-=-=-=-=-=-=-='

    var buf = '';

    for (i=0; i < multiplier; i++){
        buf += input;
    }

    return buf;
}
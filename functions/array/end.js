function end ( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Legaev Andrey
    // +    revised by: J A R
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   restored by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
    // *     returns 1: 'Zonneveld'
    // *     example 2: end(['Kevin', 'van', 'Zonneveld']);
    // *     returns 2: 'Zonneveld'
    
    var last_elm, key;
    
    // The native .pop() method didn't not work with objects (associative arrays)
    // We need that for PHP compatibility
    
    if (array.constructor == Array){
        last_elm = array[(array.length-1)];
    } else {
        for (key in array){
            print(key);
            last_elm = array[key];
        }
    }
    
    return last_elm;
}
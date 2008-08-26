function reset ( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Legaev Andrey
    // *     example 1: reset({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
    // *     returns 1: 'Kevin'

    var first_elm, key;

    if (array.constructor == Array){
        first_elm = array[0];
    } else {
        for (key in array){
            first_elm = array[key];
            break;
        }
    }

    return first_elm;
}
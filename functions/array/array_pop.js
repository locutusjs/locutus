function array_pop( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_pop([0,1,2]);
    // *     returns 1: 2
    // *     example 2: data = {firstName: 'Kevin', surName: 'van Zonneveld'};
    // *     example 2: lastElem = array_pop(data);
    // *     returns 2: 'van Zonneveld'
    // *     results 2: data == {firstName: 'Kevin'}

    var key = '', cnt = 0;

    if (array.hasOwnProperty('length')) {
        // Indexed
        if( !array.length ){
            // Done popping, are we?
            return null;
        }
        return array.pop();
    } else {
        // Associative
        for (key in array) {
            cnt++;
        }
        if (cnt) {
            delete(array[key]);
            return array[key];
        } else {
            return null;
        }
    }
}
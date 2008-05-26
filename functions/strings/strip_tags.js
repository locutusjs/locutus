function strip_tags( str ){
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strip_tags('Kevin <br />van <i>Zonneveld</i>');
    // *     returns 1: 'Kevin van Zonneveld'

    return str.replace(/<\/?[^(>|i)]+>/gi, '');
}
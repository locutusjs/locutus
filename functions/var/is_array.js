function is_array( mixed_var ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   bugfixed by: Cord
    // +   bugfixed by: Manish
    // +   improved by: Onno Marsman
    // %        note 1: In php.js, javascript objects are like php associative arrays 
    // *     example 1: is_array(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: is_array('Kevin van Zonneveld');
    // *     returns 2: false

    return (mixed_var instanceof Object);
}
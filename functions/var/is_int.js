function is_numeric( mixed_var ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Alex
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: is_numeric(186.31);
    // *     returns 1: false
    // *     example 2: is_numeric(12);
    // *     returns 2: true

    var y = parseInt(mixed_var * 1);
    
    if (isNaN(y)) {
        return false;
    }
    
    return mixed_var == y && mixed_var.toString() == y.toString(); 
}
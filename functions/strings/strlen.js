function strlen (string) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Sakimori
    // +      input by: Kirk Strobeck
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strlen('Kevin van Zonneveld');
    // *     returns 1: 19

    var tmp_str = '', l = 0;
    tmp_str = string + '';
    
    if (tmp_str.length) {
        return tmp_str.length; 
    }  
    
    return 0;
}
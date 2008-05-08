function utf8_decode ( str_data ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: utf8_decode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'

    var tmp_arr = [], i = 0, c = c1 = c2 = 0;

    while ( i < str_data.length ) {
        c = str_data.charCodeAt(i);
        if (c < 128) {
            tmp_arr[] = String.fromCharCode(c); 
            i++;
        } else if ((c > 191) && (c < 224)) {
            c2 = str_data.charCodeAt(i+1);
            tmp_arr[] = String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i+1);
            c3 = str_data.charCodeAt(i+2);
            tmp_arr[] = String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    
    return tmp_arr.join('');
}
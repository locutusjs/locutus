function utf8_encode ( str_data ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)        
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'

    str_data = str_data.replace(/\r\n/g,"\n");
    var tmp_arr = [];

    for (var n = 0; n < str_data.length; n++) {
        var c = str_data.charCodeAt(n);
        if (c < 128) {
            tmp_arr[] = String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            tmp_arr[] = String.fromCharCode((c >> 6) | 192);
            tmp_arr[] = String.fromCharCode((c & 63) | 128);
        } else {
            tmp_arr[] = String.fromCharCode((c >> 12) | 224);
            tmp_arr[] = String.fromCharCode(((c >> 6) & 63) | 128);
            tmp_arr[] = String.fromCharCode((c & 63) | 128);
        }
    }
    
    return tmp_arr.join('');
}
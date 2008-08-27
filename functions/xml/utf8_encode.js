function utf8_encode ( string ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
    
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    var start, end;
 
    start = end = 0;
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        var enc = null;
 
        if (c < 128) {
            end++;
        } else if((c > 127) && (c < 2048)) {
            enc = String.fromCharCode((c >> 6) | 192) + String.fromCharCode((c & 63) | 128);
        } else {
            enc = String.fromCharCode((c >> 12) | 224) + String.fromCharCode(((c >> 6) & 63) | 128) + String.fromCharCode((c & 63) | 128);
        }
        if (enc != null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n+1;
        }
    }
    
    if (end > start) {
        utftext += string.substring(start, string.length);
    }
 
    return utftext;
}
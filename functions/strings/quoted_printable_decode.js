function quoted_printable_decode(str) {
	// http://kevin.vanzonneveld.net
	// +   original by: Ole Vrijenhoek
	// +   bugfixed by: Brett Zamir (http://brettz9.blogspot.com)
    // *    example 1: quoted_printable_decode("Lorem ipsum dolor sit amet=23, consectetur adipisicing elit");
    // *    returns 1: Lorem ipsum dolor sit amet#, consectetur adipisicing elit

// sources: php sourcecode (php-5.2.9\ext\standard\quot_print.c)

    // shortcuts
    var chr = function(c) {
        return String.fromCharCode(c);
    };
    var code = function(c) {
        return c.charCodeAt(0);
    };
    var isHex = function(c) {
        var patt = /[0-9]|[a-f]/i
        return patt.test(c);
    };

    var str_in = str;
    var str_out = "";
    var i = 0, j = 0, k = 0;

    while(str_in[i]) {
        switch(str_in[i]) {
            case "=":
                if(code(str_in[i+1]) && code(str_in[i+2]) && isHex(str_in[i+1]) && isHex(str_in[i+2])) {
                    str_out += chr((parseInt(str_in[i+1], 16) << 4) + parseInt(str_in[i+2], 16));
                    i += 3;
                } else {
                    // Check for soft line break according to RFC 2045
                    k = 1;
                    while(code(str_in[i+k]) && ((code(str_in[i+k])==32) || (code(str_in[i+k])==9))) {
                        // Possibly, skip spaces/tabs at the end of line
                        k++;
                    }
                    if(!str_in[i+k]) {
                        // End of line reached
                        i += k;
                    } else if((code(str_in[i+k])==13) && (code(str_in[i+k+1])==10)) {
                        // CRLF
                        i += k+2;
                    } else if((code(str_in[i+k])==13) || (code(str_in[i+k])==10)) {
                        // CR or LF
                        i += k+1;
                    } else {
                        str_out[j++] = str_in[i++];
                    }
                }
            break;
            default:
                str_out += str_in[i++];
            break;
        }
    }
    str_out[j] = '\0';
    return str_out;
}

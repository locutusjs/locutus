function convert_uudecode (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ole Vrijenhoek
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: is_scalar
    // -    depends on: rtrim
    // *     example 1: convert_uudecode('+22!L;W9E(%!(4\"$`\n`');
    // *     returns 1: 'I love PHP'

// Not working perfectly

    // shortcut
    var chr = function (c) {
        return String.fromCharCode(c);
    };

    if (!str || str=="") {
        return chr(0);
    } else if (!this.is_scalar(str)) {
        return false;
    } else if (str.length < 8) {
        return false;
    }

    var decoded = "", tmp1 = "", tmp2 = "";
    var c = 0, i = 0, j = 0, a = 0;
    var line = str.split("\n");
    var bytes = [];

    for (i in line) {
        c = line[i].charCodeAt(0);
        bytes = line[i].substr(1);

        // Convert each char in bytes[] to a 6-bit
        for (j in bytes) {
            tmp1 = bytes[j].charCodeAt(0)-32;
            tmp1 = tmp1.toString(2);
            while (tmp1.length < 6) {
                tmp1 = "0" + tmp1;
            }
            tmp2 += tmp1
        }

        for (i=0; i<=(tmp2.length/8)-1; i++) {
            tmp1 = tmp2.substr(a, 8);
            if (tmp1 == "01100000") {
                decoded += chr(0);
            } else {
                decoded += chr(parseInt(tmp1, 2));
            }
            a += 8;
        }
        a = 0;
        tmp2 = "";
    }
    return this.rtrim(decoded, "\0");
}

function count_chars( str, mode ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ates Goral (http://magnetiq.com)
    // *     example 1: count_chars("Hello World!", 3);
    // *     returns 1: "Helo Wrd!"

    var histogram = new Object(), tmp_arr = new Array(), argc = arguments.length, key, i, code, mode;

    if (argc == 1) {
        mode = 0;
    }

    mode_even = (mode & 1) == 0;
    if (mode_even) {
        for (i = 1; i < 256; ++i) {
            histogram[i] = 0;
        }
    }

    for (i = 0; i < str.length; ++i) {
        code = str.charCodeAt(i);
        if (code in histogram) {
            ++histogram[code];
        } else {
            histogram[code] = 1;
        }
    }

    if (mode > 0) {
        for (key in histogram) {
            if (histogram[key] == 0 != mode_even) {
                delete histogram[key];
            }
        }
    }

    if (mode < 3) {
        return histogram;
    } else {
        for (key in histogram) {
            tmp_arr.push(String.fromCharCode(key));
        }
        return tmp_arr.join("");
    }
}
function count_chars (str, mode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ates Goral (http://magnetiq.com)
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: count_chars("Hello World!", 1);
    // *     returns 1: "Hd e!lWor"

    var histogram = {}, tmp_arr = [];
    var key, i, code, strl = 0;
    var argc = arguments.length;
    var mode_even = 0;

    if (argc == 1) {
        mode = 0;
    }

    mode_even = (mode & 1) == 0;
    if (mode_even) {
        for (i = 1; i < 256; ++i) {
            histogram[i] = 0;
        }
    }

    str += '';

    strl = str.length;
    for (i = 0; i < strl; ++i) {
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
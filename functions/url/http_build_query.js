function http_build_query( formdata, numeric_prefix, arg_separator ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   improved by: Michael White (http://getsprink.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: urlencode
    // *     example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
    // *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
    // *     example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
    // *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'

//  Recursive version by stag019, but currently breaks second example
//
//    var key, tmp = [];
//
//    var _http_build_query_helper = function (key, val, arg_separator) {
//        var k, tmp = [];
//        if (val === true) {
//            val = "1";
//        } else if (val === false) {
//            val = "0";
//        }
//        if (typeof(val) == "array" || typeof(val) == "object") {
//            for (k in val) {
//                if(val[k] !== null) {
//                    tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
//                }
//            }
//            return tmp.join(arg_separator);
//        } else if(typeof(val) != "function") {
//            return urlencode(key) + "=" + urlencode(val);
//        }
//    };
//
//    if (!arg_separator) {
//        arg_separator = "&";
//    }
//    for (key in formdata) {
//        if (numeric_prefix && !isNaN(key)) {
//            key = String(numeric_prefix) + key;
//        }
//        tmp.push(_http_build_query_helper(key, formdata[key], arg_separator));
//    }
//
//    return tmp.join(arg_separator);



    var key, use_val, use_key, i = 0, j=0, tmp_arr = [];

    if (!arg_separator) {
        arg_separator = '&';
    }

    for (key in formdata) {
        use_val = urlencode(formdata[key].toString());
        use_key = urlencode(key);

        if (numeric_prefix && !isNaN(key)) {
            use_key = numeric_prefix + j;
            j++;
        }
        tmp_arr[i++] = use_key + '=' + use_val;
    }

    return tmp_arr.join(arg_separator);
}
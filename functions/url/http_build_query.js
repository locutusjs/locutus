function http_build_query( formdata, numeric_prefix, arg_separator ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   improved by: Michael White (http://crestidg.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
    // *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
    // *     example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
    // *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'

    var key, use_val, use_key, i = 0, j=0, tmp_arr = [];

    if (!arg_separator) {
        arg_separator = '&';
    }

    for (key in formdata) {
        use_key = encodeURIComponent(key);
        use_val = encodeURIComponent((formdata[key].toString()));
        use_val = use_val.replace(/%20/g, '+');

        if (numeric_prefix && !isNaN(key)) {
            use_key = numeric_prefix + j;
            j++;
        }
        tmp_arr[i++] = use_key + '=' + use_val;
    }

    return tmp_arr.join(arg_separator);
}
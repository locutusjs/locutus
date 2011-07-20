function array_flip (trans) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      improved by: Pier Paolo Ramon (http://www.mastersoup.com/)
    // *     example 1: array_flip( {a: 1, b: 1, c: 2} );
    // *     returns 1: {1: 'b', 2: 'c'}
    var key, tmp_ar = {};

    for (key in trans) {
        if (!trans.hasOwnProperty(key)) {continue;}
        tmp_ar[trans[key]] = key;
    }

    return tmp_ar;
}

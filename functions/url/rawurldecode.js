function rawurldecode( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brettz9.blogspot.com)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: rawurldecode('Kevin+van+Zonneveld%21');
    // *     returns 1: 'Kevin+van+Zonneveld!'
    // *     example 2: rawurldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
    // *     returns 2: 'http://kevin.vanzonneveld.net/'
    // *     example 3: rawurldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
    // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
    // *     example 4: rawurldecode('-22%97bc%2Fbc');
    // *     returns 4: '-22—bc/bc'

    var histogram = {}, ret = str.toString(), unicodeStr='', hexEscStr='';

    var replacer = function(search, replace, str) {
        var tmp_arr = [];
        tmp_arr = str.split(search);
        return tmp_arr.join(replace);
    };

    // The histogram is identical to the one in urlencode.
    histogram["'"]   = '%27';
    histogram['(']   = '%28';
    histogram[')']   = '%29';
    histogram['*']   = '%2A';
    histogram['~']   = '%7E';
    histogram['!']   = '%21';


    for (unicodeStr in histogram) {
        hexEscStr = histogram[unicodeStr]; // Switch order when decoding
        ret = replacer(hexEscStr, unicodeStr, ret); // Custom replace. No regexing
    }

    // End with decodeURIComponent, which most resembles PHP's encoding functions
    ret = ret.replace(/%([a-fA-F][0-9a-fA-F])/g, function (all, hex) {return String.fromCharCode('0x'+hex);}); // These Latin-B have the same values in Unicode, so we can convert them like this
    ret = decodeURIComponent(ret);

    return ret;
}
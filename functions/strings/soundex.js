function soundex (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +    tweaked by: Jack
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   original by: Arnout Kazemier (http://www.3rd-Eden.com)
    // *     example 1: soundex('Kevin');
    // *     returns 1: 'K150'
    // *     example 2: soundex('Ellery');
    // *     returns 2: 'E460'
    // *     example 3: soundex('Euler');
    // *     returns 3: 'E460'

    var upStr = (str+'').toUpperCase();
    var sdx = [upStr[0],0,0,0],
        m = {BFPV: 1, CGJKQSXZ: 2, DT: 3, L: 4, MN: 5, R: 6 },
        k = ['BFPV', 'CGJKQSXZ', 'DT', 'L', 'MN', 'R'],
        i = 1, j = 0, s = 0, key, code,
        l = upStr.length;

    for (; i < l; i++){
        j = k.length;
        while (s != 3 && j--){
            key = k[j];
            if (key.indexOf(upStr[i]) !== -1) {
                code = m[key];
                if (code != sdx[s]){
                    sdx[++s] = code;
                }
            }
        }
    }

    return sdx.join('');
}
function soundex (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +    tweaked by: Jack
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Rafał Kukawski (http://blog.kukawski.pl)
    // +   original by: Arnout Kazemier (http://www.3rd-Eden.com)
    // *     example 1: soundex('Kevin');
    // *     returns 1: 'K150'
    // *     example 2: soundex('Ellery');
    // *     returns 2: 'E460'
    // *     example 3: soundex('Euler');
    // *     returns 3: 'E460'

    str = (str + '').toUpperCase();
    var sdx = [str.charAt(0), 0, 0 , 0],
        k = ['BFPV', 'CGJKQSXZ', 'DT', 'L', 'MN', 'R'], kl = k.length,
        i = 1, j = 0, s = 0, c, p;

    while ((c = str.charAt(i++)) && s < 3 ){
	j = 0;
        while (p = k[j++]){
            if (p.indexOf(c) !== -1) {
                if (j !== sdx[s]){
                    sdx[++s] = j;
                }
                break;
            }
        }
    }
    return sdx.join('');
}


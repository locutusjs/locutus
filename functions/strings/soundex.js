function soundex(str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +    tweaked by: Jack
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: soundex('Kevin');
    // *     returns 1: 'K150'
    // *     example 2: soundex('Ellery');
    // *     returns 2: 'E460'
    // *     example 3: soundex('Euler');
    // *     returns 3: 'E460'

    var i, j, l, r, p = isNaN(p) ? 4 : p > 10 ? 10 : p < 4 ? 4 : p;
    var m = {BFPV: 1, CGJKQSXZ: 2, DT: 3, L: 4, MN: 5, R: 6};
    var r = (s = str.toUpperCase().replace(/[^A-Z]/g, "").split("")).splice(0, 1);
    var sl = 0;
    
    sl = s.length;
    for (i = -1, l = sl; ++i < l;) {
        for (j in m) {
            if (j.indexOf(s[i]) + 1 && r[r.length-1] != m[j] && r.push(m[j])) {
                break;
            }
        }
    }
    
    return r.length > p && (r.length = p), r.join("") + (new Array(p - r.length + 1)).join("0");
}
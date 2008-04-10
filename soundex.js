function soundex( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: soundex('Kevin');
    // *     returns 1: 'K150'

    var i, j, l, r, p = isNaN(p) ? 4 : p > 10 ? 10 : p < 4 ? 4 : p,
    m = {BFPV: 1, CGJKQSXZ: 2, DT: 3, L: 4, MN: 5, R: 6},
    r = (s = str.toUpperCase().replace(/[^A-Z]/g, "").split("")).splice(0, 1);
    for(i = -1, l = s.length; ++i < l;){
        for(j in m){
            if(j.indexOf(s[i]) + 1 && r[r.length-1] != m[j] && r.push(m[j])){
                break;
            }
        }
    }
    return r.length > p && (r.length = p), r.join("") + (new Array(p - r.length + 1)).join("0");
}
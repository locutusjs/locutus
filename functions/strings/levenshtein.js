function levenshtein (a, b){
    // http://kevin.vanzonneveld.net
    // +      original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +      bugfixed by: Onno Marsman
    // +       revised by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // *        example 1: levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
    // *        returns 1: 3
    
    var min=Math.min, len1=0, len2=0, I=0, i=0, d=[], c='', j=0, J=0;

    // BEGIN STATIC
    var split = false;
    try{
        split=!('0')[0];
    } catch(e){
        split=true; // Earlier IE may not support access by string index
    }
    // END STATIC
    
    if (a == b) {
        return 0;
    }
    if (!a.length || !b.length) {
        return b.length || a.length;
    }
    if (split){
        a = a.split('');b = b.split('');
    }
    len1 = a.length + 1;
    len2 = b.length + 1;
    d = [[0]];
    while (++i < len2) {
        d[0][i] = i;
    }
    i = 0;
    while (++i < len1) {
        J = j = 0;
        c = a[I];
        d[i] = [i];
        while (++j < len2) {
            d[i][j] = min(d[I][j] + 1, d[i][J] + 1, d[I][J] + (c != b[J]));
            ++J;
        }
        ++I;
    }
    
    return d[len1 - 1][len2 - 1];
}

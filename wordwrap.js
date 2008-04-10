function wordwrap( str, int_width, str_break, cut ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Nick Callen
    // *     example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
    // *     returns 1: 'Kevin |van Zo|nnevel|d'

    var i, j, s, r = str.split("\n");
    if(int_width > 0) for(i in r){
        for(s = r[i], r[i] = ""; s.length > int_width;
            j = cut ? int_width : (j = s.substr(0, int_width).match(/\S*$/)).input.length - j[0].length || int_width,
            r[i] += s.substr(0, j) + ((s = s.substr(j)).length ? str_break : "")
        );
        r[i] += s;
    }
    return r.join("\n");
}
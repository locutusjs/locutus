function strrev (string) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: strrev('Kevin van Zonneveld');
    // *     returns 1: 'dlevennoZ nav niveK'

    // Fix: Check ahead for combining characters to avoid (as per PHP 6), reversing these too

    var ret = '', i = 0;

    string += '';
    for ( i = string.length-1; i >= 0; i-- ){
       ret += string.charAt(i);
    }

    return ret;
}

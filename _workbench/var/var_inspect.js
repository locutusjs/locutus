function var_inspect () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: This function has not been documented yet (for PHP 6)
    // *     example 1: var_inspect('Vie\u0302\u0323t Nam');
    // *     returns 1: true

    // Incomplete (only started for Unicode)

    // see http://www.slideshare.net/manuellemos/php-for-grownups-presentation
    var ret = '', i = 0, j = 0;
    for (i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        switch (typeof arg) {
            case 'string':
                ret += 'unicode('+arg.length+') "'+arg+'" {'; // Make dependent on strlen if surrogate pairs treated as one here (composites as two though)
                for (j = 0; j < arg.length; j++) {
                    var hex = arg[j].charCodeAt(0).toString(16); // Need to check for surrogates?
                    ret += ' '+(new Array(5-hex.length)).join('0')+hex; // Pad up to 4 zeroes (why not 6?)
                }
                ret += ' }\n';
                break;
        }
    }
    return ret;
}

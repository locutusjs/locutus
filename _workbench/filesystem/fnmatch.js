function fnmatch (pattern, string, flags) {
    // http://kevin.vanzonneveld.net
    // +   based on: jk at ricochetsolutions dot com (per http://www.php.net/manual/en/function.fnmatch.php#71725 )
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -   depends on: strtr
    // -   depends on: preg_quote
    // *     example 1: fnmatch('*gr[ae]y', 'gray');
    // *     returns 1: true

// Unfinished

    // all integers
    switch (flags) { // allow bitwise or'ed?
        case 'FNM_NOESCAPE': // Disable backslash escaping.
            break;
        case 'FNM_PATHNAME': // Slash in string only matches slash in the given pattern.
            break;
        case 'FNM_PERIOD': // Leading period in string must be exactly matched by period in the given pattern.
            break;
        case 'FNM_CASEFOLD': // Caseless match. Part of the GNU extension.
            break;
        default:
            break;
    }

    return (new RegExp('^'+this.strtr(this.preg_quote(pattern, '#'), {'\\*' : '.*', '\\?' : '.', '\\[' : '[', '\\]' : ']'})+'$', 'i')).test(string);
    
}
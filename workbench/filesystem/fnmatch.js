function fnmatch (pattern, string, flags) {
    // http://kevin.vanzonneveld.net
    // +   based on: jk at ricochetsolutions dot com (per http://www.php.net/manual/en/function.fnmatch.php#71725 )
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -   depends on: strtr
    // *     example 1: fnmatch('*gr[ae]y', 'gray');
    // *     returns 1: true

// Unfinished
    var backslash = '\\\\';
    var flagStr = 'g';


/*
#define    FNM_NOESCAPE    0x01    // Disable backslash escaping.
#define    FNM_PATHNAME    0x02    // Slash must be matched by slash.
#define    FNM_PERIOD    0x04    // Period must be matched by period.
#define    FNM_LEADING_DIR    0x08    // Ignore /<tail> after Imatch.
#define    FNM_CASEFOLD    0x10    // Case insensitive search.
#define FNM_PREFIX_DIRS    0x20    // Directory prefixes of pattern match too.
*/
    // all integers
    switch (flags) { // allow bitwise or'ed?
        case 'FNM_NOESCAPE': // Disable backslash escaping.
            backslash = '';
            break;
        case 'FNM_FILE_NAME': // Would have been fall-through but gone by PHP 6
            throw 'Obsolete flag';
        case 'FNM_PATHNAME': // Slash in string only matches slash in the given pattern.

            break;
        case 'FNM_PERIOD': // Leading period in string must be exactly matched by period in the given pattern.

            break;
        case 'FNM_NOSYS': // Gone by PHP 6
            throw 'Obsolete flag';
        case 'FNM_LEADING_DIR': // Ignore /<tail> after Imatch.

            break;
        case 'FNM_CASEFOLD': // Caseless match. Part of the GNU extension.
            flagStr += 'i';
            break;
        case 'FNM_PREFIX_DIRS': // Directory prefixes of pattern match too.

            break;
        default:
            break;
    }
    var regex = '(['+backslash+'\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!<>\\|\\:])'; // \, ., +, *, ?, [, ^, ], $, (, ), {, }, =, !, <, >, |, :
    var esc = function (str) {
        return (str+'').replace(new RegExp(regex, 'g'), '\\$1');
    };

    return (new RegExp('^'+this.strtr(esc(pattern, '#'), {'\\*' : '.*', '\\?' : '.', '\\[' : '[', '\\]' : ']'})+'$', flagStr)).test(string);
}

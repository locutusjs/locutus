function preg_match(pattern, subject, matches, flags, offset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Francis Lewis
    // +   improved by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: matches = [];
    // *     example 1: preg_match(/(\w+)\W([\W\w]+)/, 'this is some text', matches);
    // *     matches 1: matches[1] == 'this'

    var i, array = [], regexpFlags='';

    if (typeof pattern === 'string') {
        /* // Potentially useful configuration
        if (/a-zA-Z/.test(pattern[0]) || pattern.length === 1) { // The user is probably not using letters for delimiters (not recommended, but could be convenient for non-flagged expressions)
            pattern = new RegExp(pattern);
        }
        else {
        */
            var lastDelimPos = pattern.lastIndexOf(pattern[0]);
            if (lastDelimPos === 0) {
                throw 'Improperly formed regular expression passed to '+arguments.callee.name;
            }
            var patternPart = pattern.slice(1, lastDelimPos);
            var flagPart = pattern.slice(lastDelimPos+1);
            for (i=0; i < flagPart.length; i++) {
                switch(flagPart[i]) {
                    case 'g': // We don't use this in preg_match, but it's presumably not an error
                    case 'm':
                    case 'i':
                        regexpFlags += flagPart[i];
                        break;
                    case 's':
                    case 'x':
                    case 'e':
                    case 'A':
                    case 'D':
                    case 'S':
                    case 'U':
                    case 'X':
                    case 'J':
                    case 'u':
                        throw 'The passed flag(s) are presently unsupported in '+arguments.callee.name;
                        break;
                    case 'y':
                        throw 'Flag "y" is a non-cross-browser, non-PHP flag, not supported in '+arguments.callee.name;
                        break;
                    default:
                        throw 'Unrecognized flag passed to '+arguments.callee.name;
                        break;
                }
            }
            patternPart = patternPart.replace(/\(\?<(.*)\)/g, function (namedSubpattern, name) {
                return namedSubpattern; // Not implemented
            });
            pattern = new RegExp(patternPart, regexpFlags);
        // }
    }

    // store the matches in the first index of the array
    array[0] = pattern.exec(subject);

    if (!array[0]) {
        return 0;
    }

    // If the user passed in a RegExp object or literal, we will probably need to reflect on
    //   its source, ignoreCase, global, and multiline properties to form a new expression,
    //   and use lastIndex
    if (offset) {
        // Not implemented
    }
    if (flags === 'PREG_OFFSET_CAPTURE') {
        // Not implemented
        return 1; // matches will need to be different, so we return early here
    }

    // loop through the first indice of the array and store the values in the $matches array
    for (i = 0; i < array[0].length; i++) {
        matches[i] = array[0][i];
    }

    return 1;
}
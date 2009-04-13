function preg_match(pattern, subject, matches, flags, offset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Francis Lewis
    // +   improved by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: matches = [];
    // *     example 1: preg_match(/(\w+)\W([\W\w]+)/, 'this is some text', matches);
    // *     matches 1: matches[1] == 'this'

    var i, flag='', array = [], regexpFlags='', subPatternNames=[];

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
            // Fix: Need to study http://php.net/manual/en/regexp.reference.php more thoroughly
            for (i=0; i < flagPart.length; i++) {
                flag = flagPart[i];
                switch(flag) {
                    case 'e': // used in preg_replace only but ignored elsewhere; "does normal substitution of backreferences in the replacement string, evaluates it as PHP code, and uses the result for replacing the search string". "Single quotes, double quotes, backslashes and NULL chars will be escaped by backslashes in substituted backreferences."
                        break;
                    case 'g': // We don't use this in preg_match, but it's presumably not an error
                    case 'm':
                    case 'i':
                        regexpFlags += flag;
                        break;
                    case 's': // "dot metacharacter in the pattern matches all characters, including newlines. Without it, newlines are excluded... A negative class such as [^a] always matches a newline character"
                    case 'x': // "whitespace data characters in the pattern are totally ignored except when escaped or inside a character class, and characters between an unescaped # outside a character class and the next newline character, inclusive, are also ignored"; "Whitespace characters may never appear within special character sequences in a pattern"
                    case 'A': // pattern is "constrained to match only at the start of the string which is being searched"
                    case 'D': // "a dollar metacharacter in the pattern matches only at the end of the subject string" (ignored if 'm' set)
                    case 'U': // "makes not greedy by default, but become greedy if followed by "?""
                    case 'X': // "additional functionality of PCRE that is incompatible with Perl. Any backslash in a pattern that is followed by a letter that has no special meaning causes an error, thus reserving these combinations for future expansion"; not in use in PHP presently
                    case 'J': // "changes the local PCRE_DUPNAMES option. Allow duplicate names for subpatterns"
                    case 'u': // "turns on additional functionality of PCRE that is incompatible with Perl. Pattern strings are treated as UTF-8."
                        throw 'The passed flag "'+flag+'" is presently unsupported in '+arguments.callee.name;
                    case 'S': // spends "more time analyzing pattern in order to speed up the time taken for matching" (for subsequent matches)
                        throw 'The passed flag "'+flag+'" to '+arguments.callee.name+' cannot be implemented in JavaScript'; // Could possibly optimize inefficient expressions, however
                    case 'y':
                        throw 'Flag "y" is a non-cross-browser, non-PHP flag, not supported in '+arguments.callee.name;
                    default:
                        throw 'Unrecognized flag "'+flag+'" passed to '+arguments.callee.name;
                }
            }
            patternPart = patternPart.replace(/\(\?<(.*?)>(.*?)\)/g, function (namedSubpattern, name, pattern) {
                subPatternNames.push(name);
                return '('+pattern+')';
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
        if (i > 0 && subPatternNames[i-1] !== undefined) {
            matches[subPatternNames] = array[0][i]; // UNTESTED
        }
    }

    return 1;
}
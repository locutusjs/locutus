function preg_match (pattern, subject, matches, flags, offset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Francis Lewis
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: matches = [];
    // *     example 1: preg_match(/(\w+)\W([\W\w]+)/, 'this is some text', matches);
    // *     matches 1: matches[1] == 'this'
    // *     returns 1: 1

    // UNFINISHED
    // Just found something we should take a very serious look at Steve Levithan's XRegExp which implements Unicode classes and two extra flags: http://blog.stevenlevithan.com/archives/xregexp-javascript-regex-constructor
    // Before finding this, I was working on a script to search through an SQLite database to build our Unicode expressions automatically; I may finish that as it should be expandable for the future, and be an extra eye to confirm Steve's work
    // Also need to look at/integrate with Michael Grier's http://mgrier.com/te5t/preg_match_all.js ; http://mgrier.com/te5t/testpma.html ; http://mgrier.com/te5t/testpma.php

    var i=0, lastDelimPos=-1, flag='', patternPart='', flagPart='', array = [], regexpFlags='', subPatternNames=[];
    var getFuncName = function (fn) {
        var name=(/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };

    var join = function (arr) {
        return '(?:'+arr.join('|')+')';
    };

    if (typeof pattern === 'string') {
        if (pattern === '') {
            // Handle how?
        }

        lastDelimPos = pattern.lastIndexOf(pattern[0]);
        if (lastDelimPos === 0) { // convenience to allow raw string without delimiters  // || a-zA-Z/.test(pattern[0]) || pattern.length === 1) { // The user is probably not using letters for delimiters (not recommended, but could be convenient for non-flagged expressions)
            pattern = new RegExp(pattern);
        }
        else {
            patternPart = pattern.slice(1, lastDelimPos);
            flagPart = pattern.slice(lastDelimPos+1);
            // Fix: Need to study http://php.net/manual/en/regexp.reference.php more thoroughly
            // e.g., internal options i, m, s, x, U, X, J; conditional subpatterns?, comments, recursive subpatterns,
            for (i=0; i < flagPart.length; i++) {
                flag = flagPart[i];
                switch (flag) {
                    case 'g': // We don't use this in preg_match, but it's presumably not an error
                    case 'm':
                    case 'i':
                        regexpFlags += flag;
                        break;
                    case 'e': // used in preg_replace only but ignored elsewhere; "does normal substitution of backreferences in the replacement string, evaluates it as PHP code, and uses the result for replacing the search string". "Single quotes, double quotes, backslashes and NULL chars will be escaped by backslashes in substituted backreferences."
                        // Safely ignorable
                        break;
                    case 's': // "dot metacharacter in the pattern matches all characters, including newlines. Without it, newlines are excluded... A negative class such as [^a] always matches a newline character"
                    case 'x': // "whitespace data characters in the pattern are totally ignored except when escaped or inside a character class, and characters between an unescaped # outside a character class and the next newline character, inclusive, are also ignored"; "Whitespace characters may never appear within special character sequences in a pattern"
                    case 'A': // pattern is "constrained to match only at the start of the string which is being searched"
                    case 'D': // "a dollar metacharacter in the pattern matches only at the end of the subject string" (ignored if 'm' set)
                    case 'U': // "makes not greedy by default, but become greedy if followed by "?""
                    case 'J': // "changes the local PCRE_DUPNAMES option. Allow duplicate names for subpatterns"
                    case 'u': // "turns on additional functionality of PCRE that is incompatible with Perl. Pattern strings are treated as UTF-8."
                        throw 'The passed flag "'+flag+'" is presently unsupported in '+getFuncName(arguments.callee);
                    case 'X': // "additional functionality of PCRE that is incompatible with Perl. Any backslash in a pattern that is followed by a letter that has no special meaning causes an error, thus reserving these combinations for future expansion"; not in use in PHP presently
throw 'X flag is unimplemented at present';
                        if (/\/([^\\^$.[\]|()?*+{}aefnrtdDhHsSvVwWbBAZzGCcxkgpPX\d])/.test(patternPart)) { // can be 1-3 \d together after backslash (as one unit)
                            // \C = single byte (useful in 'u'/UTF8 mode)
                            // CcxpPXkg are all special uses;
                            //c. (any character after 'c' for control character)
                            // x[a-fA-F\d][a-fA-F\d] (hex)
                            // "Back references to the named subpatterns can be achieved by (?P=name) or, since PHP 5.2.4, also by \k<name>, \k'name', \k{name} or \g{name}"
                            // Unicode classes (with u flag only)
                                // p{} | P{} (case insensitive does not affect)
                                // [CLMNPSZ]
                                // C|Cc|Cf|Cn|Co|Cs|L|Ll|Lm|Lo|Lt|Lu|M|Mc|Me|Mn|N|Nd|Nl|No|P|Pc|Pd|Pe|Pf|Pi|Po|Ps|S|Sc|Sk|Sm|So|Z|Zl|Zp|Zs

                                 // Other, Control
                                // Cc = '[\u0000-\u001f\u007f-\u009f]';
                                // Other, Format
                                // Cf = '(?:[\u00ad\u0600-\u0603\u06dd\u070f\u17b4-\u17b5\u200b-\u200f\u202a-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb]|[\ud834][\udd73-\udd7a]|[\udb40][\udc01\udc20-\udc58]'); /* latter surrogates represent 1d173-1d17a, e0001, e0020-e0058 */
                                // Other, Unassigned
// Cn = TO-DO;
                                // Other, Private use
                                // Co = '(?:[\ue000-\uf8ff]|[\udb80-\udbbe][\udc00-\udfff]|[\udbff][\udc00-\udffd]|[\udbc0-\udbfe][\udc00-\udfff]|[\udbff][\udc00-\udffd])';  // f0000-ffffd, 100000-10fffd
                                // Other, Surrogate
                                // Cs = '[\ud800-\udb7f\udb80-\udbff\udc00-\udfff]';

// Need to finish Cn (above) and Ll-Sm here below
                                // Letter, Lower case
                                // Ll = '[]';
                                // Letter, Modifier
                                // Lm =
                                // Letter, Other
                                // Lo =
                                // Letter, Title case
                                // Lt =
                                // Letter, Upper case
                                // Lu =
                                // Mark, Spacing
                                // Mc =
                                // Mark, Enclosing
                                // Me =
                                // Mark, Non-spacing
                                // Mn =
                                // Number, Decimal
                                // Nd =
                                // Number, letter
                                // Nl =
                                // Number, Other
                                // No =
                                // Punctuation, Connector
                                // Pc =
                                // Punctuation, Dash
                                // Pd =
                                // Punctuation, Close
                                // Pe =
                                // Punctuation, Final
                                // Pf =
                                // Punctuation, Initial
                                // Pi =
                                // Punctuation, Other
                                // Po =
                                // Punctuation, Open
                                // Ps =
                                // Symbol, Currency
                                // Sc =
                                // Symbol, Modifier
                                // Sk =
                                // Symbol, Mathematical
                                // Sm ='\u002b\u003c-\u003e\u007c\u007e\u00ac\u00b1\u00d7\u00f7\u03f6\u0606-\u0608\u2044\u2052\u207a-\u207c\u208a-\u208c\u2140-\u2144\u214b\u2190-\u2194\u219a\u219b\u21a0\u21a3\u21a6\u21ae\u21ce\u21cf\u21d2\u21d4\u21f4-\u22ff\u2308-\u230b\u2320\u2321\u237c\u239b-\u23b3\u23dc-\u23e1\u25b7\u25c1\u25f8-\u25ff\u266f\u27c0-\u27c4\u27c7-\u27ca\u27cc\u27d0-\u27e5\u27f0-\u27ff\u2900-\u2982\u2999-\u29d7\u29dc-\u29fb\u29fe-\u2aff\u2b30-\u2b44\u2b47-\u2b4c\ufb29\ufe62\ufe64-\ufe66\uff0b\uff1c-\uff1e\uff5c\uff5e\uffe2\uffe9-\uffec

                                // 1d6c1 1d6db 1d6fb 1d715 1d735 1d74f 1d76f 1d789 1d7a9 1d7c3

                                // Symbol, Other
                                // latter alternates are surrogate pairs comprising 10102, 10137-1013f, 10179-10189, 10190-1019b, 101d0-101fc, 1d000-1d0f5, 1d100-1d126, 1d129-1d164, 1d16a-1d16c, 1d183-1d184, 1d18c-1d1a9, 1d1ae-1d1dd, 1d200-1d241, 1d245, 1d300-1d356, 1f000-1f02b, 1f030-1f093
                                // So = '(?:[\u00a6\u00a7\u00a9\u00ae\u00b0\u00b6\u0482\u060e\u060f\u06e9\u06fd\u06fe\u07f6\u09fa\u0b70\u0bf3-\u0bf8\u0bfa\u0c7f\u0cf1\u0cf2\u0d79\u0f01-\u0f03\u0f13-\u0f17\u0f1a-\u0f1f\u0f34\u0f36\u0f38\u0fbe-\u0fc5\u0fc7-\u0fcc\u0fce\u0fcf\u109e\u109f\u1360\u1390-\u1399\u1940\u19e0-\u19ff\u1b61-\u1b6a\u1b74-\u1b7c\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211e-\u2123\u2125\u2127\u2129\u212e\u213a\u213b\u214a\u214c\u214d\u214f\u2195-\u2199\u219c-\u219f\u21a1\u21a2\u21a4\u21a5\u21a7-\u21ad\u21af-\u21cd\u21d0\u21d1\u21d3\u21d5-\u21f3\u2300-\u2307\u230c-\u231f\u2322-\u2328\u232b-\u237b\u237d-\u239a\u23b4-\u23db\u23e2-\u23e7\u2400-\u2426\u2440-\u244a\u249c-\u24e9\u2500-\u25b6\u25b8-\u25c0\u25c2-\u25f7\u2600-\u266e\u2670-\u269d\u26a0-\u26bc\u26c0-\u26c3\u2701-\u2704\u2706-\u2709\u270c-\u2727\u2729-\u274b\u274d\u274f-\u2752\u2756\u2758-\u275e\u2761-\u2767\u2794\u2798-\u27af\u27b1-\u27be\u2800-\u28ff\u2b00-\u2b2f\u2b45\u2b46\u2b50-\u2b54\u2ce5-\u2cea\u2e80-\u2e99\u2e9b-\u2ef3\u2f00-\u2fd5\u2ff0-\u2ffb\u3004\u3012\u3013\u3020\u3036\u3037\u303e\u303f\u3190\u3191\u3196-\u319f\u31c0-\u31e3\u3200-\u321e\u322a-\u3243\u3250\u3260-\u327f\u328a-\u32b0\u32c0-\u32fe\u3300-\u33ff\u4dc0-\u4dff\ua490-\ua4c6\ua828-\ua82b\ufdfd\uffe4\uffe8\uffed\uffee\ufffc\ufffd]|(?:\ud800[\udd02\udd37-\udd3f\udd79-\udd89\udd90-\udd9b\uddd0-\uddfc])|(?:\ud834[\udc00-\udcf5\udd00-\udd26\udd29-\udd64\udd6a-\udd6c\udd83-\udd84\udd8c-\udda9\uddae-\udddd\ude00-\ude41\ude45\udf00-\udf56])|(?:\ud83c[\udc00-\udc2b\udc30-\udc93]))';

                                // Separator, Line
                                // Zl = '[\u2028]';
                                // Separator, Paragraph
                                // Zp = '[\u2029]';
                                // Separator, Space
                                // Zs = '[\u0020\u00a0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000]';

                                // Form broader groups
                                // C = join([Cc, Cf, Cn, Co, Cs]);
                                // L = join([Ll, Lm, Lo, Lt, Lu]);
                                // M = join([Mc, Me, Mn]);
                                // N = join([Nd, Nl, No]);
                                // P = join([Pc, Pd, Pe, Pf, Pi, Po, Ps]);
                                // S = join([Sc, Sk, Sm, So]);
                                // Z = join([Zl, Zp, Zs]);


                                // \X = (?>\PM\pM*)
                                // "Extended properties such as "Greek" or "InMusicalSymbols" are not supported by PCRE."
                            throw 'You are in "X" (PCRE_EXTRA) mode, using a reserved and presently unused escape sequence in '+getFuncName(arguments.callee);
                        }
                        break;
                    case 'S': // spends "more time analyzing pattern in order to speed up the time taken for matching" (for subsequent matches)
                        throw 'The passed flag "'+flag+'" to '+getFuncName(arguments.callee)+' cannot be implemented in JavaScript'; // Could possibly optimize inefficient expressions, however
                    case 'y':
                        throw 'Flag "y" is a non-cross-browser, non-PHP flag, not supported in '+getFuncName(arguments.callee);
                    default:
                        throw 'Unrecognized flag "'+flag+'" passed to '+getFuncName(arguments.callee);
                }
            }
        }
    }
    else {
        patternPart = pattern.source; // Allow JavaScript type expressions to take advantage of named subpatterns, so temporarily convert to string
        regexpFlags += pattern.global ? 'g' : '';
        regexpFlags += pattern.ignoreCase ? 'i' : '';
        regexpFlags += pattern.multiline ? 'm' : '';
    }

    patternPart = patternPart.replace(/\(\?<(.*?)>(.*?)\)/g, function (namedSubpattern, name, pattern) {
        subPatternNames.push(name);
        return '('+pattern+')';
    });

    pattern = new RegExp(patternPart, regexpFlags);

    // store the matches in the first index of the array
    array[0] = pattern.exec(subject);

    if (!array[0]) {
        return 0;
    }

    // If the user passed in a RegExp object or literal, we will probably need to reflect on
    //   its source, ignoreCase, global, and multiline properties to form a new expression (as above?),
    //   and use lastIndex
    if (offset) {
        // Not implemented
    }
    if (flags === 'PREG_OFFSET_CAPTURE' || flags === 256) { // Fix: make flags as number and allow bitwise AND checks against flags; see pathinfo()
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

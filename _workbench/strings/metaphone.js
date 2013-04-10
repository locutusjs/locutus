function metaphone (str) {
    // The code below is based on description from Wikipedia (http://en.wikipedia.org/wiki/Metaphone)
    // There are some modifications applied, like
    // - changing the order of rules
    // - changing the rules to match PHP algorithm
    // modifications are based on PHP metaphone source code

    // changing the input string to lower case
    // all rules replace lower-case characters with upper-case, so following rules won't be applied to already computed parts
    str = ('' + str).toLowerCase();

    var rules = [
        // 1. Drop duplicate adjacent letters, except for G
        // php also doesn't remove 'C' duplicates
        /([^cg])\1+/g, '',

        // 2. If the word begins with 'KN', 'GN', 'PN', 'AE', 'WR', drop the first letter

        /^[gkp]n/, 'N',
        /^ae/, 'E',
        /^wr/, 'R',

        // 3. Drop 'B' if after 'M' and if it is at the end of the word
        // php ignores the "end of word" part of the rule
        /mb/g, '',

        // 9. 'CK' transforms to 'K'
        // Applying the rule here, cause rule 4) replaces all 'C's with 'K'
        /ck/g, 'K',

        // 4. 'C' transforms to 'X' if followed by 'IA' or 'H' (unless in latter case, it is part of '-SCH-', in which case it transforms to 'K'). 'C' transforms to 'S' if followed by 'I', 'E', or 'Y'. Otherwise, 'C' transforms to 'K'
        /\Bsch/g, 'SK', // check if replace both S and H or only the C. Check if '\B' works correctly for multiple words
        /c(?=ia)/g, 'X',
        /[cs]h/g, 'X', // PHP also drops the 'H' character
        /c(?=[eiy])/g, 'S',
        /c/g, 'K',

        // 5. 'DG' transforms to 'J' if followed by 'GE', 'GY', or 'GI'. Otherwise, 'D' transforms to 'T
        /dg(?=[eiy])/g, 'J',
        /d/g, 'T',

        // 6. Drop 'G' if followed by 'H' and 'H' is not at the end or before a vowel. Drop 'G' if followed by 'N' or 'NED' and is at the end
        /gh(?![aeiou]|$)/g, 'H',
        /g(?=n(ed)?)$/g, '',

        // 7. 'G' transforms to 'J' if before 'I', 'E', or 'Y', and it is not in 'GG'. Otherwise, 'G' transforms to 'K'. Reduce 'GG' to 'G'
        /(^|[^g])g(?=[eiy])/g, '$1J',
        /g+/g, 'K', // check if that's the way GG is replaced with K, or it should be G in result string

        // 8. Drop 'H' if after vowel and not before a vowel
        /([aeiou])h(?![aeiou])/g, '$1',

        // 10. 'PH' transforms to 'F'
        /ph/g, 'F',

        // 11. 'Q' transforms to 'K'
        /q/g, 'K',

        // 12. 'S' transforms to 'X' if followed by 'H', 'IO', or 'IA'
        // php also drops the 'H' in 'SH' case, which is done in 'CH' rule
        /s(?=i[oa])/g, 'X',

        // 13. 'T' transforms to 'X' if followed by 'IA' or 'IO'. 'T' transforms to '0' if followed by 'H'. Drop 'T' if followed by 'CH'
        // php replaces 'TH' with '0', not only the 'T'
        /t(?=i[ao])/g, 'X',
        /th/g, '0',
        /t(?=ch)/g, '', // check if this is valid, cause 'CH' case is already replaced with 'X'

        // 14. 'V' transforms to 'F'
        /v/g, 'F',

        // 15. 'WH' transforms to 'W' if at the beginning. Drop 'W' if not followed by a vowel
        // 17. Drop 'Y' if not followed by a vowel
        /^wh/, 'W',
        /[wy](?![aeiou])/g, '',

        // 16. 'X' transforms to 'S' if at the beginning. Otherwise, 'X' transforms to 'KS'
        /^x/, 'S',
        /x/g, 'KS',

        // 18. 'Z' transforms to 'S'
        /z/g, 'S',

        // 19. Drop all vowels unless it is the beginning
        /(^[aeiou])?[aeiou]?/g, '$1',

        // Remove all non-ascii characters
        // doing case-insensitive replace, so that upper-case ASCII characters remain untouched
        /[^a-z0]/ig, ''
    ];

    for (var i = 0, l = rules.length; i < l; i += 2) {
        str = str.replace(rules[i], rules[i + 1]);
    }

    // transforming result to upper-case
    return str.toUpperCase();
}


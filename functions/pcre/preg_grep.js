function preg_grep (pattern, input, flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// %          note 1: If pass pattern as string, must escape backslashes, even for single quotes
    // %          note 2: The regular expression itself must be expressed JavaScript style
    // %          note 3: It is not recommended to submit the pattern as a string, as we may implement
    // %          note 3:   parsing of PHP-style expressions (flags, etc.) in the future
    // *     example 1: var arr = [1, 4, 4.5, 3, 'a', 4.4];
    // *     example 1: preg_grep("/^(\\d+)?\\.\\d+$/", arr);
    // *     returns 1: {2: 4.5, 5: 4.4}

    var p='', retObj = {};
    var invert = flags === 'PREG_GREP_INVERT' ? true : false;

    if (typeof pattern === 'string') {
        pattern = eval(pattern);
    }

    if (invert) {
        for (p in input) {
            if (!pattern.test(input[p])) {
                retObj[p] = input[p];
            }
        }
    } else {
        for (p in input) {
            if (pattern.test(input[p])) {
                retObj[p] = input[p];
            }
        }
    }

    return retObj;
}
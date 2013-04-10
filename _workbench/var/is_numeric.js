function is_numeric (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: David
    // +   improved by: taith
    // +   bugfixed by: Tim de Koning
    // +   bugfixed by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Rafał Kukawski (http://blog.kukawski.pl)
    // *     example 1: is_numeric(186.31);
    // *     returns 1: true
    // *     example 2: is_numeric('Kevin van Zonneveld');
    // *     returns 2: false
    // *     example 3: is_numeric('+186.31e2');
    // *     returns 3: true
    // *     example 4: is_numeric('');
    // *     returns 4: false
    // *     example 4: is_numeric([]);
    // *     returns 4: false

    // The old implementation doesn't work correctly with strings containing white characters at the beginnig or at the end
    // eg. "\t123\t". phpjs function returns true, where PHP returns false

    // The function below should cover the case described above,
    // Still thinking about removing the regex, but have no better idea
    // also type checking is still required, because one-element arrays
    // are serialized to valid numeric strings and numbers (+[3.14] -> 3.14)
    // and PHP returns false for arrays
    var type = typeof mixed_var,
        /*
            ^ # the string has to begin with
            [+\-]? # optional sign character
            (?:
                0x[\da-f]+ # should be proper HEX value
                | # or
                (?:
                    (?:
                        \d+(?:\.\d*)? # integer part with optional decimal part (0, 000, 001, 3, 3.14 or 3.)
                        | # or
                        \.\d+ # just the decimal part (.14)
                    )
                )
                (e[+\-]?\d+)? # and with optional scientific notation e2, e-2, e+2
            )
            $
        */
        valid_number = /^[+\-]?(?:0x[\da-f]+|(?:(?:\d+(?:\.\d*)?|\.\d+))(e[+\-]?\d+)?)$/i;

    return !isNaN(mixed_var) && (type === 'number' || (type === 'string' && valid_number.test(mixed_var));
}

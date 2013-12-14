function stripcslashes (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stripcslashes("\\f\\o\\o\\[ \\]");
    // *     returns 1: 'foo[ ]'

    var target = '', i = 0, sl = 0, s = '', next = '', hex = '', oct = '', hex2DigMax = /[\dA-Fa-f]{1,2}/, rest = '', seq = '',
            oct3DigMaxs = /([0-7]{1,3})((\\[0-7]{1,3})*)/, oct3DigMax = /(\\([0-7]{1,3}))*/g, escOctGrp = [];

    for (i = 0, sl = str.length; i < sl; i++) {
        s = str.charAt(i);
        next = str.charAt(i+1);
        if (s !== '\\' || !next) {
            target += s;
            continue;
        }
        switch (next) {
            case 'r':  target +='\u000D'; break;
            case 'a':  target +='\u0007'; break;
            case 'n':  target +='\n'; break;
            case 't':  target +='\t'; break;
            case 'v':  target +='\v'; break;
            case 'b':  target +='\b'; break;
            case 'f':  target +='\f'; break;
            case '\\': target +='\\'; break;
            case 'x': // Hex (not used in addcslashes)
                rest = str.slice(i+2);
                if (rest.search(hex2DigMax) !== -1) { // C accepts hex larger than 2 digits (per http://www.php.net/manual/en/function.stripcslashes.php#34041 ), but not PHP
                    hex = (hex2DigMax).exec(rest);
                    i += hex.length; // Skip over hex
                    target += String.fromCharCode(parseInt(hex, 16));
                    break;
                }
                // Fall-through
            default: // Up to 3 digit octal in PHP, but we may have created a larger one in addcslashes
                rest = str.slice(i+2);
                if (rest.search(oct3DigMaxs) !== -1) { // C accepts hex larger than 2 digits (per http://www.php.net/manual/en/function.stripcslashes.php#34041 ), but not PHP
                    oct = (oct3DigMaxs).exec(rest);
                    i += oct[1].length; // Skip over first octal
                    // target += String.fromCharCode(parseInt(oct[1], 8)); // Sufficient for UTF-16 treatment

                    // Interpret int here as UTF-8 octet(s) instead, produce non-character if none
                    rest = str.slice(i+2); // Get remainder after the octal (still need to add 2, since before close of iterating loop)
                    seq = '';

                    if ((escOctGrp = oct3DigMax.exec(rest)) !== null) {
                        seq += '%'+parseInt(escOctGrp[2], 8).toString(16);
                    }
                    /* infinite loop
                    while ((escOctGrp = oct3DigMax.exec(rest)) !== null) {
                        seq += '%'+parseInt(escOctGrp[2], 8).toString(16);
                    }

                    dl('stripcslashes');
                    alert(
                        stripcslashes('\\343\\220\\201')
                    )
                    */

                    try {
                        target += decodeURIComponent(seq);
                    }
                    catch(e) { // Bad octal group
                        target += '\uFFFD'; // non-character
                    }

                    break;
                }
                target += next;
                break;
        }
        ++i; // Skip special character "next" in switch
    }
}

function sscanf (str, format) {
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Since JS does not support scalar reference variables, any additional arguments to the function will
    // %        note 1: only be allowable here as strings referring to a global variable (which will then be set to the value
    // %        note 1: found in 'str' corresponding to the appropriate conversion specification in 'format'
    // *     example 1: sscanf('SN/2350001', 'SN/%d')[0];
    // *     returns 1: 2350001
    // *     example 2: var myVar; // Will be set by function
    // *     example 2: sscanf('SN/2350001', 'SN/%d', myVar);
    // *     returns 2: 1

    var retArr = [], num = 0;

    var setExtraConversionSpecs = function (offset) {
        // Since a mismatched character sets us off track from future legitimate finds, we just scan to the end for any other conversion specifications (besides a percent literal), setting them to null
        // sscanf seems to disallow all conversion specification components except for type specifiers
        //var matches = format.match(/%[+-]?([ 0]|'.)?-?\d*(\.\d+)?[bcdeufFosxX]/g); // Do not allow % in last char. class
        var matches = format.slice(offset).match(/%[bcdeufFosxX]/g); // Do not allow % in last char. class
        if (matches) {
            var lgth = matches.length;
            while (lgth--) {
                retArr.push(null);
            }
        }
    };
    var processChar = function (format, i) {
        switch(format.charAt(i+1)) {
            // See http://www.uwm.edu/cgi-bin/IMT/wwwman?topic=scanf%283%29&msection= for detailed explanations
            // UNDOCUMENTED AT PHP SITE (a few others below)
            case 'n':
                
                break;
            // DOCUMENTED AT PHP SITE
            case 'b':
                retArr.push();
                ++num;
                break;
            case 'c':
                break;
            case 'i': // Undocumented equivalent of 'd', but base 0 instead of 10
                break;
            case 'D': // Undocumented equivalent of 'd'
            case 'd':
                break;
            case 'g': case 'E': // Undocumented equivalents of 'e' or 'f'?
            case 'e':
                break;
            case 'u':
                break;
            case 'f':
                break;
            case 'F':
                break;
            case 'o':
                break;
            case 's':
                break;
            case 'x':
                break;
            case 'X':
                break;
            case '': // If no character left in expression
                throw 'Missing character after percent mark in sscanf() format argument';
            default:
                throw 'Unrecognized character after percent mark in sscanf() format argument';
        }
    };

    if (arguments.length < 2) {
        throw 'Not enough arguments passed to sscanf';
    }
    for (var i=0; i < format.length; i++) {

        var width = 0, objIndex, noassign = false;

        if (format.charAt(i) === '%') {
            if (format.charAt(i+1) === '%') {
                if (str.charAt(i) === '%') { // a matched percent literal
                    ++i; // skip beyond duplicated percent
                    continue;
                }
                // Format indicated a percent literal, but not actually present
                setExtraConversionSpecs(i+1);
                break;
            }

            var xpgAssign = /^\d+\$/g; // We need 'g' set to get lastIndex
            if (format.charAt(i+1) === '*') {
                // Match but don't assign
                noassign = true;
                ++i;
                // Fix: add handling below for noassign
            }
            else if (xpgAssign.test(format.slice(i+1))) {
                // Fix: unfinished
                parseInt('', 10);
                

                i += xpgAssign.lastIndex;
            }
            
            if ((/\d/).test(format.charAt(i+1))) {
                width = parseInt(format.charAt(i+1), 10);
                ++i;
            }
            else {
                width = 0;
            }
            switch(format.charAt(i+1)) {
                case 'h': // Treats subsequent as short or unsigned short int
                case 'l': // Treats subsequent as long int, unsigned long; or as double instead of float or wchar_t instead of char
                case 'L':
                    // Ignore size specifiers
                    ++i;
                    // Fall-through
                default:
                    processChar(format, i, width);
                    break;
            }
            ++i; // Skip beyond
            continue;
        }
        if (
            (format.charAt(i) !== str.charAt(i)) &&
            ((/\S/).test(format.charAt(i)) || (/\S/).test(str.charAt(i))) // Whitespace doesn't need to be an exact match
            ) {
            setExtraConversionSpecs(i+1);
            break;
        }
    }
    if (arguments.length === 2) {
        return retArr;
    }
    for (i=0; i < retArr.length; i++) {
        this.window[arguments[i+2]] = retArr[i];
        ++num;
    }
    return num;
}
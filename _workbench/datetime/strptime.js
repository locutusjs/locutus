function strptime (dateStr, format) {
    // http://kevin.vanzonneveld.net
    // +      original by: Brett Zamir (http://brett-zamir.me)
    // -       depends on: setlocale
    // -       depends on: array_map
    // *        example 1: strptime('20091112222135', '%Y%m%d%H%M%S'); // Return value will depend on date and locale
    // *        returns 1: {tm_sec: 35, tm_min: 21, tm_hour: 22, tm_mday: 12, tm_mon: 10, tm_year: 109, tm_wday: 4, tm_yday: 315, unparsed: ''}
    // *        example 1: strptime('2009extra', '%Y');
    // *        returns 1: {tm_sec:0, tm_min:0, tm_hour:0, tm_mday:0, tm_mon:0, tm_year:109, tm_wday:3, tm_yday: -1, unparsed: 'extra'}

    // tm_isdst is in other docs; why not PHP?

    var retObj = {tm_sec:0, tm_min:0, tm_hour:0, tm_mday:0, tm_mon:0, tm_year:0, tm_wday:0, tm_yday: 0, unparsed: ''}, that = this;

    // BEGIN STATIC
    var _NWS = /\S/, _WS = /\s/;

    var _aggregates = {
        c: 'locale',
        D: '%m/%d/%y',
        F: '%y-%m-%d',
        r: 'locale',
        R: '%H:%M',
        T: '%H:%M:%S',
        x: 'locale',
        X: 'locale'
    };

/* Fix: Locale alternatives are supported though not documented in PHP; see http://linux.die.net/man/3/strptime
Ec
EC
Ex
EX
Ey
EY
Od or Oe
OH
OI
Om
OM
OS
OU
Ow
OW
Oy
*/
    var _preg_quote = function (str) {
        return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, "\\$1");
    };
    // END STATIC

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END REDUNDANT

    var phpjs = this.php_js;
    var locale = phpjs.localeCategories.LC_TIME;
    var locales = phpjs.locales;
    var lc_time = locales[locale].LC_TIME;

    // First replace aggregates (run in a loop because an agg may be made up of other aggs)
    while (format.match(/%[cDFhnrRtTxX]/)) {
        format = format.replace(/%([cDFhnrRtTxX])/g, function (m0, m1) {
            var f = _aggregates[m1];
            return (f === 'locale' ? lc_time[m1] : f);
        });
    }
    
    var _addNext = function (j, regex, cb) {
        if (typeof regex === 'string') {
            regex = new RegExp('^'+regex, 'i');
        }
        var check = dateStr.slice(j);
        var match = regex.exec(check);
        // Even if the callback returns null after assigning to the return object, the object won't be saved anyways
        
        var testNull = retObj[retObj.length] = match ? (cb ? cb.apply(null, match) : match[0]) : null;
        if (testNull === null) {
            throw 'No match in string';
        }
        return j+match[0].length;
    };

    var _addLocalized = function (j, formatChar, category) {
        return _addNext(j,
                        that.array_map(
                            _preg_quote,
                            lc_time[formatChar]
                        ).join('|'), // Could make each parenthesized instead and pass index to callback
                        function (m) {
                            var match = lc_time[formatChar].search(new RegExp('^'+_preg_quote(m)+'$', 'i'));
                            if (match) {
                                retObj[category] = match[0];
                            }
                        }
        );
    };

    // BEGIN PROCESSING CHARACTERS
    for (var i=0, j = 0; i < format.length; i++) {
        if (format.charAt(i) === '%') {
            var literalPos = ['%', 'n', 't'].indexOf(format.charAt(i+1));
            if (literalPos !== -1) {
                if (['%', '\n', '\t'].indexOf(dateStr.charAt(j)) === literalPos) { // a matched literal
                    ++i, ++j; // skip beyond
                    continue;
                }
                // Format indicated a percent literal, but not actually present
                return false;
            }
            var formatChar = format.charAt(i+1);
            try {
                switch (formatChar) {
                    case 'a': // Fall-through
                    case 'A':
                        j = _addLocalized(j, formatChar, 'tm_wday'); // Changes nothing else
                        break;
                    case 'h': // Fall-through (alias of 'b'); // also changes wday, yday
                    case 'b':
                        j = _addLocalized(j, 'b', 'tm_mon'); // also changes wday, yday
                        break;
                    case 'B':
                        j = _addLocalized(j, formatChar, 'tm_mon'); // also changes wday, yday
                        break;
                    case 'C':
                        // tm_year // Also changes wday; and sets yday to -1
                        break;
                    case 'd':
                        // Fall-through
                    case 'e':
                        j = _addNext(j,
                                                formatChar === 'd' ? /^(0[1-9]|[1-2]\d|3[0-1])/ : /^([1-9]|[1-2]\d|3[0-1])/,
                                                function (d) {
                                                    var dayMonth = parseInt(d, 10);
                                                    retObj.tm_mday =  dayMonth;
                                                    // Also changes y_day
                                                }
                        );
                        break;
                    case 'g': // No apparent effect
                        break;
                    case 'G': // No apparent effect
                        break;
                    case 'H':
                        j = _addNext(j,
                                                /^([0-1]\d|2[0-3])/,
                                                function (d) {
                                                    var hour = parseInt(d, 10);
                                                    retObj.tm_hour =  hour;
                                                    // Changes nothing else
                                                }
                        );
                        break;
                    case 'l': // Fall-through of lower-case 'L'
                    case 'I':
                        j = _addNext(j,
                                                formatChar === 'l' ? /^([1-9]|1[0-2])/ : /^(0[1-9]|1[0-2])/,
                                                function (d) {
                                                    var hour = parseInt(d, 10)-1;
                                                    retObj.tm_hour =  hour;
                                                    // Changes nothing else, but affected by prior 'p/P'
                                                }
                        );
                        break;
                    case 'j':
                        j = _addNext(j,
                                                /^(00[1-9]|0[1-9]\d|[1-2]\d\d|3[0-6][0-6])/,
                                                function (d) {
                                                    var dayYear = parseInt(d, 10)-1;
                                                    retObj.tm_yday =  dayYear;
                                                    // Changes nothing else
                                                }
                        );
                        break;
                    case 'm':
                        j = _addNext(j,
                                                /^(0[1-9]|1[0-2])/,
                                                function (d) {
                                                    var month = parseInt(d, 10)-1;
                                                    retObj.tm_mon =  month;
                                                    // Also sets wday and yday
                                                }
                        );
                        break;
                    case 'M':
                        j = _addNext(j,
                                                /^[0-5]\d/,
                                                function (d) {
                                                    var minute = parseInt(d, 10);
                                                    retObj.tm_min =  minute;
                                                    // Changes nothing else
                                                }
                        );
                        break;
                    case 'p': // No effect on 'H' since already 24 hours; works before or after setting of hour
                        break;
                    case 'P': // No effect on 'H' since already 24 hours; works before or after setting of hour
                        break;
                    case 's':
                        // Fix: Timestamp; sets all fields, but can't be negative
                        break;
                    case 'S':
                        j = _addNext(j,
                                                /^[0-5]\d/, // strptime also accepts 60-61 for some reason
                                                function (d) {
                                                    var second = parseInt(d, 10);
                                                    retObj.tm_sec =  second;
                                                    // Changes nothing else
                                                }
                        );
                        break;
                    case 'u': // Fall-through
                    case 'w':
                        j = _addNext(j,
                                                /^\d/,
                                                function (d) {
                                                    retObj.tm_wday = d - (formatChar === 'u');
                                                    // Changes nothing else
                                                }
                        );
                        break;
                    case 'U': // Fall-through
                    case 'V':// Fall-through
                    case 'W': // Apparently ignored
                        break;
                    case 'y':// tm_year // Also changes wday; and sets yday to -1
                        break;
                    case 'Y':// tm_year // Also changes wday; and sets yday to -1
                        break;
                    case 'z': // On my system, strftime gives -0800, but strptime seems not to alter hour setting
                        break;
                    case 'Z': // On my system, strftime gives PST, but strptime treats text as unparsed
                        break;
                    default:
                        throw 'Unrecognized formatting character in strptime()';
                        break;
                }
            }
            catch(e) {
                if (e.message === 'No match in string') { // Allow us to exit
                    return false; // There was supposed to be a matching format but there wasn't
                }
            }
            ++i; // Calculate skipping beyond initial percent too
        }
        else if (format.charAt(i) !== dateStr.charAt(j)) {
            // If extra whitespace at beginning or end of either, or between formats, no problem
            // (just a problem when between % and format specifier)

            // If the string has white-space, it is ok to ignore
            if ((_WS).test(dateStr.charAt(j))) {
                j++;
                i--; // Let the next iteration try again with the same format character
            }
            else if ((_NWS).test(format.charAt(i))) { // Any extra formatting characters besides white-space causes 
                // problems (do check after WS though, as may just be WS in string before next character)
                return false;
            }
            else { // Extra WS in format
                // Adjust strings when encounter non-matching whitespace, so they align in future checks above
                // Will check on next iteration (against same (non-WS) string character)
            }
        }
        else {
            j++;
        }
    }

    // POST-PROCESSING

    // fix: also handle date re-calculations?

    retObj.unparsed = dateStr.slice(j); // Will also get extra whitespace; empty string if none
    return retObj;
}

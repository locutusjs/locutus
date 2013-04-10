function DateInterval (interval_spec) { // string
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: date_interval_create_from_date_string
    // *     example 1: var di = new DateInterval('P2Y4DT6H8M');
    // *     example 1: di.d === 4;
    // *     returns 1: true

    var that = this,
        matches, weeks = false,
        dec = '(?:(\\d+(?:[.,]\\d*)?)', // Must decimal be followed by number?
        _pad = function (n, c) {
            if ((n = n + '').length < c ) {
                return new Array(++c - n.length).join('0') + n;
            }
            return n;
        };
    if (!this.DateInterval.prototype.format) { // We need to place here for compilation reasons
        var DateInterval = this.DateInterval;
        DateInterval.prototype = {
            constructor: DateInterval,
            format : function (format) {
                return format.replace(/%([%YyMmDdaHhIiSsRr])/, function (n0, n1) {
                    switch (n1) {
                        case '%':
                            return '%';
                        case 'Y': case 'M': case 'D': case 'H': case 'I': case 'S':
                            var l = n1.toLowerCase();
                            return _pad(that[l], 2);
                        case 'y': case 'm': case 'd': case 'h': case 'i': case 's':
                            return that[n1];
                        case 'a':
                            return that.days;
                        case 'R':
                            return that.invert ? '-' : '+';
                        case 'r':
                            return that.invert ? '-' : '';
                        default:
                            throw 'Unexpected character in DateInterval.format replace';
                    }
                });
            }
        };
        DateInterval.createFromDateString = function (time) { // string (date string with relative parts)
            return that.date_interval_create_from_date_string(time);
        };
    }

    try {
        if ((matches = interval_spec.match(/^P(\d+)W$/))) {
            this.d = 7 * matches[1];
            weeks = true;
        }
        else if ((matches = interval_spec.match(new RegExp(
            '^P' + dec + 'Y)?' + dec + 'M)?' + dec + 'D)?(?:T' + dec + 'H)?' + dec + 'M)?' + dec + 'S)?)?$'
        )))) {
            var mj = matches.join('');
            if (
                mj.match(/[.,]\d+../) || // Decimal used in non-lowest position
                mj.replace(/[.,]/g, '').length < 3 // Only P and/or T
            ) {
                throw 'Handle-below';
            }
        }
        else if (!(matches = interval_spec.match(
            /^P(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])T([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
        ))) {
            throw 'Handle-below';
        }
    }
    catch (e) {
        throw 'Malformed DateInterval'; // Throw exception from single place
    }
    if (!weeks) {
        this.y = matches[1] || 0;
        this.m = matches[2] || 0;
        this.d = matches[3] || 0;
        this.h = matches[4] || 0;
        this.i = matches[5] || 0;
        this.s = matches[6] || 0;
    }
    this.invert =  0; // or 1; Fix: Must be changed directly to work?
    this.days = this.d || false; // Fix: When will it not be determinable (to be false); how to determine conversion from months?
}

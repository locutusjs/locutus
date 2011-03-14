function DateInterval (interval_spec) { // string
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: date_interval_create_from_date_string
    // *     example 1: var di = new DateInterval('P2Y4DT6H8M');
    // *     example 1: di.d === 4;
    // *     returns 1: true

    var that = this;
    if (!this.DateInterval.prototype.format) { // We need to place here for compilation reasons
        var DateInterval = this.DateInterval;
        DateInterval.prototype = {
            constructor: DateInterval,
            format : function (format) {
                
                return '';
            }
        };
        DateInterval.createFromDateString = function (time) { // string (date string with relative parts)
            return that.date_interval_create_from_date_string(time);
        };
    }
    
    var matches, weeks = false, 
        dec = '(?:(\\d+(?:[.,]\\d*)?)'; // Must decimal be followed by number?
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
            throw 'Malformed DateInterval';
        }
    }
    else if (!(matches = interval_spec.match(
        /^P(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])T([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
    ))) {
        throw 'Malformed DateInterval';
    }
    if (!weeks) {
        this.y = matches[1] || 0;
        this.m = matches[2] || 0;
        this.d = matches[3] || 0;
        this.h = matches[4] || 0;
        this.i = matches[5] || 0;
        this.s = matches[6] || 0;
    }
    this.invert = 1 || 0; // Fix: Must be changed directly to work?
    this.days = this.d || false; // Fix: How does this differ from this.d? Why does example show 0 though docs say if not determinable should be false?
}

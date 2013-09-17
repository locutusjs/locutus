function DatePeriod (start, interval, recurrences, options) { // DateTime, DateInterval, int, int
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: new DatePeriod();
    // *     returns 1: {}

    // Finish example above

    // Is iteratable with foreach in PHP; this class is just put here for convenience,
    // as there is no PHP function that returns it; it is just placed here as a related class,
    // see http://en.wikipedia.org/wiki/ISO_8601#Durations

    if (!this.DatePeriod.EXCLUDE_START_DATE) { // We need to place here for compilation reasons
        var DatePeriod = this.DatePeriod;
        // See https://developer.mozilla.org/en/New_in_JavaScript_1.7#Iterators
        DatePeriod.prototype.__iterator__ = function () { // Mozilla/Chrome/Safari only; will allow DatePeriod to be iterated with for...in or for each
           return Iterator(this.data, false); // Allow both key and value to be passed back? (otherwise, 2nd arg is true);
           // need destructuring to get individually; might also use our implementation of foreach to do without this
           // Mozilla-only approach, but it will require use of (and adaptation of) our foreach()
        };
        DatePeriod.EXCLUDE_START_DATE = 1;
    }

    // or start, interval, end, options
    // or isostr, options
    if (options) { // the only optional part in all 3 constructor forms
    }
}

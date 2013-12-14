function timezone_open (timezone) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: DateTimeZone
    // *     example 1: timezone_open('Europe/Prague'); // Can't convert to string in PHP; returns the DTZ object
    // *     returns 1: {}

    return new this.DateTimeZone(timezone);
}


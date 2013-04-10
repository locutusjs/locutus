function date_interval_create_from_date_string (time) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: DateInterval
    // *     example 1: date_interval_create_from_date_string('+1 day');
    // *     returns 1: {}

    // Fix: need to check the example above
    return new this.DateInterval(time);
}

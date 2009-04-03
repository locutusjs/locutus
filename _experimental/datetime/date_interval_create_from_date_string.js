function date_interval_create_from_date_string (time) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: date_interval_create_from_date_string('+1 day');
    // *     returns 1: {}

    // Fix: need to check the example above

    function DateInterval (interval_spec) { // string
    }
    DateInterval.prototype = {
        constructor: DateInterval,
        format : function () {
            return '';
        }
    };
    DateInterval.createFromDateString = function (time){ // string (date string with relative parts)
        return new DateInterval(time); // ????
    };

    return DateInterval;
}
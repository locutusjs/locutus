function timezone_name_from_abbr (abbr, gmtOffset, isdst) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: timezone_abbreviations_list
    // *     example 1: timezone_name_from_abbr('CET');
    // *     returns 1: 'Europe/Berlin'
    // *     example 2: timezone_name_from_abbr('', 3600, 0);
    // *     returns 2: 'Europe/London'

    var i = 0, t = '', arr = [];
    if (gmtOffset === undefined || gmtOffset === null || gmtOffset === '') {
        gmtOffset = -1;
    }

    var tal = this.timezone_abbreviations_list();
    if (abbr && tal[abbr.toLowerCase()]) {
        arr = tal[abbr.toLowerCase()];
        if (gmtOffset !== -1) {
            for (i=0; i < arr.length; i++) {
                if (gmtOffset === arr[i].offset) {
                    return arr[i].timezone_id;
                }
            }
        }
        return arr[0].timezone_id;
    } else {
        for (t in tal) {
            for (i=0; i < tal[t].length; i++) {
                if (tal[t][i].offset === gmtOffset && tal[t][i].dst == isdst) {
                    return tal[t][i].timezone_id;
                }
            }
        }
    }
    return false;
}

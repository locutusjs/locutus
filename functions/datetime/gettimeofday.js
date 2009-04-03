function gettimeofday (return_float) {
    // http://kevin.vanzonneveld.net
    // + original by: Brett Zamir (http://brettz9.blogspot.com)
    // +      derived from: Josh Fraser (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/)
    // +         parts by: Breaking Par Consulting Inc (http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7)
    // *     example 1: gettimeofday();
    // *     returns 1: {sec: 12, usec: 153000, minuteswest: -480, dsttime: 0}
    // *     example 1: gettimeofday(true);
    // *     returns 1: 1238748978.49

    var t = new Date(), dst = 0;

    if (return_float) {
        return t.getTime()/1000;
    }

    // Calculate Daylight Saving Time
    var jan1 = new Date(t.getFullYear(), 0, 1, 0, 0, 0, 0);  // jan 1st
    var june1 = new Date(t.getFullYear(), 6, 1, 0, 0, 0, 0); // june 1st
    var temp = jan1.toUTCString();
    var jan2 = new Date(temp.slice(0, temp.lastIndexOf(' ')-1));
    temp = june1.toUTCString();
    var june2 = new Date(temp.slice(0, temp.lastIndexOf(' ')-1));
    var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
    var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);

    if (std_time_offset === daylight_time_offset) {
        dst = 0; // daylight savings time is NOT observed
    }
    else {
        // positive is southern, negative is northern hemisphere
        var hemisphere = std_time_offset - daylight_time_offset;
        if (hemisphere >= 0) {
            std_time_offset = daylight_time_offset;
        }
        dst = 1; // daylight savings time is observed
    }

    return {
        sec : t.getUTCSeconds(),
        usec : t.getUTCMilliseconds()*1000,
        minuteswest : t.getTimezoneOffset(),
        dsttime: dst
    };
}

function date_parse_from_format (format, dateArg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: strtotime
    // -    depends on: date
    // -    depends on: date_parse
    // *     example 1: date_parse_from_format('j.n.Y H:iP', '6.1.2009 13:00+01:00');
    // *     returns 1: {year : 2006, month: 12, day: 12, hour: 10, minute: 0, second: 0, fraction: 0.5, warning_count: 0, warnings: [], error_count: 0, errors: [], is_localtime: false, zone_type: 1, zone: -60, is_dst:false}

    var newtime=0, retObj={};

    var _dst = function (t) {
        // Calculate Daylight Saving Time (derived from gettimeofday() code)
        var dst=0;
        var jan1 = new Date(t.getFullYear(), 0, 1, 0, 0, 0, 0);  // jan 1st
        var june1 = new Date(t.getFullYear(), 6, 1, 0, 0, 0, 0); // june 1st
        var temp = jan1.toUTCString();
        var jan2 = new Date(temp.slice(0, temp.lastIndexOf(' ')-1));
        temp = june1.toUTCString();
        var june2 = new Date(temp.slice(0, temp.lastIndexOf(' ')-1));
        var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
        var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);

        if (std_time_offset === daylight_time_offset) {
            dst = false; // daylight savings time is NOT observed
        }
        else {
            // positive is southern, negative is northern hemisphere
            var hemisphere = std_time_offset - daylight_time_offset;
            if (hemisphere >= 0) {
                std_time_offset = daylight_time_offset;
            }
            dst = true; // daylight savings time is observed
        }
        return dst;
    };

    try {
        newtime = 0; // fix: needs to use format, dateArg to return a time
        retObj = this.date_parse(newtime);
    }
    catch (e) {
        return false; // Presumably returns false, as with date_parse()
    }

    retObj.is_dst = _dst(newtime);

    // Fix: need to add the following as well
    //zone_type: TIMELIB_ZONETYPE_OFFSET 1, TIMELIB_ZONETYPE_ABBR   2, TIMELIB_ZONETYPE_ID     3
    //zone: -60

    return retObj;
}

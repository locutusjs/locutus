function date_parse_from_format (format, dateArg) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// -    depends on: strtotime
	// -    depends on: date
	// -    depends on: date_parse
	// *     example 1: date_parse_from_format('j.n.Y H:iP', '6.1.2009 13:00+01:00');
	// *     returns 1: {year : 2006, month: 12, day: 12, hour: 10, minute: 0, second: 0, fraction: 0.5, warning_count: 0, warnings: [], error_count: 0, errors: [], is_localtime: false, zone_type: 1, zone: -60, is_dst:false}

    var ts=0, newtime=0, retObj={};

    try {
        ts = strtotime(dateArg);
        newtime = strtotime(date(format, ts));
        retObj = date_parse(newtime);
    }
    catch (e) {
        return false; // Presumably returns false, as with date_parse()
    }

    // Fix: need to add the following as well (base on dateArg for zone info, and use newtime for is_dst?)
    //zone_type: TIMELIB_ZONETYPE_OFFSET 1, TIMELIB_ZONETYPE_ABBR   2, TIMELIB_ZONETYPE_ID     3
    //zone: -60
    //is_dst: false
    
    return retObj;
}
function date_sunset (timestamp, format, latitude, longitude, zenith, gmt_offset) {
    // depends on: ini_get

    var calc_sunset = 1; // One part that differs from date_sunrise

    var SUNFUNCS_RET_STRING = 1, SUNFUNCS_RET_TIMESTAMP = 0, SUNFUNCS_RET_DOUBLE = 2;

    format = format || SUNFUNCS_RET_STRING,
        latitude = latitude || this.ini_get("date.default_latitude"),
        longitude = longitude || this.ini_get("date.default_longitude"),
        zenith = zenith || (calc_sunset) ? this.ini_get("date.sunset_zenith") : this.ini_get("date.sunrise_zenith");

    var altitude;
	var h_rise, h_set, n;
	var rise, set, transit;
	var time;
	var rs;
	var t;
	var tzi;
	var retstr;

	if (!arguments.length || arguments.length > 6) {
        // throw "invalid format"; // warning
        return false;
	}

	if (format !== SUNFUNCS_RET_TIMESTAMP &&
		format !== SUNFUNCS_RET_STRING &&
		format !== SUNFUNCS_RET_DOUBLE) {
		// throw "Wrong return format given, pick one of SUNFUNCS_RET_TIMESTAMP, SUNFUNCS_RET_STRING or SUNFUNCS_RET_DOUBLE"; // warning
		return false;
	}
	altitude = 90 - zenith;

	/* Initialize time struct */
	t = timelib_time_ctor();
	tzi = get_timezone_info(TSRMLS_C);
	// t->tz_info = tzi;
	// t->zone_type = TIMELIB_ZONETYPE_ID;

    gmt_offset = gmt_offset || Math.floor(timelib_get_current_offset(t) / 3600);

	timelib_unixtime2local(t, time);
	rs = timelib_astro_rise_set_altitude(t, longitude, latitude, altitude, altitude > -1 ? 1 : 0,
                                                                            h_rise, h_set, rise, set, transit);
	timelib_time_dtor(t);

	if (rs != 0) {
		return false;
	}

	if (format == SUNFUNCS_RET_TIMESTAMP) {
		return Math.floor(calc_sunset ? set : rise);
	}
	n = (calc_sunset ? h_set : h_rise) + gmt_offset;

	if (n > 24 || n < 0) {
		n -= Math.floor(n / 24) * 24;
	}

	switch (format) {
		case SUNFUNCS_RET_STRING:
			retstr = spprintf("%02d:%02d", Math.floor(n), Math.floor(60 * (n - Math.floor(n))));
			return retstr;
		case SUNFUNCS_RET_DOUBLE:
			return n;
	}
    return false; // Shouldn't get here
}

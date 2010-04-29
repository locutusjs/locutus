function localtime_old (timestamp, is_assoc) {
    // http://kevin.vanzonneveld.net
    // + original by: Brett Zamir (http://brett-zamir.me)
    // +      derived from: Josh Fraser (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/)
    // +         parts by: Breaking Par Consulting Inc (http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7)
    // *     example 1: localtime();
    // *     returns 1: [50,28,0,14,2,109,6,73,0]

    if (timestamp === undefined) {
        timestamp = Math.round(new Date().getTime()/1000); // this.time()
    } else if (timestamp instanceof Date) {
        timestamp = timestamp/1000; // Let it work with JavaScript data objects without the need for conversion
    }
    var t = new Date(timestamp*1000);

    // Calculate day of year
    var jan1 = new Date(t.getFullYear(), 0, 1);
    var yday = Math.ceil((t - jan1) / 86400000)-1;

    // Calculate Daylight Saving Time
    jan1 = new Date(t.getFullYear(), 0, 1, 0, 0, 0, 0);  // jan 1st
    var june1 = new Date(t.getFullYear(), 6, 1, 0, 0, 0, 0); // june 1st
    var temp = jan1.toUTCString();
    var jan2 = new Date(temp.slice(0, temp.lastIndexOf(' ')-1));
    temp = june1.toUTCString();
    var june2 = new Date(temp.slice(0, temp.lastIndexOf(' ')-1));
    var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
    var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
    var dst;
    if (std_time_offset === daylight_time_offset) {
        dst = 0; // daylight savings time is NOT observed
    } else {
        // positive is southern, negative is northern hemisphere
        var hemisphere = std_time_offset - daylight_time_offset;
        if (hemisphere >= 0) {
            std_time_offset = daylight_time_offset;
        }
        dst = 1; // daylight savings time is observed
    }

    if (is_assoc) {
        return {
            'tm_sec': t.getSeconds(), // seconds
            'tm_min': t.getMinutes(), // minutes
            'tm_hour': t.getHours(),// hour
            'tm_mday': t.getDate(),// day of the month Months are from 0 (Jan) to 11 (Dec) and days of the week are from 0 (Sun) to 6 (Sat).
            'tm_mon': t.getMonth(),// month of the year, starting with 0 for January
            'tm_year': t.getFullYear()-1900,// Years since 1900
            'tm_wday': t.getDay(),// Day of the week
            'tm_yday': yday,// Day of the year
            'tm_isdst': dst// Is daylight savings time in effect
        };
    }
    return [t.getSeconds(), t.getMinutes(), t.getHours(), t.getDate(), t.getMonth(), t.getFullYear()-1900, t.getDay(), yday, dst];
}


var sys = require('sys'),
	fs = require('fs'),

	src = fs.readFileSync('./localtime.js');

//Script.runInThisContext(src);
eval(src);

var d = new Date(),
	ts = +d;

function test() {
	var args = [].slice.call(arguments),
		resNew = JSON.stringify(localtime.apply(null, args)),
		resOld = JSON.stringify(localtime_old.apply(null, args));
	sys.puts("----- Test:", "new: " + resNew, "old: " + resOld, resNew == resOld ? 'PASS' : 'FAIL', "\n");
}


test();
test(undefined, false);
test(undefined, true);
test(d, false);
test(d, true);
test(ts, false);
test(ts, true);
test(0, false);
test(0, true);

function idate (format, timestamp) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // +   derived from: date
    // +   derived from: gettimeofday
    // *     example 1: idate('y');
    // *     returns 1: 9

    if (format === undefined) {
        throw 'idate() expects at least 1 parameter, 0 given';
    }
    if (!format.length || format.length > 1) {
        throw 'idate format is one char';
    }

    // Fix: Need to allow date_default_timezone_set() (check for this.php_js.default_timezone and use)
    var date = ((typeof(timestamp) === 'undefined') ? new Date() : // Not provided
        (typeof(timestamp) === 'number') ? new Date(timestamp*1000) : // UNIX timestamp
        new Date(timestamp)); // Date() object

    var _L = function (date) {
        var y = date.getFullYear();
        return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0;
    };
    var _z = function (date) {
        return (date - new Date(date.getFullYear() + "/1/1")) / 864e5 >> 0;
    };

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
        return dst;
    };

    switch(format) {
        case 'B':
            // peter paul koch:
            var off = (date.getTimezoneOffset() + 60)*60;
            var theSeconds = (date.getHours() * 3600) +
                             (date.getMinutes() * 60) +
                              date.getSeconds() + off;
            var beat = Math.floor(theSeconds/86.4);
            if (beat > 1000) {beat -= 1000;}
            if (beat < 0) {beat += 1000;}
            if ((String(beat)).length == 1) {beat = '00'+beat;}
            if ((String(beat)).length == 2) {beat = '0'+beat;}
            return beat;
        case 'd':
            return date.getDate();
        case 'h':
            return date.getHours() % 12 || 12;
        case 'H':
            return date.getHours();
        case 'i':
            return date.getMinutes();
        case 'I': // capital 'i'
            return _dst(date);
        case 'L':
            return _L(date);
        case 'm':
            return date.getMonth()+1;
        case 's':
            return date.getSeconds();
        case 't':
            var n;
            if( (n = date.getMonth()+1) === 2 ){
                return 28 + _L(date);
            }
            if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                return 31;
            }
            return 30;
        case 'U':
            return Math.round(date.getTime()/1000);
        case 'w':
            return date.getDay();
        case 'W':
            var a = _z(date), b = 364 + _L(date) - a;
            var nd2, nd = (new Date(date.getFullYear() + '/1/1').getDay() || 7) - 1;

            if(b <= 2 && ((date.getDay() || 7) - 1) <= 2 - b){
                return 1;
            }
            if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                nd2 = new Date(date.getFullYear() - 1 + '/12/31');
                return idate('W', Math.round(nd2.getTime()/1000));
            }
            return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
        case 'y':
            return parseInt((date.getFullYear() + '').slice(2), 10); // This function returns an integer, unlike date()
        case 'Y':
            return date.getFullYear();
        case 'z':
            return _z(date);
        case 'Z':
            return -date.getTimezoneOffset()*60;
        default:
            throw 'Unrecognized date format token';
    }
}
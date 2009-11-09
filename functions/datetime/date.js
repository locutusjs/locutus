function date ( format, timestamp ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: MeEtc (http://yass.meetcweb.com)
    // +   improved by: Brad Touesnard
    // +   improved by: Tim Wiel
    // +   improved by: Bryan Elliott
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: David Randall
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +  derived from: gettimeofday
    // +      input by: majak
    // +   bugfixed by: majak
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Alex
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // %        note 1: Uses global: php_js to store the default timezone
    // *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
    // *     returns 1: '09:09:40 m is month'
    // *     example 2: date('F j, Y, g:i a', 1062462400);
    // *     returns 2: 'September 2, 2003, 2:26 am'
    // *     example 3: date('Y W o', 1062462400);
    // *     returns 3: '2003 36 2003'
    // *     example 4: x = date('Y m d', (new Date()).getTime()/1000); // 2009 01 09
    // *     example 4: (x+'').length == 10
    // *     returns 4: true
    // *     example 5: date('W', 1104534000);
    // *     returns 5: '53'
    // *     example 6: date('B t', 1104534000);
    // *     returns 6: '999 31'
    // *     example 7: date('W', 1293750000); // 2010-12-31
    // *     returns 7: '52'
    // *     example 8: date('W', 1293836400); // 2011-01-01
    // *     returns 8: '52'
    // *     example 9: date('W Y-m-d', 1293974054); // 2011-01-02
    // *     returns 9: '52 2011-01-02'
    
    var that = this;
    var jsdate=(
        (typeof(timestamp) == 'undefined') ? new Date() : // Not provided
        (typeof(timestamp) == 'object') ? new Date(timestamp) : // Javascript Date()
        new Date(timestamp*1000) // UNIX timestamp (auto-convert to int)
    ); // , tal=[]
    var _pad = function (n, c){
        if ( (n = n + "").length < c ) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
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
        } else {
            // positive is southern, negative is northern hemisphere
            var hemisphere = std_time_offset - daylight_time_offset;
            if (hemisphere >= 0) {
                std_time_offset = daylight_time_offset;
            }
            dst = 1; // daylight savings time is observed
        }
        return dst;
    };
    var ret = '';
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];
    var txt_ordin = {1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st"};
    var txt_months =  ["", "January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October", "November",
        "December"];

    var f = {
        // Day
            d: function () {
                return _pad(f.j(), 2);
            },
            D: function () {
                var t = f.l();
                return t.substr(0,3);
            },
            j: function () {
                return jsdate.getDate();
            },
            l: function () {
                return txt_weekdays[f.w()];
            },
            N: function () {
                //return f.w() + 1;
                return f.w() ? f.w() : 7;
            },
            S: function () {
                return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th';
            },
            w: function () {
                return jsdate.getDay();
            },
            z: function () {
                return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0;
            },

        // Week
            W: function () {

                var a = f.z(), b = 364 + f.L() - a;
                var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;

                if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                    return 1;
                } 
                if (a <= 2 && nd >= 4 && a >= (6 - nd)){
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return that.date("W", Math.round(nd2.getTime()/1000));
                }
                
                var w = (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);

                return (w ? w : 53);
            },

        // Month
            F: function () {
                return txt_months[f.n()];
            },
            m: function () {
                return _pad(f.n(), 2);
            },
            M: function () {
                var t = f.F();
                return t.substr(0,3);
            },
            n: function () {
                return jsdate.getMonth() + 1;
            },
            t: function () {
                return (new Date((f.n() + 1) + '/0/' + f.Y())).getDate();
            },

        // Year
            L: function () {
                var y = f.Y();
                return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0;
            },
            o: function () {
                if (f.n() === 12 && f.W() === 1) {
                    return jsdate.getFullYear()+1;
                }
                if (f.n() === 1 && f.W() >= 52) {
                    return jsdate.getFullYear()-1;
                }
                return jsdate.getFullYear();
            },
            Y: function () {
                return jsdate.getFullYear();
            },
            y: function () {
                return (jsdate.getFullYear() + "").slice(2);
            },

        // Time
            a: function () {
                return jsdate.getHours() > 11 ? "pm" : "am";
            },
            A: function () {
                return f.a().toUpperCase();
            },
            B: function () {
                return _pad(Math.floor(((jsdate.getUTCHours() * 36e2) + (jsdate.getUTCMinutes() * 60) + jsdate.getUTCSeconds() + 36e2) / 86.4) % 1e3, 3);
            },
            g: function () {
                return jsdate.getHours() % 12 || 12;
            },
            G: function () {
                return jsdate.getHours();
            },
            h: function () {
                return _pad(f.g(), 2);
            },
            H: function () {
                return _pad(jsdate.getHours(), 2);
            },
            i: function () {
                return _pad(jsdate.getMinutes(), 2);
            },
            s: function () {
                return _pad(jsdate.getSeconds(), 2);
            },
            u: function () {
                return _pad(jsdate.getMilliseconds()*1000, 6);
            },

        // Timezone
            e: function () {
// The following works, but requires inclusion of the very large timezone_abbreviations_list() function
/*                var abbr='', i=0;
                if (this.php_js && this.php_js.default_timezone) {
                    return this.php_js.default_timezone;
                }
                if (!tal.length) {
                    tal = this.timezone_abbreviations_list();
                }
                for (abbr in tal) {
                    for (i=0; i < tal[abbr].length; i++) {
                        if (tal[abbr][i].offset === -jsdate.getTimezoneOffset()*60) {
                            return tal[abbr][i].timezone_id;
                        }
                    }
                }
*/
                return 'UTC';
            },
            I: function () {
                return _dst(jsdate);
            },
            O: function () {
               var t = _pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
               t = (jsdate.getTimezoneOffset() > 0) ? "-"+t : "+"+t;
               return t;
            },
            P: function () {
                var O = f.O();
                return (O.substr(0, 3) + ":" + O.substr(3, 2));
            },
            T: function () {

// The following works, but requires inclusion of the very large timezone_abbreviations_list() function
/*                var abbr='', i=0;
                if (!tal.length) {
                    tal = that.timezone_abbreviations_list();
                }
                if (this.php_js && this.php_js.default_timezone) {
                    for (abbr in tal) {
                        for (i=0; i < tal[abbr].length; i++) {
                            if (tal[abbr][i].timezone_id === this.php_js.default_timezone) {
                                return abbr.toUpperCase();
                            }
                        }
                    }
                }
                for (abbr in tal) {
                    for (i=0; i < tal[abbr].length; i++) {
                        if (tal[abbr][i].offset === -jsdate.getTimezoneOffset()*60) {
                            return abbr.toUpperCase();
                        }
                    }
                }
*/
                return 'UTC';
            },
            Z: function () {
               return -jsdate.getTimezoneOffset()*60;
            },

        // Full Date/Time
            c: function () {
                return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P();
            },
            r: function () {
                return f.D()+', '+f.d()+' '+f.M()+' '+f.Y()+' '+f.H()+':'+f.i()+':'+f.s()+' '+f.O();
            },
            U: function () {
                return Math.round(jsdate.getTime()/1000);
            }
    };

    return format.replace(/[\\]?([a-zA-Z])/g, function (t, s){
        if ( t!=s ){
            // escaped
            ret = s;
        } else if (f[s]){
            // a date function exists
            ret = f[s]();
        } else {
            // nothing special
            ret = s;
        }
        return ret;
    });
}
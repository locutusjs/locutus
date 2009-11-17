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
    // +   improved by: Brett Zamir (http://brett-zamir.me)
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

    var that = this,
        jsdate = (
        (typeof timestamp === 'undefined') ? new Date() : // Not provided
        (timestamp instanceof Date) ? new Date(timestamp) : // Javascript Date()
        new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    ), //, tal= [], // Keep this here (works, but for code commented-out below for file size reasons)
        formatChr = /\\?([a-z])/gi,
        formatChrCb = function (t, s) {
            return f[t] ? f[t]() : s;
        },
        _pad = function (n, c) {
            if ((n = n + "").length < c) {
                return new Array((++c) - n.length).join("0") + n;
            } else {
                return n;
            }
        },
        txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur",
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"],
        txt_ordin = {1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st"},
        f = {
        // Day
            d: function () {
                return _pad(f.j(), 2);
            },
            D: function () {
                return f.l().slice(0, 3);
            },
            j: function () {
                return jsdate.getDate();
            },
            l: function () {
                return txt_words[f.w()] + 'day';
            },
            N: function () {
                return f.w() || 7;
            },
            S: function () {
                return txt_ordin[f.j()] || 'th';
            },
            w: function () {
                return jsdate.getDay();
            },
            z: function () {
                return (jsdate - new Date(f.Y(), 0, 1)) / 864e5 >> 0;
            },

        // Week
            W: function () {
                var c = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
                return 1 + Math.round((c - (new Date(c.getFullYear(), 0, 4))) / 864e5 / 7);
            },

        // Month
            F: function () {
                return txt_words[6 + f.n()];
            },
            m: function () {
                return _pad(f.n(), 2);
            },
            M: function () {
                return f.F().slice(0, 3);
            },
            n: function () {
                return jsdate.getMonth() + 1;
            },
            t: function () {
                return (new Date(f.Y(), f.n() + 1, 0)).getDate();
            },

        // Year
            L: function () {
                var y = f.Y();
                return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0;
            },
            o: function () {
                return f.Y() + (f.n() === 12 && f.W() < 9 ? -1 : (f.n() === 1 && f.W() > 9 ? 1 : 0));
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
                return _pad(Math.floor(((jsdate.getUTCHours() * 36e2) + (jsdate.getUTCMinutes() * 60) +
                                        jsdate.getUTCSeconds() + 36e2) / 86.4) % 1e3, 3);
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
                return _pad(f.G(), 2);
            },
            i: function () {
                return _pad(jsdate.getMinutes(), 2);
            },
            s: function () {
                return _pad(jsdate.getSeconds(), 2);
            },
            u: function () {
                return _pad(jsdate.getMilliseconds() * 1000, 6);
            },

        // Timezone
            e: function () {
// The following works, but requires inclusion of the very large timezone_abbreviations_list() function
/*                var abbr='', i=0;
                if (that.php_js && that.php_js.default_timezone) {
                    return that.php_js.default_timezone;
                }
                if (!tal.length) {
                    tal = that.timezone_abbreviations_list();
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
                // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
                // If they are not equal, then DST is observed.
                return 0 + (((new Date(f.Y(), 0)) - Date.UTC(f.Y(), 0)) !== ((new Date(f.Y(), 6)) - Date.UTC(f.Y(), 6)));
            },
            O: function () {
                var a = jsdate.getTimezoneOffset();
                return (a > 0 ? "-" : "+") + _pad(Math.abs(a / 60 * 100), 4);
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
                if (that.php_js && that.php_js.default_timezone) {
                    for (abbr in tal) {
                        for (i=0; i < tal[abbr].length; i++) {
                            if (tal[abbr][i].timezone_id === that.php_js.default_timezone) {
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
                return -jsdate.getTimezoneOffset() * 60;
            },

        // Full Date/Time
            c: function () {
                return 'Y-m-d\\Th:i:sP'.replace(formatChr, formatChrCb);
            },
            r: function () {
                return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
            },
            U: function () {
                return Math.round(jsdate.getTime() / 1000);
            }
        };
    return format.replace(formatChr, formatChrCb);
}
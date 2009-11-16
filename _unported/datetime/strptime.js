function strptime (fmt, timestamp) {
    // http://kevin.vanzonneveld.net
    // +      original by: Brett Zamir (http://brett-zamir.me)
    // -       depends on: setlocale
    // *        example 1: strptime('20091112222135', '%Y%m%d%H%M%S'); // Return value will depend on date and locale
    // *        returns 1: {tm_sec: 35, tm_min: 21, tm_hour: 22, tm_mday: 12, tm_mon: 10, tm_year: 109, tm_wday: 4, tm_yday: 315, unparsed: ''}

// PHP largely uses the C function, so check that for docs

    var retObj = {};

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT
    var phpjs = this.php_js;

    // BEGIN STATIC
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    var _xPad = function (x, pad, r) {
        if (typeof r === 'undefined') {
            r=10;
        }
        for ( ; parseInt(x, 10)<r && r>1; r/=10) {
            x = pad.toString() + x;
        }
        return x.toString();
    };

    var locale = phpjs.localeCategories.LC_TIME;
    var locales = phpjs.locales;

    var _formats = {
        a: function (d) {
            var match = locales[locale].LC_TIME.a.match(new RegExp('^'+esc(d)));
            if (match) { // Change case for check?
                retObj.tm_wday = match[0];
                idx += match[0].length;
            }
            // else unparsed?
        },
        A: function (d) { // tm_wday
            return locales[locale].LC_TIME.A[d.getDay()];
        },
        b: function (d) { // tm_mon
            return locales[locale].LC_TIME.b[d.getMonth()];
        },
        B: function (d) { // tm_mon
            return locales[locale].LC_TIME.B[d.getMonth()];
        },
        C: function (d) { // Not sufficient
            return _xPad(parseInt(d.getFullYear()/100, 10), 0);
        },
        d: ['getDate', '0'], // tm_mday
        e: ['getDate', ' '], // tm_mday
        g: function (d) { // tm_year
            return _xPad(parseInt(this.G(d)/100, 10), 0);
        },
        G: function (d) { // tm_year
            var y = d.getFullYear();
            var V = parseInt(_formats.V(d), 10);
            var W = parseInt(_formats.W(d), 10);

            if (W > V) {
                y++;
            }
            else if (W === 0 && V >= 52) {
                y--;
            }

            return y;
        },
        //  h: // tm_mon
        H: ['getHours', '0'], // tm_hour
        I: function (d) { // tm_hour
            var I=d.getHours()%12; return _xPad(I===0?12:I, 0);
        },
        j: function (d) { // tm_yday // tm_mday? (as with week number (%U|V|W)+weekday (%a|A|u|w))
            var ms = d - new Date('' + d.getFullYear() + '/1/1 GMT');
            ms += d.getTimezoneOffset()*60000;
            var doy = parseInt(ms/60000/60/24, 10)+1;
            return _xPad(doy, 0, 100);
        },
        l: function (d) { // tm_hour
            var l=d.getHours()%12; return _xPad(l===0?12:l, ' ');
        },
        m: function (d) { // tm_mon
            return _xPad(d.getMonth()+1, 0);
        },
        M: ['getMinutes', '0'], // tm_min
        p: function (d) { // Not sufficient
            return locales[locale].LC_TIME.p[d.getHours() >= 12 ? 1 : 0 ];
        },
        P: function (d) { // Not sufficient
            return locales[locale].LC_TIME.P[d.getHours() >= 12 ? 1 : 0 ];
        },
        s: function (d) { // get all tm_
            return Date.parse(d)/1000;
        },
        S: ['getSeconds', '0'], // tm_sec
        u: function (d) { // tm_wday
            var dow = d.getDay(); return ( (dow===0) ? 7 : dow );
        },
        U: function (d) { // use with 'j'?
            var doy = parseInt(_formats.j(d), 10);
            var rdow = 6-d.getDay();
            var woy = parseInt((doy+rdow)/7, 10);
            return _xPad(woy, 0);
        },
        V: function (d) { // use with 'j'?
            var woy = parseInt(_formats.W(d), 10);
            var dow1_1 = (new Date('' + d.getFullYear() + '/1/1')).getDay();
            // First week is 01 and not 00 as in the case of %U and %W,
            // so we add 1 to the final result except if day 1 of the year
            // is a Monday (then %W returns 01).
            // We also need to subtract 1 if the day 1 of the year is
            // Friday-Sunday, so the resulting equation becomes:
            var idow = woy + (dow1_1 > 4 || dow1_1 <= 1 ? 0 : 1);
            if (idow === 53 && (new Date('' + d.getFullYear() + '/12/31')).getDay() < 4) {
                idow = 1;
            }
            else if (idow === 0) {
                idow = _formats.V(new Date('' + (d.getFullYear()-1) + '/12/31'));
            }
            return _xPad(idow, 0);
        },
        w: 'getDay', // tm_wday
        W: function (d) { // use with 'j'?
            var doy = parseInt(_formats.j(d), 10);
            var rdow = 7-_formats.u(d);
            var woy = parseInt((doy+rdow)/7, 10);
            return _xPad(woy, 0, 10);
        },
        y: function (d) { // tm_year
            return _xPad(d.getFullYear()%100, 0);
        },
        Y: 'getFullYear', // tm_year
        z: function (d) {
            var o = d.getTimezoneOffset();
            var H = _xPad(parseInt(Math.abs(o/60), 10), 0);
            var M = _xPad(o%60, 0);
            return (o>0?'-':'+') + H + M;
        },
        Z: function (d) { // Not sufficient
            return d.toString().replace(/^.*\(([^)]+)\)$/, '$1');
        },
        '%': function (d) {
            return '%';
        }
    };
    // END STATIC

    var _aggregates = {
        c: 'locale',
        D: '%m/%d/%y',
        F: '%y-%m-%d',
        h: '%b',
        n: '\n',
        r: 'locale',
        R: '%H:%M',
        t: '\t',
        T: '%H:%M:%S',
        x: 'locale',
        X: 'locale'
    };


    // First replace aggregates (run in a loop because an agg may be made up of other aggs)
    while (fmt.match(/%[cDFhnrRtTxX]/)) {
        fmt = fmt.replace(/%([cDFhnrRtTxX])/g, function (m0, m1)
        {
            var f = _aggregates[m1];
            return (f === 'locale' ? locales[locale].LC_TIME[m1] : f);
        });
    }

    // Now replace formats - we need a closure so that the date object gets passed through
    var str = fmt.replace(/%([aAbBCdegGHIjlmMpPsSuUVwWyYzZ%])/g, function (m0, m1) {
        var f = _formats[m1];
        if (typeof f === 'string') {
            return _date[f]();
        } else if (typeof f === 'function') {
            return f(_date);
        } else if (typeof f === 'object' && typeof (f[0]) === 'string') {
            return _xPad(_date[f[0]](), f[1]);
        } else { // Shouldn't reach here
            return m1;
        }
    });
    return str;
}

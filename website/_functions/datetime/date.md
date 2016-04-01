---
examples:
  - - "date('H:m:s \\\\m \\\\i\\\\s \\\\m\\\\o\\\\n\\\\t\\\\h', 1062402400);"
  - - "date('F j, Y, g:i a', 1062462400);"
  - - "date('Y W o', 1062462400);"
  - - "x = date('Y m d', (new Date()).getTime()/1000);"
    - "(x+'').length == 10 // 2009 01 09"
  - - "date('W', 1104534000);"
  - - "date('B t', 1104534000);"
  - - "date('W U', 1293750000.82); // 2010-12-31"
  - - "date('W', 1293836400); // 2011-01-01"
  - - "date('W Y-m-d', 1293974054); // 2011-01-02"
returns:
  - - "'09:09:40 m is month'"
  - - "'September 2, 2003, 2:26 am'"
  - - "'2003 36 2003'"
  - - 'true'
  - - "'53'"
  - - "'999 31'"
  - - "'52 1293750000'"
  - - "'52'"
  - - "'52 2011-01-02'"
authors:
  original by:
    - 'Carlos R. L. Rodrigues (http://www.jsfromhell.com)'
    - gettimeofday
  improved by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - 'MeEtc (http://yass.meetcweb.com)'
    - Brad Touesnard
    - Tim Wiel
    - Bryan Elliott
    - David Randall
    - Theriault
    - Theriault
    - 'Brett Zamir (http://brett-zamir.me)'
    - Theriault
    - 'Thomas Beaucourt (http://www.webapp.fr)'
    - JT
    - Theriault
    - 'Rafał Kukawski (http://blog.kukawski.pl)'
    - Theriault
  bugfixed by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - majak
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - 'Brett Zamir (http://brett-zamir.me)'
    - 'omid (http://phpjs.org/functions/380:380#comment_137122)'
    - 'Chris (http://www.devotis.nl/)'
  input by:
    - 'Brett Zamir (http://brett-zamir.me)'
    - majak
    - Alex
    - Martin
    - Alex Wilson
    - Haravikk
notes: []
layout: function
function: date
category: datetime
code: "function date (format, timestamp) {\n  //  discuss at: http://phpjs.org/functions/date/\n  // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)\n  // original by: gettimeofday\n  //    parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)\n  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // improved by: MeEtc (http://yass.meetcweb.com)\n  // improved by: Brad Touesnard\n  // improved by: Tim Wiel\n  // improved by: Bryan Elliott\n  // improved by: David Randall\n  // improved by: Theriault\n  // improved by: Theriault\n  // improved by: Brett Zamir (http://brett-zamir.me)\n  // improved by: Theriault\n  // improved by: Thomas Beaucourt (http://www.webapp.fr)\n  // improved by: JT\n  // improved by: Theriault\n  // improved by: Rafał Kukawski (http://blog.kukawski.pl)\n  // improved by: Theriault\n  //    input by: Brett Zamir (http://brett-zamir.me)\n  //    input by: majak\n  //    input by: Alex\n  //    input by: Martin\n  //    input by: Alex Wilson\n  //    input by: Haravikk\n  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // bugfixed by: majak\n  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  // bugfixed by: Brett Zamir (http://brett-zamir.me)\n  // bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)\n  // bugfixed by: Chris (http://www.devotis.nl/)\n  //        note: Uses global: php_js to store the default timezone\n  //        note: Although the function potentially allows timezone info (see notes), it currently does not set\n  //        note: per a timezone specified by date_default_timezone_set(). Implementers might use\n  //        note: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function\n  //        note: in order to adjust the dates in this function (or our other date functions!) accordingly\n  //   example 1: date('H:m:s \\\\m \\\\i\\\\s \\\\m\\\\o\\\\n\\\\t\\\\h', 1062402400);\n  //   returns 1: '09:09:40 m is month'\n  //   example 2: date('F j, Y, g:i a', 1062462400);\n  //   returns 2: 'September 2, 2003, 2:26 am'\n  //   example 3: date('Y W o', 1062462400);\n  //   returns 3: '2003 36 2003'\n  //   example 4: x = date('Y m d', (new Date()).getTime()/1000);\n  //   example 4: (x+'').length == 10 // 2009 01 09\n  //   returns 4: true\n  //   example 5: date('W', 1104534000);\n  //   returns 5: '53'\n  //   example 6: date('B t', 1104534000);\n  //   returns 6: '999 31'\n  //   example 7: date('W U', 1293750000.82); // 2010-12-31\n  //   returns 7: '52 1293750000'\n  //   example 8: date('W', 1293836400); // 2011-01-01\n  //   returns 8: '52'\n  //   example 9: date('W Y-m-d', 1293974054); // 2011-01-02\n  //   returns 9: '52 2011-01-02'\n\n  var that = this\n  var jsdate, f\n  // Keep this here (works, but for code commented-out below for file size reasons)\n  // var tal= [];\n  var txt_words = [\n    'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',\n    'January', 'February', 'March', 'April', 'May', 'June',\n    'July', 'August', 'September', 'October', 'November', 'December'\n  ]\n  // trailing backslash -> (dropped)\n  // a backslash followed by any character (including backslash) -> the character\n  // empty string -> empty string\n  var formatChr = /\\\\?(.?)/gi\n  var formatChrCb = function (t, s) {\n    return f[t] ? f[t]() : s\n  }\n  var _pad = function (n, c) {\n    n = String(n)\n    while (n.length < c) {\n      n = '0' + n\n    }\n    return n\n  }\n  f = {\n    // Day\n    d: function () {\n      // Day of month w/leading 0; 01..31\n      return _pad(f.j(), 2)\n    },\n    D: function () {\n      // Shorthand day name; Mon...Sun\n      return f.l()\n        .slice(0, 3)\n    },\n    j: function () {\n      // Day of month; 1..31\n      return jsdate.getDate()\n    },\n    l: function () {\n      // Full day name; Monday...Sunday\n      return txt_words[f.w()] + 'day'\n    },\n    N: function () {\n      // ISO-8601 day of week; 1[Mon]..7[Sun]\n      return f.w() || 7\n    },\n    S: function () {\n      // Ordinal suffix for day of month; st, nd, rd, th\n      var j = f.j()\n      var i = j % 10\n      if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {\n        i = 0\n      }\n      return ['st', 'nd', 'rd'][i - 1] || 'th'\n    },\n    w: function () {\n      // Day of week; 0[Sun]..6[Sat]\n      return jsdate.getDay()\n    },\n    z: function () {\n      // Day of year; 0..365\n      var a = new Date(f.Y(), f.n() - 1, f.j())\n      var b = new Date(f.Y(), 0, 1)\n      return Math.round((a - b) / 864e5)\n    },\n\n    // Week\n    W: function () {\n      // ISO-8601 week number\n      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3)\n      var b = new Date(a.getFullYear(), 0, 4)\n      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2)\n    },\n\n    // Month\n    F: function () {\n      // Full month name; January...December\n      return txt_words[6 + f.n()]\n    },\n    m: function () {\n      // Month w/leading 0; 01...12\n      return _pad(f.n(), 2)\n    },\n    M: function () {\n      // Shorthand month name; Jan...Dec\n      return f.F()\n        .slice(0, 3)\n    },\n    n: function () {\n      // Month; 1...12\n      return jsdate.getMonth() + 1\n    },\n    t: function () {\n      // Days in month; 28...31\n      return (new Date(f.Y(), f.n(), 0))\n        .getDate()\n    },\n\n    // Year\n    L: function () {\n      // Is leap year?; 0 or 1\n      var j = f.Y()\n      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0\n    },\n    o: function () {\n      // ISO-8601 year\n      var n = f.n()\n      var W = f.W()\n      var Y = f.Y()\n      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0)\n    },\n    Y: function () {\n      // Full year; e.g. 1980...2010\n      return jsdate.getFullYear()\n    },\n    y: function () {\n      // Last two digits of year; 00...99\n      return f.Y()\n        .toString()\n        .slice(-2)\n    },\n\n    // Time\n    a: function () {\n      // am or pm\n      return jsdate.getHours() > 11 ? 'pm' : 'am'\n    },\n    A: function () {\n      // AM or PM\n      return f.a()\n        .toUpperCase()\n    },\n    B: function () {\n      // Swatch Internet time; 000..999\n      var H = jsdate.getUTCHours() * 36e2\n      // Hours\n      var i = jsdate.getUTCMinutes() * 60\n      // Minutes\n      // Seconds\n      var s = jsdate.getUTCSeconds()\n      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3)\n    },\n    g: function () {\n      // 12-Hours; 1..12\n      return f.G() % 12 || 12\n    },\n    G: function () {\n      // 24-Hours; 0..23\n      return jsdate.getHours()\n    },\n    h: function () {\n      // 12-Hours w/leading 0; 01..12\n      return _pad(f.g(), 2)\n    },\n    H: function () {\n      // 24-Hours w/leading 0; 00..23\n      return _pad(f.G(), 2)\n    },\n    i: function () {\n      // Minutes w/leading 0; 00..59\n      return _pad(jsdate.getMinutes(), 2)\n    },\n    s: function () {\n      // Seconds w/leading 0; 00..59\n      return _pad(jsdate.getSeconds(), 2)\n    },\n    u: function () {\n      // Microseconds; 000000-999000\n      return _pad(jsdate.getMilliseconds() * 1000, 6)\n    },\n\n    // Timezone\n    e: function () {\n      // Timezone identifier; e.g. Atlantic/Azores, ...\n      // The following works, but requires inclusion of the very large\n      // timezone_abbreviations_list() function.\n      /*              return that.date_default_timezone_get();\n       */\n      throw 'Not supported (see source code of date() for timezone on how to add support)'\n    },\n    I: function () {\n      // DST observed?; 0 or 1\n      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.\n      // If they are not equal, then DST is observed.\n      var a = new Date(f.Y(), 0)\n      // Jan 1\n      var c = Date.UTC(f.Y(), 0)\n      // Jan 1 UTC\n      var b = new Date(f.Y(), 6)\n      // Jul 1\n      // Jul 1 UTC\n      var d = Date.UTC(f.Y(), 6)\n      return ((a - c) !== (b - d)) ? 1 : 0\n    },\n    O: function () {\n      // Difference to GMT in hour format; e.g. +0200\n      var tzo = jsdate.getTimezoneOffset()\n      var a = Math.abs(tzo)\n      return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4)\n    },\n    P: function () {\n      // Difference to GMT w/colon; e.g. +02:00\n      var O = f.O()\n      return (O.substr(0, 3) + ':' + O.substr(3, 2))\n    },\n    T: function () {\n      // Timezone abbreviation; e.g. EST, MDT, ...\n      // The following works, but requires inclusion of the very\n      // large timezone_abbreviations_list() function.\n      /*              var abbr, i, os, _default;\n      if (!tal.length) {\n        tal = that.timezone_abbreviations_list();\n      }\n      if (that.php_js && that.php_js.default_timezone) {\n        _default = that.php_js.default_timezone;\n        for (abbr in tal) {\n          for (i = 0; i < tal[abbr].length; i++) {\n            if (tal[abbr][i].timezone_id === _default) {\n              return abbr.toUpperCase();\n            }\n          }\n        }\n      }\n      for (abbr in tal) {\n        for (i = 0; i < tal[abbr].length; i++) {\n          os = -jsdate.getTimezoneOffset() * 60;\n          if (tal[abbr][i].offset === os) {\n            return abbr.toUpperCase();\n          }\n        }\n      }\n      */\n      return 'UTC'\n    },\n    Z: function () {\n      // Timezone offset in seconds (-43200...50400)\n      return -jsdate.getTimezoneOffset() * 60\n    },\n\n    // Full Date/Time\n    c: function () {\n      // ISO-8601 date.\n      return 'Y-m-d\\\\TH:i:sP'.replace(formatChr, formatChrCb)\n    },\n    r: function () {\n      // RFC 2822\n      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb)\n    },\n    U: function () {\n      // Seconds since UNIX epoch\n      return jsdate / 1000 | 0\n    }\n  }\n  this.date = function (format, timestamp) {\n    that = this\n    jsdate = (timestamp === undefined ? new Date() : // Not provided\n      (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()\n      new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)\n    )\n    return format.replace(formatChr, formatChrCb)\n  }\n  return this.date(format, timestamp)\n}\n"
permalink: /functions/date/
redirect_from:
  - /functions/datetime/date/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->

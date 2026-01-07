module.exports = function strftime(fmt, timestamp) {
  //       discuss at: https://locutus.io/php/strftime/
  //      original by: Blues (https://tech.bluesmoon.info/)
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //         input by: Alex
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  //      improved by: Brett Zamir (https://brett-zamir.me)
  //           note 1: Uses global: locutus to store locale info
  //        example 1: strftime("%A", 1062462400); // Return value will depend on date and locale
  //        returns 1: 'Tuesday'
  //      bugfixed by: Markus Marchewa
  //        example 2: strftime('%F', 1577836800);
  //        returns 2: '2020-01-01'
  //        example 3: (() => {let e = process.env, tz = e.TZ; e.TZ = 'Europe/Vienna'; let r = strftime('%j', 1680307200); e.TZ = tz; return r;})();
  //        returns 3: '091'

  const setlocale = require('../strings/setlocale')

  const $global = typeof window !== 'undefined' ? window : global
  $global.$locutus = $global.$locutus || {}
  const $locutus = $global.$locutus

  // ensure setup of localization variables takes place
  setlocale('LC_ALL', 0)

  const _xPad = function (x, pad, r) {
    if (typeof r === 'undefined') {
      r = 10
    }
    for (; parseInt(x, 10) < r && r > 1; r /= 10) {
      x = pad.toString() + x
    }
    return x.toString()
  }

  const locale = $locutus.php.localeCategories.LC_TIME
  const lcTime = $locutus.php.locales[locale].LC_TIME

  const _formats = {
    a: function (d) {
      return lcTime.a[d.getDay()]
    },
    A: function (d) {
      return lcTime.A[d.getDay()]
    },
    b: function (d) {
      return lcTime.b[d.getMonth()]
    },
    B: function (d) {
      return lcTime.B[d.getMonth()]
    },
    C: function (d) {
      return _xPad(parseInt(d.getFullYear() / 100, 10), 0)
    },
    d: ['getDate', '0'],
    e: ['getDate', ' '],
    g: function (d) {
      return _xPad(parseInt(this.G(d) / 100, 10), 0)
    },
    G: function (d) {
      let y = d.getFullYear()
      const V = parseInt(_formats.V(d), 10)
      const W = parseInt(_formats.W(d), 10)

      if (W > V) {
        y++
      } else if (W === 0 && V >= 52) {
        y--
      }

      return y
    },
    H: ['getHours', '0'],
    I: function (d) {
      const I = d.getHours() % 12
      return _xPad(I === 0 ? 12 : I, 0)
    },
    j: function (d) {
      // calculate the difference between the given date and the start of the year (in localtime), DST shifts may lead
      // to deltas less than multiples of 24 hours (the day when DST starts has just 23 hours), compensate by adding
      // the difference between timezone offsets (subtract since values are negative for positive offsets), e.g.:
      // 2020-05-01 00:00:00 CEST, timezone +0200, offset -120
      // 2020-01-01 00:00:00 CET , timezone +0100, offset  -60
      const b = new Date(d.getFullYear(), 0)
      const ms = d - b - (d.getTimezoneOffset() - b.getTimezoneOffset()) * 60000
      const doy = parseInt(ms / 60000 / 60 / 24, 10) + 1
      return _xPad(doy, 0, 100)
    },
    k: ['getHours', '0'],
    // not in PHP, but implemented here (as in Yahoo)
    l: function (d) {
      const l = d.getHours() % 12
      return _xPad(l === 0 ? 12 : l, ' ')
    },
    m: function (d) {
      return _xPad(d.getMonth() + 1, 0)
    },
    M: ['getMinutes', '0'],
    p: function (d) {
      return lcTime.p[d.getHours() >= 12 ? 1 : 0]
    },
    P: function (d) {
      return lcTime.P[d.getHours() >= 12 ? 1 : 0]
    },
    s: function (d) {
      // Yahoo uses return parseInt(d.getTime()/1000, 10);
      return Date.parse(d) / 1000
    },
    S: ['getSeconds', '0'],
    u: function (d) {
      const dow = d.getDay()
      return dow === 0 ? 7 : dow
    },
    U: function (d) {
      const doy = parseInt(_formats.j(d), 10)
      const rdow = 6 - d.getDay()
      const woy = parseInt((doy + rdow) / 7, 10)
      return _xPad(woy, 0)
    },
    V: function (d) {
      const woy = parseInt(_formats.W(d), 10)
      const dow11 = new Date('' + d.getFullYear() + '/1/1').getDay()
      // First week is 01 and not 00 as in the case of %U and %W,
      // so we add 1 to the final result except if day 1 of the year
      // is a Monday (then %W returns 01).
      // We also need to subtract 1 if the day 1 of the year is
      // Friday-Sunday, so the resulting equation becomes:
      let idow = woy + (dow11 > 4 || dow11 <= 1 ? 0 : 1)
      if (idow === 53 && new Date('' + d.getFullYear() + '/12/31').getDay() < 4) {
        idow = 1
      } else if (idow === 0) {
        idow = _formats.V(new Date('' + (d.getFullYear() - 1) + '/12/31'))
      }
      return _xPad(idow, 0)
    },
    w: 'getDay',
    W: function (d) {
      const doy = parseInt(_formats.j(d), 10)
      const rdow = 7 - _formats.u(d)
      const woy = parseInt((doy + rdow) / 7, 10)
      return _xPad(woy, 0, 10)
    },
    y: function (d) {
      return _xPad(d.getFullYear() % 100, 0)
    },
    Y: 'getFullYear',
    z: function (d) {
      const o = d.getTimezoneOffset()
      const H = _xPad(parseInt(Math.abs(o / 60), 10), 0)
      const M = _xPad(o % 60, 0)
      return (o > 0 ? '-' : '+') + H + M
    },
    Z: function (d) {
      return d.toString().replace(/^.*\(([^)]+)\)$/, '$1')
    },
    '%': function (d) {
      return '%'
    },
  }

  const _date =
    typeof timestamp === 'undefined'
      ? new Date()
      : timestamp instanceof Date
        ? new Date(timestamp)
        : new Date(timestamp * 1000)

  const _aggregates = {
    c: 'locale',
    D: '%m/%d/%y',
    F: '%Y-%m-%d',
    h: '%b',
    n: '\n',
    r: 'locale',
    R: '%H:%M',
    t: '\t',
    T: '%H:%M:%S',
    x: 'locale',
    X: 'locale',
  }

  // First replace aggregates (run in a loop because an agg may be made up of other aggs)
  while (fmt.match(/%[cDFhnrRtTxX]/)) {
    fmt = fmt.replace(/%([cDFhnrRtTxX])/g, function (m0, m1) {
      const f = _aggregates[m1]
      return f === 'locale' ? lcTime[m1] : f
    })
  }

  // Now replace formats - we need a closure so that the date object gets passed through
  const str = fmt.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, function (m0, m1) {
    const f = _formats[m1]
    if (typeof f === 'string') {
      return _date[f]()
    } else if (typeof f === 'function') {
      return f(_date)
    } else if (typeof f === 'object' && typeof f[0] === 'string') {
      return _xPad(_date[f[0]](), f[1])
    } else {
      // Shouldn't reach here
      return m1
    }
  })

  return str
}

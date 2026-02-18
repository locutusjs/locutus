import { setlocale } from '../strings/setlocale.ts'

type LcTime = {
  a: string[]
  A: string[]
  b: string[]
  B: string[]
  p: string[]
  P: string[]
  c: string
  r: string
  x: string
  X: string
  [key: string]: string | string[] | undefined
}

type PhpContext = {
  locales?: Record<string, { LC_TIME?: LcTime }>
  localeCategories?: { LC_TIME?: string }
}

type GlobalWithLocutus = typeof globalThis & { $locutus?: { php?: PhpContext } }

type DateGetterMethod = 'getDate' | 'getHours' | 'getMinutes' | 'getSeconds' | 'getDay' | 'getFullYear'
type FormatEntry = DateGetterMethod | ((d: Date) => string | number) | [DateGetterMethod, string | number]

export function strftime(fmt: string, timestamp?: Date | number | string): string {
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

  const globalContext = globalThis as GlobalWithLocutus
  globalContext.$locutus = globalContext.$locutus ?? {}
  const locutus = globalContext.$locutus
  locutus.php = locutus.php ?? {}
  const php = locutus.php

  // ensure setup of localization variables takes place
  setlocale('LC_ALL', 0)

  const _xPad = function (x: number | string, pad: number | string, r = 10): string {
    for (; Number.parseInt(String(x), 10) < r && r > 1; r /= 10) {
      x = String(pad) + x
    }
    return String(x)
  }

  const locale = php.localeCategories?.LC_TIME
  const lcTime = locale ? php.locales?.[locale]?.LC_TIME : undefined
  if (!lcTime) {
    return ''
  }

  const formats: Record<string, FormatEntry> = {
    a: function (d: Date) {
      return lcTime.a[d.getDay()] ?? ''
    },
    A: function (d: Date) {
      return lcTime.A[d.getDay()] ?? ''
    },
    b: function (d: Date) {
      return lcTime.b[d.getMonth()] ?? ''
    },
    B: function (d: Date) {
      return lcTime.B[d.getMonth()] ?? ''
    },
    C: function (d: Date) {
      return _xPad(Number.parseInt(String(d.getFullYear() / 100), 10), 0)
    },
    d: ['getDate', '0'],
    e: ['getDate', ' '],
    g: function (d: Date) {
      const formatG = formats.G
      const isoYear = typeof formatG === 'function' ? Number(formatG(d)) : d.getFullYear()
      return _xPad(Number.parseInt(String(isoYear / 100), 10), 0)
    },
    G: function (d: Date) {
      let y = d.getFullYear()
      const formatV = formats.V
      const formatW = formats.W
      const V = typeof formatV === 'function' ? Number.parseInt(String(formatV(d)), 10) : 0
      const W = typeof formatW === 'function' ? Number.parseInt(String(formatW(d)), 10) : 0

      if (W > V) {
        y++
      } else if (W === 0 && V >= 52) {
        y--
      }

      return y
    },
    H: ['getHours', '0'],
    I: function (d: Date) {
      const I = d.getHours() % 12
      return _xPad(I === 0 ? 12 : I, 0)
    },
    j: function (d: Date) {
      // calculate the difference between the given date and the start of the year (in localtime), DST shifts may lead
      // to deltas less than multiples of 24 hours (the day when DST starts has just 23 hours), compensate by adding
      // the difference between timezone offsets (subtract since values are negative for positive offsets), e.g.:
      // 2020-05-01 00:00:00 CEST, timezone +0200, offset -120
      // 2020-01-01 00:00:00 CET , timezone +0100, offset  -60
      const b = new Date(d.getFullYear(), 0)
      const ms = d.getTime() - b.getTime() - (d.getTimezoneOffset() - b.getTimezoneOffset()) * 60000
      const doy = Number.parseInt(String(ms / 60000 / 60 / 24), 10) + 1
      return _xPad(doy, 0, 100)
    },
    k: ['getHours', '0'],
    // not in PHP, but implemented here (as in Yahoo)
    l: function (d: Date) {
      const l = d.getHours() % 12
      return _xPad(l === 0 ? 12 : l, ' ')
    },
    m: function (d: Date) {
      return _xPad(d.getMonth() + 1, 0)
    },
    M: ['getMinutes', '0'],
    p: function (d: Date) {
      return lcTime.p[d.getHours() >= 12 ? 1 : 0] ?? ''
    },
    P: function (d: Date) {
      return lcTime.P[d.getHours() >= 12 ? 1 : 0] ?? ''
    },
    s: function (d: Date) {
      // Yahoo uses return parseInt(d.getTime()/1000, 10);
      return d.getTime() / 1000
    },
    S: ['getSeconds', '0'],
    u: function (d: Date) {
      const dow = d.getDay()
      return dow === 0 ? 7 : dow
    },
    U: function (d: Date) {
      const formatJ = formats.j
      const doy = typeof formatJ === 'function' ? Number.parseInt(String(formatJ(d)), 10) : 0
      const rdow = 6 - d.getDay()
      const woy = Number.parseInt(String((doy + rdow) / 7), 10)
      return _xPad(woy, 0)
    },
    V: function (d: Date) {
      const formatW = formats.W
      const formatV = formats.V
      const woy = typeof formatW === 'function' ? Number.parseInt(String(formatW(d)), 10) : 0
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
        idow = typeof formatV === 'function' ? Number(formatV(new Date('' + (d.getFullYear() - 1) + '/12/31'))) : 0
      }
      return _xPad(idow, 0)
    },
    w: 'getDay',
    W: function (d: Date) {
      const formatJ = formats.j
      const formatU = formats.u
      const doy = typeof formatJ === 'function' ? Number.parseInt(String(formatJ(d)), 10) : 0
      const rdow = 7 - (typeof formatU === 'function' ? Number(formatU(d)) : 0)
      const woy = Number.parseInt(String((doy + rdow) / 7), 10)
      return _xPad(woy, 0, 10)
    },
    y: function (d: Date) {
      return _xPad(d.getFullYear() % 100, 0)
    },
    Y: 'getFullYear',
    z: function (d: Date) {
      const o = d.getTimezoneOffset()
      const H = _xPad(Number.parseInt(String(Math.abs(o / 60)), 10), 0)
      const M = _xPad(o % 60, 0)
      return (o > 0 ? '-' : '+') + H + M
    },
    Z: function (d: Date) {
      return d.toString().replace(/^.*\(([^)]+)\)$/, '$1')
    },
    '%': function () {
      return '%'
    },
  }

  const _date =
    typeof timestamp === 'undefined'
      ? new Date()
      : timestamp instanceof Date
        ? new Date(timestamp)
        : new Date(Number(timestamp) * 1000)

  const aggregates: Record<string, string> = {
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
    fmt = fmt.replace(/%([cDFhnrRtTxX])/g, function (_m0, m1: string) {
      const f = aggregates[m1]
      if (f === undefined) {
        return m1
      }
      return f === 'locale' ? String(lcTime[m1] ?? '') : f
    })
  }

  // Now replace formats - we need a closure so that the date object gets passed through
  const str = fmt.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, function (_m0, m1: string) {
    const f = formats[m1]
    if (typeof f === 'string') {
      return String(_date[f]())
    } else if (typeof f === 'function') {
      return String(f(_date))
    } else if (Array.isArray(f) && typeof f[0] === 'string') {
      return _xPad(_date[f[0]](), f[1])
    } else {
      // Shouldn't reach here
      return m1
    }
  })

  return str
}

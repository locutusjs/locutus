const reSpace = '[ \\t]+'
const reSpaceOpt = '[ \\t]*'
const reMeridian = '(?:([ap])\\.?m\\.?([\\t ]|$))'
const reHour24 = '(2[0-4]|[01]?[0-9])'
const reHour24lz = '([01][0-9]|2[0-4])'
const reHour12 = '(0?[1-9]|1[0-2])'
const reMinute = '([0-5]?[0-9])'
const reMinutelz = '([0-5][0-9])'
const reSecond = '(60|[0-5]?[0-9])'
const reSecondlz = '(60|[0-5][0-9])'
const reFrac = '(?:\\.([0-9]+))'

const reDayfull = 'sunday|monday|tuesday|wednesday|thursday|friday|saturday'
const reDayabbr = 'sun|mon|tue|wed|thu|fri|sat'
const reDaytext = reDayfull + '|' + reDayabbr + '|weekdays?'

const reReltextnumber = 'first|second|third|fourth|fifth|sixth|seventh|eighth?|ninth|tenth|eleventh|twelfth'
const reReltexttext = 'next|last|previous|this'
const reReltextunit = '(?:second|sec|minute|min|hour|day|fortnight|forthnight|month|year)s?|weeks|' + reDaytext

const reYear = '([0-9]{1,4})'
const reYear2 = '([0-9]{2})'
const reYear4 = '([0-9]{4})'
const reYear4withSign = '([+-]?[0-9]{4})'
const reMonth = '(1[0-2]|0?[0-9])'
const reMonthlz = '(0[0-9]|1[0-2])'
const reDay = '(?:(3[01]|[0-2]?[0-9])(?:st|nd|rd|th)?)'
const reDaylz = '(0[0-9]|[1-2][0-9]|3[01])'

const reMonthFull = 'january|february|march|april|may|june|july|august|september|october|november|december'
const reMonthAbbr = 'jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec'
const reMonthroman = 'i[vx]|vi{0,3}|xi{0,2}|i{1,3}'
const reMonthText = '(' + reMonthFull + '|' + reMonthAbbr + '|' + reMonthroman + ')'

const reTzCorrection = '((?:GMT)?([+-])' + reHour24 + ':?' + reMinute + '?)'
const reDayOfYear = '(00[1-9]|0[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6])'
const reWeekOfYear = '(0[1-9]|[1-4][0-9]|5[0-3])'

function processMeridian (hour, meridian) {
  meridian = meridian && meridian.toLowerCase()

  switch (meridian) {
    case 'a':
      hour += hour === 12 ? -12 : 0
      break
    case 'p':
      hour += hour !== 12 ? 12 : 0
      break
  }

  return hour
}

function processYear (yearStr) {
  let year = +yearStr

  if (yearStr.length < 4 && year < 100) {
    year += year < 70 ? 2000 : 1900
  }

  return year
}

function lookupMonth (monthStr) {
  return {
    jan: 0,
    january: 0,
    i: 0,
    feb: 1,
    february: 1,
    ii: 1,
    mar: 2,
    march: 2,
    iii: 2,
    apr: 3,
    april: 3,
    iv: 3,
    may: 4,
    v: 4,
    jun: 5,
    june: 5,
    vi: 5,
    jul: 6,
    july: 6,
    vii: 6,
    aug: 7,
    august: 7,
    viii: 7,
    sep: 8,
    sept: 8,
    september: 8,
    ix: 8,
    oct: 9,
    october: 9,
    x: 9,
    nov: 10,
    november: 10,
    xi: 10,
    dec: 11,
    december: 11,
    xii: 11
  }[monthStr.toLowerCase()]
}

function lookupWeekday (dayStr, desiredSundayNumber = 0) {
  const dayNumbers = {
    mon: 1,
    monday: 1,
    tue: 2,
    tuesday: 2,
    wed: 3,
    wednesday: 3,
    thu: 4,
    thursday: 4,
    fri: 5,
    friday: 5,
    sat: 6,
    saturday: 6,
    sun: 0,
    sunday: 0
  }

  return dayNumbers[dayStr.toLowerCase()] || desiredSundayNumber
}

function lookupRelative (relText) {
  const relativeNumbers = {
    last: -1,
    previous: -1,
    this: 0,
    first: 1,
    next: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    sixth: 6,
    seventh: 7,
    eight: 8,
    eighth: 8,
    ninth: 9,
    tenth: 10,
    eleventh: 11,
    twelfth: 12
  }

  const relativeBehavior = {
    this: 1
  }

  const relTextLower = relText.toLowerCase()

  return {
    amount: relativeNumbers[relTextLower],
    behavior: relativeBehavior[relTextLower] || 0
  }
}

function processTzCorrection (tzOffset, oldValue) {
  const reTzCorrectionLoose = /(?:GMT)?([+-])(\d+)(:?)(\d{0,2})/i
  tzOffset = tzOffset && tzOffset.match(reTzCorrectionLoose)

  if (!tzOffset) {
    return oldValue
  }

  let sign = tzOffset[1] === '-' ? 1 : -1
  let hours = +tzOffset[2]
  let minutes = +tzOffset[4]

  if (!tzOffset[4] && !tzOffset[3]) {
    minutes = Math.floor(hours % 100)
    hours = Math.floor(hours / 100)
  }

  return sign * (hours * 60 + minutes)
}

const formats = {
  yesterday: {
    regex: /^yesterday/i,
    name: 'yesterday',
    callback () {
      this.rd -= 1
      return this.resetTime()
    }
  },

  now: {
    regex: /^now/i,
    name: 'now'
    // do nothing
  },

  noon: {
    regex: /^noon/i,
    name: 'noon',
    callback () {
      return this.resetTime() && this.time(12, 0, 0, 0)
    }
  },

  midnightOrToday: {
    regex: /^(midnight|today)/i,
    name: 'midnight | today',
    callback () {
      return this.resetTime()
    }
  },

  tomorrow: {
    regex: /^tomorrow/i,
    name: 'tomorrow',
    callback () {
      this.rd += 1
      return this.resetTime()
    }
  },

  timestamp: {
    regex: /^@(-?\d+)/i,
    name: 'timestamp',
    callback (match, timestamp) {
      this.rs += +timestamp
      this.y = 1970
      this.m = 0
      this.d = 1
      this.dates = 0

      return this.resetTime() && this.zone(0)
    }
  },

  firstOrLastDay: {
    regex: /^(first|last) day of/i,
    name: 'firstdayof | lastdayof',
    callback (match, day) {
      if (day.toLowerCase() === 'first') {
        this.firstOrLastDayOfMonth = 1
      } else {
        this.firstOrLastDayOfMonth = -1
      }
    }
  },

  backOrFrontOf: {
    regex: RegExp('^(back|front) of ' + reHour24 + reSpaceOpt + reMeridian + '?', 'i'),
    name: 'backof | frontof',
    callback (match, side, hours, meridian) {
      let back = side.toLowerCase() === 'back'
      let hour = +hours
      let minute = 15

      if (!back) {
        hour -= 1
        minute = 45
      }

      hour = processMeridian(hour, meridian)

      return this.resetTime() && this.time(hour, minute, 0, 0)
    }
  },

  weekdayOf: {
    regex: RegExp('^(' + reReltextnumber + '|' + reReltexttext + ')' + reSpace + '(' + reDayfull + '|' + reDayabbr + ')' + reSpace + 'of', 'i'),
    name: 'weekdayof'
    // todo
  },

  mssqltime: {
    regex: RegExp('^' + reHour12 + ':' + reMinutelz + ':' + reSecondlz + '[:.]([0-9]+)' + reMeridian, 'i'),
    name: 'mssqltime',
    callback (match, hour, minute, second, frac, meridian) {
      return this.time(processMeridian(+hour, meridian), +minute, +second, +frac.substr(0, 3))
    }
  },

  timeLong12: {
    regex: RegExp('^' + reHour12 + '[:.]' + reMinute + '[:.]' + reSecondlz + reSpaceOpt + reMeridian, 'i'),
    name: 'timelong12',
    callback (match, hour, minute, second, meridian) {
      return this.time(processMeridian(+hour, meridian), +minute, +second, 0)
    }
  },

  timeShort12: {
    regex: RegExp('^' + reHour12 + '[:.]' + reMinutelz + reSpaceOpt + reMeridian, 'i'),
    name: 'timeshort12',
    callback (match, hour, minute, meridian) {
      return this.time(processMeridian(+hour, meridian), +minute, 0, 0)
    }
  },

  timeTiny12: {
    regex: RegExp('^' + reHour12 + reSpaceOpt + reMeridian, 'i'),
    name: 'timetiny12',
    callback (match, hour, meridian) {
      return this.time(processMeridian(+hour, meridian), 0, 0, 0)
    }
  },

  soap: {
    regex: RegExp('^' + reYear4 + '-' + reMonthlz + '-' + reDaylz + 'T' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz + reFrac + reTzCorrection + '?', 'i'),
    name: 'soap',
    callback (match, year, month, day, hour, minute, second, frac, tzCorrection) {
      return this.ymd(+year, month - 1, +day) &&
              this.time(+hour, +minute, +second, +frac.substr(0, 3)) &&
              this.zone(processTzCorrection(tzCorrection))
    }
  },

  wddx: {
    regex: RegExp('^' + reYear4 + '-' + reMonth + '-' + reDay + 'T' + reHour24 + ':' + reMinute + ':' + reSecond),
    name: 'wddx',
    callback (match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0)
    }
  },

  exif: {
    regex: RegExp('^' + reYear4 + ':' + reMonthlz + ':' + reDaylz + ' ' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz, 'i'),
    name: 'exif',
    callback (match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0)
    }
  },

  xmlRpc: {
    regex: RegExp('^' + reYear4 + reMonthlz + reDaylz + 'T' + reHour24 + ':' + reMinutelz + ':' + reSecondlz),
    name: 'xmlrpc',
    callback (match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0)
    }
  },

  xmlRpcNoColon: {
    regex: RegExp('^' + reYear4 + reMonthlz + reDaylz + '[Tt]' + reHour24 + reMinutelz + reSecondlz),
    name: 'xmlrpcnocolon',
    callback (match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0)
    }
  },

  clf: {
    regex: RegExp('^' + reDay + '/(' + reMonthAbbr + ')/' + reYear4 + ':' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz + reSpace + reTzCorrection, 'i'),
    name: 'clf',
    callback (match, day, month, year, hour, minute, second, tzCorrection) {
      return this.ymd(+year, lookupMonth(month), +day) &&
              this.time(+hour, +minute, +second, 0) &&
              this.zone(processTzCorrection(tzCorrection))
    }
  },

  iso8601long: {
    regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond + reFrac, 'i'),
    name: 'iso8601long',
    callback (match, hour, minute, second, frac) {
      return this.time(+hour, +minute, +second, +frac.substr(0, 3))
    }
  },

  dateTextual: {
    regex: RegExp('^' + reMonthText + '[ .\\t-]*' + reDay + '[,.stndrh\\t ]+' + reYear, 'i'),
    name: 'datetextual',
    callback (match, month, day, year) {
      return this.ymd(processYear(year), lookupMonth(month), +day)
    }
  },

  pointedDate4: {
    regex: RegExp('^' + reDay + '[.\\t-]' + reMonth + '[.-]' + reYear4),
    name: 'pointeddate4',
    callback (match, day, month, year) {
      return this.ymd(+year, month - 1, +day)
    }
  },

  pointedDate2: {
    regex: RegExp('^' + reDay + '[.\\t]' + reMonth + '\\.' + reYear2),
    name: 'pointeddate2',
    callback (match, day, month, year) {
      return this.ymd(processYear(year), month - 1, +day)
    }
  },

  timeLong24: {
    regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond),
    name: 'timelong24',
    callback (match, hour, minute, second) {
      return this.time(+hour, +minute, +second, 0)
    }
  },

  dateNoColon: {
    regex: RegExp('^' + reYear4 + reMonthlz + reDaylz),
    name: 'datenocolon',
    callback (match, year, month, day) {
      return this.ymd(+year, month - 1, +day)
    }
  },

  pgydotd: {
    regex: RegExp('^' + reYear4 + '\\.?' + reDayOfYear),
    name: 'pgydotd',
    callback (match, year, day) {
      return this.ymd(+year, 0, +day)
    }
  },

  timeShort24: {
    regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute, 'i'),
    name: 'timeshort24',
    callback (match, hour, minute) {
      return this.time(+hour, +minute, 0, 0)
    }
  },

  iso8601noColon: {
    regex: RegExp('^t?' + reHour24lz + reMinutelz + reSecondlz, 'i'),
    name: 'iso8601nocolon',
    callback (match, hour, minute, second) {
      return this.time(+hour, +minute, +second, 0)
    }
  },

  iso8601dateSlash: {
    // eventhough the trailing slash is optional in PHP
    // here it's mandatory and inputs without the slash
    // are handled by dateslash
    regex: RegExp('^' + reYear4 + '/' + reMonthlz + '/' + reDaylz + '/'),
    name: 'iso8601dateslash',
    callback (match, year, month, day) {
      return this.ymd(+year, month - 1, +day)
    }
  },

  dateSlash: {
    regex: RegExp('^' + reYear4 + '/' + reMonth + '/' + reDay),
    name: 'dateslash',
    callback (match, year, month, day) {
      return this.ymd(+year, month - 1, +day)
    }
  },

  american: {
    regex: RegExp('^' + reMonth + '/' + reDay + '/' + reYear),
    name: 'american',
    callback (match, month, day, year) {
      return this.ymd(processYear(year), month - 1, +day)
    }
  },

  americanShort: {
    regex: RegExp('^' + reMonth + '/' + reDay),
    name: 'americanshort',
    callback (match, month, day) {
      return this.ymd(this.y, month - 1, +day)
    }
  },

  gnuDateShortOrIso8601date2: {
    // iso8601date2 is complete subset of gnudateshort
    regex: RegExp('^' + reYear + '-' + reMonth + '-' + reDay),
    name: 'gnudateshort | iso8601date2',
    callback (match, year, month, day) {
      return this.ymd(processYear(year), month - 1, +day)
    }
  },

  iso8601date4: {
    regex: RegExp('^' + reYear4withSign + '-' + reMonthlz + '-' + reDaylz),
    name: 'iso8601date4',
    callback (match, year, month, day) {
      return this.ymd(+year, month - 1, +day)
    }
  },

  gnuNoColon: {
    regex: RegExp('^t' + reHour24lz + reMinutelz, 'i'),
    name: 'gnunocolon',
    callback (match, hour, minute) {
      return this.time(+hour, +minute, 0, this.f)
    }
  },

  gnuDateShorter: {
    regex: RegExp('^' + reYear4 + '-' + reMonth),
    name: 'gnudateshorter',
    callback (match, year, month) {
      return this.ymd(+year, month - 1, 1)
    }
  },

  pgTextReverse: {
    // note: allowed years are from 32-9999
    // years below 32 should be treated as days in datefull
    regex: RegExp('^' + '(\\d{3,4}|[4-9]\\d|3[2-9])-(' + reMonthAbbr + ')-' + reDaylz, 'i'),
    name: 'pgtextreverse',
    callback (match, year, month, day) {
      return this.ymd(processYear(year), lookupMonth(month), +day)
    }
  },

  dateFull: {
    regex: RegExp('^' + reDay + '[ \\t.-]*' + reMonthText + '[ \\t.-]*' + reYear, 'i'),
    name: 'datefull',
    callback (match, day, month, year) {
      return this.ymd(processYear(year), lookupMonth(month), +day)
    }
  },

  dateNoDay: {
    regex: RegExp('^' + reMonthText + '[ .\\t-]*' + reYear4, 'i'),
    name: 'datenoday',
    callback (match, month, year) {
      return this.ymd(+year, lookupMonth(month), 1)
    }
  },

  dateNoDayRev: {
    regex: RegExp('^' + reYear4 + '[ .\\t-]*' + reMonthText, 'i'),
    name: 'datenodayrev',
    callback (match, year, month) {
      return this.ymd(+year, lookupMonth(month), 1)
    }
  },

  pgTextShort: {
    regex: RegExp('^(' + reMonthAbbr + ')-' + reDaylz + '-' + reYear, 'i'),
    name: 'pgtextshort',
    callback (match, month, day, year) {
      return this.ymd(processYear(year), lookupMonth(month), +day)
    }
  },

  dateNoYear: {
    regex: RegExp('^' + reMonthText + '[ .\\t-]*' + reDay + '[,.stndrh\\t ]*', 'i'),
    name: 'datenoyear',
    callback (match, month, day) {
      return this.ymd(this.y, lookupMonth(month), +day)
    }
  },

  dateNoYearRev: {
    regex: RegExp('^' + reDay + '[ .\\t-]*' + reMonthText, 'i'),
    name: 'datenoyearrev',
    callback (match, day, month) {
      return this.ymd(this.y, lookupMonth(month), +day)
    }
  },

  isoWeekDay: {
    regex: RegExp('^' + reYear4 + '-?W' + reWeekOfYear + '(?:-?([0-7]))?'),
    name: 'isoweekday | isoweek',
    callback (match, year, week, day) {
      day = day ? +day : 1

      if (!this.ymd(+year, 0, 1)) {
        return false
      }

      // get day of week for Jan 1st
      let dayOfWeek = new Date(this.y, this.m, this.d).getDay()

      // and use the day to figure out the offset for day 1 of week 1
      dayOfWeek = 0 - (dayOfWeek > 4 ? dayOfWeek - 7 : dayOfWeek)

      this.rd += dayOfWeek + ((week - 1) * 7) + day
    }
  },

  relativeText: {
    regex: RegExp('^(' + reReltextnumber + '|' + reReltexttext + ')' + reSpace + '(' + reReltextunit + ')', 'i'),
    name: 'relativetext',
    callback (match, relValue, relUnit) {
      // todo: implement handling of 'this time-unit'
      // eslint-disable-next-line no-unused-vars
      const { amount, behavior } = lookupRelative(relValue)

      switch (relUnit.toLowerCase()) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
          this.rs += amount
          break
        case 'min':
        case 'mins':
        case 'minute':
        case 'minutes':
          this.ri += amount
          break
        case 'hour':
        case 'hours':
          this.rh += amount
          break
        case 'day':
        case 'days':
          this.rd += amount
          break
        case 'fortnight':
        case 'fortnights':
        case 'forthnight':
        case 'forthnights':
          this.rd += amount * 14
          break
        case 'week':
        case 'weeks':
          this.rd += amount * 7
          break
        case 'month':
        case 'months':
          this.rm += amount
          break
        case 'year':
        case 'years':
          this.ry += amount
          break
        case 'mon': case 'monday':
        case 'tue': case 'tuesday':
        case 'wed': case 'wednesday':
        case 'thu': case 'thursday':
        case 'fri': case 'friday':
        case 'sat': case 'saturday':
        case 'sun': case 'sunday':
          this.resetTime()
          this.weekday = lookupWeekday(relUnit, 7)
          this.weekdayBehavior = 1
          this.rd += (amount > 0 ? amount - 1 : amount) * 7
          break
        case 'weekday':
        case 'weekdays':
          // todo
          break
      }
    }
  },

  relative: {
    regex: RegExp('^([+-]*)[ \\t]*(\\d+)' + reSpaceOpt + '(' + reReltextunit + '|week)', 'i'),
    name: 'relative',
    callback (match, signs, relValue, relUnit) {
      const minuses = signs.replace(/[^-]/g, '').length

      let amount = +relValue * Math.pow(-1, minuses)

      switch (relUnit.toLowerCase()) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
          this.rs += amount
          break
        case 'min':
        case 'mins':
        case 'minute':
        case 'minutes':
          this.ri += amount
          break
        case 'hour':
        case 'hours':
          this.rh += amount
          break
        case 'day':
        case 'days':
          this.rd += amount
          break
        case 'fortnight':
        case 'fortnights':
        case 'forthnight':
        case 'forthnights':
          this.rd += amount * 14
          break
        case 'week':
        case 'weeks':
          this.rd += amount * 7
          break
        case 'month':
        case 'months':
          this.rm += amount
          break
        case 'year':
        case 'years':
          this.ry += amount
          break
        case 'mon': case 'monday':
        case 'tue': case 'tuesday':
        case 'wed': case 'wednesday':
        case 'thu': case 'thursday':
        case 'fri': case 'friday':
        case 'sat': case 'saturday':
        case 'sun': case 'sunday':
          this.resetTime()
          this.weekday = lookupWeekday(relUnit, 7)
          this.weekdayBehavior = 1
          this.rd += (amount > 0 ? amount - 1 : amount) * 7
          break
        case 'weekday':
        case 'weekdays':
          // todo
          break
      }
    }
  },

  dayText: {
    regex: RegExp('^(' + reDaytext + ')', 'i'),
    name: 'daytext',
    callback (match, dayText) {
      this.resetTime()
      this.weekday = lookupWeekday(dayText, 0)

      if (this.weekdayBehavior !== 2) {
        this.weekdayBehavior = 1
      }
    }
  },

  relativeTextWeek: {
    regex: RegExp('^(' + reReltexttext + ')' + reSpace + 'week', 'i'),
    name: 'relativetextweek',
    callback (match, relText) {
      this.weekdayBehavior = 2

      switch (relText.toLowerCase()) {
        case 'this':
          this.rd += 0
          break
        case 'next':
          this.rd += 7
          break
        case 'last':
        case 'previous':
          this.rd -= 7
          break
      }

      if (isNaN(this.weekday)) {
        this.weekday = 1
      }
    }
  },

  monthFullOrMonthAbbr: {
    regex: RegExp('^(' + reMonthFull + '|' + reMonthAbbr + ')', 'i'),
    name: 'monthfull | monthabbr',
    callback (match, month) {
      return this.ymd(this.y, lookupMonth(month), this.d)
    }
  },

  tzCorrection: {
    regex: RegExp('^' + reTzCorrection, 'i'),
    name: 'tzcorrection',
    callback (tzCorrection) {
      return this.zone(processTzCorrection(tzCorrection))
    }
  },

  ago: {
    regex: /^ago/i,
    name: 'ago',
    callback () {
      this.ry = -this.ry
      this.rm = -this.rm
      this.rd = -this.rd
      this.rh = -this.rh
      this.ri = -this.ri
      this.rs = -this.rs
      this.rf = -this.rf
    }
  },

  gnuNoColon2: {
    // second instance of gnunocolon, without leading 't'
    // it's down here, because it is very generic (4 digits in a row)
    // thus conflicts with many rules above
    // only year4 should come afterwards
    regex: RegExp('^' + reHour24lz + reMinutelz, 'i'),
    name: 'gnunocolon',
    callback (match, hour, minute) {
      return this.time(+hour, +minute, 0, this.f)
    }
  },

  year4: {
    regex: RegExp('^' + reYear4),
    name: 'year4',
    callback (match, year) {
      this.y = +year
      return true
    }
  },

  whitespace: {
    regex: /^[ .,\t]+/,
    name: 'whitespace'
    // do nothing
  },

  any: {
    regex: /^[\s\S]+/,
    name: 'any',
    callback () {
      return false
    }
  }
}

let resultProto = {
  // date
  y: NaN,
  m: NaN,
  d: NaN,
  // time
  h: NaN,
  i: NaN,
  s: NaN,
  f: NaN,

  // relative shifts
  ry: 0,
  rm: 0,
  rd: 0,
  rh: 0,
  ri: 0,
  rs: 0,
  rf: 0,

  // weekday related shifts
  weekday: NaN,
  weekdayBehavior: 0,

  // first or last day of month
  // 0 none, 1 first, -1 last
  firstOrLastDayOfMonth: 0,

  // timezone correction in minutes
  z: NaN,

  // counters
  dates: 0,
  times: 0,
  zones: 0,

  // helper functions
  ymd (y, m, d) {
    if (this.dates > 0) {
      return false
    }

    this.dates++
    this.y = y
    this.m = m
    this.d = d
    return true
  },

  time (h, i, s, f) {
    if (this.times > 0) {
      return false
    }

    this.times++
    this.h = h
    this.i = i
    this.s = s
    this.f = f

    return true
  },

  resetTime () {
    this.h = 0
    this.i = 0
    this.s = 0
    this.f = 0
    this.times = 0

    return true
  },

  zone (minutes) {
    if (this.zones <= 1) {
      this.zones++
      this.z = minutes
      return true
    }

    return false
  },

  toDate (relativeTo) {
    if (this.dates && !this.times) {
      this.h = this.i = this.s = this.f = 0
    }

    // fill holes
    if (isNaN(this.y)) {
      this.y = relativeTo.getFullYear()
    }

    if (isNaN(this.m)) {
      this.m = relativeTo.getMonth()
    }

    if (isNaN(this.d)) {
      this.d = relativeTo.getDate()
    }

    if (isNaN(this.h)) {
      this.h = relativeTo.getHours()
    }

    if (isNaN(this.i)) {
      this.i = relativeTo.getMinutes()
    }

    if (isNaN(this.s)) {
      this.s = relativeTo.getSeconds()
    }

    if (isNaN(this.f)) {
      this.f = relativeTo.getMilliseconds()
    }

    // adjust special early
    switch (this.firstOrLastDayOfMonth) {
      case 1:
        this.d = 1
        break
      case -1:
        this.d = 0
        this.m += 1
        break
    }

    if (!isNaN(this.weekday)) {
      var date = new Date(relativeTo.getTime())
      date.setFullYear(this.y, this.m, this.d)
      date.setHours(this.h, this.i, this.s, this.f)

      var dow = date.getDay()

      if (this.weekdayBehavior === 2) {
        // To make "this week" work, where the current day of week is a "sunday"
        if (dow === 0 && this.weekday !== 0) {
          this.weekday = -6
        }

        // To make "sunday this week" work, where the current day of week is not a "sunday"
        if (this.weekday === 0 && dow !== 0) {
          this.weekday = 7
        }

        this.d -= dow
        this.d += this.weekday
      } else {
        var diff = this.weekday - dow

        // some PHP magic
        if ((this.rd < 0 && diff < 0) || (this.rd >= 0 && diff <= -this.weekdayBehavior)) {
          diff += 7
        }

        if (this.weekday >= 0) {
          this.d += diff
        } else {
          this.d -= (7 - (Math.abs(this.weekday) - dow))
        }

        this.weekday = NaN
      }
    }

    // adjust relative
    this.y += this.ry
    this.m += this.rm
    this.d += this.rd

    this.h += this.rh
    this.i += this.ri
    this.s += this.rs
    this.f += this.rf

    this.ry = this.rm = this.rd = 0
    this.rh = this.ri = this.rs = this.rf = 0

    let result = new Date(relativeTo.getTime())
    // since Date constructor treats years <= 99 as 1900+
    // it can't be used, thus this weird way
    result.setFullYear(this.y, this.m, this.d)
    result.setHours(this.h, this.i, this.s, this.f)

    // note: this is done twice in PHP
    // early when processing special relatives
    // and late
    // todo: check if the logic can be reduced
    // to just one time action
    switch (this.firstOrLastDayOfMonth) {
      case 1:
        result.setDate(1)
        break
      case -1:
        result.setMonth(result.getMonth() + 1, 0)
        break
    }

    // adjust timezone
    if (!isNaN(this.z) && result.getTimezoneOffset() !== this.z) {
      result.setUTCFullYear(
        result.getFullYear(),
        result.getMonth(),
        result.getDate())

      result.setUTCHours(
        result.getHours(),
        result.getMinutes() + this.z,
        result.getSeconds(),
        result.getMilliseconds())
    }

    return result
  }
}

module.exports = function strtotime (str, now) {
  //       discuss at: http://locutus.io/php/strtotime/
  //      original by: Caio Ariede (http://caioariede.com)
  //      improved by: Kevin van Zonneveld (http://kvz.io)
  //      improved by: Caio Ariede (http://caioariede.com)
  //      improved by: A. Matías Quezada (http://amatiasq.com)
  //      improved by: preuter
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //      improved by: Mirko Faber
  //         input by: David
  //      bugfixed by: Wagner B. Soares
  //      bugfixed by: Artur Tchernychev
  //      bugfixed by: Stephan Bösch-Plepelits (http://github.com/plepe)
  // reimplemented by: Rafał Kukawski
  //           note 1: Examples all have a fixed timestamp to prevent
  //           note 1: tests to fail because of variable time(zones)
  //        example 1: strtotime('+1 day', 1129633200)
  //        returns 1: 1129719600
  //        example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200)
  //        returns 2: 1130425202
  //        example 3: strtotime('last month', 1129633200)
  //        returns 3: 1127041200
  //        example 4: strtotime('2009-05-04 08:30:00+00')
  //        returns 4: 1241425800
  //        example 5: strtotime('2009-05-04 08:30:00+02:00')
  //        returns 5: 1241418600
  if (now == null) {
    now = Math.floor(Date.now() / 1000)
  }

  // the rule order is very fragile
  // as many formats are similar to others
  // so small change can cause
  // input misinterpretation
  const rules = [
    formats.yesterday,
    formats.now,
    formats.noon,
    formats.midnightOrToday,
    formats.tomorrow,
    formats.timestamp,
    formats.firstOrLastDay,
    formats.backOrFrontOf,
    // formats.weekdayOf, // not yet implemented
    formats.mssqltime,
    formats.timeLong12,
    formats.timeShort12,
    formats.timeTiny12,
    formats.soap,
    formats.wddx,
    formats.exif,
    formats.xmlRpc,
    formats.xmlRpcNoColon,
    formats.clf,
    formats.iso8601long,
    formats.dateTextual,
    formats.pointedDate4,
    formats.pointedDate2,
    formats.timeLong24,
    formats.dateNoColon,
    formats.pgydotd,
    formats.timeShort24,
    formats.iso8601noColon,
    // iso8601dateSlash needs to come before dateSlash
    formats.iso8601dateSlash,
    formats.dateSlash,
    formats.american,
    formats.americanShort,
    formats.gnuDateShortOrIso8601date2,
    formats.iso8601date4,
    formats.gnuNoColon,
    formats.gnuDateShorter,
    formats.pgTextReverse,
    formats.dateFull,
    formats.dateNoDay,
    formats.dateNoDayRev,
    formats.pgTextShort,
    formats.dateNoYear,
    formats.dateNoYearRev,
    formats.isoWeekDay,
    formats.relativeText,
    formats.relative,
    formats.dayText,
    formats.relativeTextWeek,
    formats.monthFullOrMonthAbbr,
    formats.tzCorrection,
    formats.ago,
    formats.gnuNoColon2,
    formats.year4,
    // note: the two rules below
    // should always come last
    formats.whitespace,
    formats.any
  ]

  let result = Object.create(resultProto)

  while (str.length) {
    for (let i = 0, l = rules.length; i < l; i++) {
      const format = rules[i]

      const match = str.match(format.regex)

      if (match) {
        // care only about false results. Ignore other values
        if (format.callback && format.callback.apply(result, match) === false) {
          return false
        }

        str = str.substr(match[0].length)
        break
      }
    }
  }

  return Math.floor(result.toDate(new Date(now * 1000)) / 1000)
}

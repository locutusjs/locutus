module.exports = function getdate (timestamp) {
  //  discuss at: https://locutus.io/php/getdate/
  // original by: Paulo Freitas
  //    input by: Alex
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: getdate(1055901520)
  //   returns 1: {'seconds': 40, 'minutes': 58, 'hours': 1, 'mday': 18, 'wday': 3, 'mon': 6, 'year': 2003, 'yday': 168, 'weekday': 'Wednesday', 'month': 'June', '0': 1055901520}

  const _w = [
    'Sun',
    'Mon',
    'Tues',
    'Wednes',
    'Thurs',
    'Fri',
    'Satur'
  ]
  const _m = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const d = ((typeof timestamp === 'undefined') ? new Date()
    : (timestamp instanceof Date) ? new Date(timestamp) // Not provided
        : new Date(timestamp * 1000) // Javascript Date() // UNIX timestamp (auto-convert to int)
  )
  const w = d.getDay()
  const m = d.getMonth()
  const y = d.getFullYear()
  const r = {}

  r.seconds = d.getSeconds()
  r.minutes = d.getMinutes()
  r.hours = d.getHours()
  r.mday = d.getDate()
  r.wday = w
  r.mon = m + 1
  r.year = y
  r.yday = Math.floor((d - (new Date(y, 0, 1))) / 86400000)
  r.weekday = _w[w] + 'day'
  r.month = _m[m]
  r['0'] = parseInt(d.getTime() / 1000, 10)

  return r
}

type GetDateResult = {
  seconds: number
  minutes: number
  hours: number
  mday: number
  wday: number
  mon: number
  year: number
  yday: number
  weekday: string
  month: string
  '0': number
}

export function getdate(timestamp?: number | string | Date): GetDateResult {
  //  discuss at: https://locutus.io/php/getdate/
  // original by: Paulo Freitas
  //    input by: Alex
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: getdate(1055901520)
  //   returns 1: {'seconds': 40, 'minutes': 58, 'hours': 1, 'mday': 18, 'wday': 3, 'mon': 6, 'year': 2003, 'yday': 168, 'weekday': 'Wednesday', 'month': 'June', '0': 1055901520}

  const _w = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur']
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
    'December',
  ]
  const d =
    typeof timestamp === 'undefined'
      ? new Date()
      : timestamp instanceof Date
        ? new Date(timestamp) // Not provided
        : new Date(Number(timestamp) * 1000) // Javascript Date() // UNIX timestamp (auto-convert to int)
  const w = d.getDay()
  const m = d.getMonth()
  const y = d.getFullYear()
  const r: GetDateResult = {
    seconds: d.getSeconds(),
    minutes: d.getMinutes(),
    hours: d.getHours(),
    mday: d.getDate(),
    wday: w,
    mon: m + 1,
    year: y,
    yday: Math.floor((d.getTime() - new Date(y, 0, 1).getTime()) / 86400000),
    weekday: (_w[w] ?? '') + 'day',
    month: _m[m] ?? '',
    '0': Number.parseInt(String(d.getTime() / 1000), 10),
  }

  return r
}

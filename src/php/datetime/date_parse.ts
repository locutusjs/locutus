import { strtotime } from '../datetime/strtotime.ts'

type DateParseResult = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  fraction: number
  is_localtime: boolean
}

export function date_parse(date: string): DateParseResult | false {
  //  discuss at: https://locutus.io/php/date_parse/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: date_parse('2006-12-12 10:00:00')
  //   returns 1: {year : 2006, month: 12, day: 12, hour: 10, minute: 0, second: 0, fraction: 0, is_localtime: false}

  let ts: number | false

  try {
    ts = strtotime(date, undefined)
  } catch (_e) {
    ts = false
  }

  if (!ts) {
    return false
  }

  const dt = new Date(ts * 1000)

  const retObj: DateParseResult = {
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate(),
    hour: dt.getHours(),
    minute: dt.getMinutes(),
    second: dt.getSeconds(),
    fraction: Number.parseFloat(`0.${dt.getMilliseconds()}`),
    is_localtime: dt.getTimezoneOffset() !== 0,
  }

  return retObj
}

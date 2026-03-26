import { isLeapYear, normalizeCalendarYear } from '../_helpers/_calendar.ts'

export function isleap(year: unknown): boolean {
  //      discuss at: https://locutus.io/python/calendar/isleap/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: isleap(2000)
  //       returns 1: true
  //       example 2: isleap(1900)
  //       returns 2: false

  if (arguments.length === 0) {
    throw new TypeError("isleap() missing 1 required positional argument: 'year'")
  }

  return isLeapYear(normalizeCalendarYear(year, 'isleap'))
}

import { countLeapYearsBetween, normalizeCalendarYear } from '../_helpers/_calendar.ts'

export function leapdays(y1: unknown, y2: unknown): number {
  //      discuss at: https://locutus.io/python/calendar/leapdays/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: leapdays(2000, 2021)
  //       returns 1: 6

  if (arguments.length === 0) {
    throw new TypeError("leapdays() missing 2 required positional arguments: 'y1' and 'y2'")
  }
  if (arguments.length === 1) {
    throw new TypeError("leapdays() missing 1 required positional argument: 'y2'")
  }

  return countLeapYearsBetween(normalizeCalendarYear(y1, 'leapdays'), normalizeCalendarYear(y2, 'leapdays'))
}

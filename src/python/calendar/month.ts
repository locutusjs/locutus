import {
  formatMonth,
  normalizeCalendarMonth,
  normalizeCalendarYear,
  normalizeLineSpacing,
  normalizeMonthWidth,
} from '../_helpers/_calendar.ts'

export function month(theyear: unknown, themonth: unknown, w = 0, l = 0): string {
  //      discuss at: https://locutus.io/python/calendar/month/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: month(2024, 2)
  //       returns 1: '   February 2024\nMo Tu We Th Fr Sa Su\n          1  2  3  4\n 5  6  7  8  9 10 11\n12 13 14 15 16 17 18\n19 20 21 22 23 24 25\n26 27 28 29\n'

  if (arguments.length === 0) {
    throw new TypeError("TextCalendar.formatmonth() missing 2 required positional arguments: 'theyear' and 'themonth'")
  }
  if (arguments.length === 1) {
    throw new TypeError("TextCalendar.formatmonth() missing 1 required positional argument: 'themonth'")
  }

  return formatMonth(
    normalizeCalendarYear(theyear, 'month'),
    normalizeCalendarMonth(themonth, 'month'),
    normalizeMonthWidth(w, 'month'),
    normalizeLineSpacing(l, 'month'),
  )
}

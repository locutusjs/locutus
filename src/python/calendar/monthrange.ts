import { daysInMonth, normalizeCalendarMonth, normalizeCalendarYear, pythonWeekday } from '../_helpers/_calendar.ts'

export function monthrange(year: unknown, month: unknown): [number, number] {
  //      discuss at: https://locutus.io/python/calendar/monthrange/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: monthrange(2024, 2)
  //       returns 1: [3, 29]

  if (arguments.length === 0) {
    throw new TypeError("monthrange() missing 2 required positional arguments: 'year' and 'month'")
  }
  if (arguments.length === 1) {
    throw new TypeError("monthrange() missing 1 required positional argument: 'month'")
  }

  const normalizedYear = normalizeCalendarYear(year, 'monthrange')
  const normalizedMonth = normalizeCalendarMonth(month, 'monthrange')
  return [pythonWeekday(normalizedYear, normalizedMonth, 1), daysInMonth(normalizedYear, normalizedMonth)]
}

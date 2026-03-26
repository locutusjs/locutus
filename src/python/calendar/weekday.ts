import {
  normalizeCalendarDay,
  normalizeCalendarMonth,
  normalizeCalendarYear,
  pythonWeekday,
} from '../_helpers/_calendar.ts'

export function weekday(year: unknown, month: unknown, day: unknown): number {
  //      discuss at: https://locutus.io/python/calendar/weekday/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: weekday(2024, 2, 29)
  //       returns 1: 3

  if (arguments.length === 0) {
    throw new TypeError("weekday() missing 3 required positional arguments: 'year', 'month', and 'day'")
  }
  if (arguments.length === 1) {
    throw new TypeError("weekday() missing 2 required positional arguments: 'month' and 'day'")
  }
  if (arguments.length === 2) {
    throw new TypeError("weekday() missing 1 required positional argument: 'day'")
  }

  const normalizedYear = normalizeCalendarYear(year, 'weekday')
  const normalizedMonth = normalizeCalendarMonth(month, 'weekday')
  const normalizedDay = normalizeCalendarDay(normalizedYear, normalizedMonth, day, 'weekday')
  return pythonWeekday(normalizedYear, normalizedMonth, normalizedDay)
}

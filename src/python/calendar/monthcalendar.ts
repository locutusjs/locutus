import { buildMonthCalendar, normalizeCalendarMonth, normalizeCalendarYear } from '../_helpers/_calendar.ts'

export function monthcalendar(year: unknown, month: unknown): number[][] {
  //      discuss at: https://locutus.io/python/calendar/monthcalendar/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: monthcalendar(2024, 2)
  //       returns 1: [[0, 0, 0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17, 18], [19, 20, 21, 22, 23, 24, 25], [26, 27, 28, 29, 0, 0, 0]]

  if (arguments.length === 0) {
    throw new TypeError("monthdayscalendar() missing 2 required positional arguments: 'year' and 'month'")
  }
  if (arguments.length === 1) {
    throw new TypeError("monthdayscalendar() missing 1 required positional argument: 'month'")
  }

  return buildMonthCalendar(
    normalizeCalendarYear(year, 'monthcalendar'),
    normalizeCalendarMonth(month, 'monthcalendar'),
  )
}

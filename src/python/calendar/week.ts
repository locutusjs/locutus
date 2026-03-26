import { formatWeek, toCalendarInteger } from '../_helpers/_calendar.ts'

export function week(theweek: unknown, width: unknown): string {
  //      discuss at: https://locutus.io/python/calendar/week/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: week([[26, 0], [27, 1], [28, 2], [29, 3], [0, 4], [0, 5], [0, 6]], 2)
  //       returns 1: '26 27 28 29         '

  if (arguments.length === 0) {
    throw new TypeError("formatweek() missing 2 required positional arguments: 'theweek' and 'width'")
  }
  if (arguments.length === 1) {
    throw new TypeError("formatweek() missing 1 required positional argument: 'width'")
  }

  return formatWeek(theweek, toCalendarInteger(width, 'week'))
}

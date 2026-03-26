import { buildWeekHeader, normalizeWeekWidth } from '../_helpers/_calendar.ts'

export function weekheader(width: unknown): string {
  //      discuss at: https://locutus.io/python/calendar/weekheader/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: weekheader(2)
  //       returns 1: 'Mo Tu We Th Fr Sa Su'
  //       example 2: weekheader(3)
  //       returns 2: 'Mon Tue Wed Thu Fri Sat Sun'

  if (arguments.length === 0) {
    throw new TypeError("formatweekheader() missing 1 required positional argument: 'width'")
  }

  return buildWeekHeader(normalizeWeekWidth(width, 'weekheader'))
}

import { formatString, toCalendarInteger } from '../_helpers/_calendar.ts'

export function formatstring(items: unknown, cols = 20, spacing = 6): string {
  //      discuss at: https://locutus.io/python/calendar/formatstring/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: formatstring(['a', 'bb', 'ccc'], 2, 0)
  //       returns 1: 'a bbccc'

  if (arguments.length === 0) {
    throw new TypeError("formatstring() missing 1 required positional argument: 'cols'")
  }

  return formatString(items, toCalendarInteger(cols, 'formatstring'), toCalendarInteger(spacing, 'formatstring'))
}

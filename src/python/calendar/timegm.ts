import { normalizeTimeTuple, timeTupleToUnixSeconds } from '../_helpers/_calendar.ts'

export function timegm(tuple: unknown): number {
  //      discuss at: https://locutus.io/python/calendar/timegm/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: timegm([1970, 1, 1, 0, 0, 0])
  //       returns 1: 0
  //       example 2: timegm([2024, 2, 29, 12, 34, 56])
  //       returns 2: 1709210096

  if (arguments.length === 0) {
    throw new TypeError("timegm() missing 1 required positional argument: 'tuple'")
  }

  const [year, month, day, hour, minute, second] = normalizeTimeTuple(tuple, 'timegm')
  return timeTupleToUnixSeconds(year, month, day, hour, minute, second)
}

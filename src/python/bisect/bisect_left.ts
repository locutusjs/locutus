import { pythonBisectLeft } from '../_helpers/_bisect.ts'

export function bisect_left(a: unknown, x: unknown, lo?: unknown, hi?: unknown): number {
  //      discuss at: https://locutus.io/python/bisect/bisect_left/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: bisect_left([1, 2, 2, 4], 2)
  //       returns 1: 1

  return pythonBisectLeft(a, x, lo, hi)
}

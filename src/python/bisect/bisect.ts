import { pythonBisect } from '../_helpers/_bisect.ts'

export function bisect(a: unknown, x: unknown, lo?: unknown, hi?: unknown): number {
  //      discuss at: https://locutus.io/python/bisect/bisect/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: bisect([1, 2, 2, 4], 2)
  //       returns 1: 3

  return pythonBisect(a, x, lo, hi)
}

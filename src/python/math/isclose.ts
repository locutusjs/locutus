export function isclose(
  a: number | string,
  b: number | string,
  relTol: number | string = 1e-9,
  absTol: number | string = 0,
): boolean {
  //      discuss at: https://locutus.io/python/isclose/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Tests whether two numbers are close within relative/absolute tolerances.
  //       example 1: isclose(0.1 + 0.2, 0.3)
  //       returns 1: true
  //       example 2: isclose(1000.0, 1001.0, 0.01)
  //       returns 2: true
  //       example 3: isclose(1.0, 1.1, 1e-9, 0)
  //       returns 3: false

  const left = Number(a)
  const right = Number(b)
  const relative = Number(relTol)
  const absolute = Number(absTol)

  if (!Number.isFinite(relative) || !Number.isFinite(absolute) || relative < 0 || absolute < 0) {
    throw new RangeError('isclose(): tolerances must be non-negative finite numbers')
  }

  if (Number.isNaN(left) || Number.isNaN(right)) {
    return false
  }
  if (left === right) {
    return true
  }
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return false
  }

  const difference = Math.abs(left - right)
  const threshold = Math.max(relative * Math.max(Math.abs(left), Math.abs(right)), absolute)
  return difference <= threshold
}

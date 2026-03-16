const MAX_SAFE_ROOT = BigInt(Number.MAX_SAFE_INTEGER)
const FIRST_UNSAFE_ROOT_SQUARED = (MAX_SAFE_ROOT + 1n) * (MAX_SAFE_ROOT + 1n)

export function isqrt(n: number | string): number {
  //      discuss at: https://locutus.io/python/isqrt/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the integer square root, rounding down to the nearest whole number.
  //       example 1: isqrt(15)
  //       returns 1: 3
  //       example 2: isqrt(16)
  //       returns 2: 4
  //       example 3: isqrt(0)
  //       returns 3: 0

  if (typeof n === 'string' && /^[-+]?\d+$/.test(n.trim())) {
    const parsed = BigInt(n)
    if (parsed < 0n) {
      throw new Error('isqrt() only accepts non-negative integers')
    }

    if (parsed >= FIRST_UNSAFE_ROOT_SQUARED) {
      throw new RangeError('isqrt() only supports roots within JS safe integer precision')
    }

    const root = bigintSqrt(parsed)
    if (root > MAX_SAFE_ROOT) {
      throw new RangeError('isqrt() only supports roots within JS safe integer precision')
    }

    return Number(root)
  }

  const value = Number(n)

  if (!Number.isFinite(value) || !Number.isSafeInteger(value) || value < 0) {
    throw new Error('isqrt() only accepts non-negative integers')
  }

  return Math.floor(Math.sqrt(value))
}

function bigintSqrt(value: bigint): bigint {
  if (value < 2n) {
    return value
  }

  let x0 = value
  let x1 = (x0 + 1n) >> 1n

  while (x1 < x0) {
    x0 = x1
    x1 = (x1 + value / x1) >> 1n
  }

  return x0
}

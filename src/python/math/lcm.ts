const gcdPair = (a: number, b: number): number => {
  let left = Math.abs(a)
  let right = Math.abs(b)

  while (right !== 0) {
    const temp = right
    right = left % right
    left = temp
  }

  return left
}

export function lcm(...values: Array<number | string>): number {
  //      discuss at: https://locutus.io/python/lcm/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns least common multiple for all provided integer values.
  //       example 1: lcm(12, 18)
  //       returns 1: 36
  //       example 2: lcm(4, 6, 8)
  //       returns 2: 24
  //       example 3: lcm(5, 0)
  //       returns 3: 0

  if (values.length === 0) {
    return 1
  }

  let result = Math.trunc(Number(values[0] ?? 0))
  if (!Number.isFinite(result)) {
    throw new TypeError('lcm(): values must be finite integers')
  }

  for (let index = 1; index < values.length; index += 1) {
    const raw = values[index]
    const next = Math.trunc(Number(raw))
    if (!Number.isFinite(next)) {
      throw new TypeError('lcm(): values must be finite integers')
    }
    if (result === 0 || next === 0) {
      result = 0
      continue
    }
    result = Math.abs((result / gcdPair(result, next)) * next)
  }

  return Math.abs(result)
}

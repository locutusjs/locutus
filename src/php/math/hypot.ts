export function hypot(x: unknown, y: unknown): number | null {
  //  discuss at: https://locutus.io/php/hypot/
  // original by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Robert Eisele (https://www.xarg.org/)
  //   example 1: hypot(3, 4)
  //   returns 1: 5
  //   example 2: hypot([], 'a')
  //   returns 2: null

  const left = Math.abs(Number(x))
  const right = Math.abs(Number(y))

  let t = Math.min(left, right)
  const max = Math.max(left, right)
  t = t / max

  return max * Math.sqrt(1 + t * t) || null
}

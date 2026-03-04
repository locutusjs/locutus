export function dist(p: number[] | unknown, q: number[] | unknown): number {
  //      discuss at: https://locutus.io/python/dist/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns Euclidean distance between two same-length numeric vectors.
  //       example 1: dist([0, 0], [3, 4])
  //       returns 1: 5
  //       example 2: dist([1, 2, 3], [1, 2, 3])
  //       returns 2: 0
  //       example 3: dist([-1, 2], [2, -2])
  //       returns 3: 5

  if (!Array.isArray(p) || !Array.isArray(q)) {
    throw new TypeError('dist() requires array-like arguments')
  }

  if (p.length !== q.length) {
    throw new Error('dist() points must have the same dimension')
  }

  let sum = 0
  for (let i = 0; i < p.length; i += 1) {
    const left = Number(p[i])
    const right = Number(q[i])
    const delta = left - right
    sum += delta * delta
  }

  return Math.sqrt(sum)
}

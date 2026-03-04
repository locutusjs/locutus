export function comb(n: number | string, k: number | string): number {
  //      discuss at: https://locutus.io/python/comb/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the number of ways to choose k items from n without repetition.
  //       example 1: comb(5, 2)
  //       returns 1: 10
  //       example 2: comb(10, 0)
  //       returns 2: 1
  //       example 3: comb(10, 3)
  //       returns 3: 120

  const nn = Math.trunc(Number(n))
  const kk = Math.trunc(Number(k))

  if (!Number.isFinite(nn) || !Number.isFinite(kk) || nn < 0 || kk < 0) {
    throw new Error('comb() only accepts non-negative integers')
  }
  if (kk > nn) {
    return 0
  }

  const r = Math.min(kk, nn - kk)
  let result = 1
  for (let i = 1; i <= r; i += 1) {
    result = (result * (nn - r + i)) / i
  }

  return Math.trunc(result)
}

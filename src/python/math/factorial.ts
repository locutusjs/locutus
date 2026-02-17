export function factorial(n: number | string): number {
  //      discuss at: https://locutus.io/python/factorial/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns n! (n factorial)
  //       example 1: factorial(5)
  //       returns 1: 120
  //       example 2: factorial(0)
  //       returns 2: 1
  //       example 3: factorial(1)
  //       returns 3: 1

  const normalized = Number.parseInt(String(n), 10)

  if (normalized < 0) {
    throw new Error('factorial() not defined for negative values')
  }

  if (normalized === 0 || normalized === 1) {
    return 1
  }

  let result = 1
  for (let i = 2; i <= normalized; i++) {
    result *= i
  }

  return result
}

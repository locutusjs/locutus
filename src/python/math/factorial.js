module.exports = function factorial(n) {
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

  n = parseInt(n, 10)

  if (n < 0) {
    throw new Error('factorial() not defined for negative values')
  }

  if (n === 0 || n === 1) {
    return 1
  }

  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }

  return result
}

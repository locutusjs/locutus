export function mt_rand(...args: [min?: number | string, max?: number | string]): number {
  //      discuss at: https://locutus.io/php/mt_rand/
  // parity verified: PHP 8.3
  //     original by: Onno Marsman (https://twitter.com/onnomarsman)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //        input by: Kongo
  //       example 1: mt_rand(1, 1)
  //       returns 1: 1

  let minValue: number
  let maxValue: number
  const argc = args.length
  const [min, max] = args
  if (argc === 0) {
    minValue = 0
    maxValue = 2147483647
  } else if (argc === 1) {
    throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given')
  } else {
    minValue = Number.parseInt(String(min), 10)
    maxValue = Number.parseInt(String(max), 10)
  }

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
}

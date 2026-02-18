export function rand(...args: [min?: number, max?: number]): number {
  //      discuss at: https://locutus.io/php/rand/
  // parity verified: PHP 8.3
  //     original by: Leslie Hoare
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //          note 1: See the commented out code below for a version which
  //          note 1: will work with our experimental (though probably unnecessary)
  //          note 1: srand() function)
  //       example 1: rand(1, 1)
  //       returns 1: 1

  const argc = args.length
  let minValue: number
  let maxValue: number
  if (argc === 0) {
    minValue = 0
    maxValue = 2147483647
  } else if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given')
  } else {
    minValue = Number(args[0])
    maxValue = Number(args[1])
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
}

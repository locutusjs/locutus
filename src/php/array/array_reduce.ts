export function array_reduce<T>(aInput: T[], callback: (left: T | 0, right: T | 0) => number): number {
  //  discuss at: https://locutus.io/php/array_reduce/
  // original by: Alfonso Jimenez (https://www.alfonsojimenez.com)
  //      note 1: Takes a function as an argument, not a function's name
  //   example 1: array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;})
  //   returns 1: 15

  const length = aInput.length
  let res = 0
  const tmp: [T | 0, T | 0] = [0, 0]

  for (let i = 0; i < length; i += 2) {
    tmp[0] = aInput[i] ?? 0
    tmp[1] = aInput[i + 1] ?? 0
    res += callback(tmp[0], tmp[1])
  }

  return res
}

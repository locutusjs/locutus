export function array_reduce(aInput: unknown[], callback: (left: unknown, right: unknown) => number): number {
  //  discuss at: https://locutus.io/php/array_reduce/
  // original by: Alfonso Jimenez (https://www.alfonsojimenez.com)
  //      note 1: Takes a function as an argument, not a function's name
  //   example 1: array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;})
  //   returns 1: 15

  const length = aInput.length
  let res = 0
  const tmp: [unknown, unknown] = [0, 0]

  for (let i = 0; i < length; i += 2) {
    tmp[0] = aInput[i]
    if (aInput[i + 1]) {
      tmp[1] = aInput[i + 1]
    } else {
      tmp[1] = 0
    }
    res += callback(tmp[0], tmp[1])
  }

  return res
}

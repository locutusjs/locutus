type AssociativeArray = { [key: string]: unknown }

export function array_merge(...args: Array<unknown[] | AssociativeArray>): unknown[] | AssociativeArray {
  //  discuss at: https://locutus.io/php/array_merge/
  // original by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Nate
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //    input by: josh
  //   example 1: var $arr1 = {"color": "red", 0: 2, 1: 4}
  //   example 1: var $arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
  //   example 1: array_merge($arr1, $arr2)
  //   returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
  //   example 2: var $arr1 = []
  //   example 2: var $arr2 = {1: "data"}
  //   example 2: array_merge($arr1, $arr2)
  //   returns 2: {0: "data"}

  const argl = args.length
  const retObj: AssociativeArray = {}
  let retArr = true

  for (let i = 0; i < argl; i++) {
    if (!Array.isArray(args[i])) {
      retArr = false
      break
    }
  }

  if (retArr) {
    let merged: unknown[] = []
    for (let i = 0; i < argl; i++) {
      merged = merged.concat(args[i] as unknown[])
    }
    return merged
  }

  for (let i = 0, ct = 0; i < argl; i++) {
    const arg = args[i]
    if (Array.isArray(arg)) {
      for (let j = 0, argil = arg.length; j < argil; j++) {
        retObj[ct++] = arg[j]
      }
    } else {
      for (const k in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, k)) {
          if (parseInt(k, 10) + '' === k) {
            retObj[ct++] = arg[k]
          } else {
            retObj[k] = arg[k]
          }
        }
      }
    }
  }

  return retObj
}

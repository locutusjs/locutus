export function min(...args: unknown[]): unknown {
  //  discuss at: https://locutus.io/php/min/
  // original by: Onno Marsman (https://twitter.com/onnomarsman)
  //  revised by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Jack
  //      note 1: Long code cause we're aiming for maximum PHP compatibility
  //   example 1: min(1, 3, 5, 6, 7)
  //   returns 1: 1
  //   example 2: min([2, 4, 5])
  //   returns 2: 2
  //   example 3: min(0, 'hello')
  //   returns 3: 0
  //   example 4: min('hello', 0)
  //   returns 4: 'hello'
  //   example 5: min(-1, 'hello')
  //   returns 5: -1
  //   example 6: min([2, 4, 8], [2, 5, 7])
  //   returns 6: [2, 4, 8]

  let ar: unknown[]
  let retVal: unknown
  let i = 0
  let n = 0
  const argv: IArguments = arguments
  const argc = argv.length
  const _obj2Array = function (obj: unknown): unknown[] {
    if (Array.isArray(obj)) {
      return obj
    }
    const converted: unknown[] = []
    const record = obj as { [key: string]: unknown }
    for (const i in record) {
      if (Object.prototype.hasOwnProperty.call(record, i)) {
        converted.push(record[i])
      }
    }
    return converted
  }

  const _compare = function (current: unknown, next: unknown): number {
    let i = 0
    let n = 0
    let tmp = 0
    let nl = 0
    let cl = 0
    const currentNum = Number(current)
    const nextNum = Number(next)

    if (current === next) {
      return 0
    } else if (typeof current === 'object') {
      if (typeof next === 'object') {
        const currentArray = _obj2Array(current)
        const nextArray = _obj2Array(next)
        cl = currentArray.length
        nl = nextArray.length
        if (nl > cl) {
          return 1
        } else if (nl < cl) {
          return -1
        }
        for (i = 0, n = cl; i < n; ++i) {
          tmp = _compare(currentArray[i], nextArray[i])
          if (tmp === 1) {
            return 1
          } else if (tmp === -1) {
            return -1
          }
        }
        return 0
      }
      return -1
    } else if (typeof next === 'object') {
      return 1
    } else if (isNaN(nextNum) && !isNaN(currentNum)) {
      if (current === 0) {
        return 0
      }
      return currentNum < 0 ? 1 : -1
    } else if (isNaN(currentNum) && !isNaN(nextNum)) {
      if (next === 0) {
        return 0
      }
      return nextNum > 0 ? 1 : -1
    }

    if (next === current) {
      return 0
    }

    return nextNum > currentNum ? 1 : -1
  }

  if (argc === 0) {
    throw new Error('At least one value should be passed to min()')
  } else if (argc === 1) {
    if (typeof argv[0] === 'object') {
      ar = _obj2Array(argv[0])
    } else {
      throw new Error('Wrong parameter count for min()')
    }

    if (ar.length === 0) {
      throw new Error('Array must contain at least one element for min()')
    }
  } else {
    ar = Array.from(argv)
  }

  retVal = ar[0]

  for (i = 1, n = ar.length; i < n; ++i) {
    if (_compare(retVal, ar[i]) === -1) {
      retVal = ar[i]
    }
  }

  return retVal
}

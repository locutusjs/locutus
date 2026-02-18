import type { PhpCallable } from '../_helpers/_phpTypes.ts'

export function create_function(args: string, code: string): PhpCallable | false {
  //       discuss at: https://locutus.io/php/create_function/
  //      original by: Johnny Mast (https://www.phpvrouwen.nl)
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //        example 1: var $f = create_function('a, b', 'return (a + b)')
  //        example 1: $f(1, 2)
  //        returns 1: 3

  try {
    const params = args
      .split(',')
      .map((param) => param.trim())
      .filter((param) => param.length > 0)

    return new Function(...params, code) as PhpCallable
  } catch (_e) {
    return false
  }
}

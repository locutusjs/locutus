import type { PhpInput, PhpScalar } from '../_helpers/_phpTypes.ts'

type ScalarCheckValue = PhpInput

export function is_scalar(mixedVar: ScalarCheckValue): mixedVar is PhpScalar {
  //  discuss at: https://locutus.io/php/is_scalar/
  // original by: Paulo Freitas
  //   example 1: is_scalar(186.31)
  //   returns 1: true
  //   example 2: is_scalar({0: 'Kevin van Zonneveld'})
  //   returns 2: false

  return typeof mixedVar === 'boolean' || typeof mixedVar === 'number' || typeof mixedVar === 'string'
}

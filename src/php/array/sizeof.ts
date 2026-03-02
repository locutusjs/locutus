import type { PhpArrayLike, PhpRuntimeValue } from '../_helpers/_phpTypes.ts'
import { type CountMode, count } from '../array/count.ts'

export function sizeof<TValue extends PhpRuntimeValue>(mixedVar: PhpArrayLike<TValue>, mode?: CountMode): number {
  //  discuss at: https://locutus.io/php/sizeof/
  // original by: Philip Peterson
  //   example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE')
  //   returns 1: 6
  //   example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
  //   returns 2: 6

  return count(mixedVar, mode ?? 0)
}

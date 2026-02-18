import type { PhpAssoc, PhpMixed } from '../_helpers/_phpTypes.ts'
import { count } from '../array/count.ts'

export function sizeof(mixedVar: PhpMixed[] | PhpAssoc<PhpMixed>, mode?: string): number {
  //  discuss at: https://locutus.io/php/sizeof/
  // original by: Philip Peterson
  //   example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE')
  //   returns 1: 6
  //   example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
  //   returns 2: 6

  return count(mixedVar, mode)
}

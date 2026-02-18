import { _bc as bc } from '../_helpers/_bc.ts'
import type { PhpValue } from '../_helpers/_phpTypes.ts'

type BcNum = PhpValue

export function bccomp(leftOperand: string | number, rightOperand: string | number, scale?: number): number {
  //  discuss at: https://locutus.io/php/bccomp/
  // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  //   example 1: bccomp('-1', '5', 4)
  //   returns 1: -1
  //   example 2: bccomp('1928372132132819737213', '8728932001983192837219398127471')
  //   returns 2: -1
  //   example 3: bccomp('1.00000000000000000001', '1', 2)
  //   returns 3: 0
  //   example 4: bccomp('97321', '2321')
  //   returns 4: 1

  const libbcmath = bc() as {
    scale: number
    bc_init_num: () => BcNum
    bc_str2num: (value: string, scale: number) => BcNum
    bc_compare: (left: BcNum, right: BcNum, scale: number) => number
  }

  // bc_num
  let first: BcNum
  let second: BcNum
  if (typeof scale === 'undefined') {
    scale = libbcmath.scale
  }
  scale = scale < 0 ? 0 : scale

  first = libbcmath.bc_init_num()
  second = libbcmath.bc_init_num()

  // note bc_ not php_str2num
  first = libbcmath.bc_str2num(leftOperand.toString(), scale)
  // note bc_ not php_str2num
  second = libbcmath.bc_str2num(rightOperand.toString(), scale)
  return libbcmath.bc_compare(first, second, scale)
}

import { _bc as bc } from '../_helpers/_bc.ts'

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

  const libbcmath = bc()

  if (typeof scale === 'undefined') {
    scale = libbcmath.scale
  }
  scale = scale < 0 ? 0 : scale

  let first = libbcmath.bc_init_num()
  let second = libbcmath.bc_init_num()

  // note bc_ not php_str2num
  first = libbcmath.bc_str2num(leftOperand.toString(), scale)
  // note bc_ not php_str2num
  second = libbcmath.bc_str2num(rightOperand.toString(), scale)
  return libbcmath.bc_compare(first, second)
}

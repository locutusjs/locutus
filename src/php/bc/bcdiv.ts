import { _bc } from '../_helpers/_bc.ts'

export function bcdiv(leftOperand: string | number, rightOperand: string | number, scale?: number): string {
  //  discuss at: https://locutus.io/php/bcdiv/
  // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  //   example 1: bcdiv('1', '2')
  //   returns 1: '0'
  //   example 2: bcdiv('1', '2', 2)
  //   returns 2: '0.50'
  //   example 3: bcdiv('-1', '5', 4)
  //   returns 3: '-0.2000'
  //   example 4: bcdiv('8728932001983192837219398127471', '1928372132132819737213', 2)
  //   returns 4: '4526580661.75'

  const libbcmath = _bc()

  if (typeof scale === 'undefined') {
    scale = libbcmath.scale
  }
  scale = scale < 0 ? 0 : scale

  const first = libbcmath.php_str2num(leftOperand.toString())
  const second = libbcmath.php_str2num(rightOperand.toString())

  const result = libbcmath.bc_divide(first, second, scale)
  if (result === -1) {
    throw new Error('(BC) Division by zero')
  }
  if (result.n_scale > scale) {
    result.n_scale = scale
  }

  return result.toString()
}

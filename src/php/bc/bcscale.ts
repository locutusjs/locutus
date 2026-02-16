import { _bc } from '../_helpers/_bc.ts'

export function bcscale(scale) {
  //  discuss at: https://locutus.io/php/bcscale/
  // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  //   example 1: bcscale(1)
  //   returns 1: true

  const libbcmath = _bc()

  scale = parseInt(scale, 10)
  if (isNaN(scale)) {
    return false
  }
  if (scale < 0) {
    return false
  }
  libbcmath.scale = scale

  return true
}

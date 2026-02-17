import { _bc } from '../_helpers/_bc.ts'

export function bcscale(scale: number | string): boolean {
  //  discuss at: https://locutus.io/php/bcscale/
  // original by: lmeyrick (https://sourceforge.net/projects/bcmath-js/)
  //   example 1: bcscale(1)
  //   returns 1: true

  const libbcmath = _bc()

  const parsedScale = Number.parseInt(String(scale), 10)
  if (Number.isNaN(parsedScale)) {
    return false
  }
  if (parsedScale < 0) {
    return false
  }
  libbcmath.scale = parsedScale

  return true
}

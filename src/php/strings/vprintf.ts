// @ts-nocheck

import { echo } from '../strings/echo.ts'
import { sprintf } from '../strings/sprintf.ts'

export function vprintf(format, args) {
  //       discuss at: https://locutus.io/php/vprintf/
  //      original by: Ash Searle (https://hexmen.com/blog/)
  //      improved by: Michael White (https://getsprink.com)
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //        example 1: vprintf("%01.2f", 123.1)
  //        returns 1: 6

  const ret = sprintf.apply(this, [format].concat(args))
  echo(ret)

  return ret.length
}

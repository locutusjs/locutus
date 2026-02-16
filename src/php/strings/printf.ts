// @ts-nocheck

import { echo } from '../strings/echo.ts'
import { sprintf } from '../strings/sprintf.ts'

export function printf() {
  //  discuss at: https://locutus.io/php/printf/
  // original by: Ash Searle (https://hexmen.com/blog/)
  // improved by: Michael White (https://getsprink.com)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: printf("%01.2f", 123.1)
  //   returns 1: 6

  const ret = sprintf.apply(this, arguments)
  echo(ret)
  return ret.length
}

import type { PhpInput } from '../_helpers/_phpTypes.ts'
import { echo } from '../strings/echo.ts'
import { sprintf } from '../strings/sprintf.ts'

type PrintfValue = PhpInput

export function printf(format: string, ...args: PrintfValue[]): number {
  //  discuss at: https://locutus.io/php/printf/
  // original by: Ash Searle (https://hexmen.com/blog/)
  // improved by: Michael White (https://getsprink.com)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: printf("%01.2f", 123.1)
  //   returns 1: 6

  const ret = sprintf(format, ...args)
  if (ret === false) {
    return 0
  }
  echo(ret)
  return ret.length
}

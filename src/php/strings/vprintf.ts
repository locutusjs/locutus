import { echo } from '../strings/echo.ts'
import { sprintf } from '../strings/sprintf.ts'

export function vprintf(format: string, args: unknown[] | unknown): number {
  //       discuss at: https://locutus.io/php/vprintf/
  //      original by: Ash Searle (https://hexmen.com/blog/)
  //      improved by: Michael White (https://getsprink.com)
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //        example 1: vprintf("%01.2f", 123.1)
  //        returns 1: 6

  const values = Array.isArray(args) ? args : Array.prototype.slice.call(arguments, 1)
  const ret = sprintf(format, ...values)
  if (ret === false) {
    return 0
  }
  echo(ret)

  return ret.length
}

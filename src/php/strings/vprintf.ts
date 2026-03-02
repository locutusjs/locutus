import type { PhpRuntimeValue } from '../_helpers/_phpTypes.ts'
import { echo } from '../strings/echo.ts'
import { sprintf } from '../strings/sprintf.ts'

type PrintfValue = PhpRuntimeValue

export function vprintf(format: string, args: PrintfValue[]): number

export function vprintf(format: string, ...args: PrintfValue[]): number

export function vprintf(format: string, ...restArgs: [PrintfValue[]] | PrintfValue[]): number {
  //       discuss at: https://locutus.io/php/vprintf/
  //      original by: Ash Searle (https://hexmen.com/blog/)
  //      improved by: Michael White (https://getsprink.com)
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //        example 1: vprintf("%01.2f", 123.1)
  //        returns 1: 6

  let values: PrintfValue[] = []
  if (restArgs.length === 1 && Array.isArray(restArgs[0])) {
    values = restArgs[0]
  } else {
    values = restArgs
  }
  const ret = sprintf(format, ...values)
  if (ret === false) {
    return 0
  }
  echo(ret)

  return ret.length
}

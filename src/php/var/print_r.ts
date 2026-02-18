import { toPhpArrayObject } from '../_helpers/_phpTypes.ts'
import { echo } from '../strings/echo.ts'

export function print_r(array: unknown, returnVal?: boolean): string | true {
  //      discuss at: https://locutus.io/php/print_r/
  // parity verified: PHP 8.3
  //     original by: Michael White (https://getsprink.com)
  //     improved by: Ben Bryan
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //     improved by: Kevin van Zonneveld (https://kvz.io)
  //        input by: Brett Zamir (https://brett-zamir.me)
  //       example 1: print_r(1, true)
  //       returns 1: '1'

  let output = ''
  const padChar = ' '
  const padVal = 4

  const _repeatChar = function (len: number, padChar: string): string {
    let str = ''
    for (let i = 0; i < len; i++) {
      str += padChar
    }
    return str
  }
  const _formatArray = function (obj: unknown, curDepth: number, padVal: number, padChar: string): string {
    if (curDepth > 0) {
      curDepth++
    }

    const basePad = _repeatChar(padVal * curDepth, padChar)
    const thickPad = _repeatChar(padVal * (curDepth + 1), padChar)
    let str = ''

    if (typeof obj === 'object' && obj !== null && obj.constructor) {
      const objectValue = toPhpArrayObject(obj)
      str += 'Array\n' + basePad + '(\n'
      for (const key in objectValue) {
        const value = objectValue[key]
        if (Array.isArray(value)) {
          str += thickPad
          str += '['
          str += key
          str += '] => '
          str += _formatArray(value, curDepth + 1, padVal, padChar)
        } else {
          str += thickPad
          str += '['
          str += key
          str += '] => '
          str += value
          str += '\n'
        }
      }
      str += basePad + ')\n'
    } else if (obj === null || obj === undefined) {
      str = ''
    } else {
      // for our "resource" class
      str = String(obj)
    }

    return str
  }

  output = _formatArray(array, 0, padVal, padChar)

  if (returnVal !== true) {
    echo(output)
    return true
  }
  return output
}

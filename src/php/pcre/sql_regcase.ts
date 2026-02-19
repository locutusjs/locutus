import { getPhpLocaleGroup } from '../_helpers/_phpRuntimeState.ts'
import type { PhpInput } from '../_helpers/_phpTypes.ts'
import { setlocale } from '../strings/setlocale.ts'

const isRecord = (value: PhpInput): value is { [key: string]: PhpInput } =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
const defaultUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const defaultLower = 'abcdefghijklmnopqrstuvwxyz'

export function sql_regcase(str: string): string {
  //  discuss at: https://locutus.io/php/sql_regcase/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: sql_regcase('Foo - bar.')
  //   returns 1: '[Ff][Oo][Oo] - [Bb][Aa][Rr].'

  let upper = ''
  let lower = ''
  let pos = -1
  let retStr = ''

  setlocale('LC_ALL', 0)

  const lcCtypeValue = getPhpLocaleGroup('LC_CTYPE', 'LC_CTYPE')
  if (lcCtypeValue && isRecord(lcCtypeValue)) {
    const upperValue = lcCtypeValue.upper
    const lowerValue = lcCtypeValue.lower
    upper = typeof upperValue === 'string' ? upperValue : defaultUpper
    lower = typeof lowerValue === 'string' ? lowerValue : defaultLower
  } else {
    upper = defaultUpper
    lower = defaultLower
  }
  if (!upper || !lower) {
    return str
  }

  // @todo: Make this more readable
  for (let i = 0; i < str.length; i++) {
    if ((pos = upper.indexOf(str.charAt(i))) !== -1 || (pos = lower.indexOf(str.charAt(i))) !== -1) {
      retStr += '[' + upper.charAt(pos) + lower.charAt(pos) + ']'
    } else {
      retStr += str.charAt(i)
    }
  }

  return retStr
}

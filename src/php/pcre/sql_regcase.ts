import type { PhpInput } from '../_helpers/_phpTypes.ts'
import { setlocale } from '../strings/setlocale.ts'

const isRecord = (value: PhpInput): value is { [key: string]: PhpInput } =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

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

  const locutusValue = Reflect.get(globalThis, '$locutus')
  if (!isRecord(locutusValue)) {
    return str
  }

  const phpValue = Reflect.get(locutusValue, 'php')
  if (!isRecord(phpValue)) {
    return str
  }

  const localesValue = Reflect.get(phpValue, 'locales')
  const localeCategoriesValue = Reflect.get(phpValue, 'localeCategories')
  if (!isRecord(localesValue) || !isRecord(localeCategoriesValue)) {
    return str
  }

  const localeTypeValue = Reflect.get(localeCategoriesValue, 'LC_CTYPE')
  if (typeof localeTypeValue !== 'string') {
    return str
  }

  const localeValue = Reflect.get(localesValue, localeTypeValue)
  if (!isRecord(localeValue)) {
    return str
  }

  const lcCtypeValue = Reflect.get(localeValue, 'LC_CTYPE')
  if (!isRecord(lcCtypeValue)) {
    return str
  }

  const upperValue = Reflect.get(lcCtypeValue, 'upper')
  const lowerValue = Reflect.get(lcCtypeValue, 'lower')
  upper = typeof upperValue === 'string' ? upperValue : ''
  lower = typeof lowerValue === 'string' ? lowerValue : ''
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

import { setlocale } from '../strings/setlocale.ts'

type SqlRegcasePhpContext = {
  locales?: Record<string, { LC_CTYPE?: { upper?: string; lower?: string } }>
  localeCategories?: { LC_CTYPE: string }
}

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

  const globalContext = globalThis as typeof globalThis & { $locutus?: { php?: SqlRegcasePhpContext } }
  const php = globalContext.$locutus?.php
  if (!php?.locales || !php.localeCategories) {
    return str
  }

  upper = php.locales[php.localeCategories.LC_CTYPE]?.LC_CTYPE?.upper ?? ''
  lower = php.locales[php.localeCategories.LC_CTYPE]?.LC_CTYPE?.lower ?? ''
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

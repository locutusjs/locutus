import { setlocale } from '../strings/setlocale.ts'

type CTypePhpContext = {
  locales?: Record<string, { LC_CTYPE?: { [key: string]: RegExp | undefined } }>
  localeCategories?: { LC_CTYPE: string }
}

export function ctype_cntrl(text: string): boolean | false {
  //      discuss at: https://locutus.io/php/ctype_cntrl/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //       example 1: ctype_cntrl('\u0020')
  //       returns 1: false
  //       example 2: ctype_cntrl('\u001F')
  //       returns 2: true

  if (typeof text !== 'string') {
    return false
  }
  setlocale('LC_ALL', 0)

  const globalContext = globalThis as typeof globalThis & { $locutus?: { php?: CTypePhpContext } }
  const php = globalContext.$locutus?.php
  if (!php?.locales || !php.localeCategories) {
    return false
  }

  const pattern = php.locales[php.localeCategories.LC_CTYPE]?.LC_CTYPE?.ct
  return pattern instanceof RegExp ? text.search(pattern) !== -1 : false
}

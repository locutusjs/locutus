import { setlocale } from '../strings/setlocale.ts'

type StrcollPhpContext = {
  locales?: Record<string, { LC_COLLATE?: (left: string, right: string) => number }>
  localeCategories?: { LC_COLLATE: string }
}

export function strcoll(str1: string, str2: string): number {
  //      discuss at: https://locutus.io/php/strcoll/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //       example 1: strcoll('a', 'b')
  //       returns 1: -1

  const globalContext = globalThis as typeof globalThis & { $locutus?: { php?: StrcollPhpContext } }
  globalContext.$locutus = globalContext.$locutus ?? {}
  const locutus = globalContext.$locutus
  locutus.php = locutus.php ?? {}

  setlocale('LC_ALL', 0) // ensure setup of localization variables takes place

  const php = locutus.php
  if (!php.locales || !php.localeCategories) {
    return str1.localeCompare(str2)
  }
  const cmp = php.locales[php.localeCategories.LC_COLLATE]?.LC_COLLATE
  if (typeof cmp !== 'function') {
    return str1.localeCompare(str2)
  }

  return cmp(str1, str2)
}

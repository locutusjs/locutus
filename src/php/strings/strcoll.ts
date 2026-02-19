import { getPhpLocaleGroup } from '../_helpers/_phpRuntimeState.ts'
import { setlocale } from '../strings/setlocale.ts'

export function strcoll(str1: string, str2: string): number {
  //      discuss at: https://locutus.io/php/strcoll/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //       example 1: strcoll('a', 'b')
  //       returns 1: -1

  setlocale('LC_ALL', 0) // ensure setup of localization variables takes place

  const localeCollation = getPhpLocaleGroup('LC_COLLATE', 'LC_COLLATE')
  if (!localeCollation) {
    return str1.localeCompare(str2)
  }

  const cmp = localeCollation.LC_COLLATE
  if (typeof cmp !== 'function') {
    return str1.localeCompare(str2)
  }

  return cmp(str1, str2)
}

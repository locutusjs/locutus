import { setlocale } from '../strings/setlocale.ts'

export function strcoll(str1: string, str2: string): number {
  //      discuss at: https://locutus.io/php/strcoll/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //       example 1: strcoll('a', 'b')
  //       returns 1: -1

  setlocale('LC_ALL', 0) // ensure setup of localization variables takes place

  const locutusValue = Reflect.get(globalThis, '$locutus')
  if (typeof locutusValue !== 'object' || locutusValue === null) {
    return str1.localeCompare(str2)
  }

  const php = Reflect.get(locutusValue, 'php')
  if (typeof php !== 'object' || php === null) {
    return str1.localeCompare(str2)
  }

  const locales = Reflect.get(php, 'locales')
  const localeCategories = Reflect.get(php, 'localeCategories')
  if (
    typeof locales !== 'object' ||
    locales === null ||
    typeof localeCategories !== 'object' ||
    localeCategories === null
  ) {
    return str1.localeCompare(str2)
  }

  const collateKey = Reflect.get(localeCategories, 'LC_COLLATE')
  if (typeof collateKey !== 'string') {
    return str1.localeCompare(str2)
  }

  const localeEntry = Reflect.get(locales, collateKey)
  if (typeof localeEntry !== 'object' || localeEntry === null) {
    return str1.localeCompare(str2)
  }

  const cmp = Reflect.get(localeEntry, 'LC_COLLATE')
  if (typeof cmp !== 'function') {
    return str1.localeCompare(str2)
  }

  return cmp(str1, str2)
}

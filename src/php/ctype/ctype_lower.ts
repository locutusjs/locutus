// @ts-nocheck
import { setlocale } from '../strings/setlocale.ts'

export function ctype_lower(text: string): boolean | false {
  //      discuss at: https://locutus.io/php/ctype_lower/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //       example 1: ctype_lower('abc')
  //       returns 1: true

  if (typeof text !== 'string') {
    return false
  }

  // ensure setup of localization variables takes place
  setlocale('LC_ALL', 0)

  const $global = typeof window !== 'undefined' ? window : global
  $global.$locutus = $global.$locutus || {}
  const $locutus = $global.$locutus
  const p = $locutus.php

  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.lw) !== -1
}

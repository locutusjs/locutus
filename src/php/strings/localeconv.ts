import type { PhpAssoc, PhpMixed } from '../_helpers/_phpTypes.ts'
import { setlocale } from '../strings/setlocale.ts'

type LocaleValues = PhpAssoc<PhpMixed>

type LocaleConvPhpContext = {
  locales?: Record<string, { LC_NUMERIC?: LocaleValues; LC_MONETARY?: LocaleValues }>
  localeCategories?: { LC_NUMERIC: string; LC_MONETARY: string }
}

export function localeconv(): LocaleValues {
  //  discuss at: https://locutus.io/php/localeconv/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: setlocale('LC_ALL', 'en_US')
  //   example 1: localeconv()
  //   returns 1: {decimal_point: '.', thousands_sep: '', positive_sign: '', negative_sign: '-', int_frac_digits: 2, frac_digits: 2, p_cs_precedes: 1, p_sep_by_space: 0, n_cs_precedes: 1, n_sep_by_space: 0, p_sign_posn: 1, n_sign_posn: 1, grouping: [], int_curr_symbol: 'USD ', currency_symbol: '$', mon_decimal_point: '.', mon_thousands_sep: ',', mon_grouping: [3, 3]}

  const arr: LocaleValues = {}
  // ensure setup of localization variables takes place, if not already
  setlocale('LC_ALL', 0)

  const globalContext = globalThis as typeof globalThis & { $locutus?: { php?: LocaleConvPhpContext } }
  globalContext.$locutus = globalContext.$locutus ?? {}
  const locutus = globalContext.$locutus
  locutus.php = locutus.php ?? {}
  const php = locutus.php
  if (!php.locales || !php.localeCategories) {
    return arr
  }

  // Make copies
  const numeric = php.locales[php.localeCategories.LC_NUMERIC]?.LC_NUMERIC ?? {}
  for (const prop in numeric) {
    arr[prop] = numeric[prop]
  }
  const monetary = php.locales[php.localeCategories.LC_MONETARY]?.LC_MONETARY ?? {}
  for (const prop in monetary) {
    arr[prop] = monetary[prop]
  }

  return arr
}

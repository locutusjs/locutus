import { getPhpLocaleGroup } from '../_helpers/_phpRuntimeState.ts'
import type { PhpAssoc, PhpInput } from '../_helpers/_phpTypes.ts'
import { setlocale } from '../strings/setlocale.ts'

type LocaleValues = PhpAssoc<PhpInput>

export function localeconv(): LocaleValues {
  //  discuss at: https://locutus.io/php/localeconv/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: setlocale('LC_ALL', 'en_US')
  //   example 1: localeconv()
  //   returns 1: {decimal_point: '.', thousands_sep: '', positive_sign: '', negative_sign: '-', int_frac_digits: 2, frac_digits: 2, p_cs_precedes: 1, p_sep_by_space: 0, n_cs_precedes: 1, n_sep_by_space: 0, p_sign_posn: 1, n_sign_posn: 1, grouping: [], int_curr_symbol: 'USD ', currency_symbol: '$', mon_decimal_point: '.', mon_thousands_sep: ',', mon_grouping: [3, 3]}

  const arr: LocaleValues = {}
  // ensure setup of localization variables takes place, if not already
  setlocale('LC_ALL', 0)

  // Make copies
  const numeric = getPhpLocaleGroup('LC_NUMERIC', 'LC_NUMERIC')
  if (!numeric) {
    return arr
  }
  Object.assign(arr, numeric)
  const monetary = getPhpLocaleGroup('LC_MONETARY', 'LC_MONETARY')
  if (!monetary) {
    return arr
  }
  Object.assign(arr, monetary)

  return arr
}

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

  const getLocaleGroup = (
    php: object,
    categoryKey: 'LC_NUMERIC' | 'LC_MONETARY',
    groupKey: 'LC_NUMERIC' | 'LC_MONETARY',
  ): LocaleValues => {
    const locales = Reflect.get(php, 'locales')
    const localeCategories = Reflect.get(php, 'localeCategories')
    if (
      typeof locales !== 'object' ||
      locales === null ||
      typeof localeCategories !== 'object' ||
      localeCategories === null
    ) {
      return {}
    }

    const localeName = Reflect.get(localeCategories, categoryKey)
    if (typeof localeName !== 'string') {
      return {}
    }

    const localeEntry = Reflect.get(locales, localeName)
    if (typeof localeEntry !== 'object' || localeEntry === null) {
      return {}
    }

    const localeGroup = Reflect.get(localeEntry, groupKey)
    if (typeof localeGroup !== 'object' || localeGroup === null) {
      return {}
    }

    const values: LocaleValues = {}
    for (const key in localeGroup) {
      values[key] = Reflect.get(localeGroup, key)
    }
    return values
  }

  const locutus = Reflect.get(globalThis, '$locutus')
  if (typeof locutus !== 'object' || locutus === null) {
    return arr
  }

  const php = Reflect.get(locutus, 'php')
  if (typeof php !== 'object' || php === null) {
    return arr
  }

  // Make copies
  const numeric = getLocaleGroup(php, 'LC_NUMERIC', 'LC_NUMERIC')
  for (const prop in numeric) {
    arr[prop] = numeric[prop]
  }
  const monetary = getLocaleGroup(php, 'LC_MONETARY', 'LC_MONETARY')
  for (const prop in monetary) {
    arr[prop] = monetary[prop]
  }

  return arr
}

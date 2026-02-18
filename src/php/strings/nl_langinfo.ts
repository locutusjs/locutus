import { setlocale } from '../strings/setlocale.ts'

type LocaleTime = {
  a: string[]
  A: string[]
  b: string[]
  B: string[]
  p: string[]
  c: string
  x: string
  X: string
  r: string
  [key: string]: string | string[] | undefined
}

type LocaleMonetary = { [key: string]: string | string[] | undefined }
type LocaleNumeric = { [key: string]: string | string[] | undefined }
type LocaleMessages = { [key: string]: string | undefined }
type LocaleCType = { [key: string]: string | undefined }
type LocaleData = {
  LC_TIME: LocaleTime
  LC_MONETARY: LocaleMonetary
  LC_NUMERIC: LocaleNumeric
  LC_MESSAGES: LocaleMessages
  LC_CTYPE: LocaleCType
}
type LocaleCategoryName = 'LC_TIME' | 'LC_MONETARY' | 'LC_NUMERIC' | 'LC_MESSAGES' | 'LC_CTYPE'

const isStringArray = (value: object, key: string): boolean => {
  const candidate = Reflect.get(value, key)
  return Array.isArray(candidate) && candidate.every((item) => typeof item === 'string')
}

const isLocaleTime = (value: object): value is LocaleTime =>
  isStringArray(value, 'a') &&
  isStringArray(value, 'A') &&
  isStringArray(value, 'b') &&
  isStringArray(value, 'B') &&
  isStringArray(value, 'p') &&
  typeof Reflect.get(value, 'c') === 'string' &&
  typeof Reflect.get(value, 'x') === 'string' &&
  typeof Reflect.get(value, 'X') === 'string' &&
  typeof Reflect.get(value, 'r') === 'string'

const isLocaleData = (value: object): value is LocaleData => {
  const lcTime = Reflect.get(value, 'LC_TIME')
  const lcMonetary = Reflect.get(value, 'LC_MONETARY')
  const lcNumeric = Reflect.get(value, 'LC_NUMERIC')
  const lcMessages = Reflect.get(value, 'LC_MESSAGES')
  const lcCType = Reflect.get(value, 'LC_CTYPE')

  return (
    typeof lcTime === 'object' &&
    lcTime !== null &&
    isLocaleTime(lcTime) &&
    typeof lcMonetary === 'object' &&
    lcMonetary !== null &&
    typeof lcNumeric === 'object' &&
    lcNumeric !== null &&
    typeof lcMessages === 'object' &&
    lcMessages !== null &&
    typeof lcCType === 'object' &&
    lcCType !== null
  )
}

export function nl_langinfo(item: string): string | string[] | false {
  //  discuss at: https://locutus.io/php/nl_langinfo/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: nl_langinfo('DAY_1')
  //   returns 1: 'Sunday'

  setlocale('LC_ALL', 0) // Ensure locale data is available

  const locutus = Reflect.get(globalThis, '$locutus')
  if (typeof locutus !== 'object' || locutus === null) {
    return false
  }
  const php = Reflect.get(locutus, 'php')
  if (typeof php !== 'object' || php === null) {
    return false
  }
  const toValue = (value: string | string[] | undefined): string | string[] | false =>
    typeof value === 'string' || Array.isArray(value) ? value : false
  const localeFor = (category: LocaleCategoryName): LocaleData | false => {
    const localeCategories = Reflect.get(php, 'localeCategories')
    const locales = Reflect.get(php, 'locales')
    if (
      typeof localeCategories !== 'object' ||
      localeCategories === null ||
      typeof locales !== 'object' ||
      locales === null
    ) {
      return false
    }
    const localeName = Reflect.get(localeCategories, category)
    if (typeof localeName !== 'string') {
      return false
    }
    const localeValue = Reflect.get(locales, localeName)
    if (typeof localeValue !== 'object' || localeValue === null || !isLocaleData(localeValue)) {
      return false
    }
    return localeValue
  }

  let loc = localeFor('LC_TIME')
  if (!loc) {
    return false
  }

  if (item.indexOf('ABDAY_') === 0) {
    const index = Number.parseInt(item.replace(/^ABDAY_/, ''), 10) - 1
    return loc.LC_TIME.a[index] ?? false
  } else if (item.indexOf('DAY_') === 0) {
    const index = Number.parseInt(item.replace(/^DAY_/, ''), 10) - 1
    return loc.LC_TIME.A[index] ?? false
  } else if (item.indexOf('ABMON_') === 0) {
    const index = Number.parseInt(item.replace(/^ABMON_/, ''), 10) - 1
    return loc.LC_TIME.b[index] ?? false
  } else if (item.indexOf('MON_') === 0) {
    const index = Number.parseInt(item.replace(/^MON_/, ''), 10) - 1
    return loc.LC_TIME.B[index] ?? false
  } else {
    switch (item) {
      // More LC_TIME
      case 'AM_STR':
        return loc.LC_TIME.p[0] ?? false
      case 'PM_STR':
        return loc.LC_TIME.p[1] ?? false
      case 'D_T_FMT':
        return loc.LC_TIME.c
      case 'D_FMT':
        return loc.LC_TIME.x
      case 'T_FMT':
        return loc.LC_TIME.X
      case 'T_FMT_AMPM':
        return loc.LC_TIME.r
      case 'ERA':
      case 'ERA_YEAR':
      case 'ERA_D_T_FMT':
      case 'ERA_D_FMT':
      case 'ERA_T_FMT':
        // all fall-throughs
        return toValue(loc.LC_TIME[item])
    }
    loc = localeFor('LC_MONETARY')
    if (!loc) {
      return false
    }
    let normalizedItem = item
    if (normalizedItem === 'CRNCYSTR') {
      // alias
      normalizedItem = 'CURRENCY_SYMBOL'
    }
    switch (normalizedItem) {
      case 'INT_CURR_SYMBOL':
      case 'CURRENCY_SYMBOL':
      case 'MON_DECIMAL_POINT':
      case 'MON_THOUSANDS_SEP':
      case 'POSITIVE_SIGN':
      case 'NEGATIVE_SIGN':
      case 'INT_FRAC_DIGITS':
      case 'FRAC_DIGITS':
      case 'P_CS_PRECEDES':
      case 'P_SEP_BY_SPACE':
      case 'N_CS_PRECEDES':
      case 'N_SEP_BY_SPACE':
      case 'P_SIGN_POSN':
      case 'N_SIGN_POSN':
        // all fall-throughs
        return toValue(loc.LC_MONETARY[normalizedItem.toLowerCase()])
      case 'MON_GROUPING':
        // Same as above, or return something different since this returns an array?
        return toValue(loc.LC_MONETARY[normalizedItem.toLowerCase()])
    }
    loc = localeFor('LC_NUMERIC')
    if (!loc) {
      return false
    }
    switch (item) {
      case 'RADIXCHAR':
      case 'DECIMAL_POINT':
        // Fall-through
        return toValue(loc.LC_NUMERIC[item.toLowerCase()])
      case 'THOUSEP':
      case 'THOUSANDS_SEP':
        // Fall-through
        return toValue(loc.LC_NUMERIC[item.toLowerCase()])
      case 'GROUPING':
        // Same as above, or return something different since this returns an array?
        return toValue(loc.LC_NUMERIC[item.toLowerCase()])
    }
    loc = localeFor('LC_MESSAGES')
    if (!loc) {
      return false
    }
    switch (item) {
      case 'YESEXPR':
      case 'NOEXPR':
      case 'YESSTR':
      case 'NOSTR':
        // all fall-throughs
        return toValue(loc.LC_MESSAGES[item])
    }
    loc = localeFor('LC_CTYPE')
    if (!loc) {
      return false
    }
    if (item === 'CODESET') {
      return toValue(loc.LC_CTYPE[item])
    }

    return false
  }
}

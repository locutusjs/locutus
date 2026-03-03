import { getPhpLocaleGroup } from '../_helpers/_phpRuntimeState.ts'
import type { PhpAssoc, PhpInput } from '../_helpers/_phpTypes.ts'
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

type LocaleCategoryName = 'LC_TIME' | 'LC_MONETARY' | 'LC_NUMERIC' | 'LC_MESSAGES' | 'LC_CTYPE'

const defaultLocaleTime: LocaleTime = {
  a: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  A: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  b: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  B: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  p: ['AM', 'PM'],
  c: '%a %d %b %Y %r %Z',
  x: '%m/%d/%Y',
  X: '%r',
  r: '%I:%M:%S %p',
}

const isStringArray = (value: PhpAssoc<PhpInput>, key: string): boolean => {
  const candidate = value[key]
  return Array.isArray(candidate) && candidate.every((item) => typeof item === 'string')
}

const isLocaleTime = (value: PhpAssoc<PhpInput>): value is LocaleTime =>
  isStringArray(value, 'a') &&
  isStringArray(value, 'A') &&
  isStringArray(value, 'b') &&
  isStringArray(value, 'B') &&
  isStringArray(value, 'p') &&
  typeof value.c === 'string' &&
  typeof value.x === 'string' &&
  typeof value.X === 'string' &&
  typeof value.r === 'string'

export function nl_langinfo(item: string): string | string[] | false {
  //  discuss at: https://locutus.io/php/nl_langinfo/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: nl_langinfo('DAY_1')
  //   returns 1: 'Sunday'

  setlocale('LC_ALL', 0) // Ensure locale data is available

  const toValue = (value: PhpInput): string | string[] | false =>
    typeof value === 'string' || Array.isArray(value) ? value : false
  const localeFor = (category: LocaleCategoryName): PhpAssoc<PhpInput> | false => {
    const localeGroup = getPhpLocaleGroup(category, category)
    return localeGroup || false
  }

  const lcTimeCandidate = localeFor('LC_TIME')
  const lcTime = lcTimeCandidate && isLocaleTime(lcTimeCandidate) ? lcTimeCandidate : defaultLocaleTime

  if (item.indexOf('ABDAY_') === 0) {
    const index = Number.parseInt(item.replace(/^ABDAY_/, ''), 10) - 1
    return lcTime.a[index] ?? false
  } else if (item.indexOf('DAY_') === 0) {
    const index = Number.parseInt(item.replace(/^DAY_/, ''), 10) - 1
    return lcTime.A[index] ?? false
  } else if (item.indexOf('ABMON_') === 0) {
    const index = Number.parseInt(item.replace(/^ABMON_/, ''), 10) - 1
    return lcTime.b[index] ?? false
  } else if (item.indexOf('MON_') === 0) {
    const index = Number.parseInt(item.replace(/^MON_/, ''), 10) - 1
    return lcTime.B[index] ?? false
  } else {
    switch (item) {
      // More LC_TIME
      case 'AM_STR':
        return lcTime.p[0] ?? false
      case 'PM_STR':
        return lcTime.p[1] ?? false
      case 'D_T_FMT':
        return lcTime.c
      case 'D_FMT':
        return lcTime.x
      case 'T_FMT':
        return lcTime.X
      case 'T_FMT_AMPM':
        return lcTime.r
      case 'ERA':
      case 'ERA_YEAR':
      case 'ERA_D_T_FMT':
      case 'ERA_D_FMT':
      case 'ERA_T_FMT':
        // all fall-throughs
        return toValue(lcTime[item])
    }
    const lcMonetary = localeFor('LC_MONETARY')
    if (!lcMonetary) {
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
        return toValue(lcMonetary[normalizedItem.toLowerCase()])
      case 'MON_GROUPING':
        // Same as above, or return something different since this returns an array?
        return toValue(lcMonetary[normalizedItem.toLowerCase()])
    }
    const lcNumeric = localeFor('LC_NUMERIC')
    if (!lcNumeric) {
      return false
    }
    switch (item) {
      case 'RADIXCHAR':
      case 'DECIMAL_POINT':
        // Fall-through
        return toValue(lcNumeric[item.toLowerCase()])
      case 'THOUSEP':
      case 'THOUSANDS_SEP':
        // Fall-through
        return toValue(lcNumeric[item.toLowerCase()])
      case 'GROUPING':
        // Same as above, or return something different since this returns an array?
        return toValue(lcNumeric[item.toLowerCase()])
    }
    const lcMessages = localeFor('LC_MESSAGES')
    if (!lcMessages) {
      return false
    }
    switch (item) {
      case 'YESEXPR':
      case 'NOEXPR':
      case 'YESSTR':
      case 'NOSTR':
        // all fall-throughs
        return toValue(lcMessages[item])
    }
    const lcCtype = localeFor('LC_CTYPE')
    if (!lcCtype) {
      return false
    }
    if (item === 'CODESET') {
      return toValue(lcCtype[item])
    }

    return false
  }
}

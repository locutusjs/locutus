export function getCtypePattern(key: string): RegExp | undefined {
  // discuss at: https://locutus.io/php/_helpers/getCtypePattern/
  //     note 1: Reads the active LC_CTYPE regex bag from the locutus runtime state.
  //  example 1: typeof getCtypePattern('an')
  //  returns 1: 'undefined'
  const locutus = Reflect.get(globalThis, '$locutus')
  if (typeof locutus !== 'object' || locutus === null) {
    return undefined
  }

  const php = Reflect.get(locutus, 'php')
  if (typeof php !== 'object' || php === null) {
    return undefined
  }

  const locales = Reflect.get(php, 'locales')
  const localeCategories = Reflect.get(php, 'localeCategories')
  if (
    typeof locales !== 'object' ||
    locales === null ||
    typeof localeCategories !== 'object' ||
    localeCategories === null
  ) {
    return undefined
  }

  const ctypeLocaleName = Reflect.get(localeCategories, 'LC_CTYPE')
  if (typeof ctypeLocaleName !== 'string') {
    return undefined
  }

  const localeEntry = Reflect.get(locales, ctypeLocaleName)
  if (typeof localeEntry !== 'object' || localeEntry === null) {
    return undefined
  }

  const ctypeGroup = Reflect.get(localeEntry, 'LC_CTYPE')
  if (typeof ctypeGroup !== 'object' || ctypeGroup === null) {
    return undefined
  }

  const pattern = Reflect.get(ctypeGroup, key)
  return pattern instanceof RegExp ? pattern : undefined
}

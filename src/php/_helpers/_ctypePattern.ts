import { getPhpLocaleGroup } from './_phpRuntimeState.ts'

const defaultCtypePatterns: { [key: string]: RegExp } = {
  an: /^[A-Za-z\d]+$/g,
  al: /^[A-Za-z]+$/g,
  // biome-ignore lint/suspicious/noControlCharactersInRegex: intentional for LC_CTYPE control character class
  ct: /^[\u0000-\u001F\u007F]+$/g,
  dg: /^[\d]+$/g,
  gr: /^[\u0021-\u007E]+$/g,
  lw: /^[a-z]+$/g,
  pr: /^[\u0020-\u007E]+$/g,
  pu: /^[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]+$/g,
  sp: /^[\f\n\r\t\v ]+$/g,
  up: /^[A-Z]+$/g,
  xd: /^[A-Fa-f\d]+$/g,
}

export function getCtypePattern(key: string): RegExp | undefined {
  // discuss at: https://locutus.io/php/_helpers/getCtypePattern/
  //     note 1: Reads the active LC_CTYPE regex bag from the locutus runtime state.
  //  example 1: typeof getCtypePattern('missing')
  //  returns 1: 'undefined'
  const ctypeGroup = getPhpLocaleGroup('LC_CTYPE', 'LC_CTYPE')
  if (!ctypeGroup) {
    const fallbackPattern = defaultCtypePatterns[key]
    return fallbackPattern ? new RegExp(fallbackPattern) : undefined
  }

  const pattern = ctypeGroup[key]
  if (pattern instanceof RegExp) {
    return new RegExp(pattern)
  }

  const fallbackPattern = defaultCtypePatterns[key]
  return fallbackPattern ? new RegExp(fallbackPattern) : undefined
}

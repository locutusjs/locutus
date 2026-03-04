import { ctype_alpha as ctypeAlpha } from '../ctype/ctype_alpha.ts'

export function str_word_count(
  str: string,
  format?: 0 | 1 | 2,
  charlist?: string,
): number | string[] | { [key: number]: string } {
  //  discuss at: https://locutus.io/php/str_word_count/
  // original by: Ole Vrijenhoek
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //    input by: Bug?
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1)
  //   returns 1: ['Hello', 'fri', 'nd', "you're", 'looking', 'good', 'today']
  //   example 2: str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 2)
  //   returns 2: {0: 'Hello', 6: 'fri', 10: 'nd', 14: "you're", 29: 'looking', 46: 'good', 51: 'today'}
  //   example 3: str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1, '\u00e0\u00e1\u00e3\u00e73')
  //   returns 3: ['Hello', 'fri3nd', "you're", 'looking', 'good', 'today']
  //   example 4: str_word_count('hey', 2)
  //   returns 4: {0: 'hey'}

  const len = str.length
  const cl = charlist?.length ?? 0
  let chr = ''
  let tmpStr = ''
  let c = ''
  const wArr: string[] = []
  let wC = 0
  const assoc: { [key: number]: string } = {}
  let aC = 0
  let reg: RegExp | null = null
  let match = false

  const _pregQuote = function (value: string): string {
    return (value + '').replace(/([\\.+*?[^\]$(){}=!<>|:])/g, '\\$1')
  }
  const _getWholeChar = function (value: string, index: number): string | false {
    // Use for rare cases of non-BMP characters
    const code = value.charCodeAt(index)
    if (code < 0xd800 || code > 0xdfff) {
      return value.charAt(index)
    }
    if (code >= 0xd800 && code <= 0xdbff) {
      // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single
      // characters)
      if (value.length <= index + 1) {
        throw new Error('High surrogate without following low surrogate')
      }
      const next = value.charCodeAt(index + 1)
      if (next < 0xdc00 || next > 0xdfff) {
        throw new Error('High surrogate without following low surrogate')
      }
      return value.charAt(index) + value.charAt(index + 1)
    }
    // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
    if (index === 0) {
      throw new Error('Low surrogate without preceding high surrogate')
    }
    const prev = value.charCodeAt(index - 1)
    if (prev < 0xd800 || prev > 0xdbff) {
      // (could change last hex to 0xDB7F to treat high private surrogates as single characters)
      throw new Error('Low surrogate without preceding high surrogate')
    }
    // We can pass over low surrogates now as the second component in a pair which we have already
    // processed
    return false
  }

  if (cl && typeof charlist === 'string') {
    const firstChar = _getWholeChar(charlist, 0)
    let pattern = '^(' + _pregQuote(firstChar === false ? '' : firstChar)
    for (let i = 1; i < cl; i++) {
      const wholeChar = _getWholeChar(charlist, i)
      if (wholeChar === false) {
        continue
      }
      chr = wholeChar
      pattern += '|' + _pregQuote(chr)
    }
    pattern += ')$'
    reg = new RegExp(pattern)
  }

  for (let i = 0; i < len; i++) {
    const wholeChar = _getWholeChar(str, i)
    if (wholeChar === false) {
      continue
    }
    c = wholeChar
    // No hyphen at beginning or end unless allowed in charlist (or locale)
    // No apostrophe at beginning unless allowed in charlist (or locale)
    // @todo: Make this more readable
    match =
      ctypeAlpha(c) ||
      (reg !== null && reg.test(c)) ||
      (i !== 0 && i !== len - 1 && c === '-') ||
      (i !== 0 && c === "'")
    if (match) {
      if (tmpStr === '' && format === 2) {
        aC = i
      }
      tmpStr = tmpStr + c
    }
    if (i === len - 1 || (!match && tmpStr !== '')) {
      if (format !== 2) {
        wArr.push(tmpStr)
      } else {
        assoc[aC] = tmpStr
      }
      tmpStr = ''
      wC++
    }
  }

  if (!format) {
    return wC
  } else if (format === 1) {
    return wArr
  } else if (format === 2) {
    return assoc
  }

  throw new Error('You have supplied an incorrect format')
}

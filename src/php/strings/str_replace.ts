interface CountObj {
  value?: number
}

const asArray = (value: string | string[]): string[] => (Array.isArray(value) ? [...value] : [value])

export function str_replace(
  search: string | string[],
  replace: string | string[],
  subject: string | string[],
  countObj?: CountObj,
): string | string[] {
  //  discuss at: https://locutus.io/php/str_replace/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Gabriel Paderni
  // improved by: Philip Peterson
  // improved by: Simon Willison (https://simonwillison.net)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //  revised by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  // bugfixed by: Anton Ongson
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Oleg Eremeev
  // bugfixed by: Glen Arason (https://CanadianDomainRegistry.ca)
  // bugfixed by: Glen Arason (https://CanadianDomainRegistry.ca)
  // bugfixed by: Mahmoud Saeed
  //    input by: Onno Marsman (https://twitter.com/onnomarsman)
  //    input by: Brett Zamir (https://brett-zamir.me)
  //    input by: Oleg Eremeev
  //      note 1: The countObj parameter (optional) if used must be passed in as a
  //      note 1: object. The count will then be written by reference into it's `value` property
  //   example 1: str_replace(' ', '.', 'Kevin van Zonneveld')
  //   returns 1: 'Kevin.van.Zonneveld'
  //   example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars')
  //   returns 2: 'hemmo, mars'
  //   example 3: str_replace(Array('S','F'),'x','ASDFASDF')
  //   returns 3: 'AxDxAxDx'
  //   example 4: var countObj = {}
  //   example 4: str_replace(['A','D'], ['x','y'] , 'ASDFASDF' , countObj)
  //   example 4: var $result = countObj.value
  //   returns 4: 4
  //   example 5: str_replace('', '.', 'aaa')
  //   returns 5: 'aaa'

  let i = 0
  let j = 0
  let temp = ''
  let repl = ''
  let sl = 0
  let fl = 0
  const f = asArray(search)
  let r = asArray(replace)
  const s = asArray(subject)
  const sa = Array.isArray(subject)

  if (Array.isArray(search) && typeof replace === 'string') {
    temp = replace
    const replaceArr: string[] = []
    for (i = 0; i < search.length; i += 1) {
      replaceArr[i] = temp
    }
    temp = ''
    r = [...replaceArr]
  }

  if (typeof countObj !== 'undefined') {
    countObj.value = 0
  }

  for (i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === undefined || s[i] === '') {
      continue
    }
    for (j = 0, fl = f.length; j < fl; j++) {
      const findValue = f[j]
      if (findValue === undefined || findValue === '') {
        continue
      }
      temp = (s[i] ?? '') + ''
      const replacement = r[j]
      repl = replacement ?? ''
      s[i] = temp.split(findValue).join(repl)
      if (typeof countObj !== 'undefined') {
        countObj.value = (countObj.value ?? 0) + temp.split(findValue).length - 1
      }
    }
  }
  return sa ? s : (s[0] ?? '')
}

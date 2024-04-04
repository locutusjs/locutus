module.exports = function str_replace(search, replace, subject, countObj) {
  // eslint-disable-line camelcase
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
  const f = [].concat(search)
  let r = [].concat(replace)
  let s = subject
  let ra = Object.prototype.toString.call(r) === '[object Array]'
  const sa = Object.prototype.toString.call(s) === '[object Array]'
  s = [].concat(s)

  const $global = typeof window !== 'undefined' ? window : global
  $global.$locutus = $global.$locutus || {}
  const $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}

  if (typeof search === 'object' && typeof replace === 'string') {
    temp = replace
    replace = []
    for (i = 0; i < search.length; i += 1) {
      replace[i] = temp
    }
    temp = ''
    r = [].concat(replace)
    ra = Object.prototype.toString.call(r) === '[object Array]'
  }

  if (typeof countObj !== 'undefined') {
    countObj.value = 0
  }

  for (i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue
    }
    for (j = 0, fl = f.length; j < fl; j++) {
      if (f[j] === '') {
        continue
      }
      temp = s[i] + ''
      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
      s[i] = temp.split(f[j]).join(repl)
      if (typeof countObj !== 'undefined') {
        countObj.value += temp.split(f[j]).length - 1
      }
    }
  }
  return sa ? s : s[0]
}

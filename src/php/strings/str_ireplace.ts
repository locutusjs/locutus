type CountObj = { value?: number }
const asArray = (value: string | string[]): string[] => (Array.isArray(value) ? [...value] : [value])

export function str_ireplace(
  search: string | string[],
  replace: string | string[],
  subject: string | string[],
  countObj?: CountObj,
): string | string[] {
  //  discuss at: https://locutus.io/php/str_ireplace/
  // original by: Glen Arason (https://CanadianDomainRegistry.ca)
  // bugfixed by: Mahmoud Saeed
  //      note 1: Case-insensitive version of str_replace()
  //      note 1: Compliant with PHP 5.0 str_ireplace() Full details at:
  //      note 1: https://ca3.php.net/manual/en/function.str-ireplace.php
  //      note 2: The countObj parameter (optional) if used must be passed in as a
  //      note 2: object. The count will then be written by reference into it's `value` property
  //   example 1: str_ireplace('M', 'e', 'name')
  //   returns 1: 'naee'
  //   example 2: var $countObj = {}
  //   example 2: str_ireplace('M', 'e', 'name', $countObj)
  //   example 2: var $result = $countObj.value
  //   returns 2: 1
  //   example 3: str_ireplace('', '.', 'aaa')
  //   returns 3: 'aaa'

  const loweredSearch = Array.isArray(search) ? search.map((item) => item.toLowerCase()) : search.toLowerCase()
  const loweredSubject = Array.isArray(subject) ? subject.map((item) => item.toLowerCase()) : subject.toLowerCase()
  const osa = Array.isArray(subject)
  const f = asArray(loweredSearch)
  const s = asArray(loweredSubject)
  const os = asArray(subject)
  let r = asArray(replace)

  if (Array.isArray(loweredSearch) && typeof replace === 'string') {
    r = loweredSearch.map(() => replace)
  }

  if (countObj) {
    countObj.value = 0
  }

  for (let i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue
    }
    for (let j = 0, fl = f.length; j < fl; j++) {
      const searchTerm = f[j] ?? ''
      if (searchTerm === '') {
        continue
      }
      const temp = s[i] ?? ''
      const repl = r[j] ?? ''
      s[i] = temp.replaceAll(searchTerm, repl)
      const otemp = os[i] ?? ''
      const oi = temp.indexOf(searchTerm)
      const ofjl = searchTerm.length
      if (oi >= 0) {
        os[i] = otemp.replaceAll(otemp.substr(oi, ofjl), repl)
      }

      if (countObj) {
        countObj.value = (countObj.value ?? 0) + temp.split(searchTerm).length - 1
      }
    }
  }

  return osa ? os : (os[0] ?? '')
}

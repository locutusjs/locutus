import { rawurlencode as _rawurlencode } from '../url/rawurlencode.ts'
import { urlencode as _urlencode } from '../url/urlencode.ts'

type HttpBuildQueryEncType = 'PHP_QUERY_RFC1738' | 'PHP_QUERY_RFC3986'
type QueryScalar = string | number | boolean | null
type QueryValue = QueryScalar | QueryObject | QueryValue[]
type QueryObject = { [key: string]: QueryValue }

export function http_build_query(
  formdata: QueryObject | QueryValue[],
  numericPrefix?: string | number,
  argSeparator?: string,
  encType?: HttpBuildQueryEncType,
): string {
  //  discuss at: https://locutus.io/php/http_build_query/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Legaev Andrey
  // improved by: Michael White (https://getsprink.com)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //  revised by: stag019
  //    input by: Dreamer
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: MIO_KODUKI (https://mio-koduki.blogspot.com/)
  // improved by: Will Rowe
  //      note 1: If the value is null, key and value are skipped in the
  //      note 1: http_build_query of PHP while in locutus they are not.
  //   example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;')
  //   returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
  //   example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_')
  //   returns 2: 'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&php=hypertext+processor&cow=milk'
  //   example 3: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;', 'PHP_QUERY_RFC3986')
  //   returns 3: 'foo=bar&amp;php=hypertext%20processor&amp;baz=boom&amp;cow=milk'

  let encodeFunc: (value: string) => string

  switch (encType) {
    case 'PHP_QUERY_RFC3986':
      encodeFunc = _rawurlencode
      break

    case 'PHP_QUERY_RFC1738':
    default:
      encodeFunc = _urlencode
      break
  }

  const tmp: string[] = []

  const _httpBuildQueryHelper = function (key: string, val: QueryValue, separator: string): string {
    const nested: string[] = []
    if (val === true) {
      val = '1'
    } else if (val === false) {
      val = '0'
    }
    if (val !== null) {
      if (typeof val === 'object') {
        const valueObject = val as QueryObject
        for (const nestedKey in valueObject) {
          if (Object.prototype.hasOwnProperty.call(valueObject, nestedKey)) {
            const nestedValue = valueObject[nestedKey]
            if (typeof nestedValue !== 'undefined' && nestedValue !== null) {
              nested.push(_httpBuildQueryHelper(key + '[' + nestedKey + ']', nestedValue, separator))
            }
          }
        }
        return nested.join(separator)
      } else {
        return encodeFunc(key) + '=' + encodeFunc(String(val))
      }
    } else {
      return ''
    }
  }

  const separator = argSeparator || '&'

  const formObject = formdata as QueryObject
  for (const key in formObject) {
    if (!Object.prototype.hasOwnProperty.call(formObject, key)) {
      continue
    }
    const value = formObject[key]
    if (typeof value === 'undefined') {
      continue
    }
    let queryKey = key
    if (numericPrefix && !Number.isNaN(Number(queryKey))) {
      queryKey = String(numericPrefix) + queryKey
    }
    const query = _httpBuildQueryHelper(queryKey, value, separator)
    if (query !== '') {
      tmp.push(query)
    }
  }

  return tmp.join(separator)
}

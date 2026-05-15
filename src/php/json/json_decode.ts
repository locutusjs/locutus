import { setPhpRuntimeEntry } from '../_helpers/_phpRuntimeState.ts'

type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }

export function json_decode<T = JsonValue>(strJson: string): T | null {
  //       discuss at: https://phpjs.org/functions/json_decode/
  //  parity verified: PHP 8.3
  //      original by: Public Domain (https://www.json.org/json2.js)
  // reimplemented by: Kevin van Zonneveld (https://kevin.vanzonneveld.net)
  //      improved by: T.J. Leahy
  //      improved by: Michael White
  //           note 1: Uses the host JSON.parse implementation required by Locutus' runtime target.
  //        example 1: json_decode('[ 1 ]')
  //        returns 1: [1]

  const json = typeof JSON === 'object' && JSON !== null ? JSON : null
  const parse = json?.parse
  if (typeof parse !== 'function') {
    setPhpRuntimeEntry('last_error_json', 4)
    return null
  }

  try {
    const parsed = parse.call(json, strJson)
    setPhpRuntimeEntry('last_error_json', 0)
    return parsed
  } catch (err) {
    if (!(err instanceof SyntaxError)) {
      throw new Error('Unexpected error type in json_decode()')
    }

    // usable by json_last_error()
    setPhpRuntimeEntry('last_error_json', 4)
    return null
  }
}

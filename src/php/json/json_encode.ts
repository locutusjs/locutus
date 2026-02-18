type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }
type JsonObject = { [key: string]: JsonValue }
type JsonGlobal = typeof globalThis & {
  $locutus?: { php?: { [key: string]: unknown } }
  JSON?: typeof JSON
}

const hasOwn = Object.prototype.hasOwnProperty
const isJsonObject = (value: unknown): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export function json_encode(mixedVal: unknown): string | null {
  //       discuss at: https://phpjs.org/functions/json_encode/
  //  parity verified: PHP 8.3
  //      original by: Public Domain (https://www.json.org/json2.js)
  // reimplemented by: Kevin van Zonneveld (https://kevin.vanzonneveld.net)
  //      improved by: Michael White
  //         input by: felix
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  //        example 1: json_encode('Kevin')
  //        returns 1: '"Kevin"'

  /*
    https://www.JSON.org/json2.js
    2008-11-19
    Public Domain.
    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    See https://www.JSON.org/js.html
  */

  const $global = (typeof window !== 'undefined' ? window : global) as JsonGlobal
  $global.$locutus = $global.$locutus || {}
  const $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}

  const json = $global.JSON
  let retVal
  try {
    if (typeof json === 'object' && typeof json.stringify === 'function') {
      // Errors will not be caught here if our own equivalent to resource
      retVal = json.stringify(mixedVal)
      if (retVal === undefined) {
        throw new SyntaxError('json_encode')
      }
      return retVal
    }

    const value = mixedVal

    const quote = function (string: string): string {
      const escapeChars = [
        '\u0000-\u001f',
        '\u007f-\u009f',
        '\u00ad',
        '\u0600-\u0604',
        '\u070f',
        '\u17b4',
        '\u17b5',
        '\u200c-\u200f',
        '\u2028-\u202f',
        '\u2060-\u206f',
        '\ufeff',
        '\ufff0-\uffff',
      ].join('')
      const escapable = new RegExp('[\\"' + escapeChars + ']', 'g')
      const meta: Record<string, string> = {
        // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\',
      }

      escapable.lastIndex = 0
      return escapable.test(string)
        ? '"' +
            string.replace(escapable, function (a) {
              const c = meta[a]
              return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
            }) +
            '"'
        : '"' + string + '"'
    }

    const _str = function (key: string | number, holder: { [key: string]: unknown } | unknown[]): string | undefined {
      let gap = ''
      const indent = '    '
      // The loop counter.
      let i = 0
      // The member key.
      let k = ''
      // The member value.
      let v = ''
      let length = 0
      const mind = gap
      let partial: string[] = []
      let value = Array.isArray(holder) ? holder[Number(key)] : holder[String(key)]

      // If the value has a toJSON method, call it to obtain a replacement value.
      if (typeof value === 'object' && value !== null) {
        const toJSON = Reflect.get(value, 'toJSON')
        if (typeof toJSON === 'function') {
          value = toJSON.call(value, key)
        }
      }

      // What happens next depends on the value's type.
      switch (typeof value) {
        case 'string':
          return quote(value)

        case 'number':
          // JSON numbers must be finite. Encode non-finite numbers as null.
          return isFinite(value) ? String(value) : 'null'

        case 'boolean':
          // If the value is a boolean or null, convert it to a string.
          return String(value)

        case 'object':
          // If the type is 'object', we might be dealing with an object or an array or
          // null.
          // Due to a specification blunder in ECMAScript, typeof null is 'object',
          // so watch out for that case.
          if (!value) {
            return 'null'
          }

          // Make an array to hold the partial results of stringifying this object value.
          gap += indent
          partial = []

          // Is the value an array?
          if (Array.isArray(value)) {
            // The value is an array. Stringify every element. Use null as a placeholder
            // for non-JSON values.
            length = value.length
            for (i = 0; i < length; i += 1) {
              partial[i] = _str(i, value) || 'null'
            }

            // Join all of the elements together, separated with commas, and wrap them in
            // brackets.
            v =
              partial.length === 0
                ? '[]'
                : gap
                  ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                  : '[' + partial.join(',') + ']'
            // gap = mind // not used
            return v
          }

          // Iterate through all of the keys in the object.
          if (!isJsonObject(value)) {
            throw new SyntaxError('json_encode')
          }
          for (k in value) {
            if (hasOwn.call(value, k)) {
              v = _str(k, value) || ''
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v)
              }
            }
          }

          // Join all of the member texts together, separated with commas,
          // and wrap them in braces.
          v =
            partial.length === 0
              ? '{}'
              : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}'
          // gap = mind // Not used
          return v
        case 'undefined':
        case 'function':
        default:
          throw new SyntaxError('json_encode')
      }
    }

    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    const encoded = _str('', {
      '': value,
    })
    if (typeof encoded !== 'string') {
      throw new SyntaxError('json_encode')
    }
    return encoded
  } catch (err) {
    // @todo: ensure error handling above throws a SyntaxError in all cases where it could
    // (i.e., when the JSON global is not available and there is an error)
    if (!(err instanceof SyntaxError)) {
      throw new Error('Unexpected error type in json_encode()')
    }
    // usable by json_last_error()
    $locutus.php.last_error_json = 4
    return null
  }
}

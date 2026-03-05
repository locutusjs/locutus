type PathKey = string | number

function readAtPath(target: unknown, key: PathKey): unknown {
  if (target === null || target === undefined) {
    return undefined
  }

  if (typeof target !== 'object') {
    return undefined
  }

  return (target as Record<string | number, unknown>)[key]
}

export function get_in(value: unknown, keys: PathKey[] | unknown): unknown
export function get_in(value: unknown, keys: PathKey[] | unknown, defaultValue: unknown): unknown
export function get_in(value: unknown, keys: PathKey[] | unknown, defaultValue?: unknown): unknown {
  //  discuss at: https://locutus.io/clojure/get_in/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Reads nested values by path, similar to Clojure get-in.
  //   example 1: get_in({a: {b: 42}}, ['a', 'b'])
  //   returns 1: 42
  //   example 2: get_in({a: {b: 42}}, ['a', 'c'], 'fallback')
  //   returns 2: 'fallback'
  //   example 3: get_in([10, {x: [1, 2, 3]}], [1, 'x', 2], null)
  //   returns 3: 3

  if (!Array.isArray(keys)) {
    return defaultValue
  }

  if (keys.length === 0) {
    return value
  }

  let cursor: unknown = value
  for (const key of keys) {
    cursor = readAtPath(cursor, key)
    if (cursor === undefined) {
      return defaultValue
    }
  }

  return cursor
}

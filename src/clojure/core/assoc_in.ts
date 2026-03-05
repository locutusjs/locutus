type PathKey = string | number

function cloneForKey(value: unknown, nextKey?: PathKey): Record<string | number, unknown> | unknown[] {
  if (Array.isArray(value)) {
    return value.slice()
  }
  if (typeof value === 'object' && value !== null) {
    return { ...(value as Record<string | number, unknown>) }
  }
  return typeof nextKey === 'number' ? [] : {}
}

export function assoc_in(value: unknown, keys: PathKey[] | unknown, newValue: unknown): unknown {
  //  discuss at: https://locutus.io/clojure/assoc_in/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Immutably associates a value at a nested path, similar to Clojure assoc-in.
  //   example 1: assoc_in({a: {b: 1}}, ['a', 'b'], 2)
  //   returns 1: {a: {b: 2}}
  //   example 2: assoc_in({a: {}}, ['a', 'c'], 10)
  //   returns 2: {a: {c: 10}}
  //   example 3: assoc_in([1, {x: 3}], [1, 'x'], 9)
  //   returns 3: [1, {x: 9}]

  if (!Array.isArray(keys)) {
    return value
  }

  if (keys.length === 0) {
    return newValue
  }

  const root = cloneForKey(value, keys[0])
  let sourceCursor: unknown = value
  let targetCursor: Record<string | number, unknown> | unknown[] = root

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]
    if (key === undefined || nextKey === undefined) {
      continue
    }

    const sourceNext =
      sourceCursor !== null && typeof sourceCursor === 'object'
        ? (sourceCursor as Record<string | number, unknown>)[key]
        : undefined

    const clonedNext = cloneForKey(sourceNext, nextKey)
    ;(targetCursor as Record<string | number, unknown>)[key] = clonedNext

    sourceCursor = sourceNext
    targetCursor = clonedNext
  }

  const leafKey = keys[keys.length - 1]
  if (leafKey === undefined) {
    return root
  }

  ;(targetCursor as Record<string | number, unknown>)[leafKey] = newValue
  return root
}

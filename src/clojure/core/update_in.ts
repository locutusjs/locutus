type PathKey = string | number
type Updater = (currentValue: unknown, ...args: unknown[]) => unknown

function isRecordLike(value: unknown): value is Record<string | number, unknown> {
  return typeof value === 'object' && value !== null
}

function cloneForKey(value: unknown, nextKey?: PathKey): Record<string | number, unknown> | unknown[] {
  if (Array.isArray(value)) {
    return value.slice()
  }
  if (isRecordLike(value)) {
    return { ...value }
  }
  return typeof nextKey === 'number' ? [] : {}
}

export function update_in(value: unknown, keys: PathKey[] | unknown, updater: Updater, ...args: unknown[]): unknown {
  //      discuss at: https://locutus.io/clojure/update_in/
  // parity verified: Clojure 1.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors Clojure update-in by immutably updating a nested path and creating missing containers.
  //       example 1: update_in({a: {b: 1}}, ['a', 'b'], (n) => Number(n) + 1)
  //       returns 1: {a: {b: 2}}
  //       example 2: update_in({a: {}}, ['a', 'b'], (v) => (v === undefined ? 10 : Number(v)))
  //       returns 2: {a: {b: 10}}
  //       example 3: update_in([1, {x: 3}], [1, 'x'], (n) => Number(n) * 2)
  //       returns 3: [1, {x: 6}]

  if (typeof updater !== 'function') {
    throw new TypeError('update_in(): updater must be a function')
  }

  if (!Array.isArray(keys)) {
    return updater(value, ...args)
  }

  if (keys.length === 0) {
    return updater(value, ...args)
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

  const currentLeafValue =
    sourceCursor !== null && typeof sourceCursor === 'object'
      ? (sourceCursor as Record<string | number, unknown>)[leafKey]
      : undefined

  ;(targetCursor as Record<string | number, unknown>)[leafKey] = updater(currentLeafValue, ...args)

  return root
}

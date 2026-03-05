type GroupKeySelector<T> = (value: T, index: number, array: T[]) => string | number | symbol
type GroupValueSelector<T, U> = (value: T, index: number, array: T[]) => U

export function group_by<T>(values: T[] | unknown, keySelector: GroupKeySelector<T>): Record<string, T[]>
export function group_by<T, U>(
  values: T[] | unknown,
  keySelector: GroupKeySelector<T>,
  valueSelector: GroupValueSelector<T, U>,
): Record<string, U[]>
export function group_by<T, U>(
  values: T[] | unknown,
  keySelector: GroupKeySelector<T>,
  valueSelector?: GroupValueSelector<T, U>,
): Record<string, unknown[]> {
  //  discuss at: https://locutus.io/elixir/group_by/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Groups values by key selector, similar to Elixir Enum.group_by/3.
  //   example 1: group_by(['one', 'two', 'three'], (value) => value.length)
  //   returns 1: {3: ['one', 'two'], 5: ['three']}
  //   example 2: group_by([1, 2, 3, 4], (value) => (value % 2 === 0 ? 'even' : 'odd'))
  //   returns 2: {odd: [1, 3], even: [2, 4]}
  //   example 3: group_by([1, 2, 3], (value) => (value % 2 === 0 ? 'even' : 'odd'), (value) => value * 10)
  //   returns 3: {odd: [10, 30], even: [20]}

  if (typeof keySelector !== 'function') {
    throw new TypeError('group_by(): keySelector must be a function')
  }

  if (valueSelector !== undefined && typeof valueSelector !== 'function') {
    throw new TypeError('group_by(): valueSelector must be a function')
  }

  if (!Array.isArray(values)) {
    return {}
  }

  const out: Record<string, unknown[]> = {}
  for (let i = 0; i < values.length; i++) {
    const value = values[i] as T
    const key = String(keySelector(value, i, values))
    const mapped = valueSelector ? valueSelector(value, i, values) : value
    const bucket = out[key] ?? []
    bucket.push(mapped)
    out[key] = bucket
  }

  return out
}

type FilterMapCallback<T, U> = (value: T, index: number, array: T[]) => U | null | undefined | false

export function filter_map<T, U>(values: T[] | unknown, callback: FilterMapCallback<T, U>): U[] {
  //      discuss at: https://locutus.io/ruby/Array/filter_map/
  // parity verified: Ruby 3.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Maps each value and keeps only callback results that are neither false nor nil.
  //       example 1: filter_map([1, 2, 3, 4], (value) => (value % 2 === 0 ? value : null))
  //       returns 1: [2, 4]
  //       example 2: filter_map(['a', 'bb', 'ccc'], (value) => (value.length > 1 ? value + value : null))
  //       returns 2: ['bbbb', 'cccccc']
  //       example 3: filter_map([], (value) => value)
  //       returns 3: []

  if (typeof callback !== 'function') {
    throw new TypeError('filter_map(): callback must be a function')
  }

  if (!Array.isArray(values)) {
    return []
  }

  const out: U[] = []

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index] as T
    const mapped = callback(value, index, values)
    if (mapped !== false && mapped !== null && mapped !== undefined) {
      out.push(mapped)
    }
  }

  return out
}

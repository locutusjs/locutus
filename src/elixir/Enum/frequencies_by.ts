type FrequencySelector<T> = (value: T, index: number, array: T[]) => string | number | symbol

export function frequencies_by<T>(values: T[] | unknown, selector: FrequencySelector<T>): Record<string, number> {
  //  discuss at: https://locutus.io/elixir/frequencies_by/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Counts items by selector key, similar to Elixir Enum.frequencies_by/2.
  //   example 1: frequencies_by(['a', 'aa', 'b'], (value) => value.charAt(0))
  //   returns 1: {a: 2, b: 1}
  //   example 2: frequencies_by([1, 2, 3, 4], (value) => (value % 2 === 0 ? 'even' : 'odd'))
  //   returns 2: {odd: 2, even: 2}
  //   example 3: frequencies_by([], (value) => String(value))
  //   returns 3: {}

  if (typeof selector !== 'function') {
    throw new TypeError('frequencies_by(): selector must be a function')
  }

  if (!Array.isArray(values)) {
    return {}
  }

  const out: Record<string, number> = {}
  for (let i = 0; i < values.length; i++) {
    const value = values[i] as T
    const key = String(selector(value, i, values))
    out[key] = (out[key] ?? 0) + 1
  }

  return out
}

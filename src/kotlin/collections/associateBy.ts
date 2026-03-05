type AssociateKeySelector<T> = (value: T, index: number, array: T[]) => string | number | symbol

export function associateBy<T>(values: T[] | unknown, keySelector: AssociateKeySelector<T>): Record<string, T> {
  //  discuss at: https://locutus.io/kotlin/collections/associateBy/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Builds a key->element map using keySelector, with the last duplicate key winning (Kotlin associateBy behavior).
  //   example 1: associateBy(['ant', 'bear', 'cat'], (s) => s.charAt(0))
  //   returns 1: {a: 'ant', b: 'bear', c: 'cat'}
  //   example 2: associateBy([1, 2, 3, 4], (n) => n % 2)
  //   returns 2: {'0': 4, '1': 3}
  //   example 3: associateBy([], () => 'x')
  //   returns 3: {}

  if (!Array.isArray(values) || typeof keySelector !== 'function') {
    return {}
  }

  const out: Record<string, T> = {}
  for (let i = 0; i < values.length; i++) {
    const value = values[i] as T
    const key = String(keySelector(value, i, values))
    out[key] = value
  }
  return out
}

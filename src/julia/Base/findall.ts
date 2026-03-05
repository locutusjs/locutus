type FindPredicate<T> = (value: T, index: number, array: T[]) => boolean

export function findall<T>(matcher: FindPredicate<T>, values: T[] | unknown): number[]
export function findall<T>(matcher: T, values: T[] | unknown): number[]
export function findall<T>(matcher: FindPredicate<T> | T, values: T[] | unknown): number[] {
  //      discuss at: https://locutus.io/julia/findall/
  // parity verified: Julia 1.11
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns 1-based indices of matches in the array, similar to Julia findall.
  //       example 1: findall(2, [1, 2, 3, 2, 4, 2])
  //       returns 1: [2, 4, 6]
  //       example 2: findall('a', ['a', 'b', 'a', 'c'])
  //       returns 2: [1, 3]
  //       example 3: findall((value) => Number(value) > 2, [1, 2, 3, 4, 5])
  //       returns 3: [3, 4, 5]

  if (!Array.isArray(values)) {
    return []
  }

  const predicate: FindPredicate<T> =
    typeof matcher === 'function' ? (matcher as FindPredicate<T>) : (value) => Object.is(value, matcher as T)

  const out: number[] = []
  for (let i = 0; i < values.length; i++) {
    if (predicate(values[i] as T, i, values)) {
      out.push(i + 1)
    }
  }

  return out
}

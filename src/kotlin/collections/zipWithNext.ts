type ZipTransform<T, R> = (current: T, next: T) => R

export function zipWithNext<T>(values: T[] | unknown): Array<[T, T]>
export function zipWithNext<T, R>(values: T[] | unknown, transform: ZipTransform<T, R>): R[]
export function zipWithNext<T, R>(values: T[] | unknown, transform?: ZipTransform<T, R>): Array<[T, T]> | R[] {
  //  discuss at: https://locutus.io/kotlin/collections/zipWithNext/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Produces adjacent pairs or transformed adjacent values, like Kotlin zipWithNext.
  //   example 1: zipWithNext([1, 2, 3, 4])
  //   returns 1: [[1, 2], [2, 3], [3, 4]]
  //   example 2: zipWithNext([1, 2, 3, 4], (a, b) => b - a)
  //   returns 2: [1, 1, 1]
  //   example 3: zipWithNext(['a'])
  //   returns 3: []

  if (!Array.isArray(values) || values.length < 2) {
    return []
  }

  const out: Array<[T, T]> | R[] = []
  for (let i = 0; i < values.length - 1; i++) {
    const current = values[i] as T
    const next = values[i + 1] as T
    if (transform) {
      ;(out as R[]).push(transform(current, next))
    } else {
      ;(out as Array<[T, T]>).push([current, next])
    }
  }
  return out
}

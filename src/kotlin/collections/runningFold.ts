type RunningOperation<T, R> = (accumulator: R, value: T, index: number, array: T[]) => R

export function runningFold<T, R>(values: T[] | unknown, initial: R, operation: RunningOperation<T, R>): R[] {
  //  discuss at: https://locutus.io/kotlin/collections/runningFold/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns successive accumulation values including initial, like Kotlin runningFold.
  //   example 1: runningFold([1, 2, 3, 4], 0, (acc, value) => acc + value)
  //   returns 1: [0, 1, 3, 6, 10]
  //   example 2: runningFold(['a', 'b', 'c'], '', (acc, value) => acc + value)
  //   returns 2: ['', 'a', 'ab', 'abc']
  //   example 3: runningFold([], 10, (acc, value) => acc + value)
  //   returns 3: [10]

  if (typeof operation !== 'function') {
    throw new TypeError('runningFold(): operation must be a function')
  }

  if (!Array.isArray(values)) {
    return [initial]
  }

  const array = values as T[]
  const out: R[] = [initial]
  let accumulator = initial

  for (let i = 0; i < array.length; i++) {
    accumulator = operation(accumulator, array[i] as T, i, array)
    out.push(accumulator)
  }

  return out
}
